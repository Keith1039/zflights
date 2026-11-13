
import { useForm } from "@tanstack/react-form";
import type { CustomOption } from "~/models/Option";
import Select from "react-select";
import type {EmailConfig, User} from "~/models/user";
import api from "~/axios/api"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

enum BatchEmailOpts {
    NO_BATCH = "NO_BATCH",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    QUARTERLY = "QUARTERLY",
}

const options: CustomOption<BatchEmailOpts>[] = [
    { value: BatchEmailOpts.NO_BATCH, label: "No batching" },
    { value: BatchEmailOpts.WEEKLY, label: "Weekly" },
    { value: BatchEmailOpts.MONTHLY, label: "Monthly" },
    { value: BatchEmailOpts.QUARTERLY, label: "Quarterly" },
];

// set it
const optionMap = new Map<BatchEmailOpts, CustomOption<BatchEmailOpts>>();
for (const option of options) {
    optionMap.set(option.value, option)
}

const selectStyles = {
    control: (base: any, state: any) => ({
        ...base,
        minHeight: "46px",
        borderRadius: "10px",
        backgroundColor: "#111827",
        borderColor: state.isFocused ? "#818cf8" : "#334155",
        boxShadow: state.isFocused
            ? "0 0 0 3px rgba(99, 102, 241, 0.15)"
            : "none",
        "&:hover": {
            borderColor: "#818cf8",
        },
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: "#111827",
        border: "1px solid #334155",
        borderRadius: "10px",
        overflow: "hidden",
        zIndex: 50,
    }),
    menuList: (base: any) => ({
        ...base,
        padding: "4px",
    }),
    option: (base: any, state: any) => ({
        ...base,
        borderRadius: "6px",
        backgroundColor: state.isSelected
            ? "#4338ca"
            : state.isFocused
                ? "#1e293b"
                : "transparent",
        color: state.isSelected ? "#fff" : "#cbd5e1",
        cursor: "pointer",
        fontSize: "13px",
        "&:active": {
            backgroundColor: "#3730a3",
        },
    }),
    singleValue: (base: any) => ({
        ...base,
        color: "#e2e8f0",
        fontSize: "13px",
    }),
    placeholder: (base: any) => ({
        ...base,
        color: "#64748b",
        fontSize: "13px",
    }),
    input: (base: any) => ({
        ...base,
        color: "#e2e8f0",
    }),
    dropdownIndicator: (base: any) => ({
        ...base,
        color: "#64748b",
        "&:hover": {
            color: "#a5b4fc",
        },
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
};

export default function EmailSettingsForm({user, updateUser}: {user: User, updateUser:(user: User) => void}) {
    const { Field, Subscribe, handleSubmit } = useForm({
        defaultValues: {
            subscribed: user.email_config.subscribed,
            batch_type: optionMap.get(BatchEmailOpts[user.email_config.batch_type as keyof typeof BatchEmailOpts]) || optionMap.get(BatchEmailOpts.NO_BATCH),
        },
        onSubmit: async ({ value }) => {
            const params = {
                subscribed: value.subscribed,
                batch_type: value.batch_type!!.value.toString()
            }
            const res = await toast.promise(
                api.post("/settings/email/update", params),
                {
                    pending: "beginning update...",
                    success: "settings successfully updated!",
                    error: "update failed. Please try again later.",
                }
            )
            if (res.status === 200) {
                const updatedUser = {
                    ...user,
                } as User
                updatedUser.email_config.subscribed = value.subscribed
                updatedUser.email_config.batch_type = value.batch_type!!.toString()
                updateUser(updatedUser)
            } else {
                // notification that update failed, a toast or something
            }
        },
    });

    return (
        <form
            className="space-y-8"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit();
            }}
        >
            {/* Email Notifications */}
            <Field name="subscribed">
                {(field) => (
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <path d="m3 7 9 6 9-6" />
                                </svg>
                            </div>

                            <div>
                                <label
                                    htmlFor="subscribed"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Email Notifications
                                </label>
                                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                                    Receive flight deals and important updates
                                    directly in your inbox.
                                </p>
                            </div>
                        </div>

                        {/* Toggle */}
                        <button
                            id="subscribed"
                            type="button"
                            role="switch"
                            aria-checked={field.state.value}
                            onClick={() =>
                                field.handleChange(!field.state.value)
                            }
                            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${
                                field.state.value
                                    ? "bg-indigo-500"
                                    : "bg-slate-700"
                            }`}
                        >
                            <span
                                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                    field.state.value
                                        ? "translate-x-5"
                                        : "translate-x-0"
                                }`}
                            />
                        </button>
                    </div>
                )}
            </Field>

            {/* Email Frequency */}
            <Subscribe selector={(state) => state.values.subscribed}>
                {(subscribed) => (
                    <Field name="batch_type">
                        {(field) => {
                            return (
                                <div
                                    className={`transition-opacity duration-200 ${
                                        !subscribed
                                            ? "pointer-events-none opacity-40"
                                            : ""
                                    }`}
                                >
                                    <div className="mb-3">
                                        <label
                                            htmlFor="batch_type"
                                            className="block text-sm font-semibold text-white"
                                        >
                                            Email Frequency
                                        </label>
                                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                                            Choose how often you'd like to receive
                                            flight deal notifications.
                                        </p>
                                    </div>

                                    <Select<CustomOption<BatchEmailOpts>, false>
                                        inputId="batch_type"
                                        name="batch_type"
                                        options={options}
                                        value={field.state.value}
                                        isDisabled={!subscribed}
                                        isSearchable={false}
                                        isClearable={false}
                                        closeMenuOnSelect
                                        styles={selectStyles}
                                        onChange={(selected) => {
                                            if (selected) {
                                                field.handleChange(selected);
                                            }
                                        }}
                                        className="text-sm"
                                        classNamePrefix="custom-select"
                                    />

                                    <p className="mt-2 text-[11px] text-slate-500">
                                        You can change your notification frequency
                                        anytime.
                                    </p>
                                </div>
                            );
                        }}
                    </Field>
                )

                }
            </Subscribe>

            {/* Submit */}
            <div className="flex justify-end border-t border-white/[0.08] pt-6">
                <button
                    type="submit"
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/20 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.98]"
                >
                    Save Preferences
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14m-7-7 7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
}

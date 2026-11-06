
import { useForm } from "@tanstack/react-form";
import Select from "react-select";
import type { Option } from "~/models/Option";

export async function generalFormAction(formData: FormData) {
    const name = formData.get("visitorsName");
    return { message: `Hello, ${name}` };
}

const options: Option[] = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "battery", label: "Battery" },
];

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
    valueContainer: (base: any) => ({
        ...base,
        padding: "2px 10px",
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: "#312e81",
        borderRadius: "6px",
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        color: "#c7d2fe",
        fontWeight: 500,
        padding: "3px 5px",
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        color: "#a5b4fc",
        borderRadius: "0 6px 6px 0",
        "&:hover": {
            backgroundColor: "#4338ca",
            color: "#fff",
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
    clearIndicator: (base: any) => ({
        ...base,
        color: "#64748b",
        "&:hover": {
            color: "#f87171",
        },
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
};

export default function GeneralSettingsForm() {
    const { Field, handleSubmit } = useForm({
        defaultValues: {
            threshold: 50,
            interestedCountries: [] as Option[],
            departureAirports: [] as Option[],
        },
        onSubmit: async ({ value }) => {
            console.log(value);
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
            {/* Threshold */}
            <Field name="threshold">
                {(field) => (
                    <div>
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.8}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <label
                                        htmlFor="threshold"
                                        className="block text-sm font-semibold text-white"
                                    >
                                        Deal Threshold
                                    </label>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Set your preferred discount threshold.
                                    </p>
                                </div>
                            </div>

                            <span className="shrink-0 rounded-lg border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-sm font-bold text-indigo-300">
                                {field.state.value}%
                            </span>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                            <input
                                id="threshold"
                                name="threshold"
                                type="range"
                                min={0}
                                max={100}
                                step={10}
                                value={Number(field.state.value)}
                                onChange={(e) =>
                                    field.handleChange(Number(e.target.value))
                                }
                                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-indigo-500"
                            />

                            <div className="mt-3 flex justify-between text-[10px] font-medium text-slate-500">
                                <span>0%</span>
                                <span>50%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                )}
            </Field>

            <div className="border-t border-white/[0.08]" />

            {/* Interested Countries */}
            <Field name="interestedCountries">
                {(field) => (
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <circle cx="12" cy="12" r="9" />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 12h18M12 3a15 15 0 010 18m0-18a15 15 0 000 18"
                                    />
                                </svg>
                            </div>

                            <div>
                                <label
                                    htmlFor="interestedCountries"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Interested Countries
                                </label>
                                <p className="mt-1 text-xs text-slate-400">
                                    Choose the destinations you'd love to visit.
                                </p>
                            </div>
                        </div>

                        <Select<Option, true>
                            inputId="interestedCountries"
                            name="interestedCountries"
                            options={options}
                            isMulti
                            isClearable
                            closeMenuOnSelect={false}
                            placeholder="Choose countries..."
                            noOptionsMessage={() => "No options available"}
                            value={field.state.value}
                            onChange={(selected) =>
                                field.handleChange([...selected])
                            }
                            styles={selectStyles}
                            className="text-sm"
                            classNamePrefix="custom-select"
                        />
                    </div>
                )}
            </Field>

            <div className="border-t border-white/[0.08]" />

            {/* Departure Airports */}
            <Field name="departureAirports">
                {(field) => (
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2 16l20-5-8-4-3-5-2 1 2 5-7 2-2-2-2 1 3 7z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <label
                                    htmlFor="departureAirports"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Departure Airports
                                </label>
                                <p className="mt-1 text-xs text-slate-400">
                                    Choose your preferred departure locations.
                                </p>
                            </div>
                        </div>

                        <Select<Option, true>
                            inputId="departureAirports"
                            name="departureAirports"
                            options={options}
                            isMulti
                            isClearable
                            closeMenuOnSelect={false}
                            placeholder="Choose departure airports..."
                            noOptionsMessage={() => "No options available"}
                            value={field.state.value}
                            onChange={(selected) => {
                                if (selected.length <= 3) {
                                    field.handleChange([...selected]);
                                }
                            }}
                            styles={selectStyles}
                            className="text-sm"
                            classNamePrefix="custom-select"
                        />

                        <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-xs text-slate-400">
                            <svg
                                className="h-4 w-4 shrink-0 text-indigo-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <circle cx="12" cy="12" r="9" />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 11v5m0-8h.01"
                                />
                            </svg>
                            You can select up to 3 departure airports.
                            <span className="ml-auto shrink-0 font-semibold text-slate-300">
                                {field.state.value.length}/3
                            </span>
                        </div>
                    </div>
                )}
            </Field>

            {/* Footer */}
            <div className="flex flex-col-reverse gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                    Your preferences can be updated anytime.
                </p>

                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/20 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.98]"
                >
                    Save Settings
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

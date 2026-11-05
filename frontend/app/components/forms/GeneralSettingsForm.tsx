
import { useForm } from "@tanstack/react-form";
import Select from "react-select";

export async function generalFormAction(formData: FormData) {
    const name = formData.get("visitorsName");
    return { message: `Hello, ${name}` };
}

type Option = {
    value: string;
    label: string;
};

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
        borderColor: state.isFocused ? "#6366f1" : "#e2e8f0",
        boxShadow: state.isFocused
            ? "0 0 0 3px rgba(99, 102, 241, 0.12)"
            : "none",
        "&:hover": {
            borderColor: "#a5b4fc",
        },
        padding: "2px 4px",
        backgroundColor: "#fff",
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: "#eef2ff",
        borderRadius: "6px",
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        color: "#4338ca",
        fontWeight: 500,
        padding: "3px 5px",
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        color: "#6366f1",
        borderRadius: "0 6px 6px 0",
        "&:hover": {
            backgroundColor: "#c7d2fe",
            color: "#3730a3",
        },
    }),
    menu: (base: any) => ({
        ...base,
        borderRadius: "10px",
        overflow: "hidden",
        zIndex: 20,
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isSelected
            ? "#4f46e5"
            : state.isFocused
                ? "#eef2ff"
                : "#fff",
        color: state.isSelected ? "#fff" : "#1e293b",
        cursor: "pointer",
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
        <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6">
            <div className="mx-auto max-w-2xl">

                {/* Header */}
                <div className="mb-8">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 0v10m6-14V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 0v10M6 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 0v10"
                            />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        General Settings
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Customize your preferences and configure your travel
                        settings.
                    </p>
                </div>

                {/* Form Card */}
                <form
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSubmit();
                    }}
                >
                    <div className="space-y-8">

                        {/* Threshold */}
                        <Field name="threshold">
                            {(field) => (
                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <label
                                                htmlFor="threshold"
                                                className="block text-sm font-semibold text-slate-800"
                                            >
                                                Threshold
                                            </label>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Set your preferred threshold level.
                                            </p>
                                        </div>

                                        <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700">
                                            {field.state.value}%
                                        </span>
                                    </div>

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
                                        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-indigo-600"
                                    />

                                    <div className="mt-2 flex justify-between text-xs text-slate-400">
                                        <span>0%</span>
                                        <span>50%</span>
                                        <span>100%</span>
                                    </div>
                                </div>
                            )}
                        </Field>

                        <div className="border-t border-slate-100" />

                        {/* Interested Countries */}
                        <Field name="interestedCountries">
                            {(field) => (
                                <div>
                                    <label
                                        htmlFor="interestedCountries"
                                        className="mb-2 block text-sm font-semibold text-slate-800"
                                    >
                                        Interested Countries
                                    </label>

                                    <p className="mb-3 text-sm text-slate-500">
                                        Select the countries you're interested in.
                                    </p>

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

                        <div className="border-t border-slate-100" />

                        {/* Departure Airports */}
                        <Field name="departureAirports">
                            {(field) => (
                                <div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="departureAirports"
                                            className="block text-sm font-semibold text-slate-800"
                                        >
                                            Departure Airports
                                        </label>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Select your preferred departure airports.
                                        </p>
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

                                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <circle cx="12" cy="12" r="9" />
                                            <path
                                                strokeLinecap="round"
                                                d="M12 11v5m0-8h.01"
                                            />
                                        </svg>
                                        You can select up to 3 airports.
                                    </div>
                                </div>
                            )}
                        </Field>
                    </div>

                    {/* Footer */}
                    <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-400">
                            Your preferences can be updated anytime.
                        </p>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 active:scale-[0.98]"
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
            </div>
        </div>
    );
}

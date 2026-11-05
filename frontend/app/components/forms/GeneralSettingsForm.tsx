import {useForm} from "@tanstack/react-form";
import Select from 'react-select'

export async function generalFormAction( formData: FormData) {
    const name = formData.get("visitorsName");
    return { message: `Hello, ${name}` };
}

type Option = {
    value: string;
    label: string;
}
const options: Option[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'battery', label: 'Battery' },
]

export default function GeneralSettingsForm() {
    const {Field, handleSubmit} = useForm({
        defaultValues: {
            threshold: 50,
            interestedCountries: [] as Option[],
            departureAirports: [] as Option[],
        },
        onSubmit: async ({value}) => {
            console.log(value);
        }
    });

    return (
        <form
            className="flex flex-col"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit()
            }}
        >
            <Field name="threshold">
                {(field) => (
                    <>
                        <label htmlFor="threshold">Threshold</label>
                        <input
                            name="threshold"
                            type="range"
                            min={0}
                            max={100}
                            defaultValue={50}
                            step={10}
                            value={Number(field.state.value)}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                        <div>{field.state.value}</div>
                    </>
                )}
            </Field>
            <Field name="interestedCountries">
                {(field) => (
                    <>
                        <label htmlFor="intrestedCountries">Intrested Countries</label>
                        <Select
                            name={"interestedCountries"}
                            options={options}
                            isMulti
                            isClearable
                            closeMenuOnSelect={false}
                            value={field.state.value}
                            onChange={(selected) => field.handleChange([...selected])}
                        />
                    </>
                )}
            </Field>
            <Field name="departureAirports">
                {(field) => (
                    <>
                        <label htmlFor="departureAirports">Departure Airports</label>
                        <Select
                            name={"departureAirports"}
                            options={options}
                            isMulti
                            isClearable
                            closeMenuOnSelect={false}
                            value={field.state.value}
                            onChange={(selected) => {
                                if (selected.length <= 3) {
                                    field.handleChange([...selected])
                                }
                            }}
                        />
                    </>
                )}
            </Field>
            <button type="submit">Submit</button>
        </form>
    );
}

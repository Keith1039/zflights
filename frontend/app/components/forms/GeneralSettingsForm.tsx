
import { Form, useActionData } from "react-router";

export async function generalFormAction( formData: FormData) {
    const name = formData.get("visitorsName");
    return { message: `Hello, ${name}` };
}

export default function GeneralSettingsForm() {
    const data = useActionData<{message: string} | undefined>();
    return (
        <Form method="post" className="flex flex-col">
            <input type="hidden" name="form" value="general"/>
            <input type="text" name="visitorsName" />
            {data ? data.message : "Waiting..."}
            <button type="submit">Submit</button>
        </Form>
    );
}

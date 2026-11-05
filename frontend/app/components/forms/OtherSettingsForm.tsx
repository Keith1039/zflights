import {Form, useActionData} from "react-router";

export async function otherFormAction( formData: FormData) {
    const name = formData.get("visitorsName");
    return { message: `Hello, ${name}` };
}

export default function OtherSettingsForm() {
    const data = useActionData<{message: string} | undefined>();
    return (
        <Form method="post" className="flex flex-col">
            <input type="hidden" name="form" value="other"/>
        </Form>
    )
}
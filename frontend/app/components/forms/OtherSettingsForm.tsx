import {Form, useActionData} from "react-router";
import type {User} from "~/models/user";

export default function OtherSettingsForm({user, updateUser}: {user: User, updateUser:(user: User) => void}) {
    const data = useActionData<{message: string} | undefined>();
    return (
        <Form method="post" className="flex flex-col">
            <input type="hidden" name="form" value="other"/>
        </Form>
    )
}
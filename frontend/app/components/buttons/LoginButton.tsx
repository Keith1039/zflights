import RedirectButton from "~/components/buttons/RedirectButton";

export default function LoginButton() {
    return (
        <RedirectButton caption={"Login"} href={"/login"}/>
    )
}
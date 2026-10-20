import Logo from "~/components/Logo";
import FormButton from "~/components/buttons/FormButton";

export default function (){
    return (
        <form>
            <div className="flex w-full justify-center">
                <div className="flex flex-col gap-3 w-1/4">
                    <h1 className="self-center text-2xl font-bold text-nowrap">Log in to your account </h1>
                    <label htmlFor="email" className="text-lg font-bold font-bold">
                        Email Address
                    </label>
                    <input id="email" name="email" type="email" className="w-full border-solid border rounded-md h-10 bg-black"/>
                    <label htmlFor="password" className="text-lg font-bold font-bold">
                        Password
                    </label>
                    <input id="password" name="email" type="password" className="w-full border-solid border rounded-md h-10 bg-black"/>
                    <div className="flex w-full justify-center">
                        <FormButton caption={"Log In"}/>
                    </div>
                </div>
            </div>
        </form>
    )
}
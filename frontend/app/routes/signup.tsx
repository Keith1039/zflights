import Logo from "~/components/Logo";
import FormButton from "~/components/buttons/FormButton";

export default function (){
    return (
        <div className="flex min-w-dvh min-h-dvh justify-center items-center bg-transparent">
            <div className="flex flex-col w-3/4 bg-blue-400 z-20">
                <div className="flex w-full justify-center items-center bg-red-400 z-20">
                    <div className="flex w-1/10 justify-center items-center bg-gray-400">
                        <Logo/>
                    </div>
                </div>
                <form>
                    <div className="flex w-full bg-green-400 justify-center">
                        <div className="flex flex-col gap-3 w-1/4 bg-purple-400">
                            <h1 className="self-center text-2xl font-bold">Log in to your account </h1>
                            <label htmlFor="email" className="text-lg font-bold font-bold">
                                Email Address
                            </label>
                            <input id="email" name="email" type="email" className="w-full border-solid border rounded-md h-10"/>
                            <label htmlFor="password" className="text-lg font-bold font-bold">
                                Password
                            </label>
                            <input id="password" name="email" type="password" className="w-full border-solid border rounded-md h-10"/>
                            <div className="flex w-full justify-center">
                                <FormButton caption={"Log In"}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
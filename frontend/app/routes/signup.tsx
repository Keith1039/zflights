import Logo from "~/components/Logo";

export default function (){
    return (
        <div className="flex min-w-dvh min-h-dvh justify-center items-center bg-transparent">
            <div className="flex flex-col w-3/4 h-[60dvh] bg-blue-400 z-20">
                <div className="flex w-full h-1/3 justify-center items-center bg-red-400 z-20">
                    <div className="flex w-1/10 h-full justify-center items-center bg-gray-400">
                        <Logo/>
                    </div>
                </div>
                <div className="flex w-full h-full bg-green-400 justify-center">
                    <div className="flex flex-col gap-3 w-1/4 h-full bg-purple-400">
                        <h1 className="self-center text-2xl font-bold">Log in to your account </h1>
                        <label className="text-lg font-bold font-bold">
                            Email Address
                        </label>
                        <input type="email" className="w-full border-solid border rounded-md h-10"/>
                        <label className="text-lg font-bold font-bold">
                            Password
                        </label>
                        <input type="password" className="w-full border-solid border rounded-md h-10"/>
                        <button className="self-center cursor-pointer text-lg font-bold pb-1.5 pt-1.5 pl-8 pr-8 border-solid border bg-blue-400 rounded-md">
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
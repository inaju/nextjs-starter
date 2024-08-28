import AuthLayout from "@/components/block/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";

const Login = () => {
    const { data: session, status } = useSession()
    if (session) {
        return (
            <AuthLayout>
                <div className="flex items-center justify-center flex-col gap-8 text-2xl ">
                    Signed in as {session.user.email} <br />
                    <Button onClick={() => signOut()}>Sign out</Button>
                </div>
            </AuthLayout>
        )
    }
    return (
        <AuthLayout>
            <div className="flex items-start justify-center flex-col gap-10 ">
                <div className="flex flex-col gap-2">
                    <div className=" text-5xl">
                        You are not signed in
                    </div>
                    <div className=" text-lg text-muted-foreground">
                        Mitchel says, the process is really smooth &#128521;
                    </div>
                </div>
                <Button variant="outline"
                    className="flex gap-2"
                    onClick={() => signIn('google', { callbackUrl: '/' })}>
                    <Image
                        src={"/svg/google-svg.svg"} alt="user image" height={25} width={25} />
                    <div>Sign in with google</div>
                </Button>
            </div>
        </AuthLayout>
    )
};
export default Login;
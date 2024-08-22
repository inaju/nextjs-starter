import AuthLayout from "@/components/block/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Login() {
    const { data: session, status } = useSession()
    const router = useRouter()
    // useEffect(() => {
    //     if (status === "authenticated") {
    //         if (typeof window !== "undefined") {
    //             router.push('/app')
    //         };
    //     }
    //     console.count()
    // }, [session?.user])
    if (session) {
        return (
            <AuthLayout>
                <div className="flex items-center justify-center flex-col gap-2">
                    Signed in as {session.user.email} <br />
                    <Button onClick={() => signOut()}>Sign out</Button>
                </div>
            </AuthLayout>
        )
    }
    return (
        <AuthLayout>
            <div className="flex items-center justify-center flex-col gap-2">
                Not signed in <br />
                <Button onClick={() => signIn('google', { callbackUrl: '/' })}>Sign in</Button>
            </div>
        </AuthLayout>
    )
}
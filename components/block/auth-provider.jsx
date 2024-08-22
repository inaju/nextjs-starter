'use client';

import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoaderBlock from './loader';
import { usePathname } from 'next/navigation';

const AuthProvider = (props) => {
    const { data: session, ...rest } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const isAuthRoute = pathname == '/auth/login';
    const shouldRedirectToLogin = typeof window !== "undefined" && rest?.status !== "authenticated" && !isAuthRoute
    useEffect(() => {
        if (shouldRedirectToLogin) {
            router.push('/auth/login')
        };
    }, [shouldRedirectToLogin])

    if (!shouldRedirectToLogin) {
        return (
            <div>
                {props?.children}
            </div>
        )
    }
}

export default AuthProvider

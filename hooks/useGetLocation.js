'use client';
import { useEffect, useState } from "react";

const useGetLocation = () => {
    const [location, setLocation] = useState()

    useEffect(() => {
        if (typeof window !== undefined) {
            setLocation(window?.location)
        }
    }, [typeof window])
    return { location }
}

export default useGetLocation

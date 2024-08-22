import React from 'react'

const AuthLayout = (props) => {
    return (
        <main
            className={`flex min-h-screen flex-col 
      overflow-y-none overflow-x-none max-w-[21.875rem] mx-6 
      lg:max-w-full  lg:items-center 
      justify-center lg:px-24 py-10 relative`}>
            {props.children}
        </main>
    )
}

export default AuthLayout

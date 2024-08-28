import React from 'react'
import Header from '../header'

const AuthLayout = (props) => {
    return (
        <main
            className={`flex bg-slate-100 h-screen flex-col 
      overflow-y-none overflow-x-none  
      lg:max-w-full items-start 
      justify-start relative  `}>
            <div className='bg-white w-full  py-3 px-10 shadow-sm'>
                <Header />
            </div>
            <div className=' px-6 lg:px-24  my-auto mx-auto'>
                {props.children}
            </div>
        </main>
    )
}

export default AuthLayout

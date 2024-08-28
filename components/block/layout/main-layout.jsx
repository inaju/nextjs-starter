import React from 'react'
import Header from '../header'

const MainLayout = (props) => {
  return (
    <main
      className={`  bg-slate-100`}>
      <div className='flex min-h-screen flex-col 
overflow-y-none overflow-x-none  mx-4
lg:max-w-[41.875rem] lg:mx-auto
justify-center py-10 relative'>
        <div className=" sticky top-0 z-10 ask-block">
          <Header />
        </div>
        {props?.children}
      </div>
    </main>
  )
}

export default MainLayout

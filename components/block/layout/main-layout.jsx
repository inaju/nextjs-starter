import React from 'react'

const MainLayout = (props) => {
  return (
    <main
      className={`flex min-h-screen flex-col 
overflow-y-none overflow-x-none max-w-[21.875rem] mx-6 
lg:max-w-[41.875rem] lg:mx-auto
justify-center lg:px-24 py-10 relative`}>
      {props?.children}
    </main>
  )
}

export default MainLayout

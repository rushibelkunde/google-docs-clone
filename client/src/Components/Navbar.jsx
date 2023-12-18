import React from 'react'

const Navbar = () => {
  return (
    <header className='flex justify-center  gap-3 items-center h-[80px] w-full shadow-sm bg-white'>
        <img  src="docs.png" width={"40px"}/>
        <h1 className='text-3xl text-zinc-600'>Docs</h1>
        
    </header>
  )
}

export default Navbar
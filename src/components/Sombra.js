import React from 'react'

const Sombra = () => {
  return (
    <div className='w-full max-w-[380px] max-h-[400px] border rounded-md overflow-hidden'>
    <div className='bg-gray-300 w-[300px] h-[200px] animate-pulse'>
    </div>
    <div className='p-2'>
    <p className='w-[100px] bg-gray-300 rounded-md h-10 mt-4 animate-pulse'></p>
    <p className='w-[100px] bg-gray-300 rounded-md h-10 mt-4 animate-pulse'></p>
    </div>
    <div className='flex mb-4 gap-4 ml-2'>
    <p className='w-[100px] bg-gray-300 rounded-md h-10 mt-4 animate-pulse'></p>
    <p className='w-[100px] bg-gray-300 rounded-md h-10 mt-4 animate-pulse'></p>
    </div>
  </div>
  )
}

export default Sombra

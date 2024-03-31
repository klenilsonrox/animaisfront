import React, { useState } from 'react'

const Loading = () => {


  return (
    <div className='bg-black fixed inset-0 flex items-center justify-center bg-opacity-10 backdrop-blur-sm z-50'>
      <div className='h-12 w-12 border-8 animate-spin border-[#613387] rounded-full border-r-transparent'>
      </div>
    </div>
  )

}




export default Loading

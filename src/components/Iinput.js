"use client"
import React from 'react'

const Iinput = ({label,id,setState, valor,...props}) => {
  return (
    <div className='flex flex-col mb-2'>
        <label htmlFor={id} className='font-semibold'>{label}</label>
        <input type="text" value={valor} id={id} {...props} onChange={({target})=>setState(target.value)} className='outline-none mt-px py-3 rounded-md bg-neutral-50  border px-2 border-neutral-200'/>
        </div>
  )
}

export default Iinput

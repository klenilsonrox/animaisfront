'use client'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { hashSync } from 'bcryptjs';
import { redirect } from 'next/navigation';
import buscarToken from '@/utils/buscarToken';
import useLoading from '@/hooks/useLoading';
import Loading from '@/components/Loading';

const page = () => {
const [name,setName]=React.useState("")
const [password,setPassword]=React.useState("")
const {loading,showLoading,hideLoading}=useLoading()
const [ok,setOk]=useState(false)


async function atualizarUsuario(e){
    e.preventDefault()
    if(name===""){
        alert("o nome deve ser preenchido")
        return
    }
    if(password===""){
        alert("a senha deve ser preenchida")
        return
    }
try{
    const {token,id}= buscarToken()
if(token){
    showLoading()
    const rashPass=await hashSync(password, 10)
    await axios.put(`https://animaisback.onrender.com/users/${id}`,{name,password:rashPass}, {
        headers: {
            Authorization: `Bearer ${token}`
          }
    }).then(res=>{
        console.log(res)
        hideLoading()
        setName("")
        setPassword("")
        setOk("true")
    })
}
}catch(error){
    console.log(error)
}
}

useEffect(()=>{
    if(ok){
        return redirect("dashboard")
    }
    
},[ok])


  return (
    <div className='h-screen'>
        <Header />
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm p-4'>
      <form className='bg-white w-full max-w-md rounded-md p-2 animarModal'>
        <h1 className='text-center mx-auto text-xl text-gray-500 py-4'>Editando seus dados</h1>
        <div className='w-full flex flex-col'>
            <label htmlFor="name">Nome</label>
            <input type="text" id='name' className='bg-neutral-100 py-2 rounded-md mt-1 border px-2 outline-none' value={name} onChange={({target})=>setName(target.value)} placeholder='Digite seu nome' />
        </div>
        <div className='w-full flex flex-col mt-4'>
            <label htmlFor="password">Nova Senha</label>
            <input type="password" id='password' className='bg-neutral-100 py-2 rounded-md mt-1 border px-2 outline-none' value={password} onChange={({target})=>setPassword(target.value)} placeholder='Digite sua nova senha' />
        </div>
        <div className='mt-4 flex gap-4 items-center'>
        <button className='bg-green-600 px-6 py-2 rounded-md text-white' onClick={atualizarUsuario}><a href="/dashboard">atualizar dados</a></button>
            <button type='submit'><a href="/dashboard">cancelar</a></button>
        </div>
      </form>
    </div>
{loading && <Loading />}
    </div>
  )
}

export default page

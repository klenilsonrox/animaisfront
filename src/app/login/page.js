"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { redirect } from 'next/navigation'
import Iinput from '@/components/Iinput'
import Link from 'next/link'
import { UserContext } from '@/components/UserProvider'

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [erro,setErro]=React.useState("")
    const [carregando,setCarregando]=React.useState(false)
    const refTimeout=useRef()
    const infos = useContext(UserContext)

 


    async function logar(e){
      setCarregando(true)
      e.preventDefault()
      clearTimeout(refTimeout.current)
       await axios.post("https://animaisback.onrender.com/login", {
          email,password
        }).then(res=>{
          if(res.data){
            localStorage.setItem("infos", JSON.stringify(res.data))
            infos.setDados(res.data)
           infos.setLoged(res.data)
          } 
        }).catch((error)=>{
          if(error){
           console.log(error)
           setErro(error.response.data.message)
          }
          refTimeout.current = setTimeout(()=>{
            setErro("")
          },1500)

        }).finally(()=>{
          setCarregando(false)
        })

    }

    useEffect(()=>{
      const existDados = localStorage.getItem("infos")|| []
  
     if(existDados.length > 1){
      infos.setLoged(existDados)
      return redirect("/")
     }
    },[infos.loged])



  return (
    <div className='flex items-start lg:items-center lg:justify-center justify-center h-screen p-2 lg:p-4'>
        <form className='max-w-5xl w-screen mx-auto flex-col lg:flex-row bg-white mt-[100px] lg:mt-10 rounded-md flex shadow-sm overflow-hidden text-gray-600'>

            <img src="/images/banner.jpg" alt="" className='max-w-[500px] object-cover hidden lg:flex' />
            
        <div className=' flex-1 lg:px-6'>
            <div className='flex items-center flex-col my-10 justify-center text-center'>
            <img src="/images/vetor.png" alt="logo marca" className='max-w-[120px] mx-auto py-6' />
            <p className='text-3xl text-[#613387] font-semibold'>Faça seu login</p>
            <p className='py-2 leading-5 text-[#613387]'>Para divulgar ou adotar um animalzinho, você precisa ter um cadastro</p>
            </div>

            <Iinput valor={email} type="email" label="Email" id="email" setState={setEmail}/>
            <Iinput valor={password} label="Senha" type="password" id="password" setState={setPassword}/>

          {erro && <p className='w-full text-center text-red-600 font-bold'>{erro}</p>}
        <button className='bg-[#613387] w-full py-3 mt-2 mb-4 text-white rounded-md' onClick={logar} disabled={erro}>{carregando && <div className='w-8 h-8 border-4 border-r-transparent animate-spin border-white rounded-full mx-auto'></div> } {!carregando && <span className='text-xl'>entrar</span> } </button>
        <div className='flex gap-2 mx-auto justify-center'>
            <p>Não tem uma conta?</p>
           <Link href="/registro" className='underline text-blue-600 mb-4' > Cadastre-se</Link>
        </div>

        </div>
      </form>
    </div>
  )
}

export default Login

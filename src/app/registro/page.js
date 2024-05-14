"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { redirect } from 'next/navigation'
import Iinput from '@/components/Iinput'
import Link from 'next/link'
import { UserContext } from '@/components/UserProvider'

const Login = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [cidade,setCidade]=useState("")
    const [whatsapp,setWhatsapp]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [erro,setErro]=React.useState("")
    const [carregando,setCarregando]=React.useState(false)
    const refTimeout=useRef()
    const infos = useContext(UserContext)

 


    async function cadastrar(e){
      setCarregando(true)
      e.preventDefault()
      clearTimeout(refTimeout.current)

      if(password !== confirmPassword){
        setErro("as senhas devem ser iguais")
        refTimeout.current = setTimeout(()=>{
            setErro("")
          },1500)
        setCarregando(false)
        return
      }
     
       await axios.post("https://animaisback.onrender.com/users", {
          name,email,cidade,whatsapp,password
        }).then(res=>{
          if(res.data){
            infos.setLoged("true")
            infos.setDados(res.data)
            console.log(res.data)
            localStorage.setItem("infos", JSON.stringify(res.data))
            
          } 
        }).catch((error)=>{
          if(error){
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
      const existDados = localStorage.getItem("dadosUser")|| []
      if(infos.loged || existDados.length > 0){
  
      return redirect("/")
     }
     console.log(existDados.length)
    },[infos.loged])




  return (
    <div className='flex items-start  lg:justify-center p-2  h-screen lg:p-4'>
        <form className='max-w-6xl w-screen mx-auto flex-col lg:flex-row bg-white border  lg:mt-10 rounded-md flex shadow-sm overflow-hidden text-gray-600'>

            <img src="/images/banner.jpg" alt="" className='hidden lg:max-w-[600px] xl:max-w-[600px] object-cover lg:flex' />
            
        <div className=' flex-1 lg:px-6 p-2 w-full'>
            <div className='flex items-center flex-col my-2 justify-center text-center'>
            <img src="/images/vetor.png" alt="logo marca" className='max-w-[120px] mx-auto py-6' />
            <p className='text-3xl text-[#613387] font-semibold'>Cadastre-se</p>
            <p className='py-2 leading-5 text-[#613387]'>Para divulgar um animalzinho, você precisa ter um cadastro</p>
            </div>

            <Iinput valor={name} type="text" label="Name" id="name" setState={setName} placeholder="digite seu nome completo" />
            <Iinput valor={email} type="email" label="Email" id="email" setState={setEmail} placeholder="digite seu email" />
            <Iinput valor={cidade} type="text" label="Cidade" id="cidade" setState={setCidade} placeholder="digite sua cidade" />
            <Iinput valor={whatsapp} type="text" label="Whatsapp" id="whatsapp" setState={setWhatsapp} placeholder="digite seu número do whatsapp" />
            <Iinput valor={password} label="Senha" type="password" id="password" setState={setPassword} placeholder="Digite sua senha"/>
            <Iinput valor={confirmPassword} label="Confirmar Senha" type="password" id="password" setState={setConfirmPassword} placeholder="confirme sua senha"/>

          {erro && <p className='w-full text-center text-red-600 font-bold'>{erro}</p>}
        <button className='bg-[#613387] w-full py-3 mt-2 mb-4 text-white rounded-md' onClick={cadastrar} disabled={erro}>{carregando && <div className='w-8 h-8 border-4 border-r-transparent animate-spin border-white rounded-full mx-auto'></div> } {!carregando && <span className='text-xl'>Cadastrar</span> } </button>
        <div className='flex gap-2 mx-auto justify-center'>
            <p>Já tem uma conta?</p>
           <Link href="/login" className='underline text-blue-600' > Fazer login</Link>
        </div>

        </div>
      </form>
    </div>
  )
}

export default Login

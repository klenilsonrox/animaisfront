"use client"
import React, {useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'




const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const router = useRouter()


    async function handleLogin(e){
      try{
        e.preventDefault()
      
      const response = await axios.post("https://animaisback2.vercel.app/login", {email,password})
    
      if(response.status===200){
        localStorage.setItem("dadosUser", JSON.stringify(response.data))
router.push("/")
      }
      
      }catch(error){
        console.log(error)
      }
    }

  return (
    <div className='flex items-start lg:items-center lg:justify-center justify-center h-screen p-2 lg:p-4'>
        <form className='max-w-5xl w-screen mx-auto flex-col lg:flex-row bg-white mt-[100px] lg:mt-10 rounded-md flex shadow-sm overflow-hidden text-gray-600 p-2' onSubmit={handleLogin}>
            <img src="/images/banner.jpg" alt="" className='max-w-[500px] object-cover hidden lg:flex' />
            
        <div className=' flex-1 lg:px-6'>
            <div className='flex items-center flex-col my-10 justify-center text-center'>
            <img src="/images/vetor.png" alt="logo marca" className='max-w-[120px] mx-auto py-6' />
            <p className='text-3xl text-[#613387] font-semibold'>Faça seu login</p>
            <p className='py-2 leading-5 text-[#613387]'>Para divulgar ou adotar um animalzinho, você precisa ter um cadastro</p>
            </div>

            <div className='bg-blue-600 rounded-md text-black w-full max-w-7xl mx-auto'>
                  seu conteudo aqui
           </div>

            <div className='flex flex-col mb-4'>
              <label htmlFor="email">Email</label>
              <input type="email" value={email} name='email' onChange={({target})=>setEmail(target.value)} className='border pl-2 text-gray-500 bg-neutral-100 py-3 rounded-md' placeholder='Digite seu email' />
            </div>

            <div className='flex flex-col mb-4'>
              <label htmlFor="password">Senha</label>
              <input type="password" name='password' value={password} onChange={({target})=>setPassword(target.value)} className='border pl-2 text-gray-500 bg-neutral-100 py-3 rounded-md' placeholder='Digite sua senha' />
            </div>
            

        <button type='submit' className='bg-[#613387] w-full py-3 mt-2 mb-4 text-white rounded-md' >Entrar</button>
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

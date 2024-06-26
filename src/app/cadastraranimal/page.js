'use client'
import { UserContext } from '@/components/UserProvider'
import React, { useContext, useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { z } from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"
import { redirect, useRouter } from 'next/navigation'
import useLoading from '@/hooks/useLoading'
import axios from 'axios'
import BuscarToken from '@/components/Buscartoken'



const createAnimalSchema= z.object({
    name:z.string().min(1, "informe o nome do pet"),
    image:z.string().min(1, "informe o link da imagem do pet"),
    idade:z.string().min(1, "informe a idade do pet"),
    sexo:z.string().min(1, "escolha o sexo do pet"),
    categoria:z.string().min(1, "selecione a categoria"),
})

const page = () => {
    const router = useRouter();
const infos = useContext(UserContext)
const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createAnimalSchema)
  });

const [cadastrando,setCadastrando]=React.useState(false)
const {loading,Loading,showLoading,hideLoading}=useLoading()
const [animalCadstrado,setAnimalCadastrado]=useState(false)




React.useEffect(()=>{
    const dadosExist = localStorage.getItem("dadosUser")
    if(dadosExist.length > 0){
        infos.setDados(JSON.parse(dadosExist))
    }
},[])


const cadastrarPet = async (data) => {

  const {token,id}=BuscarToken()

    const novoPet = {
      name: data.name,
      image: data.image,
      idade: data.idade,
      categoria: data.categoria,
      userRef: id
    };


    try {

      setCadastrando(true)
      showLoading()
      const dados = await axios.post("https://animaisback2.vercel.app/pets", novoPet, {
        
        headers:{
          "Authorization":`Bearer ${token}`
        },
      })
      hideLoading()
      if(dados.data.status===201){
      setAnimalCadastrado(true)
      }
    
    }

       catch (error) {
        console.error('Erro ao enviar requisição:', error);
      }
    
  };

  useEffect(()=>{
    if(animalCadstrado){
      redirect("/dashboard")
    }
  },[animalCadstrado])


  return (
    <div className='bg-neutral-100 h-screen flex justify-center items-start'>
      <div className='w-full max-w-md mt-10 bg-white rounded-md shadow-sm p-4'>
        <h1 className='text-center py-10 text-xl'>Cadastrando um pet</h1>
        <form onSubmit={handleSubmit(cadastrarPet)}>
          <div className='flex flex-col gap-1 mb-4'>
            <label htmlFor="name">Nome</label>
            <input {...register("name")} type="text" id='name' className='py-3 px-2 rounded-md bg-neutral-100' placeholder='Digite o nome do pet' />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>

          <div className='flex flex-col gap-1 mb-4'>
            <label htmlFor="image">Imagem</label>
            <input {...register("image")} type="text" id='image' className='py-3 px-2 rounded-md bg-neutral-100' placeholder='Link da foto do seu pet' />
            {errors.image && <span className="text-red-500">{errors.image.message}</span>}
          </div>

          <div className='flex flex-col gap-1 mb-4'>
            <label htmlFor="idade">Idade</label>
            <input {...register("idade")} type="text" id='idade' className='py-3 px-2 rounded-md bg-neutral-100' placeholder='Digite a idade do pet' />
            {errors.idade && <span className="text-red-500">{errors.idade.message}</span>}
          </div>

          <div className='flex flex-col gap-1 mb-4'>
            <label htmlFor="sexo">Sexo</label>
            <select {...register("sexo")} id='sexo' className='py-3 px-2 rounded-md bg-neutral-100'>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
            {errors.sexo && <span className="text-red-500">{errors.sexo.message}</span>}
          </div>

          <div className='flex flex-col gap-1 mb-4'>
            <label htmlFor="categoria">Categoria</label>
            <select {...register("categoria")} id='categoria' className='py-3 px-2 rounded-md bg-neutral-100'>
              <option value="gato">Gato</option>
              <option value="Cachorro">Cachorro</option>
            </select>
            {errors.categoria && <span className="text-red-500">{errors.categoria.message}</span>}
          </div>

          <div className='flex items-center gap-4 mt-4'>
            <button className='px-8 py-3 rounded-md bg-[#613387] text-white' disabled={cadastrando}>Cadastrar pet</button>
            <a href="/dashboard" className='px-8 py-3 rounded-md border shadow-md'>Voltar</a>
          </div>
        </form>

      </div>
      {loading && <Loading />}
    </div>
  )
}

export default page

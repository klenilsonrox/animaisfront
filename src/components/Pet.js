import React, { useEffect, useState } from 'react'
import { UserContext } from './UserProvider'
import axios from "axios"

const Pet = ({item,verPet, ...props}) => {
const infos =React.useContext(UserContext)
const [dono,setDono]=useState([])


axios.interceptors.request.use(
  (config) => {
    const token = infos.dados.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

useEffect(()=>{

async function getDono(){
  const proprietario = await axios.get(`https://animaisback.onrender.com/users/${item.userRef}`)
 setDono(proprietario.data.name)
}

getDono()

},[])





  return (
    <div className='border flex flex-col lg:flex-col  gap-2 cursor-pointer rounded-md overflow-hidden bg-white text-gray-500  mb-4 h-full' {...props} onClick={()=>verPet(item)} >
          <img src={item.image} alt="" className=' min-h-[200px] w-full  lg:w-full object-cover lg:max-w-full h-full lg:max-h-[200px]  transition-all hover:scale-105'   />
          <div className='p-2'>
          <h1>Nome: {item.name}</h1>
          <p>idade: {item.idade} </p>
          <p>Publicado por: {dono} </p>
          <button className='bg-[#613387] py-2 px-8 mt-2 rounded-md text-white'>Ver mais...</button>
          </div>
        </div>
  )
}

export default Pet

'use client'
import Header from '@/components/Header'
import React, { useState } from 'react'
import axios from "axios"
import { UserContext } from '@/components/UserProvider'
import Iinput from '@/components/Iinput'
import { redirect } from 'next/navigation'
import Sombra from '@/components/Sombra'
import Loading from '@/components/Loading'
import buscarToken from '@/utils/buscarToken'
import useLoading from '@/hooks/useLoading'
import getMyPets from '../actions/GetMyPets'



const page = () => {
  const infos=React.useContext(UserContext)
  const [dados,setDados]=useState([])
  const [modalEditPet,setOpenModalEditPet]=useState(false)
  const [name,setName]=useState("")
  const [image,setImage]=useState("")
  const [idade,setIdade]=useState("")
  const [idPet,setId]=useState("")
  const [categoria,setCategoria]=useState("")

const [deleteItem,setDeleteItem]=React.useState(false)
const [petDelete,setPetDelete]=React.useState("")
const [itemupdate,setItemUpadate]=useState("")
const [isOk,setIsOk]=useState(false)
const {showLoading,hideLoading,loading}= useLoading()

async function editarPet(item){
  setId(item._id)
  setOpenModalEditPet(true)
  setName(item.name)
  setIdade(item.idade)
  setImage(item.image)
  setCategoria(item.categoria)
  setItemUpadate(item)
}

console.log(showLoading)

function closeModalDeleteItem(){
  setDeleteItem(false)
}



async function atualizarPet(e){
  e.preventDefault()
  showLoading()
 const {token,id}= JSON.parse(localStorage.getItem("dadosUser"))
 if(token){
  try{
    const pet = {name,idade,image,categoria}
  await axios.put(`https://animaisback2.vercel.app/pets/${itemupdate._id}`, pet ,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res)=>{
  if(res.status===200){
    buscarMeusPets(id)
    setOpenModalEditPet(false)
    hideLoading()
  }
  })
  }catch(error){
    console.log(error)
  }
 }

} 


async function deletarPet(e){
  e.preventDefault()
  showLoading()
  const {token,id} = JSON.parse(localStorage.getItem("dadosUser"))
 try{
  if(token){
    await axios.delete(`https://animaisback2.vercel.app/pets/${petDelete._id}` ,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res=>{
      if(res.status===200){
        buscarMeusPets(id)
        hideLoading()
      }
    })
  }
  setDeleteItem(false)
 }catch(error){
  console.log(error)
 }

} 


function openModalDeleteItem(item){
  setDeleteItem(true)
  setPetDelete(item)
  setId(item._id)

}


async function buscarMeusPets(id){
    try{
      const myPets = await getMyPets(id)
      setDados(myPets)
    }catch(error){
      console.log(error)
    }
}


    React.useEffect(()=>{
      const {token,id} = JSON.parse(localStorage.getItem("dadosUser"))
      if(token!==undefined && id!==undefined){
        buscarMeusPets(id)
        }  else if(isOk){
          return redirect("/dashboard")
        }else{
          return redirect("/login")
        }
         
      
     },[])

     const handleChange = (event) => {
      event.preventDefault()
      setCategoria(event.target.value); 
    };


  return (
    <div className='min-h-screen'>
        <Header />
          <div className='max-w-7xl mx-auto p-4 lg:p-0 '>
          {dados.length > 1 && <h1 className='text-[#613387] text-xl font-semibold mt-4'>Meus Pets Cadastrados</h1>}
          </div>
    <div  className='max-w-7xl mx-auto gap-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  p-4 lg:p-0 my-4'>
      {dados.length > 0 && dados && dados.map(item=> (
          <div className='border flex flex-col   gap-2 cursor-pointer rounded-md overflow-hidden bg-white' key={item._id} >
          <img src={item.image} alt="" className='w-full  object-cover h-full max-h-[280px] transition-all hover:scale-105'   />
          <div className='p-2'>
          <h1>Nome: {item.name}</h1>
          <p>idade: {item.idade} </p>
          </div>
          <div className='flex gap-3 p-2'>
            <button className='bg-green-600 py-2 px-6 rounded-md text-white' onClick={()=>editarPet(item)}>editar pet</button>
            <button className='bg-red-600 py-2 px-6 rounded-md text-white' onClick={()=>openModalDeleteItem(item)}>deletar</button>
          </div>
        </div>
      ) )}

      {!dados && <div className='w-screen h-screen fixed right-0 left-0  bottom-0 z-50 bg-[#faf3f3] flex flex-col justify-center items-center'>
        <div className='bg-white h-[90px] w-full absolute top-0'>
        </div>
        <div  className='w-screen max-w-6xl flex items-center lg:flex-grow flex-col lg:flex-row justify-center gap-4  py-10 absolute top-[100px]'>
       <Sombra />
       <Sombra />
       <Sombra />
       <Sombra />
       </div>
       </div> }

      {dados.length < 1 && <div className='fixed inset-0 w-scren-h-screen flex items-center flex-col justify-center  bg-white'>
        <h1 className='mb-4'>Você nao tem nenhum pet Cadastrado!</h1>
        <img src="https://img.freepik.com/vetores-premium/desenho-de-menina-triste-em-fundo-branco_70172-2009.jpg" alt="" className='max-w-[100px]' />
        <a href="/cadastraranimal" className='rounded-md px-8 py-3 mt-4 bg-[#613387] text-white'>Cadastrar um pet</a>
      </div>}

      {loading &&  <Loading />}

            {/* inicio modal editar pet */}
            { modalEditPet && <div className=' w-full h-full fixed bg-black backdrop-blur-sm bg-opacity-35 inset-0 flex justify-center items-start p-4'>
      <div className='w-full max-w-md mt-10 bg-white rounded-md shadow-sm p-4'>
        <h1 className='text-center py-10 text-xl'>Editando o Pet</h1>
        <form>
          <Iinput id={name} label="Name" valor={name} setState={setName} placeholder="Nome do pet"/>
          <Iinput id={image} label="Image" valor={image} setState={setImage} placeholder="link da foto do pet"/>
          <Iinput id={idade} label="Idade" valor={idade} setState={setIdade} placeholder="exe: 2 anos"/>
          

          <div className='flex flex-col gap-1 mb-4'>
      <label htmlFor="categoria">Categoria</label>
      <select id='categoria' className='py-3 px-2 rounded-md bg-neutral-100' value={categoria} onChange={handleChange} required>
        <option value="gato">Gato</option>
        <option value="Cachorro">Cachorro</option>
      </select>
    </div>



          <div className='flex items-center gap-4 mt-4'>
          <button className='px-8 py-3 rounded-md bg-green-600 text-white' onClick={atualizarPet}><a href="/dashboard">Atualizar pet</a></button>
           <button className='px-8 py-3 bg-red-600 text-white rounded-md border shadow-md' onClick={closeModalDeleteItem}>Cancelar</button>
          </div>
        </form>
      </div>
      
    </div>}

    </div>

     {/* inicio modal confirm delete */}
     {deleteItem && <div className='flex w-full fixed inset-0 items-center justify-center bg-black backdrop-blur-sm bg-opacity-35 '>
      <div className='bg-white w-full max-w-sm rounded-md p-4 z-50'>
<p className='text-center py-2 text-gray-500 text-xl'>Tem certeza que deseja deletar o pet {petDelete.name}</p>
<div className='flex gap-2 items-center justify-center w-full mt-2'>
  <a href="/dashboard"><button className='bg-green-600 px-6 py-2 rounded-md text-white' onClick={deletarPet}>Deletar</button></a>
 
  <button className='bg-red-600 px-6 py-2 rounded-md text-white' onClick={()=>setDeleteItem(false)}>cancelar</button>
</div>
      </div>
    </div>}
    {/* final modal confirm delete */}
      
    </div>
  )
}

export default page

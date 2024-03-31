'use client'
import axios from "axios"
import Header from '@/components/Header'
import { UserContext } from '@/components/UserProvider'
import React, { useState } from 'react'
import Pet from "@/components/Pet"
import ModalPet from "@/components/ModalPet"
import Loading from "@/components/Loading"
import Footer from "@/components/Footer"
import useLoading from "@/hooks/useLoading"

const page = () => {
  const infos =React.useContext(UserContext)
  const [dados,setDados]=useState([]) 
  const [modalPet,setOpenModalPet]=useState(false)
  const [pet,setPet]=React.useState("")
  const {showLoading,hideLoading,loading}= useLoading()
  const [isOpen, setIsOpen] = useState(false);
 


  async function verPet(pet){
    showLoading()
    setOpenModalPet(true)
    let petTomodal = await axios.get(`https://animaisback.onrender.com/pets/findone/${pet._id}`)
    setPet(petTomodal.data)
    hideLoading()
  }

  async function buscarPets() {
    showLoading()
    try {
     await axios.get(`https://animaisback.onrender.com/pets`).then(res=>{
      setDados(res.data)
      hideLoading()
     })
      
    } catch (error) {
      console.error(error);
    }finally{
      hideLoading()
    }
  }

  React.useEffect(()=>{
    buscarPets()
  },[])

  

  function closeModal(e){
    if(e.target.id==="modalPet"){
      setOpenModalPet(false)
    }
  }

  async function renderPet(e){
    if(e.target.id==="todos"){
      await axios.get(`https://animaisback.onrender.com/pets`).then(res=>(
     setDados(res.data)
      ))
    } else{
      showLoading()
      await axios.get(`https://animaisback.onrender.com/pets`).then(res=>{
        setDados(res.data.filter(it=>it.categoria===e.target.id))
        hideLoading()
      })
    }

  }

  function removeAtivo(e){
    let allCateg = [...document.querySelectorAll(".categ")]
    allCateg.forEach(item=>{
      item.classList.remove("ativo")
    })
    e.target.classList.add("ativo")
  }



  return ( 
    <div className="min-h-screen">

      {loading && <Loading />}
    
    <Header />
    <div className="max-w-7xl w-full mx-auto lg:px-0 mt-4 px-4">
      <img src="/images/bannerg.png" alt="banner dog" className="rounded-md mb-5 w-full max-w-7xl" />
    
      <div className="max-w-7xl mx-auto lg:px-0 flex gap-4 mb-4">
        <button className="flex-1 bg-[#613387] lg:py-4 py-2 rounded-md text-white text-xl">Quero adotar</button>
        <button className="flex-1 text-[#613387] lg:py-4 py-2 rounded-md border border-[#613387] font-semibold" ><a href="/dashboard">Quero divulgar</a></button>
      </div>
    <div className="  top-[110px] overflow-x-scroll lg:overflow-x-auto max-w-sm flex py-2 rounded-md gap-2 " onClick={removeAtivo}>
      <button className="text-xl font-bold text-[#613387] bg-white py-2 px-8 rounded-md hover:bg-[#613387] hover:text-white transition-all ativo categ" id="todos"  onClick={renderPet}>todos</button>
      <button className="text-xl font-bold text-[#613387] bg-white py-2 px-8 rounded-md hover:bg-[#613387] hover:text-white transition-all categ" id="gato" onClick={renderPet}>Gatos</button>
      <button className="text-xl font-bold text-[#613387] bg-white py-2 px-8 rounded-md hover:bg-[#613387] hover:text-white transition-all categ" id="Cachorro" onClick={renderPet}>Cachorros</button>
    </div>
    </div>
    <div  className='max-w-7xl mx-auto gap-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[17px] p-4 lg:p-0 relative'>
    
      {dados && dados.map(item=> (

          <Pet item={item} verPet={verPet} key={item._id}/>
       
      ) )}

            {modalPet && <div className='flex fixed inset-0 bg-black items-center justify-center bg-opacity-35 backdrop-blur-sm p-4' id='modalPet' onClick={closeModal}>

             <ModalPet setState={setOpenModalPet} pet={pet} />

            </div>}
    </div>

          {/* inicio da div loading */}
         {dados.length < 1 &&   <Loading />}
         
          {/* final da div loading */}

          <Footer /> 

    </div>
  )
}

export default page

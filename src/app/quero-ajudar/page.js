'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React, { useState } from 'react'

const page = () => {

    const [modalOpen,setModalOpen]=useState(false)

    function closeModal(e){
        if(e.target.id==="modal"){
            setModalOpen(false)
        }
    }

  return (
    <div className='min-h-screen bg-[#FFFFFF]'>
        <Header />
      <div className='w-full max-w-7xl mx-auto px-4 mt-6 text-center bg-[#FFFFFF]'>
        <h1 className='text-xl font-bold text-[#613387]'>Sua ajuda é muito importante para que a gente possa mantar os nosso animaizinhos</h1>
        <button className=' mt-4 bg-[#613387] px-8 py-3 rounded-md text-white' onClick={()=>setModalOpen(true)}>Quero ajudar agora</button>
        <img src="/images/cachorro.jpg" alt="" className='mx-auto w-full max-w-[800px] mt-10'/>
      </div>
      {modalOpen && <div className='flex items-center justify-center fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm px-4 ' id='modal' onClick={closeModal}>
        <div className='bg-white w-full rounded-md text-center relative break-words max-w-md animarModal'>
            <button className='absolute right-0 top-[-29px] text-red-600 font-bold text-xl' onClick={()=>setModalOpen(false)}>X</button>
            <h1 className='text-[#613387] text-xl'>Abaixo está a nossa chave pix, doe o que o seu coração mandar!</h1>
            <button className='bg-[#613387] py-2  px-8 text-white rounded-md my-4'>031-9-9999-9999</button>
        </div>
      </div>}

      <Footer />

    </div>
  )
}

export default page

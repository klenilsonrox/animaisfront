import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='bg-[#613387]  text-white w-full flex mt-6'>
      <div className='max-w-7xl lg:p-0 lg:mx-auto'>

        <div className='max-w-7xl px-4 w-screen grid justify-between  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 pt-6'>
          
          <div>
            <h1 className='font-bold uppercase'>Adote</h1>
            <p>Adote com responsabilidade</p>
            <p>Pesquisar animais</p>
          </div>

          <div>
            <h1 className='font-bold uppercase'>Colabore</h1>
            <p>Doe qualquer valor</p>
            <p>Seja uma empresa parceira</p>
          </div>

          <div>
            <h1 className='font-bold uppercase'>Divulgue um animal</h1>
            <p>Cadastrar um animal</p>
          </div>

          <div>
            <h1 className='font-bold uppercase'>sobre o adote um pet</h1>
            <p>Sobre o adote um pet</p>
            <p>Perguntas frequentes</p>
            <p>termos de uso e política de privacidade</p>
          </div>

          
        </div>

        <div className='max-w-[300px] grid grid-cols-4  mx-auto  my-4'>
    <FaInstagram className='text-4xl'/>
    <FaFacebook className='text-4xl'/>
    <FaYoutube className='text-4xl'/>
    <FaTwitter className='text-4xl'/>
        </div>

        <a href="/"><img src="/images/doguinho.webp" alt="logo marca" className='max-w-[90px] mx-auto py-2' /></a>
        <p className='text-center py-6'>Todos os direitos reservados</p>

      </div>
    </footer>
  )
}

export default Footer

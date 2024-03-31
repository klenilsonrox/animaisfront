import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

const page = () => {
  return (
    <div>
        <Header />
        <div className='h-screen w-screen mx-auto max-w-7xl p-4'>
        <h1 className='text-xl font-bold text-[#613387]'>Sobre o adote um Pet</h1>
        <p className='py-4'>O Adote um pet está começando agora e precisa da sua ajuda para a divulgação.</p>
        <p><strong>A gente acredita que todo animal de rua merece um lar.</strong> Por isso, nosso trabalho é conectar os animais que estão em abrigos com pessoas que estejam procurando por um doguinho ou gatinho pra chamar de seu.</p>
        <ul className='my-4 flex flex-col gap-2'>
            <li>
                <h1 className='font-bold'>Como funciona?</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat quas quidem dolorum culpa ea, possimus ad iste nihil facilis omnis rerum modi hic sed deleniti porro ab corrupti cupiditate sapiente!</p>
            </li>
            <li>
                <h1 className='font-bold'>Quer divulgar um cão ou gato para adoção?</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat quas quidem dolorum culpa ea, possimus ad iste nihil facilis omnis rerum modi hic sed deleniti porro ab corrupti cupiditate sapiente!</p>
            </li>
            <li>
                <h1 className='font-bold'>E que tal adotar um amigo?</h1>
                <p><a href="/" className='text-blue-600 underline'>Clique aqui</a> para conhecer os cães e gatos que estão esperando um lar. Mas antes, leia nossas dicas sobre adoção e veja se você está pronto para receber o novo membro da família!</p>
            </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default page

'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const [dados, setDados] = React.useState(false)
    const [modal, setOpenModal] = useState(false)
    const [menu,setOpenMenu]=useState(false)

    function logout() {
        localStorage.setItem("infos", "")
    }

    useEffect(()=>{
        if(menu){
            document.querySelector("body").style.overflow="hidden"
        } else{
            document.querySelector("body").style.overflow="auto"
        }
        const dadosExist = window.localStorage.getItem("infos")||[]
        if(dadosExist && dadosExist.length > 0){
            setDados("true")
        } else{
            localStorage.setItem("infos" ,[])
        }
    },[menu])

    function close(e){
        if(e.target.id==="adotar" || e.target.id==="quemsomos"){
            setOpenMenu(false)
        }
    }





    return (
        <header className={ `text-[#613387] font-bold  border-b shadow-sm flex w-full bg-white relative py-6 `}>
            <div className='flex fixed z-50 lg:hidden right-2 top-1 border-b'>
            <button className=' bg-white flex items-center gap-2 lg:hidden absolute right-0 border-2 px-2 rounded-md  py-2' onClick={()=>setOpenMenu(menu=>!menu)}>Menu<span className={`hamb ${menu ? "active":""}`}></span></button>
            </div>
            <nav className={`w-full max-w-7xl mx-auto flex lg:justify-between items-center  right-0 left-0 relative flex-col lg:flex-row overflow-hidden pt-2 ${menu ? "h-screen":"h-0"} transition-all top-[92px] lg:h-auto lg:static  lg:top-0 lg:border-none`}>
            
                <div className='w-full flex'>
                    <ul className={ `flex w-full  max-w-lg flex-col items-center lg:flex-row `}>
                        <li className='hover:bg-[#613387] px-4 hover:text-white hover:rounded-md transition-all lg:py-2'><Link href="/" id='quemsomos' onClick={close}>Inicio</Link></li>
                        <li className='hover:bg-[#613387] px-4 hover:text-white hover:rounded-md transition-all lg:py-2'><Link href="/quemsomos" id='quemsomos' onClick={close}>Quem somos</Link></li>
                        <li className='hover:bg-[#613387] px-4 hover:text-white hover:rounded-md transition-all lg:py-2'><Link href="/" onClick={close} id='adotar'>Quero adotar</Link></li>
                        <li className='hover:bg-[#613387] px-4 hover:text-white hover:rounded-md transition-all lg:py-2'><Link href="/quero-ajudar">Quero ajudar</Link></li>
                    </ul>
                </div>

                {!dados && <ul className='flex items-center gap-2 lg:mt-0 flex-col lg:flex-row w-full justify-end'>
                    <li className='px-4'><Link href="/login">Entrar</Link></li>
                    <li className='overflow-hidden py-2 rounded-md'><Link href="/registro" className='px-6 py-4 bg-[#613387] text-white rounded-md'>Cadastre-se</Link></li>
                </ul>}

                {dados.length > 1 && 
                <div className='w-full flex flex-col items-center lg:items-end mt-2 lg:mt-0 gap-2text-gray-500 '>

                    <div className='relative flex z-50  items-center gap-2' onClick={() => setOpenModal(modal => !modal)}>
                        <FaUserCircle className='text-[40px] cursor-pointer' />     
                    </div>

                    {modal && <div className='absolute top-[70px] p-4 border rounded-md flex flex-col items-start max-w-[300px] overflow-hidden bg-white z-50' id='modal'>
                        <button className='transition-all hover:bg-[#613387] w-full py-1 rounded-md px-2 hover:text-white'><a href="/cadastraranimal">Cadastrar novo animal</a></button>
                        <button className='transition-all hover:bg-[#613387] w-full py-1 rounded-md px-2 hover:text-white'><a href="/dashboard">Meus pets cadastrados</a></button>
                        <button className='transition-all hover:bg-[#613387] w-full py-1 rounded-md px-2 hover:text-white'><a href="/editar">Editar perfil</a></button>
                        <button className='transition-all hover:bg-[#613387] w-full py-1 rounded-md px-2 hover:text-white' onClick={logout}><a href="/">Sair</a></button>
                    </div>}
                     
                </div>}
               
            </nav>
        </header>
    )
}

export default Header

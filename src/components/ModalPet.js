import React from 'react'
import { UserContext } from './UserProvider'
import axios from 'axios'
import { FaWhatsapp } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { GiSittingDog } from "react-icons/gi";
import { FaBirthdayCake } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";




const ModalPet = ({pet,setState}) => {
    const infos = React.useContext(UserContext)
const [user,setUser]=React.useState("")

async function buscarUserById() {
    try {
      const{ token,id} =await JSON.parse(localStorage.getItem("infos"))
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

     await axios.get(`https://animaisback.onrender.com/users/${id}`, config).then(res=>(
        setUser(res.data)
      ))
      
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
    }
  }

  React.useEffect(()=>{
    buscarUserById()
  },[])



  return (
    <div className=' max-w-3xl w-full clear-start  rounded-md bg-white overflow-hidden flex flex-col gap-4 relative sm:flex-row z-50 animarModal'>
              <button className='absolute right-2 text-xl text-red-600' onClick={()=>setState((state)=>!state)}>X</button>
              <img src={pet.image} alt="" className='sm:max-w-[400px] sm:max-h-[300px] w-full md:max-w-[500px] md:max-h-[300px] object-cover'/>
              <div className='mt-4 p-2 flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>{pet.categoria==="gato" ? <FaCat className='text-2xl text-[#613387]'/> :<GiSittingDog className='text-2xl text-[#613387]' /> }<span>{pet.name}</span>  </div>
                <div className='flex items-center gap-2'><FaBirthdayCake className='text-2xl text-[#613387]'/> <span>{pet.idade}</span></div>
                <div className='flex gap-2'><FaLocationDot className='text-2xl text-[#613387]'/> <span>{user.cidade}</span></div>
                <div className='flex gap-3 bg-green-500 py-2 px-6 rounded-md text-white mt-4 w-full '><a href={`https://api.whatsapp.com/send?phone=${user.whatsapp}&text=ola,voce ja doou o ${pet.name}`} className='flex gap-2 items-center mx-auto'><FaWhatsapp className='text-2xl'/><span>Falar com o doador</span></a></div>
                <button className='text-xl mt-4' onClick={()=>setState((state)=>!state)}>← Voltar</button>
              </div>
             </div>
  )
}

export default ModalPet

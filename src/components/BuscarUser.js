export const BuscarUser =async (id)=>{
   try{
    await fetch(`https://animaisback.onrender.com/users/${id}`).then(res=>{
    return res.data
   })
   }catch(error){
    console.log(error)
   }
    
}
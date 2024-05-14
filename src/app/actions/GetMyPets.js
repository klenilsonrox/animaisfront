export default async function getMyPets(id){
    try{
        const response = await fetch("https://animaisback2.vercel.app/pets" ,{
            next:{
                revalidate:10
            }
        })
    const data = await response.json()
    return data.filter(it=>it.userRef===id)
    }catch(error){
        console.log(error)
    }
}
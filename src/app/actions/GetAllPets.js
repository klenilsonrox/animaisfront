export default async function getPets(){
    try{
        const response = await fetch("https://animaisback2.vercel.app/pets" ,{
            next:{
                revalidate:10
            }
        })
    const data = await response.json()
    return data
    }catch(error){
        console.log(error)
    }
}
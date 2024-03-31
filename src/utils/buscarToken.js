import { redirect } from "next/navigation"

export function buscarToken(){
    const infos = localStorage.getItem("infos")
    if(infos){
        const {token,id,name}=JSON.parse(infos)
        return {
            token,id,name
        }
    } else{
        return redirect("/registro")
    }

} 


export default buscarToken
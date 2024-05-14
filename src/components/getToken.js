export default function getTokenAndId(){
    const {token,id} = JSON.parse(localStorage.getItem("infos"))
  
        return {
            token,id
    
    }
}
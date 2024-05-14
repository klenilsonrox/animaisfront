export function salvarNoStorage(data){
    const dados = localStorage.setItem("infos", JSON.stringify(data))
    return dados
}
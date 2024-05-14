export default function BuscarToken(){
    const infos = JSON.parse(localStorage.getItem("dadosUser"))
    return infos
}
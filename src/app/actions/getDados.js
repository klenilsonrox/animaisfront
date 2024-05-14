'use server'


export async function getDadosLocal(){
    const jsonData = decodeURIComponent(cookies().get("userData"));
    const userData = JSON.parse(jsonData);
    return userData
}
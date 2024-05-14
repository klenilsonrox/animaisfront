export default async function getOnePet(id) {
    try {
        const response = await fetch(`https://animaisback2.vercel.app/pets/findone/${id}`, {
            next: {
                revalidate: 10
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
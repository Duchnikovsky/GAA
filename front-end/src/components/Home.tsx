import { useEffect } from 'react'

export default function Home(){

    useEffect(()=>{
        console.log("chuj")
    },[])

    return(
        <div>
            Home
        </div>
    )
}
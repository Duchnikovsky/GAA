import { useEffect } from "react"

export default function Auth(){

    useEffect(()=>{
        console.log("auth")
    },[])

    return(
        <div>
            Auth
        </div>
    )
}
import Headers from "../../components/headers/headers"
import Navbar from "../../components/navbar/navbar"
import { useEffect, useState } from 'react';
import { getUsers } from "../../request/request";
import { useNavigate } from 'react-router-dom'
import Dashboard from "../../components/dashboard/dashboard";


export default function Home() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
  
    const [user, setuser] = useState("loading");
    const [navbar,setnavbar] = useState(true)

    useEffect(() => {
        const answer = getUsers(token);
        answer.then((ref) => { setuser(ref.data[0][0]) });
        answer.catch((ref) => {
            if (ref.response.status === 404) {
                navigate('/signin')
            }
        })
    }, [])


    return (
        <>
        <Headers user={user} setnavbar={setnavbar} navbar={navbar} />
           {navbar===true?<Navbar user={user} />:<></>} 
           <Dashboard navbar={navbar}/>
           
        </>
    )
}
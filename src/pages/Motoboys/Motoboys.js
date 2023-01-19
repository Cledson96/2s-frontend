import Headers from "../../components/headers/headers"
import Navbar from "../../components/navbar/navbar"
import { useEffect, useState } from 'react';
import { getUsers, getMotoboys } from "../../request/request";
import { useNavigate } from 'react-router-dom'
import { Table } from "./table";



export default function Motoboys() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [navbar, setnavbar] = useState(true);
    const [user, setuser] = useState("loading");
    const [motoboys, setmotoboys] = useState([]);

    useEffect(() => {
        const answer = getUsers(token);
        answer.then((ref) => { setuser(ref.data[0][0]) });
        answer.catch((ref) => {
            if (ref.response.status === 404) {
                navigate('/signin')
            }
        })
    }, [])

    useEffect(() => {
        const answer = getMotoboys(token);
        answer.then((ref) => { setmotoboys(ref.data) });
        answer.catch((ref) => {
            if (ref.response.status === 404) {
                console.log(ref)
            }
        })
    }, [])

    return (

        <>
            <Headers user={user} setnavbar={setnavbar} navbar={navbar} />
            {navbar === true ? <Navbar user={user} /> : <></>}
            {motoboys.length > 0 ? <Table motoboys={motoboys}></Table> : <></>}
        </>



    )
}
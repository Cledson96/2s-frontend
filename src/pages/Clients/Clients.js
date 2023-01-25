import Headers from "../../components/headers/headers"
import Navbar from "../../components/navbar/navbar"
import { useEffect, useState } from 'react';
import { getUsers, getClients } from "../../request/request";
import { useNavigate } from 'react-router-dom'

import MUIDataTable from "mui-datatables";


export default function Clients() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [navbar, setnavbar] = useState(true);
    const [user, setuser] = useState("loading");
    const [clients, setclients] = useState([]);

    const columns = ["ID", "Nome", "Telefone", "Telefone de contato", "Email"];

    const options = {
        filterType: 'checkbox',
    };

    useEffect(() => {
        const answer = getUsers(token);
        answer.then((ref) => { setuser(ref.data[0][0])});
        answer.catch((ref) => {
            if (ref.response.status === 404) {
                navigate('/signin')
            }
        })
    }, [])

    useEffect(() => {
        const answer = getClients(token);
        answer.then((ref) => {
            setclients(ref.data.map((ref) => {
                return [ref.id, ref.name, ref.phone, ref.phonecontact, ref.email]
            }))
        });
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
            <div class="content-wrapper">
            <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1>Lista de clientes</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active">clientes</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <MUIDataTable
                    title={"Clientes"}
                    data={clients}
                    columns={columns}
                    options={options}
                />
            </div>
        </>



    )
}
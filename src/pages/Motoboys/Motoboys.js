import Headers from "../../components/headers/headers"
import Navbar from "../../components/navbar/navbar"
import { useEffect, useState } from 'react';
import { getUsers, getMotoboys } from "../../request/request";
import { useNavigate } from 'react-router-dom'

import MUIDataTable from "mui-datatables";


export default function Motoboys() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [navbar, setnavbar] = useState(true);
    const [user, setuser] = useState("loading");
    const [motoboys, setmotoboys] = useState([]);

    const columns = ["ID", "Nome", "Telefone", "Telefone de contato", "Utilitario"];

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
        const answer = getMotoboys(token);
        answer.then((ref) => {
            setmotoboys(ref.data.map((ref) => {
                return [ref.id, ref.name, ref.phone, ref.phonecontact, ref.utility]
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
            <div className="content-wrapper">
            <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Lista de motoboys</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Motoboys</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <MUIDataTable
                    title={"Motoboys"}
                    data={motoboys}
                    columns={columns}
                    options={options}
                />
            </div>
        </>



    )
}
import Headers from "../../components/headers/headers"
import Navbar from "../../components/navbar/navbar"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getUsers, getMotoboys, postOrders, getClients, getOrders_filter } from "../../request/request";
import { Error } from "../../components/modal/modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MUIDataTable from "mui-datatables";
import moment from "moment";

export default function Orders() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [user, setuser] = useState("loading");
    const [navbar, setnavbar] = useState(true);
    const [data, setdata] = useState({ observation: " ", image: " ", qtd: 1 });
    const [motoboys, setmotoboys] = useState([]);
    const [dataerror, setdataerror] = useState({});
    const [error, seterror] = useState(false);
    const [clients, setclients] = useState([]);
    const [orders, setorders] = useState([])
    const [refresh, setrefresh] = useState(true)
    const [startDate, setStartDate] = useState(new Date());
    const [QTD_orders, setQTD_orders] = useState(0);
    const [usersid, setusersid] = useState();

    const columns = ["ID", "Numero pedido", "Cliente", "QTD", "Imagem", "Data", "Situação"];

    const options = {
        filterType: 'checkbox',
        selectableRows: 'none',
        customRowRender: (data, rowIndex) => {
            return (
                <tr key={rowIndex} >
                    {data.map((prop, index) => {
                        return <td className="my-custom-row-class" key={index}>{prop}</td>;
                    })}
                </tr>
            );
        }
    };

    let dataformat = ((startDate?.getDate()) + "/" + ((startDate?.getMonth() + 1)) + "/" + startDate?.getFullYear());

    useEffect(() => {
        const answer = getUsers(token);
        answer.then((ref) => {
            setusersid(ref.data[0][0].id);
            setuser(ref.data[0][0]); setdata({
                ...data,
                usersid: ref.data[0][0].id,
            });
        });
        answer.catch((ref) => {
            if (ref.response.status === 404) {
                navigate('/signin')
            }
        })
    }, [])


    function handleForm({ value, name }) {

        setdata({
            ...data,
            [name]: value,
        });
    };

    function sendOrders() {
        const send = {
            ...data,
            usersid,
            situation: "ok",
            datecreated: new Date(),
            dateexit: startDate
        };

        const post = postOrders(send, token)
        post.then(() => {

            setdata({
                ...data,
                usersid,
                situation: "ok",
                number: "",
                qtd: 1,
                observation: " ",
                image: " "

            }); setrefresh(!refresh)
        });
        post.catch((ref) => {
            console.log(ref); if (ref.response.data === "pedido já cadastrado!") { setdataerror(ref.response.data); seterror(true) } else {
                let err = ref.response.data.details.map((refe) => {
                    return (
                        refe.context.label + " é obrigatorio!"
                    )
                }); setdataerror(err); seterror(true)
            };
        })
    }

    useEffect(() => {

        const data_send = startDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        const body = {
            id: data.motoboysid || 0,
            date: data_send,
            dateNext: moment(startDate).add(1, 'days').format('MM-DD-YYYY')
        }

        const answer = getOrders_filter(body, token);
        answer.then((ref) => {
            console.log(ref.data)
            setQTD_orders(ref.data.length || 0)
            setorders(ref.data.map((ref) => {
                return [ref.id, ref.number, ref.name, ref.qtd, <a href={ref.image} target="_blank" >Abrir</a>, moment(ref.data).format('DD-MM-YYYY'), ref.situation]

            }))
        });
        answer.catch((ref) => {
            if (ref.response.status === 404) {
                navigate('/signin')
            }
        })
    }, [startDate, data.motoboysid, refresh])


    useEffect(() => {
        const answer = getMotoboys(token);
        answer.then((ref) => {
            setmotoboys(ref.data)

        });
        answer.catch((ref) => {
            if (ref.response.status === 404) {

            }
        })
    }, [])

    useEffect(() => {
        const answer = getClients(token);
        answer.then((ref) => {
            setclients(ref.data)

        });
        answer.catch((ref) => {
            if (ref.response.status === 404) {

            }
        })
    }, [])

    return (
        <>
            {error === true ? <Error seterror={seterror} dataerror={dataerror}></Error> : <></>}
            <Headers user={user} setnavbar={setnavbar} navbar={navbar} />
            {navbar === true ? <Navbar user={user} /> : <></>}
            <div class="content-wrapper">

                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1>Entrada de pedidos</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active">Entrada pedidos</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="content" style={{ marginLeft: "40px", minHeight: "100vh" }}>
                    <div class="row" style={{ minWidth: "100%", justifyContent: "normal" }}>
                        <div class="row" style={{ width: "45%", marginRight: "10px" }} >
                            <div class="col-md-6" style={{ minWidth: "100%" }}>
                                <div class="card card-secondary " >
                                    <div class="card-header">
                                        <h3 class="card-title">Entrada de pedidos</h3>

                                        <div class="card-tools">

                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div className="row" >
                                            <div class="form-group" style={{ minWidth: "70px", marginRight: "35px" }}>
                                                <label for="inputStatus">Motoboy</label>
                                                <select name="motoboysid" id="inputStatus" class="form-control custom-select" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}>
                                                    <option selected disabled>Selecione</option>
                                                    {motoboys ? motoboys.map((ref, index) => {
                                                        return <option value={ref.id} key={index} >{ref.name}</option>
                                                    }) : <></>}
                                                </select>
                                            </div>
                                            <div class="form-group" style={{ minWidth: "100px", marginRight: "35px" }}>
                                                <label for="inputStatus">Cliente</label>
                                                <select name="clientid" id="inputStatus" class="form-control custom-select" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}>
                                                    <option selected disabled>Selecione</option>
                                                    {clients ? clients.map((ref, index) => {
                                                        return <option value={ref.id} key={index}>{ref.name}</option>
                                                    }) : <></>}
                                                </select>
                                            </div>
                                            <div class="form-group" style={{ width: "150px" }}>
                                                <label for="inputName">Data</label>
                                                <span class="form-control" className='selectionDate'><DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => { setStartDate(date) }}
                                                    className="form-control"
                                                    id="dateselect"
                                                    placeholderText={dataformat} />
                                                </span>

                                            </div>
                                        </div>


                                        <div className="row">
                                            <div class="form-group" style={{ width: "70%" }}>
                                                <label for="inputName">Imagem pedido(s)</label>
                                                <input name="image" type="text" id="inputName" class="form-control" value={data.image ? data.image : ""} onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                            </div>
                                            <div class="form-group" style={{ marginLeft: "5%", width: "20%" }}>
                                                <label for="inputName">Quantidade</label>
                                                <input name="qtd" value={data.qtd ? data.qtd : ""} type="text" id="inputName" class="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                            </div>
                                        </div>
                                        <div class="form-group" style={{ width: "90%" }}>
                                            <label for="inputProjectLeader">Observação</label>
                                            <input name="observation" type="text" id="inputProjectLeader" class="form-control" value={data.observation ? data.observation : ""} onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>

                                        <div class="form-group" style={{ width: "90%" }}>
                                            <label for="inputProjectLeader">Numero pedido</label>
                                            <input name="number" type="text" id="inputProjectLeader" class="form-control" value={data.number ? data.number : ""} onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <input onClick={() => {

                                                    sendOrders()
                                                }} type="submit" value="Cadastrar pedido" class="btn btn-success float-right" />
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div class="row" style={{ width: "50%" }}>
                            <div class="col-md-6" style={{ minWidth: "100%" }}>
                                <div class="card card-primary">
                                    <div class="card-header">
                                        <h3 class="card-title">Cadastro</h3>

                                        <div class="card-tools">

                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <MUIDataTable
                                            title={`${QTD_orders} Pedidos`}
                                            data={orders}
                                            columns={columns}
                                            options={options}
                                        />
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </section>


            </div>
        </>
    )

}
import Headers from "../../components/headers/headers"
import Navbar from "../../components/navbar/navbar"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getUsers, getMotoboys, getOrders_filter, getOrders_filter_order, order_out } from "../../request/request";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MUIDataTable from "mui-datatables";
import moment from "moment";

export default function Orders_day() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const dateNow = moment(new Date()).format('DD/MM/YYYY')

    const [user, setuser] = useState("loading");
    const [navbar, setnavbar] = useState(true);
    const [data, setdata] = useState({});
    const [motoboys, setmotoboys] = useState([]);
    const [orders, setorders] = useState([])
    const [refresh, setrefresh] = useState(true)
    const [startDate, setStartDate] = useState(new Date());
    const [QTD_orders, setQTD_orders] = useState(0);
    const [QTD_out, setQTD_out] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);



    // const columns = ["ID", "Numero pedido", "Motoboy", "Cliente", "QTD", "Imagem", "Data", "Situação"];
    // const options = {
    //     customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
    //         <button onClick={() => out(selectedRows.data.map((ref) => displayData[ref.index].data[0]))} className="atualiza">Ausente</button>
    //     ),
    // };


    let dataformat = ((startDate?.getDate()) + "/" + ((startDate?.getMonth() + 1)) + "/" + startDate?.getFullYear());

    function handleForm({ value, name }) {

        setdata({
            ...data,
            [name]: value,
        });
    };


    function findOrders() {
        let env = data.number || "*"

        const post = getOrders_filter_order(token, env)
        post.then((ref) => {
            console.log(ref.data)
            setQTD_orders(ref.data.length || 0);
            setorders(ref.data.map((ref) => {

                return [ref.id, ref.number, ref.motoboy.substring(0, 10), ref.name, ref.qtd, <a href={ref.image} target="_blank" >Abrir</a>, moment(ref.dateexit).format('DD-MM-YYYY'), ref.situation]

            }))
        });
        post.catch((ref) => {
            alert("erro ao consultar seu pedido!")
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
            console.log(ref)
            setQTD_orders(ref.data.length || 0)
            setorders(ref.data.map((ref) => {

                return [ref.id, ref.number, ref.motoboy.substring(0, 10), ref.name, ref.qtd, <a href={ref.image} target="_blank" >Abrir</a>, moment(ref.data).format('DD-MM-YYYY'), ref.situation]

            }))
        });
        answer.catch((ref) => {
            if (ref.response.status === 404) {
                navigate('/signin')
            }
        })
    }, [startDate, data.motoboysid, refresh])

    useEffect(() => {
        const answer = getUsers(token);
        answer.then((ref) => {
            setuser(ref.data[0][0])
        });
        answer.catch((ref) => {
            if (ref.response.status === 404) {
                navigate('/signin')
            }
        })
    }, [])



    return (
        <>

            <Headers user={user} setnavbar={setnavbar} navbar={navbar} />
            {navbar === true ? <Navbar user={user} /> : <></>}
            <div class="content-wrapper">
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0">Painel Central  ({dateNow})</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active">Painel central</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="content" style={{ marginLeft: "40px", minHeight: "100vh" }}>
                    <div class="row" style={{ minWidth: "100%", justifyContent: "normal" }}>

                        <div class="row" style={{ width: "95%" }}>
                            <div class="col-md-6" style={{ minWidth: "100%" }}>
                                <div class="card card-primary">
                                    <div class="card-header">
                                        <h3 class="card-title">Pedidos</h3>

                                        <div class="card-tools">

                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div className="row" >
                                        <div class="form-group" style={{ width: "150px" }}>
                                                <label for="inputName">Data de consulta</label>
                                                <span class="form-control" className='selectionDate'><DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => { setStartDate(date) }}
                                                    className="form-control"
                                                    id="dateselect"
                                                    placeholderText={dataformat} />
                                                </span>

                                            </div>
                                        </div>
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
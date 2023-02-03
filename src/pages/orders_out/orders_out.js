import Headers from "../../components/headers/headers"
import Navbar from "../../components/navbar/navbar"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getUsers, getMotoboys, getOrders_filter, getOrders_filter_order, order_out } from "../../request/request";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MUIDataTable from "mui-datatables";
import moment from "moment";

export default function Orders_out() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [user, setuser] = useState("loading");
    const [navbar, setnavbar] = useState(true);
    const [data, setdata] = useState({});
    const [motoboys, setmotoboys] = useState([]);
    const [orders, setorders] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [QTD_orders, setQTD_orders] = useState(0);
    const [QTD_out, setQTD_out] = useState(0);

    const columns = ["ID", "Numero pedido", "Motoboy", "Cliente", "QTD", "Imagem", "Data", "Situação"];
    const options = {
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            <button onClick={() => out(selectedRows.data.map((ref) => displayData[ref.index].data[0]))} className="atualiza">Ausente</button>
        ),
    };

    function out(ids) {

        let atualization = order_out(token, ids)
        atualization.then((ref) => {
            findOrders();
            alert("ausente cadastrado com sucesso!")
        },
            atualization.catch((ref) => {
                console.log(ref)
            }))
    }
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
    }, [startDate, data.motoboysid])

    useEffect(() => {
        const answer = getUsers(token);
        answer.then((ref) => {
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



    return (
        <>

            <Headers user={user} setnavbar={setnavbar} navbar={navbar} />
            {navbar === true ? <Navbar user={user} /> : <></>}
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Entrada de ausentes</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Entrada ausentes</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content" style={{ marginLeft: "40px", minHeight: "100vh" }}>
                    <div className="row" style={{ minWidth: "100%", justifyContent: "normal" }}>
                        <div className="row" style={{ width: "30%", marginRight: "10px" }} >
                            <div className="col-md-6" style={{ minWidth: "100%" }}>
                                <div className="card card-secondary " >
                                    <div className="card-header">
                                        <h3 className="card-title">Entrada de ausentes</h3>

                                        <div className="card-tools">

                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row" >
                                            <div className="form-group" style={{ minWidth: "70px", marginRight: "35px" }}>
                                                <label htmlFor="inputStatus">Motoboy</label>
                                                <select name="motoboysid" id="inputStatus" className="form-control custom-select" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}>
                                                    <option >Selecione</option>
                                                    {motoboys ? motoboys.map((ref, index) => {
                                                        return <option value={ref.id} key={index} >{ref.name}</option>
                                                    }) : <></>}
                                                </select>
                                            </div>

                                            <div className="form-group" style={{ width: "150px" }}>
                                                <label htmlFor="inputName">Data</label>
                                                <span className='selectionDate'><DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => { setStartDate(date) }}
                                                    className="form-control"
                                                    id="dateselect"
                                                    placeholderText={dataformat} />
                                                </span>

                                            </div>
                                        </div>





                                        <div className="form-group" style={{ width: "90%" }}>
                                            <label htmlFor="inputProjectLeader">Numero pedido</label>
                                            <input name="number" type="text" id="inputProjectLeader" className="form-control" value={data.number ? data.number : ""} onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <input onClick={() => findOrders()} type="submit" value="pesquisar ausente" className="btn btn-warning float-right" />
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="row" style={{ width: "70%" }}>
                            <div className="col-md-6" style={{ minWidth: "100%" }}>
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Pedidos</h3>

                                        <div className="card-tools">

                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <MUIDataTable
                                            title={`${QTD_orders} Pedidos  // ${QTD_out}  ausentes   `}
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
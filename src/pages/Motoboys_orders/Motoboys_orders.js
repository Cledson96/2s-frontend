import Headers from "../../components/headers/headers"
import Navbar from "../../components/navbar/navbar"
import { useEffect, useState } from 'react';
import { getUsers, getMotoboys, getOrders_filter } from "../../request/request";
import { useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import pt from 'date-fns/locale/pt';
import moment from "moment";
import MUIDataTable from "mui-datatables";


export default function Motoboys_orders() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [data, setdata] = useState({});
    const [table, settable] = useState(true);
    const [table1, settable1] = useState(false);
    const [table2, settable2] = useState(false);
    const [user, setuser] = useState("loading");
    const [navbar, setnavbar] = useState(true)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [motoboys, setmotoboys] = useState([]);
    const [QTD_orders, setQTD_orders] = useState(0);
    const [orders, setorders] = useState([])
    const [qtdausentes, setqtdausentes] = useState(0);
    const [qtdclients, setqtdclients] = useState(0);
    const [motoboy, setmotoboy] = useState(0);
    const [orderstd, setorderstd] = useState(0)

    const columns = ["Cliente", "Qtd pedidos", "QTD ausentes", "pedidos liquido"];
    const columnsone = ["Cliente", "Numero pedido", "Qtd", "Situação", "Imagem", "Data"];
    const columnstwo = ["Cliente", "Qtd pedidos", "QTD ausentes", "pedidos liquido"];
    const options = {
        responsive: 'scrollMaxHeight',
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
    function handleForm({ value, name }) {

        setdata({
            ...data,
            [name]: value,
        });
    };
    useEffect(() => {

        const data_send = startDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        const body = {
            id: data.motoboysid || 0,
            date: data_send,
            dateNext: moment(endDate).add(1, 'days').format('MM-DD-YYYY')
        }

        const answer = getOrders_filter(body, token);
        answer.then((ref) => {
            setmotoboy(ref.data[0].motoboy)
            console.log(ref.data)
            let uniqueclients = Array.from(new Set(ref.data.map(obj => obj.name)));
            setqtdausentes(ref.data.filter(ref => ref.situation === 'ausente').length)
            setQTD_orders(ref.data.reduce((acc, obj) => acc + Number(obj.qtd), 0));
            setqtdclients(uniqueclients);
            console.log(uniqueclients)
            setorderstd(ref.data.map((fifa) => {
                return [fifa.name, fifa.number, fifa.qtd, fifa.situation, <a href={fifa.image} target="_blank" >Abrir</a>, moment(fifa.dataexit).format('DD/MM/YYYY')]
            }))
            setorders(uniqueclients.map((props) => {
                let filter = ref.data.filter(rec => rec.name === props);
                let totalqtd = filter.reduce((acc, obj) => acc + Number(obj.qtd), 0)
                let totalaus = filter.filter(rece => rece.situation === 'ausente').length
                let liquid = totalqtd - totalaus;
                return [props, totalqtd, totalaus, liquid]
            }))
        });
        answer.catch((ref) => {
            if (ref.response.status === 404) {
                navigate('/signin')
            }
        })
    }, [startDate, data.motoboysid, endDate])


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
            <div class="content-wrapper">
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0">Entregas motoboy</h1>
                                <div class="row">
                                    <div class="form-group" style={{ width: "150px" }}>
                                        <label for="inputName">Data inicial</label>
                                        <span class="form-control" className='selectionDate'>
                                            <DatePicker
                                                selected={startDate}
                                                locale={pt}
                                                onChange={(date) => { setStartDate(date) }}
                                                dateFormat="dd-MM-yyyy"
                                                className="form-control"
                                                id="dateselect"
                                            />
                                        </span>

                                    </div>
                                    <div class="form-group" style={{ width: "150px", marginLeft: "30px" }}>
                                        <label for="inputName">Data final</label>
                                        <span class="form-control" className='selectionDate'>
                                            <DatePicker
                                                selected={endDate}
                                                locale={pt}
                                                onChange={(date) => { setendDate(date) }}
                                                dateFormat="dd-MM-yyyy"
                                                className="form-control"
                                                id="dateselect"
                                            />
                                        </span>

                                    </div>
                                    <div class="form-group" style={{ minWidth: "70px", marginLeft: "35px" }}>
                                        <label for="inputStatus">Motoboy</label>
                                        <select name="motoboysid" id="inputStatus" class="form-control custom-select" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}>
                                            <option selected disabled>Selecione</option>
                                            {motoboys ? motoboys.map((ref, index) => {
                                                return <option value={ref.id} key={index} >{ref.name}</option>
                                            }) : <></>}
                                        </select>
                                    </div>

                                </div>


                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active">Entregas motoboy</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="content">
                    <div class="container-fluid">

                        <div class="row">
                            <div class="col-lg-3 col-6">

                                <div class="small-box bg-info" >
                                    <div class="inner">
                                        <h3>{QTD_orders}</h3>

                                        <p>Pedidos </p>
                                    </div>
                                    <div class="icon" >
                                        <i class="ion ion-clipboard"></i>
                                    </div>
                                    <a onClick={() => { settable(false); settable1(true); settable2(false) }} style={{ zIndex: "0" }} class="small-box-footer" >Mais informações <i class="fas fa-arrow-circle-right"  ></i></a>
                                </div>
                            </div>


                            <div class="col-lg-3 col-6">

                                <div class="small-box bg-primary">
                                    <div class="inner">
                                        <h3>{qtdclients.length || 0}</h3>

                                        <p>Clientes utilizados</p>
                                    </div>
                                    <div class="icon">
                                        <i class="ion ion-pie-graph"></i>
                                    </div>

                                </div>
                            </div>
                            <div class="col-lg-3 col-6">

                                <div class="small-box bg-danger">
                                    <div class="inner">
                                        <h3>{qtdausentes}</h3>

                                        <p>Pedidos ausentes</p>
                                    </div>
                                    <div class="icon">
                                        <i class="ion ion-clipboard"></i>
                                    </div>
                                    <a onClick={() => { settable(false); settable1(false); settable2(true) }} class="small-box-footer">Mais informações <i class="fas fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                            <div class="col-lg-3 col-6">

                                <div class="small-box bg-warning">
                                    <div class="inner">

                                        <p>Resumo</p>
                                    </div>
                                    <div class="icon">
                                        <i class="ion ion-clipboard"></i>
                                    </div>
                                    <a onClick={() => { settable(true); settable1(false); settable2(false) }} class="small-box-footer">Mais informações <i class="fas fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            {table === true ?
                                <MUIDataTable
                                    title={`Pedidos do dia  ${moment(startDate).format('MM/DD/YYYY')} até  ${moment(endDate).format('MM/DD/YYYY')} do motoboy ${motoboy}`}
                                    data={orders}
                                    columns={columns}
                                    options={options}
                                />
                                :
                                table1 === true ?
                                    <MUIDataTable
                                        title={`Pedidos do dia  ${moment(startDate).format('MM/DD/YYYY')} até  ${moment(endDate).format('MM/DD/YYYY')} do motoboy ${motoboy}`}
                                        data={orderstd}
                                        columns={columnsone}
                                        options={options}
                                    />
                                    :
                                    table2 === true ?
                                        "terceira" :
                                        <></>}


                        </div>

                    </div>
                </section>
            </div>

        </>
    )
}
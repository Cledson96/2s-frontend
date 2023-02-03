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
    const [aus, setaus] = useState(0)

    const columns = ["Cliente", "Qtd pedidos", "QTD ausentes", "pedidos liquido"];
    const columnsone = ["Cliente", "Numero pedido", "Qtd", "Situação", "Imagem", "Data"];
    const columnstwo = ["Cliente", "Numero pedido", "Situação", "Imagem", "Data"];
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
            if (ref.data.length === 0) {
                setorderstd([]);
                setaus([]);
                setmotoboy("");
                setorders([]);
                setQTD_orders(0);
                setqtdclients(0);
                setqtdausentes(0);
                return
            }
            setmotoboy(ref.data[0].motoboy)

            let uniqueclients = Array.from(new Set(ref.data.map(obj => obj.name)));
            setqtdausentes(ref.data.filter(ref => ref.situation === 'ausente').length)
            setQTD_orders(ref.data.reduce((acc, obj) => acc + Number(obj.qtd), 0));

            setqtdclients(uniqueclients);

            setaus(ref.data.filter(a => a.situation === 'ausente').map((i) => {

                return [i.name, i.number, i.situation, <a href={i.image} target="_blank" >Abrir</a>, moment(i.dateexit).format('DD/MM/YYYY')]


            }))
            setorderstd(ref.data.map((fifa) => {
                return [fifa.name, fifa.number, fifa.qtd, fifa.situation, <a href={fifa.image} target="_blank" >Abrir</a>, moment(fifa.dateexit).format('DD/MM/YYYY')]
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
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Entregas motoboy</h1>
                                <div className="row">
                                    <div className="form-group" style={{ width: "150px" }}>
                                        <label htmlFor="inputName">Data inicial</label>
                                        <span className='selectionDate'>
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
                                    <div className="form-group" style={{ width: "150px", marginLeft: "30px" }}>
                                        <label htmlFor="inputName">Data final</label>
                                        <span className='selectionDate'>
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
                                    <div className="form-group" style={{ minWidth: "70px", marginLeft: "35px" }}>
                                        <label htmlFor="inputStatus">Motoboy</label>
                                        <select name="motoboysid" id="inputStatus" className="form-control custom-select" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}>
                                            <option >Selecione</option>
                                            {motoboys ? motoboys.map((ref, index) => {
                                                return <option value={ref.id} key={index} >{ref.name}</option>
                                            }) : <></>}
                                        </select>
                                    </div>

                                </div>


                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Entregas motoboy</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-lg-3 col-6">

                                <div className="small-box bg-info" >
                                    <div className="inner">
                                        <h3>{QTD_orders}</h3>

                                        <p>Pedidos </p>
                                    </div>
                                    <div className="icon" >
                                        <i className="ion ion-clipboard"></i>
                                    </div>
                                    <a onClick={() => { settable(false); settable1(true); settable2(false) }} style={{ zIndex: "0" }} className="small-box-footer" >Mais informações <i className="fas fa-arrow-circle-right"  ></i></a>
                                </div>
                            </div>


                            <div className="col-lg-3 col-6">

                                <div className="small-box bg-primary">
                                    <div className="inner">
                                        <h3>{qtdclients.length || 0}</h3>

                                        <p>Clientes utilizados</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-pie-graph"></i>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-3 col-6">

                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>{qtdausentes}</h3>

                                        <p>Pedidos ausentes</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-clipboard"></i>
                                    </div>
                                    <a onClick={() => { settable(false); settable1(false); settable2(true) }} className="small-box-footer">Mais informações <i className="fas fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">

                                <div className="small-box bg-warning">
                                    <div className="inner">

                                        <p>Resumo</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-clipboard"></i>
                                    </div>
                                    <a onClick={() => { settable(true); settable1(false); settable2(false) }} className="small-box-footer">Mais informações <i className="fas fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            {table === true ?
                                <MUIDataTable
                                    title={`Pedidos do dia  ${moment(startDate).format('DD/MM/YYYY')} até  ${moment(endDate).format('DD/MM/YYYY')} do motoboy ${motoboy}`}
                                    data={orders}
                                    columns={columns}
                                    options={options}
                                />
                                :
                                table1 === true ?
                                    <MUIDataTable
                                        title={`Pedidos do dia  ${moment(startDate).format('DD/MM/YYYY')} até  ${moment(endDate).format('MM/DD/YYYY')} do motoboy ${motoboy}`}
                                        data={orderstd}
                                        columns={columnsone}
                                        options={options}
                                    />
                                    :
                                    table2 === true ?
                                        <MUIDataTable
                                            title={`Ausentes do dia  ${moment(startDate).format('DD/MM/YYYY')} até  ${moment(endDate).format('DD/MM/YYYY')} do motoboy ${motoboy}`}
                                            data={aus}
                                            columns={columnstwo}
                                            options={options}
                                        /> :
                                        <></>}


                        </div>

                    </div>
                </section>
            </div>

        </>
    )
}
import { getOrders_day } from "../../request/request";
import { useEffect, useState } from 'react';
import moment from "moment";
import DatePicker from "react-datepicker";
import pt from 'date-fns/locale/pt';
import { Chart } from "react-google-charts";
import MUIDataTable from "mui-datatables";


export default function Dashboard({ navbar }) {

    const token = localStorage.getItem("token");
    const [orders, setorders] = useState(0);
    const [orders1, setorders1] = useState();
    const [orders2, setorders2] = useState();
    const [orders3, setorders3] = useState();
    const [qtdboys, setqtdboys] = useState(0);
    const [qtdclients, setqtdclients] = useState(0);
    const [qtdausentes, setqtdausentes] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [data, setdata] = useState([]);
    const [data2, setdata2] = useState([]);
    const [data3, setdata3] = useState([]);
    const [tela1, settela1] = useState(true)
    const [tela2, settela2] = useState(false)
    const [tela3, settela3] = useState(false)
    const [tela4, settela4] = useState(false)
    const columns = ["Numero Pedido", "Cliente", "Motoboy", "QTD", "Data", "Imagem", "Situação"];
    const columns2 = ["Motoboy", "Qtd pedidos", "QTD ausentes", "pedidos liquido"];

    const options = {
        title: "Pedidos por clientes",
        is3D: true,
        pieHole: 0.4,
        backgroundColor: 'none'
    };

    const optionsAus = {
        title: "Ausentes por clientes",
        is3D: true,
        pieHole: 0.4,
        backgroundColor: 'none'
    };

    const options4 = {
        responsive: 'scrollMaxHeight',
        filterType: 'checkbox',
        selectableRows: 'none'

    }

    const options3 = {
        title: "Pedidos por motoboy",
        is3D: true,
        pieHole: 0.4,
        backgroundColor: 'none'
    };
   
    useEffect(() => {
        const data_send = startDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        const body = {
            date: data_send,
            dateNext: moment(endDate).add(1, 'days').format('MM/DD/YYYY')
        }

        const answer = getOrders_day(token, body);
        answer.then((ref) => {



            setqtdausentes(ref.data.filter(ref => ref.situation === 'ausente').length)
            

            setorders2((ref.data.filter((f) => f.situation === 'ausente').map((a) => {
                return [a.number, a.client, a.motoboy, a.qtd, moment(a.dateexit).format('DD/MM/YYYY'), <a href={a.image} target="_blank" >Abrir</a>, a.situation]
            }
            )))
            setorders1(ref.data.map((a) => {
                return [a.number, a.client, a.motoboy, a.qtd, moment(a.dateexit).format('DD/MM/YYYY'), <a href={a.image} target="_blank" >Abrir</a>, a.situation]
            }
            ))
            setorders(ref.data.reduce((acc, obj) => acc + Number(obj.qtd), 0));
            let uniqueboys = Array.from(new Set(ref.data.map(obj => obj.motoboy)));
            let uniqueclients = Array.from(new Set(ref.data.map(obj => obj.client)));
            setqtdboys(uniqueboys)
            setorders3(uniqueboys.map((m) => {
                let filtered = ref.data.filter((z) => z.motoboy === m)
                
                let qtdaus = filtered.filter((w) => w.situation === "ausente").length
                let qtd11 = filtered.reduce((acc, obj) => acc + Number(obj.qtd),0)
               
                return [m, qtd11, qtdaus, Number(qtd11) - Number(qtdaus)]
            }

            ))

            setqtdclients(uniqueclients);
            let env = [["Task", "Hours per Day"]]
            let env2 = [["Task", "Hours per Day"]]
            let env3 = [["Pedidos", "Total", "Ausentes"]]
            uniqueclients.map((refe) => {
                env2.push([refe, ref.data.filter((ref) => ref.client === refe).filter(ref => ref.situation === 'ausente').length])
            })
            uniqueclients.map((refe) => {
                env.push([refe, ref.data.filter((ref) => ref.client === refe).reduce((acc, obj) => acc + Number(obj.qtd), 0)])
            })
            uniqueboys.map((refe) => {
                env3.push(
                    [refe, ref.data.filter((refer) => refer.motoboy === refe).reduce((acc, obj) => acc + Number(obj.qtd), 0), ref.data.filter((refer) => refer.motoboy === refe).filter(refi => refi.situation === 'ausente').length]
                )
            })

            setdata2(env2)
            setdata(env)
            setdata3(env3)


        });
        answer.catch((ref) => {
            console.log(ref)
        })
    }, [startDate, endDate])


    
    return (
        <div className="content-wrapper" style={navbar == false ? { marginLeft: 0 } : {}} >
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Painel Central </h1>
                            <div className="row">
                                <div className="form-group" style={{ width: "150px" }}>
                                    <label htmlFor="inputName">Data inicial</label>
                                    <span  className='selectionDate'>
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
                                <div className="form-group" style={{ width: "150px", marginLeft: "30px" }}>
                                    <label htmlFor="inputName">       </label>
                                    <span  className='selectionDate'>

                                    </span>
                                    <button onClick={() => { settela1(true); settela2(false); settela3(false); settela4(false) }} style={{ marginTop: "8px" }} className="btn btn-block btn-success"> Home</button>
                                </div>
                            </div>


                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Painel central</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-lg-3 col-6">

                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>{orders}</h3>

                                    <p>Pedidos hoje</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-clipboard"></i>
                                </div>
                                <a onClick={() => { settela1(false); settela2(true); settela3(false); settela4(false) }} style={{ zIndex: '0' }} className="small-box-footer">Mais informações <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>



                        <div className="col-lg-3 col-6">

                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>{qtdboys.length || 0}</h3>

                                    <p>Motoboys utilizados</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-person-add"></i>
                                </div>
                                <a onClick={() => { settela1(false); settela2(false); settela3(false); settela4(true) }} style={{ zIndex: '0' }} className="small-box-footer">Mais informações <i className="fas fa-arrow-circle-right"></i></a>
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
                                <a onClick={() => { settela1(false); settela2(false); settela3(true); settela4(false) }} className="small-box-footer">Mais informações <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>

                    {tela1 === true ?
                        <div>
                            <div className="row">

                                <section className="col-lg-5 connectedSortable">
                                    {data.length > 1 ? <Chart
                                        chartType="PieChart"
                                        data={data}
                                        options={options}
                                        width={"100%"}
                                        height={"400px"}
                                    /> : <></>
                                    }


                                </section>
                                <section className="col-lg-5 connectedSortable">
                                    {data2.length > 1 ? <Chart
                                        chartType="PieChart"
                                        data={data2}
                                        options={optionsAus}
                                        width={"100%"}
                                        height={"400px"}
                                    /> : <></>}

                                </section>

                            </div>
                            <div className="row">
                                {data3.length > 1 ? <Chart
                                    chartType="ColumnChart"
                                    width="100%"
                                    height="400px"
                                    data={data3}
                                    options={options3}

                                /> : <></>}

                            </div>
                        </div>
                        : tela2 === true ?
                            <MUIDataTable
                                title={`Pedidos do dia  ${moment(startDate).format('DD/MM/YYYY')} até  ${moment(endDate).format('DD/MM/YYYY')} `}
                                data={orders1}
                                columns={columns}
                                options={options4}
                            />
                            : tela3 === true ?
                                <MUIDataTable
                                    title={`Pedidos ausentes do dia  ${moment(startDate).format('DD/MM/YYYY')} até  ${moment(endDate).format('DD/MM/YYYY')} `}
                                    data={orders2}
                                    columns={columns}
                                    options={options4}
                                />
                                : tela4 === true ?
                                    <MUIDataTable
                                        title={`Pedidos por motoboys do dia  ${moment(startDate).format('DD/MM/YYYY')} até  ${moment(endDate).format('DD/MM/YYYY')} `}
                                        data={orders3}
                                        columns={columns2}
                                        options={options4}
                                    /> : <></>
                    }

                </div>
            </section>
        </div>

    )
}
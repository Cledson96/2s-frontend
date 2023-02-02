import { getOrders_day } from "../../request/request";
import { useEffect, useState } from 'react';
import moment from "moment";
import DatePicker from "react-datepicker";
import pt from 'date-fns/locale/pt';
import { Chart } from "react-google-charts";



export default function Dashboard() {

    const token = localStorage.getItem("token");
    const [orders, setorders] = useState(0);
    const [qtdboys, setqtdboys] = useState(0);
    const [qtdclients, setqtdclients] = useState(0);
    const [qtdausentes, setqtdausentes] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [data, setdata] = useState([]);
    const [data2, setdata2] = useState([]);
    const [data3, setdata3] = useState([]);


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
        console.log(body)
        const answer = getOrders_day(token, body);
        answer.then((ref) => {

            setqtdausentes(ref.data.filter(ref => ref.situation === 'ausente').length)
            console.log(ref.data)
            setorders(ref.data.reduce((acc, obj) => acc + Number(obj.qtd), 0));
            let uniqueboys = Array.from(new Set(ref.data.map(obj => obj.motoboy)));
            let uniqueclients = Array.from(new Set(ref.data.map(obj => obj.client)));
            setqtdboys(uniqueboys)
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


    console.log(orders)
    return (
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Painel Central </h1>
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
                            </div>


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
            <section class="content">
                <div class="container-fluid">

                    <div class="row">
                        <div class="col-lg-3 col-6">

                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3>{orders}</h3>

                                    <p>Pedidos hoje</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-clipboard"></i>
                                </div>
                                <a href="/order_day" class="small-box-footer">Mais informações <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>



                        <div class="col-lg-3 col-6">

                            <div class="small-box bg-warning">
                                <div class="inner">
                                    <h3>{qtdboys.length}</h3>

                                    <p>Motoboys utilizados</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-person-add"></i>
                                </div>
                                <a href="#" class="small-box-footer">Mais informações <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>

                        <div class="col-lg-3 col-6">

                            <div class="small-box bg-primary">
                                <div class="inner">
                                    <h3>{qtdclients.length}</h3>

                                    <p>Clientes utilizados</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-pie-graph"></i>
                                </div>
                                <a href="#" class="small-box-footer">Mais informações <i class="fas fa-arrow-circle-right"></i></a>
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
                                <a href="#" class="small-box-footer">Mais informações <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>


                    <div class="row">

                        <section class="col-lg-5 connectedSortable">
                            {data.length > 1 ? <Chart
                                chartType="PieChart"
                                data={data}
                                options={options}
                                width={"100%"}
                                height={"400px"}
                            /> : <></>
                            }


                        </section>
                        <section class="col-lg-5 connectedSortable">
                            {data2.length > 1 ?  <Chart
                                chartType="PieChart"
                                data={data2}
                                options={optionsAus}
                                width={"100%"}
                                height={"400px"}
                            />:<></> }
                          
                        </section>

                    </div>
                    <div class="row">
                        {data3.length > 1?<Chart
                            chartType="ColumnChart"
                            width="100%"
                            height="400px"
                            data={data3}
                            options={options3}

                        />:<></>}
                        
                    </div>
                </div>
            </section>
        </div>

    )
}
import { getOrders_day } from "../../request/request";
import { useEffect, useState } from 'react';
import moment from "moment";

export default function Dashboard() {
    const dateNow = moment(new Date()).format('DD/MM/YYYY')
    const token = localStorage.getItem("token");
    const [orders, setorders] = useState(0);
    const [qtdboys, setqtdboys] = useState(0);
    const [qtdclients, setqtdclients] = useState(0);

    useEffect(() => {
        const answer = getOrders_day(token);
        answer.then((ref) => {
            console.log(ref.data)
            setorders(ref.data.reduce((acc, obj) => acc + Number(obj.qtd), 0));
            let uniqueboys = new Set(ref.data.map(obj => obj.motoboysid));
            let uniqueclients = new Set(ref.data.map(obj => obj.clientid));
            setqtdboys(uniqueboys.size)
            setqtdclients(uniqueclients.size);
        });
        answer.catch((ref) => {
            console.log(ref)
        })
    }, [])


    console.log(orders)
    return (
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
                                <a href="#" class="small-box-footer">Mais informações <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>



                        <div class="col-lg-3 col-6">

                            <div class="small-box bg-warning">
                                <div class="inner">
                                    <h3>{qtdboys}</h3>

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
                                    <h3>{qtdclients}</h3>

                                    <p>Clientes utilizados</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-pie-graph"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>

                    </div>


                    <div class="row">

                      
                        <section class="col-lg-5 connectedSortable"> 
                        <div class="card bg-gradient-success">
                                <div class="card-header border-0">

                                    <h3 class="card-title">
                                        <i class="far fa-calendar-alt"></i>

                                    </h3>

                                    <div class="card-tools">

                                        
                                        <button type="button" class="btn btn-success btn-sm" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <button type="button" class="btn btn-success btn-sm" data-card-widget="remove">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>

                                </div>

                                <div class="card-body pt-0">

                                    <div id="calendar" style={{ width: "100%" }}></div>
                                </div>

                            </div>

                            <div class="card bg-gradient-primary">
                                <div class="card-header border-0">
                                    <h3 class="card-title">
                                        <i class="fas fa-map-marker-alt mr-1"></i>
                                        Visitors
                                    </h3>

                                    <div class="card-tools">
                                        <button type="button" class="btn btn-primary btn-sm daterange" title="Date range">
                                            <i class="far fa-calendar-alt"></i>
                                        </button>
                                        <button type="button" class="btn btn-primary btn-sm" data-card-widget="collapse" title="Collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>

                                </div>
                                <div class="card-body">
                                    <div id="world-map" style={{ height: "250px", width: "100%" }}></div>
                                </div>

                                <div class="card-footer bg-transparent">
                                    <div class="row">
                                        <div class="col-4 text-center">
                                            <div id="sparkline-1"></div>
                                            <div class="text-white">Visitors</div>
                                        </div>

                                        <div class="col-4 text-center">
                                            <div id="sparkline-2"></div>
                                            <div class="text-white">Online</div>
                                        </div>

                                        <div class="col-4 text-center">
                                            <div id="sparkline-3"></div>
                                            <div class="text-white">Sales</div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div class="card bg-gradient-info">
                                <div class="card-header border-0">
                                    <h3 class="card-title">
                                        <i class="fas fa-th mr-1"></i>
                                        Sales Graph
                                    </h3>

                                    <div class="card-tools">
                                        <button type="button" class="btn bg-info btn-sm" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <button type="button" class="btn bg-info btn-sm" data-card-widget="remove">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <canvas class="chart" id="line-chart" style={{ minHeight: "250px", height: "250px", maxHeight: "250px", maxWwidth: "100%" }}></canvas>
                                </div>

                                <div class="card-footer bg-transparent">
                                    <div class="row">
                                        <div class="col-4 text-center">
                                            <input type="text" class="knob" data-readonly="true" value="20" data-width="60" data-height="60"
                                                data-fgColor="#39CCCC" />

                                            <div class="text-white">Mail-Orders</div>
                                        </div>

                                        <div class="col-4 text-center">
                                            <input type="text" class="knob" data-readonly="true" value="50" data-width="60" data-height="60"
                                                data-fgColor="#39CCCC" />

                                            <div class="text-white">Online</div>
                                        </div>

                                        <div class="col-4 text-center">
                                            <input type="text" class="knob" data-readonly="true" value="30" data-width="60" data-height="60"
                                                data-fgColor="#39CCCC" />

                                            <div class="text-white">In-Store</div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                          

                        </section>

                    </div>

                </div>
            </section>
        </div>

    )
}
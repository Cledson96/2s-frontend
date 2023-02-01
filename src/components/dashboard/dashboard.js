import { getOrders_day } from "../../request/request";
import { useEffect, useState } from 'react';
import moment from "moment";

export default function Dashboard() {
    const dateNow = moment(new Date()).format('DD/MM/YYYY')
    const token = localStorage.getItem("token");
    const [orders, setorders] = useState(0);
    const [qtdboys, setqtdboys] = useState(0);
    const [qtdclients, setqtdclients] = useState(0);
    const [qtdausentes, setqtdausentes] = useState(0);

    useEffect(() => {
        const answer = getOrders_day(token);
        answer.then((ref) => {
            setqtdausentes(ref.data.filter(ref=> ref.situation === 'ausente').length)
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




                        </section>

                    </div>

                </div>
            </section>
        </div>

    )
}
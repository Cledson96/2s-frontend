import Headers from "../../components/headers/headers"
import Navbar from "../../components/navbar/navbar"
import { useEffect, useState } from 'react';
import { getUsers,getMotoboys } from "../../request/request";
import { useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import pt from 'date-fns/locale/pt';
import { Chart } from "react-google-charts";


export default function Motoboys_orders() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [data, setdata] = useState({  });
    const [user, setuser] = useState("loading");
    const [navbar, setnavbar] = useState(true)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [motoboys, setmotoboys] = useState([]);

    function handleForm({ value, name }) {

        setdata({
            ...data,
            [name]: value,
        });
    };

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

                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3>{1}</h3>

                                    <p>Pedidos </p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-clipboard"></i>
                                </div>
                                <a href="/order_day" class="small-box-footer">Mais informações <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>


                        <div class="col-lg-3 col-6">

                            <div class="small-box bg-primary">
                                <div class="inner">
                                    <h3>{1}</h3>

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
                                    <h3>{1}</h3>

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


                    </div>
                  
                </div>
            </section>
            </div>

        </>
    )
}
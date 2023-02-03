import Headers from "../../components/headers/headers"
import Navbar from "../../components/navbar/navbar"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { postMotoboys, getUsers } from "../../request/request";
import { Confirmation, Error } from "../../components/modal/modal";


export default function Signup_motoboy() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [user, setuser] = useState("loading");
    const [navbar, setnavbar] = useState(true);
    const [modal, setmodal] = useState(false);
    const [error, seterror] = useState(false);
    const [data, setdata] = useState({});
    const [dataerror, setdataerror] = useState({});



    function handleForm({ value, name }) {
        setdata({
            ...data,
            [name]: value,
        });
    };
    function handleReset() {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        this.setState({
            itemvalues: [{}]
        });
    };
    function motoboys() {
        const post = postMotoboys(data)
        post.then(() => { setmodal(true); setdata({}); handleReset() });
        post.catch((ref) => {
           if (ref.response.data === "motoboy já cadastrado!") { setdataerror(ref.response.data); seterror(true) } else {
                let err = ref.response.data.details.map((refe) => {
                    return (
                        refe.context.label + " é obrigatorio!"
                    )
                }); setdataerror(err); seterror(true)
            };
        })
    }

    useEffect(() => {
        const answer = getUsers(token);
        answer.then((ref) => { setuser(ref.data[0][0]) });
        answer.catch((ref) => {
            if (ref.response.status === 404) {
                navigate('/signin')
            }
        })
    }, [])

    return (
        <>{error === true ? <Error seterror={seterror} dataerror={dataerror}></Error> : <></>}
            {modal === true ? <Confirmation setmodal={setmodal} ></Confirmation> : <></>}
            <Headers user={user} setnavbar={setnavbar} navbar={navbar} />
            {navbar === true ? <Navbar user={user} /> : <></>}
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Cadastro de motoboy</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Cadastro motoboy</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content" style={{ marginLeft: "40px", minHeight: "100vh" }}>
                    <div className="row">
                        <div className="col-md-6" style={{ minWidth: "80%" }}>
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Cadastro</h3>

                                    <div className="card-tools">

                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group" style={{ width: "60%" }}>
                                            <label htmlFor="inputName">Nome completo</label>
                                            <input value={data.name ? data.name : ""} name="name" type="text"  className="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                        <div className="form-group" style={{ marginLeft: "5%", minWidth: "25%" }} >
                                            <label htmlFor="inputName">CPF</label>
                                            <input value={data.cpf ? data.cpf : ""} name="cpf" type="text"  className="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputName">Endereço</label>
                                        <input name="address" type="text"  className="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                    </div>
                                    <div className="row">
                                        <div className="form-group" style={{ minWidth: "70px", marginRight: "35px" }}>
                                            <label htmlFor="inputStatus">Utilitario</label>
                                            <select name="utility" id="inputStatus" className="form-control custom-select" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}>
                                                <option >Selecione</option>
                                                <option>Moto</option>
                                                <option>Carro</option>
                                                <option>Bicicleta</option>
                                            </select>
                                        </div>
                                        <div className="form-group" style={{ minWidth: "150px" }}>
                                            <label htmlFor="inputName">PIX para pagamento</label>
                                            <input name="account" type="text"  className="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                        <div className="form-group" style={{ minWidth: "250px", marginLeft: "35px" }}>
                                            <label htmlFor="inputName">MEI</label>
                                            <input name="mei" type="text"  className="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputClientCompany">Foto</label>
                                        <input name="imagedocument" type="url" id="inputClientCompany" className="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                    </div>
                                    <div className="row">
                                        <div className="form-group" style={{ minWidth: "150px", marginRight: "35px" }}>
                                            <label htmlFor="inputProjectLeader">Telefone Principal</label>
                                            <input name="phone" type="tel"  className="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                        <div className="form-group" style={{ minWidth: "150px", marginRight: "35px" }}>
                                            <label htmlFor="inputProjectLeader">Telefone para recado</label>
                                            <input name="phonecontact" type="tel"  className="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ width: "450px" }}>
                                        <label htmlFor="inputProjectLeader">Senha</label>
                                        <input name="password" type="password"  className="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <input onClick={() => motoboys()} type="submit" value="Cadastrar novo motoboy" className="btn btn-success float-right" />
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
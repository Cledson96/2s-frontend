import Headers from "../../components/headers/headers"
import Navbar from "../../components/navbar/navbar"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { postUsers, getUsers } from "../../request/request";
import { Confirmation, Error } from "../../components/modal/modal";


export default function Signup_users() {
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
    function users() {
        console.log(data)
        const post = postUsers(data)
        post.then(() => { setmodal(true); setdata({}); handleReset() });
        post.catch((ref) => {
            console.log(ref); if (ref.response.data === "usuario já cadastrado!") { setdataerror(ref.response.data); seterror(true) } else {
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
            <div class="content-wrapper">

                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1>Cadastro de usuarios</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active">Cadastro usuario</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="content" style={{ marginLeft: "40px", minHeight: "100vh" }}>
                    <div class="row">
                        <div class="col-md-6" style={{ minWidth: "80%" }}>
                            <div class="card card-primary">
                                <div class="card-header">
                                    <h3 class="card-title">Cadastro</h3>

                                    <div class="card-tools">

                                    </div>
                                </div>
                                <div class="card-body">
                                    <div className="row">
                                        <div class="form-group" style={{ width: "60%" }}>
                                            <label for="inputName">Nome completo</label>
                                            <input value={data.name ? data.name : ""} name="name" type="text" id="inputName" class="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                        <div class="form-group" style={{ marginLeft: "5%", minWidth: "25%" }} >
                                            <label for="inputName">CPF</label>
                                            <input value={data.cpf ? data.cpf : ""} name="cpf" type="text" id="inputName" class="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="inputName">Endereço</label>
                                        <input name="address" type="text" id="inputName" class="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                    </div>
                                    <div className="row">
                                        <div class="form-group" style={{ minWidth: "70px", marginRight: "35px" }}>
                                            <label for="inputStatus">Acesso</label>
                                            <select name="acess" id="inputStatus" class="form-control custom-select" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}>
                                                <option selected disabled>Selecione</option>
                                                <option>Total</option>
                                                <option>Parcial</option>

                                            </select>
                                        </div>
                                        <div class="form-group" style={{ minWidth: "150px" }}>
                                            <label for="inputName">PIX para pagamento</label>
                                            <input name="account" type="text" id="inputName" class="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                        <div class="form-group" style={{ minWidth: "250px", marginLeft: "35px" }}>
                                            <label for="inputName">MEI</label>
                                            <input name="mei" type="text" id="inputName" class="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="inputClientCompany">Foto</label>
                                        <input name="imagedocument" type="url" id="inputClientCompany" class="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                    </div>
                                    <div className="row">
                                        <div class="form-group" style={{ minWidth: "150px", marginRight: "35px" }}>
                                            <label for="inputProjectLeader">Telefone Principal</label>
                                            <input name="phone" type="tel" id="inputProjectLeader" class="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                        <div class="form-group" style={{ minWidth: "150px", marginRight: "35px" }}>
                                            <label for="inputProjectLeader">Telefone para recado</label>
                                            <input name="phonecontact" type="tel" id="inputProjectLeader" class="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                        </div>
                                    </div>
                                    <div class="form-group" style={{ width: "450px" }}>
                                        <label for="inputProjectLeader">Senha</label>
                                        <input name="password" type="password" id="inputProjectLeader" class="form-control" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <input onClick={() => users()} type="submit" value="Cadastrar novo usuario" class="btn btn-success float-right" />
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
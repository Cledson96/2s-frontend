import './signin.css'
import { useNavigate } from 'react-router-dom'
import { postSignin } from '../../request/request.js'
import { useState } from 'react';
import logo from '../../img/logo.png'
import loadimg from '../../img/carregando.gif'

export default function Signin() {
    const [signin, setsignin] = useState({});
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();

    function handleForm({ value, name }) {
        setsignin({
            ...signin,
            [name]: value,
        });
    };

    function authorization() {
        setloading(false)
        let send = postSignin(signin);
        send.then((ref) => {
            localStorage.setItem("token", ref.data.token);
            navigate('/')
        })
        send.catch((ref) => { setloading(true); alert(ref.response.data) })

    };

    return (
        <>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-190 p-b-30">
                        <form className="login100-form">
                            <div className="login100-form-avatar">
                                <img src={logo} alt="AVATAR" />
                            </div>

                            <div className="wrap-input100  m-b-10 " >
                                <input className="input100" type="text" name="cpf" placeholder="CPF" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}></input>

                            </div>
                            <div className="wrap-input100  m-b-10" >
                                <input className="input100" type="password" name="password" placeholder="SENHA" onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}></input>

                            </div>
                            <div onClick={() => { authorization() }} className="container-login100-form-btn login100-form-btn">
                                {loading === true ? "Entrar" : <img className='gif' alt='gif' src={loadimg} />}
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
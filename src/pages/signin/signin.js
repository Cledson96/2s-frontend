import './signin.css'
import { useNavigate } from 'react-router-dom'
import { postSignin } from '../../request/request.js'
import { useState } from 'react';
import logo from '../../img/logo.png'

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
            localStorage.setItem("name_signin", ref.data.name);
            navigate('/home')
        })
        send.catch((ref) => { setloading(true); alert(ref.response.data) })

    };

    return (
        <>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-190 p-b-30">
                        <form className="login100-form validate-form">
                            <div className="login100-form-avatar">
                                <img src={logo} alt="AVATAR"/>
                            </div>
                           
                            <div className="wrap-input100 validate-input m-b-10 alert-validate" data-validate="Username is required">
                                <input className="input100" type="text" name="username" placeholder="CPF"></input>
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="fa fa-user"></i>
                                    </span>
                            </div>
                            <div className="wrap-input100 validate-input m-b-10 alert-validate" data-validate="Password is required">
                                <input className="input100" type="password" name="pass" placeholder="SENHA" ></input>
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="fa fa-lock"></i>
                                    </span>
                            </div>
                            <div onClick={()=>alert("oi")} className="container-login100-form-btn p-t-10">
                                <button  className="login100-form-btn">
                                    Login
                                </button>
                            </div>
                           
                            
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
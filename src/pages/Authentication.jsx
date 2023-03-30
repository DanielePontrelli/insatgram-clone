import { useState } from "react";
import styles from "../style/Authentication.module.css"
import MyButton from "../components/MyButton";
import { useSelector, useDispatch} from 'react-redux';
import {auth} from '../store/actions/handleAuth';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(true);

    const token = useSelector(state => state.authReducer.token);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(auth(email, password, isSignup));
        setEmail("");
        setPassword("");
    }

    const changeMode = (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        setIsSignup(!isSignup);
    }

    
    let shouldRedirect = null;  
      if (token) {
        shouldRedirect = navigate("/");
      }
    


    return (
        <div className={styles.formContainer}>
            {shouldRedirect}     
                <div className={styles.polaroid}>
                    <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                        <FontAwesomeIcon icon={faCameraRetro} size='3x' /> 
                        <p className={styles.logo}><span style={{color: '#e7b928'}}>𝓟</span>𝓸𝓵𝓪𝓻𝓸𝓲𝓭</p>
                        <FontAwesomeIcon icon={faCameraRetro} size='3x' /> 
                    </div>
                   <form onSubmit={handleSubmit} action=""> 
                        <p style={{fontSize: '23px', color: 'white'}}>E-mail</p>
                        <input placeholder="Scrivi la tua e-mail" type="email" value={email} autoComplete="username" onChange={handleEmail} />

                        <p style={{fontSize: '23px', color: 'white'}}>Password</p>
                        <input placeholder="Scrivi la tua password" type="password" value={password} autoComplete="current-password" onChange={handlePassword} />

                        <MyButton handleClick={handleSubmit} style={{marginTop: '15px', width: '100%', cursor: 'pointer', borderRadius: '10px'}} title={isSignup ? 'Signup' : 'Login'} />
                        <MyButton handleClick={changeMode} style={{marginTop: '15px', width: '100%', backgroundColor: 'grey', color: '#e7b928', cursor: 'pointer', borderRadius: '10px'}} title={`Vai al ${isSignup ? 'Login' : 'Signup'}`} />
                    </form>
                </div>
                
            
        </div>
    )
}

export default Auth;
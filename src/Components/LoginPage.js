import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export const LoginPage = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''})

    const handleInput = (event) => {setCredentials({...credentials,[event.target.name]: event.target.value})}

    const handleClick = () => {navigate("/")}

    function isEmailValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
    }

    function isPasswordValid(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
    }

    const handleLogin = async (e) => {

        e.preventDefault();

        try{
            if(isEmailValid(credentials.email))
            {
                
                if(isPasswordValid(credentials.password))
                {
                    const response = await axios.post('http://localhost:8080/login/validateUser',JSON.stringify(credentials),
                    {headers: {'Content-Type': 'application/json'}});

                    const output = response.data;

                    localStorage.setItem('isLoggedIn',true);
                    setIsLoggedIn(true);
                    //alert("Logged in successfully!");
                    navigate('/homepage');
                }else{
                    alert("Password format is incorrect!");
                }
            }else{
                alert("Email is in Incorrect format!");
            }
        } catch(error){
            console.error(error);
            alert("Invalid Credentials!");
        }
    };

    return(

        <div className='App2'>
            <div className='auth-form-container'>
                <h2>Admin Login</h2><hr/>
                <form className='login-form' onSubmit={handleLogin}>
                    <label htmlFor='email'>email</label>
                    <input onChange={handleInput} type='email' placeholder='Email' id='email' name='email' required/>
                    <label htmlFor='password'>password</label>
                    <input onChange={handleInput} type='password' placeholder='********' id='password' name='password' required/>
                    <button type='submit' className='btn btn-primary'>Log In</button>
                </form>
                <button className='link-btn' onClick={handleClick}>Go back to main Page</button>
            </div>
        </div>
    )

}
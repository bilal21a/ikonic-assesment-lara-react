import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate();
    const { http, setToken } = AuthUser();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000/api';

    const submitForm = () => {
        // Reset error message
        setErrorMessage(null);
    
        axios.post(`${baseURL}/register`, { email: email, password: password, name: name })
            .then((res) => {
                navigate('/login');
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessage(`Registration failed: ${error.response.data.message}`);
                } else if (error.request) {
                    setErrorMessage('Registration failed: No response from the server');
                } else {
                    setErrorMessage('Registration failed: ' + error.message);
                }
            });
    };

    return (
        <div className="row justify-content-left pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Register </h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control" placeholder="Enter name"
                            onChange={e => setName(e.target.value)}
                            id="name" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                            id="email" />
                    </div>

                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                            id="pwd" />
                    </div>
                    {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Register</button>
                </div>
            </div>
        </div>
    )
}

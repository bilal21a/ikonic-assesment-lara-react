import { useState } from "react";
import AuthUser from './AuthUser';
import axios from 'axios';

export default function Login() {
    const { setToken } = AuthUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState(null);

    const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000/api';

    const submitForm = () => {
        // Reset error message
        setErrorMessage(null);

        axios.post(`${baseURL}/login`, {
            email: email,
            password: password
        })
            .then((res) => {
                setToken(res.data.user, res.data.access_token);
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage("Login failed. Please check your credentials and try again.");
            })
    }

    return (
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login </h1>
                    <div className="form-group">
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
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Login</button>
                </div>
            </div>
        </div>
    )
}

import { Routes, Route, Link } from 'react-router-dom';
import Home from '../components/home';
import AddFeedback from '../components/feedback/AddFeedback';
import AuthUser from '../components/AuthUser';
import Feedback from '../components/feedback/Feedback';
import EditFeedback from '../components/feedback/EditFeedback';
function Auth() {
    const {token,logout} = AuthUser();
    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <span role="button" className="nav-link" onClick={logoutUser}>Logout</span>
                    </li>

                </ul>

            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/addFeedback" element={<AddFeedback />} />
                    <Route path="/feedback/edit/:id" element={<EditFeedback />} />
                </Routes>
            </div>
        </>
    );
}

export default Auth;

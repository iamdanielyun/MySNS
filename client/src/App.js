import './App.css';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ExploreFeed from './components/Feed/ExploreFeed';
import UserProfile from './components/User/UserProfile';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import useGetCurrentUser from './api/Auth/useGetCurrentUser';

export default function App() {
    const currentUser = useGetCurrentUser();
    const authenticated = currentUser != null;

    return (
        <Router>
            <Navbar />
            <div className='app'>
                <Routes>
                    <Route path="/" element={<ExploreFeed />}/>
                    <Route path="/login" element={authenticated ? <Navigate to={`/user/${currentUser}`} /> : <Login />} />
                    <Route path="/register" element={authenticated ? <Navigate to={`/user/${currentUser}`} /> : <Register />} />
                    <Route path="/user/:username" element={<UserProfile />}/>
                </Routes> 
            </div>
        </Router>
    )
}
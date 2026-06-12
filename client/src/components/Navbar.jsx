import './Navbar.css';
import { useEffect, useState, useRef } from "react";
import api from '../services/api';

import { useNavigate, useLocation } from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);

    const [user, setUser] = useState(null);

    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const timerRef = useRef(null);

    const location = useLocation();


    const isLoginPage = location.pathname === "/login";


    async function fetchUser() {
        try {
            const response = await api.get("/api/auth/me");

            setUser(response.data);
            setIsLogin(true);
        } catch (error) {
            localStorage.removeItem("authToken");
            setUser(null);
            setIsLogin(false);
        }

    }


    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            fetchUser();
        }
    }, []);



    function clearTimer() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }

    function handleClick() {

        clearTimer();

        if (!isClicked) {
            timerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 2500);
        }
    }
    function handleMouseEnter() {
        clearTimer();
        setIsVisible(true);
    }

    function handleMouseLeave() {
        clearTimer();
        if (!isClicked) {
            timerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 1500);
        }

    }

    useEffect(() => {
        return () => clearTimer();
    }, []);



    async function handleLogout() {
        try {
            localStorage.removeItem("authToken");

            setUser(null);
            setIsLogin(false);

            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="navbar">
            <div className="nav-brand">
                <span className="logo-dot"></span>
                <h1 className='navbar-title'>PRReview.ai</h1>
            </div>

            {!isLoginPage &&

                <div className='navbar-actions'>


                    {isLogin ? (
                        <div>
                            <div>
                                <h3 className='username'>
                                    {user?.username}
                                    <button onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleClick}
                                        className='dropdown-btn'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="down-arrow">
                                            <g>
                                                <path d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05 2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17z"></path>
                                            </g>
                                        </svg>

                                    </button>
                                </h3>

                                {(isClicked || isVisible) && <div className='dropdown-menu'>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                                }

                            </div>
                        </div>
                    ) : (
                        <button className="nav-button" onClick={() => navigate('/login')}>
                            Sign in with GitHub
                        </button>
                    )}

                </div>
            }
        </div>


    );
}

export default Navbar;
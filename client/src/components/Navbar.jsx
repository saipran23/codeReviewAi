import './Navbar.css';
import { useEffect, useState, useRef } from "react";
import api from '../services/api';

import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from '../services/AuthContext';

function Navbar() {
    const navigate = useNavigate();

    const { isLogin, user, setIsLogin, setUser } = useAuth();

    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const timerRef = useRef(null);

    const location = useLocation();


    const isLoginPage = location.pathname === "/login";


    // async function fetchUser() {
    //     try {
    //         const response = await api.get("/api/auth/me");

    //         setUser(response.data);
    //         setIsLogin(true);
    //     } catch (error) {
    //         localStorage.removeItem("authToken");
    //         setUser(null);
    //         setIsLogin(false);
    //     }

    // }


    // useEffect(() => {
    //     const token = localStorage.getItem("authToken");

    //     if (token) {
    //         fetchUser();
    //     }
    // }, []);



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
            await api.post("/api/auth/logout");

            setIsLogin(false);
            setUser(null);

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-black bg-black border-bottom border-secondary px-4 py-3">

            <div className="container-fluid">


                <div className="d-flex align-items-center gap-2">

                    <span
                        className="rounded-circle"
                        style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#8b5cf6"
                        }}
                    />

                    <h1 className="h4 mb-0 fw-bold text-white">
                        PRReview.ai
                    </h1>

                </div>


                <div className="d-flex align-items-center gap-4">

                    <Link
                        to="/"
                        className="text-decoration-none text-light"
                    >
                        Home
                    </Link>

                    <Link
                        to="/myReview"
                        className="text-decoration-none text-light"
                    >
                        My Reviews
                    </Link>

                </div>


                {!isLoginPage && (

                    <div>

                        {isLogin ? (

                            <div className="position-relative">

                                <h3 className="text-white d-flex gap-0">
                                    {user?.username}

                                    <button
                                        className="btn btn-black border-0 d-flex align-items-center gap-0 p-0 "
                                        onClick={handleClick}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="20"
                                            height="20"
                                            fill="white"
                                            className="ms-2"
                                        >
                                            <path d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05 2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17z" />
                                        </svg>
                                    </button>

                                </h3>

                                {(isClicked || isVisible) && (
                                    <div
                                        className="position-absolute end-0 mt-2 bg-white border rounded shadow"
                                        style={{
                                            minWidth: "150px",
                                            zIndex: 1000
                                        }}
                                    >
                                        <button
                                            className="dropdown-item"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}

                            </div>

                        ) : (

                            <button
                                className="btn btn-outline-light rounded-0"
                                onClick={() => navigate("/login")}
                            >
                                Sign in with GitHub
                            </button>

                        )}

                    </div>

                )}

            </div>

        </nav>
    );
}

export default Navbar;
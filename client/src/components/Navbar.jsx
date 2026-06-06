import './Navbar.css';
import { useEffect, useState, useRef } from "react";
import api from '../services/api';

function Navbar() {

    const [isLogin, setIsLogin] = useState(false);

    const [user, setUser] = useState(null);

    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const timerRef = useRef(null);


    async function fetchUser() {
        const token = localStorage.getItem("authToken");

        const response = await api.get("/api/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setUser(response.data);
        setIsLogin(true);
        console.log(response.data);

    }


    useEffect(() => {
        fetchUser();
    }, []);



    function clearTimer() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }

    async function handleClick() {

        clearTimer();
        if (!isClicked) {
            timerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 2500);
        }


    }

    async function handleMouseEnter() {
        clearTimer();
        setIsVisible(true);
    }

    async function handleMouseLeave() {
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

    return (
        <div>
            <div className="nav-brand">
                <span className="logo-dot"></span>
                <h1>PRReview.ai</h1>
            </div>

            {isLogin ? (
                <div>
                    <div>
                        <h3>
                            {user?.username}
                            <button onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleClick}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="down-arrow">
                                    <g>
                                        <path d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05 2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17z"></path>
                                    </g>
                                </svg>

                            </button></h3>

                        {(isClicked || isVisible) && <div>
                            <h6>logout</h6>
                        </div>
                        }

                    </div>
                </div>
            ) : (
                <button className="nav-button">
                    Sign in with GitHub
                </button>
            )}
        </div>


    );
}

export default Navbar;
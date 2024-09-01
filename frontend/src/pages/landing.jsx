import React from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {

    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>Meet-Up</h2>
                </div>
                <div className='navlist'>
                    <p onClick={() => {
                        router("/ajsg");
                    }}>Join as Guest</p>
                    <p onClick={() => {
                        router("/auth");
                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth");
                    }} role='button' > <p> Login </p> </div>
                </div>
            </nav>

            <div className='landingMainContainer'>
                <div>
                    <h1><span style={{color: "#FF9839"}}> Connect </span> with your <br/> Loved Ones</h1>
                    <p>Cover Distance by Meet-Up</p>
                    <div role='button'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>
                    <img src='/mobile.png' alt='' />
                </div>
            </div>

        </div>
    );
}
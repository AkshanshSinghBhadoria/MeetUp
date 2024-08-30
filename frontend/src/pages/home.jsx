import React, { useState } from "react";
import withAuth from '../utils/withAuth'
import { useNavigate } from "react-router-dom";
import '../App.css'
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    let handleJoinVideoCall = async () => {
        navigate(`/${meetingCode}`);
    }

    return (
        <>
           <div className="navBar">
              <div style={{ display: "flex", alignItems: "center" }}>
                 <h2>Meet-Up</h2>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={
                        () => {
                            navigate("/history")
                        }}>
                        <RestoreIcon />
                    </IconButton>

                    <p style={{marginRight: "20px"}}>History</p>

                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                        }}>
                        Logout
                    </Button>
                </div>
           </div>

           <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h1>Providing Quality Video Call Just Like Quality Education</h1>

                        <div style={{ display: 'flex', gap: "10px", marginTop: "10px" }}>

                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                            <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>

                        </div>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img srcSet='\logo3.png' alt="" />
                </div>
            </div>
        </>
    );
}

export default withAuth(HomeComponent);
import React, { useState } from "react";
import { io } from "socket.io-client";
import './golive.css'
import axios from 'axios';

const Golive = () => {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('Offline')
  const [btnstatus, setBtnstatus] = useState('Go Live!')
  const [doctors, setDoctors] = useState([
    { 'auth': 1,
    'charge': "₹700",
    'docid': 11111111,
    'rating': 5,
    'role': "doctor",
    'specialization': "Physiology",
    '_id': "614d69958da3349390f1091e" 
    },
    { 'auth': 2,
    'charge': "₹700",
    'docid': 11111112,
    'rating': 5,
    'role': "doctor",
    'specialization': "Physiology",
    '_id': "614d69958da3349390f1091e" 
    },
    { 'auth': 3,
    'charge': "₹700",
    'docid': 11111113,
    'rating': 5,
    'role': "doctor",
    'specialization': "Physiology",
    '_id': "614d69958da3349390f1091e" 
    },
  ])

  const handleClick = () => {
    setStatus(status === 'Offline' ? 'Online' : 'Offline');
    setBtnstatus(btnstatus === 'Go Live!' ? 'Stop' : 'Go Live!');

    if (btnstatus === 'Go Live!') {
      const socket = io("https://live-socket-server.herokuapp.com", {  
        path: "/go-live/",
        query: {
          AuthData: token
        }
      });
      socket.io.on("error", (error) => {
        console.log(error);
      });
    } else {
      window.open("https://socket-client-one.vercel.app", "_self");
      window.close();
    }
  }

  const getOnlineDoctors = () => {
    axios.get('https://live-socket-server.herokuapp.com/getlivedoctors').then(res => {
      console.log(res.data)
      setDoctors(res.data.docs)
    })
  }

  return (
    <div className="main">
      <div className="div1">
        <h2> {status}</h2>
        <h4> Enter Live Token here! </h4>
        <input 
        type="text" 
        className="Token" 
        placeholder="live token"
        value={token} 
        onChange={ (e) => { setToken(e.target.value) } }>
        </input>
        <button type="button" className="btn" onClick={handleClick}>
          {btnstatus}
        </button>
      </div>
      <div> 
      
        <button type="button" className="btn" onClick={getOnlineDoctors}>
        Get Online Doctors
        </button>
        
        {doctors.map((doctor) => {
        const { docid, auth } = doctor;
        return (
          <li key={auth} className='item'>
            {docid}
          </li>
        );
      })}

      </div>
    </div>
  );
}

export default Golive;

//new updated token
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOm51bGwsImlhdCI6MTYzMjM4NTI1Mywicm9sZSI6ImRvY3RvciIsImV4cCI6MTYzMjY0NDQ1Mywic3BlY2lhbGl6YXRpb24iOiJQaHlzaW9sb2d5IiwiY2hhcmdlIjoi4oK5NzAwIiwicmF0aW5nIjoiNSJ9.Rm0dvZlvmnmBgeH1LHe8bkc_FpEJSfZjwmi8u6CDQzI

//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTM2Zjg0MmY4ZTcxZjNmMmNkYWYxZmIiLCJpYXQiOjE2MzE1MjA2MTEsInJvbGUiOiJkb2N0b3IiLCJkb2NpZCI6Ijc3ODk0MDI5IiwiZXhwIjoxNjM1NDA4NjExfQ.mEqc2eJ4uZevRuQbYc-oECYCdrrR08yvpMou0b94y3U'

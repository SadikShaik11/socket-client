import { io } from "socket.io-client";
import './App.css';

const socket = io("http://localhost:5000", {
  query: {
    AuthData: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTM2Zjg0MmY4ZTcxZjNmMmNkYWYxZmIiLCJpYXQiOjE2MzE1MjA2MTEsInJvbGUiOiJkb2N0b3IiLCJkb2NpZCI6Ijc3ODk0MDI5IiwiZXhwIjoxNjM1NDA4NjExfQ.mEqc2eJ4uZevRuQbYc-oECYCdrrR08yvpMou0b94y3U'
  }
});

function App() {
  return (
    <div className="App">
      <p>
        Hello World
      </p>
    </div>
  );
}

export default App;

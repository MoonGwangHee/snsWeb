import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
    .then(response => response.text())
    .then(data => setMessage(data))
    .catch(error => console.error("Error : ", error));
  }, []);

  return (
    <div>
      <h1>React + Spring Boot 연동</h1>
      <p>백엔드 응답 : {message}</p>
    </div>
  );
}

export default App;

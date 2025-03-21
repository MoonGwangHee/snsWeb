import React, { useState } from "react";
import axios from 'axios';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            username : username,
            password : password,
        };

      
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', loginData, {
                Headers: {
                    'Content-Type' : 'application/json',                
                },
            });

            if (response.status === 200) {
                console.log('로그인 성공');
            }
        } catch (error) {
            console.error('로그인 실패: ' , error.response.data);
        }
        
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디 : </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
    
                <div>
                    <label>비밀번호 : </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
    
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};


export default Login;
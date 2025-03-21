import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        fetchUserInfo();
    }, []);

    
    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem("token");
            if(!token) {
                navigate("/login");
                return;
            }

            const response = await fetch("http://localhost:8080/api/user/me", {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type" : "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("사용자 정보를 가져오는데 실패했습니다.");
            }

            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error: ", error);
            navigate("/login");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!user) {
        return <p>로딩 중...</p>
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">📊 대시보드</h2>

                <div className="p-4 border rounded-lg text-center bg-gray-50">
                    <p className="text-lg font-semibold">{user.username}님 환영합니다!</p>
                    <p className="text-gray-600">{user.email}</p>
                </div>

                <button
                    onClick={handleLogout}
                    className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
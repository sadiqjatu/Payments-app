import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import API from "../api";

function Dashboard(){
    const [balance, setBalance] = useState("0");
    const [userInfo, setUserInfo] = useState({
        username: "",
        firstName: "",
        lastName: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast();

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        const fetchData = async() => {
            setLoading(true);
            try{
                const balanceRes = await API.get("/api/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userRes = await API.get("/api/v1/user/info", {
                    headers: {
                            Authorization: `Bearer ${token}`
                        }
                });

                setLoading(false);
                setBalance(balanceRes.data.balance);
                setUserInfo(userRes.data);
            }catch(err){
                setLoading(false);
                navigate("/signin", { replace: true });
                showToast("Session expired. Please login again.", "error");
                console.log(err.response?.data?.message || err.message );
            }
        };

        fetchData();
    }, [balance]);

    return (
        <div className="">
            {loading? <div className="h-screen w-screen flex justify-center items-center bg-transparent"> <div className="h-8 w-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div></div>: ""}
            <Appbar userInfo={userInfo} />
            <Balance balance={balance}/>
            <Users />
        </div>
    );      
}

export {Dashboard};
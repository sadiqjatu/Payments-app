import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import {useEffect, useState} from "react";
import axios from "axios";
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
    const navigate = useNavigate();
    const { showToast } = useToast();

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        const fetchData = async() => {
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

                setBalance(balanceRes.data.balance);
                setUserInfo(userRes.data);
            }catch(err){
                navigate("/signin", { replace: true });
                showToast("Session expired. Please login again.", "error");
                console.log(err.response?.data?.message || err.message );
            }
        };

        fetchData();
    }, [balance]);

    return (
        <div className="">
            <Appbar userInfo={userInfo} />
            <Balance balance={balance}/>
            <Users />
        </div>
    );      
}

export {Dashboard};
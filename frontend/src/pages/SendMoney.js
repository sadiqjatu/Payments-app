import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

function SendMoney(){
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const user  = location.state.user || {};
    const { showToast } = useToast();

    const handleInputChange = (e) => {
        setAmount(e.target.value)
    }

    const handleTransfer = async() => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try{
            const response = await axios.post("http://localhost:8080/api/v1/account/transfer", {
                amount: amount,
                to: user._id
                },{
                    headers: { Authorization: `Bearer ${token}`}
                });
            setLoading(false);
            showToast(`${amount} INR transfered to ${user.firstName} ${user.lastName} successfully`, "success");
            navigate("/dashboard");
        }catch(err){
            showToast(`${err.response.data.message}`, "error");
            setLoading(false);
        }
    }

    return (
        <div className="bg-neutral-200 h-screen flex justify-center items-center">
            <div className="w-96 h-auto bg-white p-8 shadow-xl rounded-lg">
                <div className="text-3xl font-extrabold my-4 flex justify-center items-center">
                    Send Money
                </div>

                <div className="flex justify-left mt-16">
                    <div className="flex justify-center items-center space-x-4">
                        <div className="size-12 rounded-full bg-green-500 flex justify-center items-center text-white text-2xl">
                            {user.firstName[0].toUpperCase()}
                        </div>
                        <div className="text-2xl font-semibold">
                            {user.firstName + " " + user.lastName}
                        </div>
                    </div>
                </div>

                <div className="mt-2 space-y-2">
                    <label htmlFor="amount" className="font-semibold">Amount (in Rs)</label>
                    <input onChange={handleInputChange} type="number" value={amount} className="px-2 py-1 border-2 rounded-lg w-full font-bold text-3xl" id="amount" min={1}/>
                </div>

                <div>
                    <button onClick={handleTransfer} className="w-full bg-green-500 h-10 mt-4 rounded-lg text-white flex justify-center items-center">
                        { loading? <div className="h-8 w-8 border-4 border-t-transparent rounded-full animate-spin "></div> : "Initiate Transfer"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export {SendMoney};
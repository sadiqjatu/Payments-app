import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useEffect } from "react";
import API from "../api";

function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast();

    useEffect(()=>{
        //fetch the token from local storage
        const token = localStorage.getItem("token");
        //check if token exists
        if(token){
            showToast("User is already logged in", "success");
            navigate("/dashboard");
        }
    }, []);

    return (
        <div className="h-screen bg-neutral-500 flex justify-center items-center">
            <div className="bg-white w-96 h-auto flex flex-col justify-center items-center text-center p-8 rounded-lg">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"johndoe@example.com"} type={"email"}/>
                <InputBox onChange={(e) => {
                    setPassword(e.target.value);
                }} label={"Password"} type={"password"} />
                <Button onClick={async() =>{
                    setLoading(true);
                    try{
                        const response = await API.post("/api/v1/user/signin", {
                        username,
                        password
                        });
                        setLoading(false);
                        //store token in local storage
                        localStorage.setItem("token", response.data.token);
                        //display flash message
                        showToast("User Logged in successfully", "success");
                        //navigate to the dashboard page
                        navigate("/dashboard");
                    }catch(err){
                        // console.log(err.response.data.message);
                        setLoading(false);
                        showToast(`${err.response?.data?.message}`, "error");
                    }
                }} label={"Sign in"} loading={loading} />
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    );
}

export {Signin};
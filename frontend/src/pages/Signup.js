import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useEffect } from "react";
import API from "../api";

function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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

    return(
        <div className="h-screen bg-neutral-500 flex justify-center items-center font-sans">
           <div className="w-96 h-auto bg-white rounded-lg flex flex-col justify-center items-center p-8 text-center">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox onChange={(e) => {
                    setFirstName(e.target.value);
                }} label={"First Name"} placeholder={"John"} type={"text"} />
                <InputBox onChange={(e) => {
                    setLastName(e.target.value);
                }} label={"Last Name"} placeholder={"Doe"} type={"text"} />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"johndoe@example.com"} type={"email"} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value);
                }} label={"Password"} type={"password"} />
                <Button onClick={ async() => {
                    setLoading(true);
                    try{
                        const response = await API.post("/api/v1/user/signup",{
                        firstName,
                        lastName,
                        username,
                        password
                        });

                        setLoading(false);
                        localStorage.setItem("token", response.data.token);
                        
                        //flash success message
                        showToast("User Signed up successfully!", "success");
                        //navigate to the dashboard page
                        navigate("/dashboard");
                    }catch(err){
                        setLoading(false);
                        console.log(err.response?.data?.message);
                        showToast(`${err.response?.data?.message}`, "error");
                    }
                }} label={"Sign up"} loading={loading}/>
                <BottomWarning label={"Already have an account?"} buttonText={"Log in"} to={"/signin"} />
            </div>
        </div>
    );
}

export {Signup};
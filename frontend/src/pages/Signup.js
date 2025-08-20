import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
                    const response = await axios.post("http://localhost:8080/api/v1/user/signup",{
                        firstName,
                        lastName,
                        username,
                        password
                    });
                    localStorage.setItem("Token", response.data.token);
                    
                    //navigate to the dashboard page
                    navigate("/dashboard");
                }} label={"Sign up"}/>
                <BottomWarning label={"Already have an account?"} buttonText={"Log in"} to={"/signin"} />
            </div>
        </div>
    );
}

export {Signup};
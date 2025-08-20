import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../context/ToastContext";

function Me(){
    const navigate = useNavigate();
    const { showToast } = useToast();

    useEffect(()=> {
        const navigatePage = ()=> {
            //fetch the token
            const token = localStorage.getItem("token");
            if(!token){
                //navigate to signin page
                showToast("User is not logged in. Please log in", "info");
                navigate("/signin"); 
            }else{
            //navigate to dashboard page
                showToast("Welcome back to the payments app", "success");
                navigate("/dashboard");
            }
        }

        navigatePage();
    });
    
}

export {Me};
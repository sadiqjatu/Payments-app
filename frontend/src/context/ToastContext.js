//Creating a flash message component
import React, { createContext, useContext} from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//Creating a context
const ToastContext = createContext();

//Creating a custom hook to access the context
export const useToast = () => useContext(ToastContext);

//Create the ToastProvider Context
export const ToastProvider = ({ children }) => {
    //Define the showToast function
    const showToast = (message, type="success") => {
        toast[type](message);
    }

    //returning the provider + Toast Container
    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
            <ToastContainer 
                position="top-center"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="colored"
            />
        </ToastContext.Provider>
    )
}
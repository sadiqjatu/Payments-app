import Button from "./Button";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Users(){
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const limit = 5;
        //filtering users
        try{
            const filterUser = async() => {
                const response = await API.get("/api/v1/user/bulk?filter=" + `${filter}` + `&page=${pageNum}&limit=${limit}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
            }
            filterUser();
        }catch(err){
            console.log(err.response.data);
        }
    }, [filter, pageNum]);


    function handleChange(e, value){
        setPageNum(value);
    }

    return <div className="px-8">
        <div className="text-2xl font-bold pb-2">
            Users
        </div>
        <div className="pb-4">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users...." className="w-full border-2 rounded-lg px-2 py-1 border-slate-200"/>
        </div>
        <DisplayUsers users={users} totalPages={totalPages} pageNum={pageNum} handleChange={handleChange}/>
    </div>
}

function DisplayUsers({users, totalPages, pageNum, handleChange}){
    const navigate = useNavigate();
    return (
        <div>
            {users.map((user) => {
                return ( <div className="flex justify-between border-b-2 mb-2 pb-2">
                    <div className="flex items-center">
                        <div className="bg-gray-400/[0.8] flex justify-center items-center size-12 rounded-full">
                            {user.firstName[0]?.toUpperCase()}
                        </div>
                        <div className="text-xl pl-2">
                            {user.firstName + " " + user.lastName}
                        </div>
                    </div>

                    <div>
                        <Button onClick={(e, value) => { navigate(`/send`, { state: {user: user}}) }} label={"Send Money"}/>
                    </div>
                </div>
                )
            })}
            <div className="flex justify-center mt-6">
                <Pagination count={totalPages} size="large" page={pageNum} onChange={handleChange} showFirstButton showLastButton />
            </div>
        </div>
    )
}
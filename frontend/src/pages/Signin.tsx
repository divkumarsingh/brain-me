import { useRef } from "react"
import { Button } from "../components/ui/Button"
import { InputBox } from "../components/ui/InputBox"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Signin = () => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEND_URL}` + "/api/v1/signin" ,{
                username,
                password
        })
        const jwt = response.data?.token;
        localStorage.setItem("token", jwt );
        navigate("/dashboard");
       
    }

    return<div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-10">
            <InputBox ref={usernameRef} placeholder="Username"/>
            <InputBox ref={passwordRef} placeholder="Password"/>
            <div className="flex justify-center mt-4">
                <Button onClick={signin} variant="primary" size="md" text="Sign in" fullWidth={true} loading={false}/>
            </div>
        </div>

    </div>
}
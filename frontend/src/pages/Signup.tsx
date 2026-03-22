import { Button } from "../components/ui/Button"
import { InputBox } from "../components/ui/InputBox"


export const Signup = () => {
    return<div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-10">
            <InputBox placeholder="Username"/>
            <InputBox placeholder="Password"/>
            <div className="flex justify-center mt-4">
                <Button variant="primary" size="md" text="Sign up" fullWidth={true}/>
            </div>
        </div>

    </div>
}
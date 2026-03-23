

interface InputProps {
    placeholder: string;
    ref?: any;
}


export const InputBox = ({ref, placeholder}: InputProps) => {

    return<>
        <input placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-2 font-medium  bg-slate-300 opaq " ref={ref}></input>
    </>
}
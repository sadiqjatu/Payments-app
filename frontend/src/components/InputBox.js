export default function InputBox({label, placeholder, type, onChange, value}){
    return (
        <div className="flex flex-col w-80 mb-2">
            <label htmlFor="inputBox" className="font-semibold py-2 text-left">{label}</label>
            <input onChange={onChange} placeholder={placeholder} type={type} id="inputBox" className="border-gray border-2 rounded-lg h-10 pl-2"/>
        </div>
    );
}
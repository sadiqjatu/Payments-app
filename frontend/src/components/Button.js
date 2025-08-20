export default function Button({label, onClick}){
    return (
        <button onClick={onClick} className="bg-black text-white w-full h-10 rounded-lg my-2 p-4 flex justify-center items-center hover:bg-zinc-700">
            {label}
        </button>
    );
}
export default function Balance({balance}){
    return <div className="text-2xl font-bold px-8 py-4">
        <span>Your balance: Rs {balance.toLocaleString("en-IN")}</span>
    </div>
}
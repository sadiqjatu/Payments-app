import {Link} from "react-router-dom";

export default function BottomWarning({label, buttonText, to}){
    return (
        <div className="flex font-medium py-2">
            <div className="mr-2">
                {label}
            </div>
            <Link className="underline" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}


export default function BaseButton({text,onClick,btnStyle,type}){
    return(
        <div>
            <button
            type = {type}
            onClick={onClick}
            className={` ${btnStyle ? btnStyle : 'bg-red-600 hover:bg-red-700'} transition duration-300 ease-in-out px-4 py-2 text-white text-lg shadow-[4px_4px_11px_rgba(0,0,0,0.2)] `}>{text}
            </button>
        </div>
    );
}
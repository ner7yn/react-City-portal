

export default function BaseButton({text,btnStyle}){
    return(
        <div>
            <button className={` ${btnStyle ? btnStyle : 'bg-red-600 hover:bg-red-700'} transition duration-300 ease-in-out px-4 py-2 text-white text-lg shadow-lg rounded `}>{text}</button>
        </div>
    );
}
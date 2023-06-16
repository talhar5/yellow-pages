import { useNavigate } from "react-router-dom"

export default function CreateButton() {
    const navigate = useNavigate();
    function handleClickCreate() {
        navigate('/create')
    }
    return (
        <div
            onClick={handleClickCreate}>
            <div
                className='
            border border-1 
            rounded-md 
            p-3 
            shadow-sm 
            hover:-translate-y-1 
            duration-200
            hover:bg-gray-100
            cursor-pointer
            '>
                <button

                >Create New</button>
            </div>
        </div>
    )
}

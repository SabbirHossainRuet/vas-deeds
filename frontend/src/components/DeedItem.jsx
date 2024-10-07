import { Link } from "react-router-dom"


const DeedItem = ({ id, name, date }) => {
    return (
        <Link
            className="" to={`/deed/${id}`}>
            <div className="border mt-5 border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white hover:bg-gray-300">
                <div className="p-5 flex flex-col items-center justify-center">
                    <p className="text-xl font-bold text-gray-600 mb-2">{id}</p>
                    <h3 className="text-md font-semibold text-gray-500 mb-3">{name}</h3>
                    <p className="text-gray-700">{date}</p>
                </div>
            </div>
        </Link>
    )
}

export default DeedItem
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { DeedContext } from "../context/DeedContext";

const Deed = () => {
    const { deedId } = useParams();
    const { deeds } = useContext(DeedContext);
    const [ deedsData, setDeedsData ] = useState(false);

    const fetchDeedData = async () => {
        deeds.map((item) => {
            if (item._id === deedId) {
                setDeedsData(item);
                return null;
            }
        })
    }

    useEffect(() => {
        fetchDeedData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deedId, deeds])

    console.log(deedsData);

    return deedsData ? (
        <div className="border-t-2 pt-10 translate-opacity ease-in duration-500 opacity-100">
            <div className='flex-1'>
                <h1 className='font-medium text-2xl mt-2'>{deedsData.name}</h1>
                <p>{deedsData._id}</p>
                <p>{deedsData.date}</p>
                <div className="flex items-center mt-5 gap-20">
                    <button className='border bg-green-700 text-white py-3 px-8 text-sm hover:bg-green-300  hover:text-green-950'>DOWNLOAD</button>
                    <button className='border bg-green-700 text-white py-3 px-8 text-sm hover:bg-green-300 hover:text-green-950'>UPLOAD</button>
                </div>
                <hr className='mt-8 w-full' />
            </div>

            
        </div>
    ) : <div className='opacity-0'></div>
}

export default Deed
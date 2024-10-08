// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom"
// import { DeedContext } from "../context/DeedContext";

// const Deed = () => {
//     const { deedId } = useParams();
//     const { deeds } = useContext(DeedContext);
//     const [ deedsData, setDeedsData ] = useState(false);

//     const fetchDeedData = async () => {
//         deeds.map((item) => {
//             if (item._id === deedId) {
//                 setDeedsData(item);
//                 return null;
//             }
//         })
//     }

//     useEffect(() => {
//         fetchDeedData();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [deedId, deeds])

//     console.log(deedsData);

//     return deedsData ? (
//         <div className="border-t-2 pt-10 translate-opacity ease-in duration-500 opacity-100">
//             <div className='flex-1'>
//                 <h1 className='font-medium text-2xl mt-2'>{deedsData.name}</h1>
//                 <p>{deedsData._id}</p>
//                 <p>{deedsData.date}</p>
//                 <div className="flex items-center mt-5 gap-20">
//                     <button className='border bg-green-700 text-white py-3 px-8 text-sm hover:bg-green-300  hover:text-green-950'>DOWNLOAD</button>
//                     <button className='border bg-green-700 text-white py-3 px-8 text-sm hover:bg-green-300 hover:text-green-950'>UPLOAD</button>
//                 </div>
//                 <hr className='mt-8 w-full' />
//             </div>
//         </div>
//     ) : <div className='opacity-0'></div>
// }

// export default Deed



///NEW VERSION

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DeedContext } from "../context/DeedContext";
import { uploadDeed, downloadDeed } from '../api';

const Deed = () => {
    const { deedId } = useParams();
    const { deeds } = useContext(DeedContext);
    const [deedsData, setDeedsData] = useState(null);  // Updated from `false` to `null`
    const [file, setFile] = useState(null);

    // Fetch the deed data based on the deedId from the context
    const fetchDeedData = () => {
        const deed = deeds.find(item => item._id === deedId);
        if (deed) {
            setDeedsData(deed);
        }
    };

    useEffect(() => {
        fetchDeedData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deedId, deeds]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // const handleUpload = async () => {
    //     if (!file) {
    //         alert("Please select a file to upload.");
    //         return;
    //     }

    //     try {
    //         const response = await uploadDeed(deedsData._id, file);
    //         const uploadedFileId = response.fileId;  // Extract the fileId from the response

    //         // Update deedsData with the new fileId
    //         setDeedsData((prevData) => ({
    //             ...prevData,
    //             fileId: uploadedFileId  // Save the fileId for future downloads
    //         }));

    //         console.log("File uploaded successfully:", response);
    //         alert("File uploaded successfully!");
    //     } catch (error) {
    //         console.error("Error uploading file:", error);
    //         alert("Error uploading file.");
    //     }
    // };

    // const handleDownload = async () => {
    //     try {
    //         // Use fileId for downloading
    //         const fileId = deedsData.fileId;
    //         console.log(deedsData);
    //         if (!fileId) {
    //             alert("No file available for download.");
    //             return;
    //         }

    //         const response = await downloadDeed(fileId);  // Download using fileId, not _id
    //         console.log(response);
    //         const url = window.URL.createObjectURL(new Blob([response]));
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.setAttribute('download', `${fileId}-deed.pdf`);  // Use fileId in the filename
    //         document.body.appendChild(a);
    //         a.click();
    //         a.remove();
    //         alert("File downloaded successfully!");
    //     } catch (error) {
    //         console.error("Error downloading file:", error);
    //         alert("Error downloading file.");
    //     }
    // };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
    
        try {
            const response = await uploadDeed(deedId, file); // Pass the deedId directly
            const uploadedFileId = response.fileId;  // Extract the fileId from the response
    
            // Update the deeds data in context if needed
            setDeedsData((prevData) => ({
                ...prevData,
                fileId: uploadedFileId  // Save the fileId for future downloads
            }));
    
            console.log("File uploaded successfully:", response);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file.");
        }
    };
    
    const handleDownload = async () => {
        try {
            // Fetch the deed information from your backend
            const response = await downloadDeed(deedId); // Make sure this fetches fileId from backend
            const fileId = response.fileId; // Extract the fileId from the response
            console.log(fileId);
            if (!fileId) {
                alert("No file available for download.");
                return;
            }
            
            // Now use fileId to download the actual file
            const fileResponse = await downloadDeed(fileId); // Ensure this call downloads the actual file
            const url = window.URL.createObjectURL(new Blob([fileResponse.data])); // Adjust depending on how your backend returns file data
            const a = document.createElement('a');
            a.href = url;
            a.setAttribute('download', `${fileId}-deed.pdf`);  // Use fileId in the filename
            document.body.appendChild(a);
            a.click();
            a.remove();
            alert("File downloaded successfully!");
        } catch (error) {
            console.error("Error downloading file:", error);
            alert("Error downloading file.");
        }
    };
    
    

    return deedsData ? (
        <div className="border-t-2 pt-10 translate-opacity ease-in duration-500 opacity-100">
            <div className="flex-1">
                <h1 className="font-medium text-2xl mt-2">{deedsData.name}</h1>
                <p>{deedsData._id}</p>
                <p>{deedsData.date}</p>
                <input type="file" onChange={handleFileChange} />
                <div className="flex items-center mt-5 gap-20">
                    <button
                        className="border bg-green-700 text-white py-3 px-8 text-sm hover:bg-green-300 hover:text-green-950"
                        onClick={handleDownload}
                    >
                        DOWNLOAD
                    </button>
                    <button
                        className="border bg-green-700 text-white py-3 px-8 text-sm hover:bg-green-300 hover:text-green-950"
                        onClick={handleUpload}
                    >
                        UPLOAD
                    </button>
                </div>
                <hr className="mt-8 w-full" />
            </div>
        </div>
    ) : <div className="opacity-0"></div>;
};

export default Deed;


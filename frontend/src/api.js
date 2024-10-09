// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/deeds';

export const uploadDeed = async (id, file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/upload/${id}`, formData);
    console.log('Hello', response.data.fileId);
    return response.data;
};

export const downloadDeed = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/download/${id}`);
        return response;
    } catch (error) {
        console.error("Error downloading deed:", error.response ? error.response.data : error.message);
        throw error; 
    }
};




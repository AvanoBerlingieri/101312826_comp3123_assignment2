import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export async function getEmpById(id) {
    const res = await axios.get(`${API}/emp/employees/${id}`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;

}

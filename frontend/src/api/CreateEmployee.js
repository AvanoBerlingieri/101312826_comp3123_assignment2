import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export async function createEmp(data) {
    const res = await axios.post(`${API}/emp/employees`, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;

}

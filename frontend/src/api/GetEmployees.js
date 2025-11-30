import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export async function getEmp(params) {
    const res = await axios.get(`${API}/emp/employees`, {
        withCredentials: true,
        headers: {"Content-Type": "application/json",},
        params: params
    });
    return res.data;
}
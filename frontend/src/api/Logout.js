import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export async function logoutUser() {
    const res = await axios.post(`${API}/user/logout`, {},
        {
        withCredentials: true
    });
    return res.data;
}
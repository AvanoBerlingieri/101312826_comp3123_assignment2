import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export async function deleteEmp(id) {
    const res = await axios.delete(`${API}/emp/employees/${id}`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;

}

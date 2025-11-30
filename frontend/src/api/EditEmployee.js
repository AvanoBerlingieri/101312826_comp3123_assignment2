import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export async function editEmp(id, employeeData) {
    const res = await axios.put(`${API}/emp/employees/${id}`, employeeData, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
}

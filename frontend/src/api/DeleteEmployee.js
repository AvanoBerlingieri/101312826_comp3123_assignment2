const API = process.env.REACT_APP_API_URL;

export async function deleteEmp(id) {
    const res = await fetch(`${API}/emp/employees/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    });
    return res.json();
}
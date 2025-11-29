const API = process.env.REACT_APP_API_URL;

export async function createEmp(data) {
    const res = await fetch(`${API}/emp/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}
const API = process.env.REACT_APP_API_URL;

export async function loginUser(data) {
    const res = await fetch(`${API}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}
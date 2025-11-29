const API = process.env.REACT_APP_API_URL;

export async function signupUser(data) {
    const res = await fetch(`${API}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}
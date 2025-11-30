const API = process.env.REACT_APP_API_URL;

export async function getEmpById(id) {
    const url = `${API}/emp/employees/${id}`;
    console.log("GET EMPLOYEE URL:", url);

    const res = await fetch(url);

    // Log the raw response before attempting JSON
    console.log("RAW RESPONSE STATUS:", res.status);

    if (!res.ok) {
        // Log text response for debugging
        const text = await res.text();
        console.error("SERVER RESPONSE:", text);
        throw new Error("Failed to fetch employee");
    }

    return res.json();
}

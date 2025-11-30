const API = process.env.REACT_APP_API_URL;

export async function editEmp(id, employeeData) {
    const res = await fetch(`${API}/emp/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeData)
    });

    return res.json();
}

const API = process.env.REACT_APP_API_URL;

export async function searchEmployees(criteria) {
    const {department, position} = criteria;
    const query = new URLSearchParams();

    if (department) query.append("department", department);
    if (position) query.append("position", position);

    const res = await fetch(`${API}/emp/employees/search?${query.toString()}`, {
        method: "GET",
        credentials: "include"
    });
    return res.json();
}

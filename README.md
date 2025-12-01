## COMP3123 Assignment 1
### Name: Avano Berlingieri
### Student ID: 101312826
Full Stack Development - Assignment 2

This project is a full-stack employee management app
It allows users to manage employees through a clean and responsive UI. 
The backend is hosted on Render and the frontend is deployed on Vercel.

### Authentication
when Users login with they get JWT tokens stored in secure HTTP-Only cookies.
Cookies persist for 24 hrs before they expire
When a user logs out their token cookie is cleared from the browser

### Session Management
Web pages and apis only allow access to users logged in that are authorized
sessions are managed by cookies so users can stay logged in and persist their session

### Users
Users can login through the home page or signup and create an account in the signup page

### Employee Management
You can:
    Add new employees
    View all employees in a structured table
    Edit existing employee details
    Delete employees
    Search for employees by department or position

Link to deployed app: https://101312826-comp3123-assignment2.vercel.app/
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import router from "./Routes/Routes"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/styles/main.css"
import "bootstrap/js/dist/offcanvas.js"
import "bootstrap/js/dist/dropdown.js"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)

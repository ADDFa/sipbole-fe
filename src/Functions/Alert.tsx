import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Confirm, Info, PopUp } from "../@types/Functions/Alert"

class Alert {
    private static mySwal = withReactContent(Swal)

    static PopUp(options: PopUp) {
        return this.mySwal.mixin({
            ...options,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            icon: "success",
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer
                toast.onmouseleave = Swal.resumeTimer
            }
        })
    }

    static Info(options: Info) {
        return this.mySwal.mixin({
            ...options,
            icon: "info"
        })
    }

    static Confirm(options?: Confirm) {
        return this.mySwal.mixin({
            icon: "warning",
            title: "Hapus Data?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
            ...options
        })
    }
}

export default Alert

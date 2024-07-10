import { SweetAlertOptions } from "sweetalert2"
import { ReactElementOr } from "sweetalert2-react-content"

interface PopUp extends SweetAlertOptions {
    title: string
}

interface Info extends SweetAlertOptions {
    title: string
    text?: string
    html?: ReactElementOr<"html">
}

interface Confirm extends SweetAlertOptions {}

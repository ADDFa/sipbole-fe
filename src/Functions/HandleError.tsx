import Alert from "./Alert"

class HandleError {
    private data: any

    constructor(data: any) {
        this.data = data
    }

    public show() {
        if ("errors" in this.data) {
            const errors = this.data.errors

            for (const name in errors) {
                const el = document.querySelector(`[name="${name}"]`)
                if (el && !el.classList.contains("is-invalid")) {
                    el.classList.add("is-invalid")

                    const eEl = document.createElement("p")
                    eEl.classList.add("invalid-feedback")
                    eEl.textContent = errors[name]

                    el.parentElement?.appendChild(eEl)

                    const elListener = () => {
                        el.classList.remove("is-invalid")
                        eEl.remove()
                        el.removeEventListener("input", elListener)
                    }
                    el.addEventListener("input", elListener)
                }
            }
        }

        if ("message" in this.data) {
            const message = this.data.message
            Alert.PopUp({ title: message }).fire({ icon: "warning" })
        }
    }
}

export default HandleError

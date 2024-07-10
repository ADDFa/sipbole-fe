import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useState } from "react"
import { FormControl, FormLabel } from "react-bootstrap"

const FormPassword: FC<FormPassword> = ({ label, name }) => {
    const [hidden, setHidden] = useState(true)

    const handleClick = () => {
        setHidden((curr) => !curr)
    }

    return (
        <div className="mb-3">
            <FormLabel htmlFor={name || "password"}>{label}</FormLabel>
            <div className="position-relative">
                <FormControl
                    id={name || "password"}
                    name={name || "password"}
                    type={hidden ? "password" : "text"}
                />
                <FontAwesomeIcon
                    icon={hidden ? faEye : faEyeSlash}
                    className="position-absolute end-0 translate-middle"
                    style={{ top: "19px" }}
                    onClick={handleClick}
                    role="button"
                />
            </div>
        </div>
    )
}

export default FormPassword

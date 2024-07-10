import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

const BackArrow = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }

    return (
        <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="text-warning fs-4"
            onClick={handleClick}
            title="Kembali"
            role="button"
        />
    )
}

export default BackArrow

import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(-1)
    }

    return (
        <Button variant="warning" onClick={handleClick}>
            Kembali
        </Button>
    )
}

export default BackButton

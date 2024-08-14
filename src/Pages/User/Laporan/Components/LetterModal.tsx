import Api from "Functions/Api"
import { FC } from "react"
import { Modal } from "react-bootstrap"

const LetterModal: FC<Report.LetterModal> = ({
    show,
    onHide,
    title,
    letter
}) => {
    return (
        <Modal show={show} onHide={onHide} className="text-dark" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <embed
                    src={`${Api.baseUrl}${letter}`}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                />
            </Modal.Body>
        </Modal>
    )
}

export default LetterModal

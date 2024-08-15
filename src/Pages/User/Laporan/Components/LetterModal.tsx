import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Api from "Functions/Api"
import { FC, Fragment, useState } from "react"
import { Modal } from "react-bootstrap"

const LetterModal: FC<Report.LetterModal> = ({ title, letter }) => {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    return (
        <Fragment>
            <button
                className={`btn btn-${letter ? "primary" : "secondary"}`}
                onClick={handleShow}
                disabled={!letter}
            >
                <FontAwesomeIcon icon={faFilePdf} />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                className="text-dark"
                size="lg"
            >
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
        </Fragment>
    )
}

export default LetterModal

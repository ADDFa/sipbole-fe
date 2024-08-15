import { faListCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, Fragment, useState } from "react"
import { Modal } from "react-bootstrap"

const LetterTextModal: FC<Report.LetterTextModal> = ({ text }) => {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    return (
        <Fragment>
            <button className="btn btn-primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faListCheck} />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                className="text-dark"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Laporan Kegiatan</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div dangerouslySetInnerHTML={{ __html: text }}></div>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default LetterTextModal

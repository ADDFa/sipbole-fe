import { FC } from "react"
import { Modal } from "react-bootstrap"

const LetterTextModal: FC<Report.LetterTextModal> = ({
    show,
    onHide,
    text
}) => {
    return (
        <Modal show={show} onHide={onHide} className="text-dark" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Laporan Kegiatan</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div dangerouslySetInnerHTML={{ __html: text }}></div>
            </Modal.Body>
        </Modal>
    )
}

export default LetterTextModal

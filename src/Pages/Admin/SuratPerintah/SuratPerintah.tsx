import {
    faArrowCircleRight,
    faCircleInfo,
    faEllipsisVertical,
    faFilePdf
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BackButton from "Components/BackButton"
import Api from "Functions/Api"
import Header from "Pages/Components/Header"
import { useEffect, useState } from "react"
import {
    Alert,
    Card,
    Col,
    Container,
    ListGroup,
    Row,
    Spinner
} from "react-bootstrap"
import { Link } from "react-router-dom"
import HapusSuratPerintah from "./HapusSuratPerintah"

const SuratPerintah = () => {
    const [warrants, setWarrants] = useState<Api.Data[]>()

    useEffect(() => {
        Api.get("warrant").then(async (res) => {
            const data = await res.json()
            setWarrants(data)
        })
    }, [])

    return (
        <Container>
            <Header>
                <h3>Sprint</h3>
            </Header>

            <main className="mt-5">
                <Card>
                    <Card.Header>
                        <Row className="align-items-center row-cols-2">
                            <Col>
                                <Card.Title className="mb-0 fs-4 fs-6">
                                    Surat Perintah
                                </Card.Title>
                            </Col>

                            <Col className="text-end">
                                <Link
                                    className="btn btn-primary me-1"
                                    to="/admin/surat-perintah/tambah"
                                    title="Kirim Surat Perintah"
                                >
                                    <span className="d-none d-lg-inline">
                                        Kirim Surat Perintah
                                    </span>{" "}
                                    <FontAwesomeIcon
                                        icon={faArrowCircleRight}
                                    />
                                </Link>
                                <BackButton />
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>
                        {warrants ? (
                            <ListGroup variant="flush">
                                {warrants.map(
                                    ({ id, type, letter_file_name }) => (
                                        <ListGroup.Item key={id}>
                                            <Row className="cols-2 align-items-center">
                                                <Col className="col-auto">
                                                    <FontAwesomeIcon
                                                        icon={faFilePdf}
                                                        color="#ED5D5D"
                                                        size="2x"
                                                    />
                                                </Col>
                                                <Col>
                                                    <h6 className="mb-0 fw-bold">
                                                        {letter_file_name}
                                                    </h6>
                                                    <p className="mb-0 fs-12">
                                                        {type}
                                                    </p>
                                                </Col>
                                                <Col className="col-auto">
                                                    <div className="dropdown dropstart">
                                                        <button
                                                            className="btn btn-light"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faEllipsisVertical
                                                                }
                                                                className="fs-4"
                                                            />
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <Link
                                                                    className="dropdown-item"
                                                                    to={`/admin/surat-perintah/${id}/edit`}
                                                                >
                                                                    Edit Surat
                                                                    Perintah
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <HapusSuratPerintah
                                                                    id={id}
                                                                    warrants={
                                                                        warrants
                                                                    }
                                                                    setWarrants={
                                                                        setWarrants
                                                                    }
                                                                />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )
                                )}
                            </ListGroup>
                        ) : (
                            <Spinner className="d-block mx-auto" />
                        )}

                        {warrants?.length === 0 && (
                            <Alert
                                variant="info"
                                className="text-center d-flex align-items-center justify-content-center gap-2"
                            >
                                <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    size="2x"
                                />
                                <span>Belum Ada Surat Perintah</span>
                            </Alert>
                        )}

                        <div className="mt-5 mb-3 d-flex gap-1 justify-content-end">
                            <BackButton />
                        </div>
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default SuratPerintah

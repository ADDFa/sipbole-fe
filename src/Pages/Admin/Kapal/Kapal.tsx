import Header from "Pages/Components/Header"
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
import boat from "../../../assets/images/boat.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCircleInfo,
    faEllipsisVertical
} from "@fortawesome/free-solid-svg-icons"
import BackButton from "Components/BackButton"
import { Fragment, useEffect, useState } from "react"
import Api from "Functions/Api"
import useImageSrc from "Hooks/useImageSrc"
import HapusKapal from "./HapusKapal"

const Kapal = () => {
    const [boats, setBoats] = useState<Api.Data[]>()
    const boatSrc = useImageSrc()

    useEffect(() => {
        Api.get("boat").then(async (res) => {
            const data = await res.json()
            setBoats(data)
        })
    }, [])

    const boatInfo = (number: string) => {
        return number.split(" - ")
    }

    return (
        <Container>
            <Header>
                <h3>Kapal</h3>
            </Header>

            <main className="mt-5">
                <Card>
                    <Card.Header>
                        <Row className="align-items-center row-cols-2">
                            <Col>
                                <Card.Title className="mb-0 fs-4 fs-6">
                                    Data Kapal
                                </Card.Title>
                            </Col>

                            <Col className="text-end">
                                <Link
                                    className="btn btn-primary me-1"
                                    to="/admin/kapal/tambah"
                                    title="Tambah Kapal"
                                >
                                    +{" "}
                                    <span className="d-none d-lg-inline">
                                        Tambah Kapal
                                    </span>
                                </Link>
                                <BackButton />
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>
                        {boats ? (
                            <Fragment>
                                <ListGroup variant="flush">
                                    {boats.map(({ id, number, picture }) => (
                                        <ListGroup.Item key={id}>
                                            <Row className="cols-2 align-items-center">
                                                <Col className="col-auto">
                                                    <img
                                                        src={boatSrc(
                                                            picture,
                                                            boat
                                                        )}
                                                        alt="User"
                                                        width={80}
                                                    />
                                                </Col>
                                                <Col>
                                                    <h6 className="mb-0 fw-bold">
                                                        {boatInfo(number)[0]}
                                                    </h6>
                                                    <p className="mb-0 fs-12">
                                                        {boatInfo(number)[1]}
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
                                                                    to={`/admin/kapal/${id}`}
                                                                >
                                                                    Detail Kapal
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    className="dropdown-item"
                                                                    to={`/admin/kapal/${id}/edit`}
                                                                >
                                                                    Edit Kapal
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <HapusKapal
                                                                    id={id}
                                                                    boats={
                                                                        boats
                                                                    }
                                                                    setBoats={
                                                                        setBoats
                                                                    }
                                                                />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Fragment>
                        ) : (
                            <Spinner className="m-auto d-block" />
                        )}

                        {boats?.length === 0 && (
                            <Alert
                                variant="info"
                                className="text-center d-flex align-items-center justify-content-center gap-2"
                            >
                                <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    size="2x"
                                />
                                <span>Belum Ada Kapal</span>
                            </Alert>
                        )}
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default Kapal

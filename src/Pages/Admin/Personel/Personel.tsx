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
import user from "../../../assets/images/user.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCircleInfo,
    faEllipsisVertical
} from "@fortawesome/free-solid-svg-icons"
import BackButton from "Components/BackButton"
import { Fragment, useEffect, useState } from "react"
import Api from "Functions/Api"
import HapusPersonel from "./HapusPersonel"
import useImageSrc from "Hooks/useImageSrc"

const Personel = () => {
    const [personels, setPersonels] = useState<Api.Data[]>()
    const personelImgSrc = useImageSrc()

    useEffect(() => {
        Api.get("user").then(async (res) => {
            const data = await res.json()
            setPersonels(data)
        })
    }, [])

    return (
        <Container>
            <Header>
                <h3>Personel</h3>
            </Header>

            <main className="mt-5">
                <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title className="mb-0">Data Personel</Card.Title>

                        <div>
                            <Link
                                className="btn btn-primary me-1"
                                to="/admin/personel/tambah"
                            >
                                + Tambah personel
                            </Link>
                            <BackButton />
                        </div>
                    </Card.Header>

                    <Card.Body>
                        {!personels && <Spinner className="mx-auto d-block" />}

                        <ListGroup variant="flush">
                            {personels && (
                                <Fragment>
                                    {personels.map(
                                        ({
                                            id,
                                            profile_picture,
                                            name,
                                            boat: { number }
                                        }) => (
                                            <ListGroup.Item key={id}>
                                                <Row className="cols-2 align-items-center">
                                                    <Col className="col-auto">
                                                        <img
                                                            src={personelImgSrc(
                                                                profile_picture,
                                                                user
                                                            )}
                                                            alt="User"
                                                            width={60}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <h6 className="mb-0 fw-bold">
                                                            {name}
                                                        </h6>
                                                        <p className="mb-0 fs-12">
                                                            {number}
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
                                                                        to={`/admin/personel/${id}/edit`}
                                                                    >
                                                                        Edit
                                                                        Personel
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <HapusPersonel
                                                                        id={id}
                                                                        personels={
                                                                            personels
                                                                        }
                                                                        setPersonels={
                                                                            setPersonels
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
                                </Fragment>
                            )}

                            {personels?.length === 0 && (
                                <Alert
                                    variant="info"
                                    className="text-center d-flex align-items-center justify-content-center gap-2"
                                >
                                    <FontAwesomeIcon
                                        icon={faCircleInfo}
                                        size="2x"
                                    />
                                    <span>Belum Ada Personel</span>
                                </Alert>
                            )}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default Personel

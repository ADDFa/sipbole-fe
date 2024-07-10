import { faPeopleGroup, faShip } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Api from "Functions/Api"
import { useEffect, useState } from "react"
import { CardBody, Col, Row } from "react-bootstrap"

const InfoAdmin = () => {
    const [info, setInfo] = useState<Api.Data>()

    useEffect(() => {
        Api.get("info").then(async (res) => {
            const data = await res.json()
            setInfo(data)
        })
    }, [])

    return (
        <section className="mt-5">
            <h3>Informasi</h3>

            <Row className="flex-column mt-3 text-body g-2">
                <Col>
                    <CardBody className="card">
                        <Row className="cols-2 g-4 align-items-center">
                            <Col className="col-auto">
                                <FontAwesomeIcon
                                    icon={faPeopleGroup}
                                    color="#ED9C5D"
                                    className="fs-1"
                                />
                            </Col>
                            <Col>
                                <h5 className="fw-bold mb-0">
                                    Jumlah Personel
                                </h5>
                                <h2 className="fw-bold">{info?.users}</h2>
                            </Col>
                        </Row>
                    </CardBody>
                </Col>
                <Col>
                    <CardBody className="card">
                        <Row className="cols-2 g-4 align-items-center">
                            <Col className="col-auto">
                                <FontAwesomeIcon
                                    icon={faShip}
                                    color="#A55DED"
                                    className="fs-1"
                                />
                            </Col>
                            <Col>
                                <h5 className="fw-bold mb-0">Jumlah Kapal</h5>
                                <h2 className="fw-bold">{info?.boats}</h2>
                            </Col>
                        </Row>
                    </CardBody>
                </Col>
            </Row>
        </section>
    )
}

export default InfoAdmin

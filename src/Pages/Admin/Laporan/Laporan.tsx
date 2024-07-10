import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BackArrow from "Components/BackArrow"
import BackButton from "Components/BackButton"
import Header from "Pages/Components/Header"
import {
    Card,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Row,
    Spinner
} from "react-bootstrap"
import FormYear from "./Components/FormYear"
import { Fragment, useCallback, useEffect, useState } from "react"
import Api from "Functions/Api"
import ReportTable from "./Components/ReportTable"
import Type from "./Components/Type"

const Laporan = () => {
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [type, setType] = useState<Letter>("Harkamtibmas")
    const [reports, setReports] = useState<Api.Data[]>()

    const getReports = useCallback((year: number, type: Letter) => {
        setReports(undefined)

        const path = new URL(Api.baseUrl)
        path.pathname = "api/activity-report"
        path.search = `year=${year}&type=${type}`

        Api.get(path).then(async (res) => {
            const data = await res.json()
            setReports(data)
        })
    }, [])

    useEffect(() => {
        getReports(year, type)
    }, [year, type])

    return (
        <Container>
            <Header>
                <h3>Laporan</h3>
            </Header>

            <main className="mt-5 print-hidden">
                <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>HASIL {type.toUpperCase()}</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body className="mt-4">
                        <Row className="align-items-center g-3">
                            <Col className="col-auto">
                                <FontAwesomeIcon
                                    icon={faFilter}
                                    className="text-secondary"
                                />
                            </Col>
                            <Col>
                                <Row className="align-items-center g-4">
                                    <Col className="col-auto">
                                        <Type type={type} setType={setType} />
                                    </Col>
                                    <Col className="col-auto">
                                        <FormYear
                                            year={year}
                                            setYear={setYear}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {reports ? (
                            <Fragment>
                                <ReportTable reports={reports} />

                                <div className="mt-4">
                                    <h6 className="fw-bold">Sasaran</h6>
                                    <ListGroup
                                        as="ol"
                                        numbered
                                        variant="flush"
                                        className="fs-14"
                                    >
                                        <ListGroupItem>
                                            Memberikan perlindungan, pengayoman
                                            dan pelayanan kepada masyarakat
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Mengantisipasi aktivitas illegal dan
                                            gangguan kamtibmas lainnya di
                                            perairan Provinsi Bengkulu
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Melaksanakan pertolongan dan
                                            pencarian (SAR) apabila terjadi laka
                                            air
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                            </Fragment>
                        ) : (
                            <Spinner className="d-block mx-auto" />
                        )}

                        <div className="d-flex justify-content-end gap-1 mt-4">
                            <BackButton />
                        </div>
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default Laporan

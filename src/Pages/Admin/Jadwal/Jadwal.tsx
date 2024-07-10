import { faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BackButton from "Components/BackButton"
import Calendar from "Components/Calendar"
import Api from "Functions/Api"
import Header from "Pages/Components/Header"
import { useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const Jadwal = () => {
    const [year, setYear] = useState<number>()
    const [month, setMonth] = useState<number>()
    const [schedules, setSchedules] = useState<CalendarMarks[]>()

    const onCalendarValue: OnCalendarValue = ({ year, monthIndex }) => {
        setYear(year)
        setMonth(monthIndex + 1)

        let month: string | number = monthIndex + 1
        month = month < 10 ? `0${month}` : month

        const path = new URL(Api.baseUrl)
        path.pathname = "api/schedule"
        path.search = `?year=${year}&month=${month}`

        Api.get(path).then(async (res) => {
            if (!res.ok) return

            const data: Record<string, any>[] = await res.json()
            const schedules: CalendarMarks[] = []
            data.forEach(({ date, description }) => {
                schedules.push({
                    title: description,
                    value: parseInt(date)
                })
            })

            setSchedules(schedules)
        })
    }

    return (
        <Container>
            <Header>
                <h3>Jadwal</h3>
            </Header>

            <main className="mt-5 print-hidden">
                <Card>
                    <Card.Header>
                        <Row className="align-items-center row-cols-2">
                            <Col>
                                <Card.Title className="mb-0 fs-4 fs-6">
                                    Jadwal Riksa Kapal
                                </Card.Title>
                            </Col>

                            <Col className="text-end">
                                <Link
                                    className="btn btn-primary me-1"
                                    to="/admin/jadwal/tambah"
                                    title="Tambah Jadwal Riksa Kapal"
                                >
                                    +{" "}
                                    <span className="d-none d-lg-inline">
                                        Tambah Jadwal Riksa Kapal
                                    </span>
                                </Link>
                                <BackButton />
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body className="mt-4">
                        <Calendar onValue={onCalendarValue} marks={schedules} />

                        <div className="d-flex justify-content-end">
                            <Link
                                to={`/admin/jadwal/edit?year=${year}&month=${month}`}
                                className="btn btn-warning d-flex align-items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faPen} />
                                <span>Edit</span>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default Jadwal

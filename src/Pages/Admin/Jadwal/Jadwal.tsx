import { faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BackButton from "Components/BackButton"
import Calendar from "Components/Calendar"
import Api from "Functions/Api"
import Header from "Pages/Components/Header"
import { useState } from "react"
import { Card, Container } from "react-bootstrap"
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
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title className="mb-0">
                            Jadwal Riksa Kapal
                        </Card.Title>

                        <div>
                            <Link
                                className="btn btn-primary me-1"
                                to="/admin/jadwal/tambah"
                            >
                                + Tambah Jadwal
                            </Link>
                            <BackButton />
                        </div>
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

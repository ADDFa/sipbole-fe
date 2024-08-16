import { months } from "App/Config"
import BackArrow from "Components/BackArrow"
import Calendar from "Components/Calendar"
import Api from "Functions/Api"
import Header from "Pages/Components/Header"
import { useState } from "react"
import { Card, Container } from "react-bootstrap"

const Jadwal = () => {
    const [schedules, setSchedules] = useState<CalendarMarks[]>([])

    const onCalendarValue: OnCalendarValue = ({ monthIndex, year }) => {
        const month = months[monthIndex]
        const url = new URL(Api.baseUrl)
        url.pathname = "api/report"
        url.search = `?year=${year}&month=${month}`

        Api.get(url).then(async (res) => {
            if (!res.ok) return

            const schedules: CalendarMarks[] = []
            const reports: Api.Data[] = await res.json()
            reports.map(({ date }) => {
                const value = parseInt(date)
                schedules.push({ value, title: "" })
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
                        <Card.Title className="mb-0 fs-4 fs-6">
                            Jadwal Riksa Kapal
                        </Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body className="mt-4">
                        <Calendar marks={schedules} onValue={onCalendarValue} />
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default Jadwal

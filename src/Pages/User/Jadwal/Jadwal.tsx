import BackArrow from "Components/BackArrow"
import Calendar from "Components/Calendar"
import Api from "Functions/Api"
import Header from "Pages/Components/Header"
import { useState } from "react"
import { Card, Container } from "react-bootstrap"

const Jadwal = () => {
    const [schedules, setSchedules] = useState<CalendarMarks[]>()

    const onCalendarValue: OnCalendarValue = ({ year, monthIndex }) => {
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
                        <Card.Title className="mb-0 fs-4 fs-6">
                            Jadwal Riksa Kapal
                        </Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body className="mt-4">
                        <Calendar onValue={onCalendarValue} marks={schedules} />
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default Jadwal

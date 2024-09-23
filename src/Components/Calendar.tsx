import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useEffect, useState } from "react"
import { Button, Col, Row } from "react-bootstrap"

export const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
]

export const date = new Date()

const Calendar: FC<Calendar> = ({ onClick, marks, onValue }) => {
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth())
    const [dateLength, setDateLength] = useState(0)
    const [dates, setDates] = useState<number[]>([])

    useEffect(() => {
        if (!marks) return

        const oldMarks = document.querySelectorAll(".calendar .active")
        oldMarks.forEach((mark) => {
            mark.classList.remove("active")
        })

        marks.map(({ value, title }) => {
            const className = `.date-${value}`
            const dateEl = document.querySelector(`.calendar ${className}`)
            dateEl?.classList.add("active")
            dateEl?.setAttribute("title", title)
        })
    }, [marks, dates])

    useEffect(() => {
        setDateLength(new Date(year, month + 1, 0).getDate())
        if (onValue) onValue({ monthIndex: month, year })
    }, [year, month])

    useEffect(() => {
        const updatedDates: number[] = []
        for (let i = 1; i <= dateLength; i++) {
            updatedDates.push(i)
        }
        setDates(updatedDates)
    }, [dateLength])

    const updatedDate = () => {
        setMonth(date.getMonth())
        setYear(date.getFullYear())
    }

    const downMonth = () => {
        date.setMonth(month - 1)
        updatedDate()
    }

    const upMonth = () => {
        date.setMonth(month + 1)
        updatedDate()
    }

    const handleClick = (value: number) => {
        if (onClick) onClick(value)
    }

    return (
        <div className="w-fit mx-auto">
            <h4 className="text-center fw-bold">
                {months[month]} {year}
            </h4>
            <Row className="align-items-center">
                <Col className="col-auto">
                    <Button onClick={downMonth}>
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </Button>
                </Col>
                <Col>
                    <div className="calendar p-3">
                        {dates.map((date) => (
                            <button
                                key={date}
                                onClick={() => handleClick(date)}
                                className={`date-${date}`}
                            >
                                {date}
                            </button>
                        ))}
                    </div>
                </Col>
                <Col className="col-auto">
                    <Button onClick={upMonth}>
                        <FontAwesomeIcon icon={faCaretRight} />
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Calendar

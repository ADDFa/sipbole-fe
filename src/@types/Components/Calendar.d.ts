interface CalendarMarks {
    value: string | number
    title: string
}

interface DateValue {
    monthIndex: number
    year: number
}

type OnCalendarValue = (value: DateValue) => void

interface Calendar {
    onClick?: (value: number) => void
    marks?: CalendarMarks[]
    onValue?: OnCalendarValue
}

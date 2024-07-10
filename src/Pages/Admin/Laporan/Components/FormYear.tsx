import {
    ChangeEventHandler,
    FC,
    Fragment,
    memo,
    useEffect,
    useState
} from "react"
import { FormSelect } from "react-bootstrap"

const FormYear: FC<Report.FormYear> = ({ year, setYear }) => {
    const [years, setYears] = useState<number[]>()

    useEffect(() => {
        const years: number[] = []

        for (let year = 2020; year < 2035; year++) {
            years.push(year)
        }
        setYears(years)
    }, [])

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setYear(parseInt(e.currentTarget.value))
    }

    return (
        <Fragment>
            {years && (
                <FormSelect
                    defaultValue={year}
                    onChange={handleChange}
                    id="year"
                >
                    {years.map((year) => (
                        <option value={year} key={year}>
                            {year}
                        </option>
                    ))}
                </FormSelect>
            )}
        </Fragment>
    )
}

export default memo(FormYear)

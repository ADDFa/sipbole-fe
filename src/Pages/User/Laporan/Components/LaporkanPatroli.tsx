import BackButton from "Components/BackButton"
import Alert from "Functions/Alert"
import Api from "Functions/Api"
import Auth from "Functions/Auth"
import useHandleSubmit from "Hooks/useHandleSubmit"
import { FormEventHandler, Fragment, lazy, useEffect, useState } from "react"
import {
    Button,
    Col,
    FormCheck,
    FormControl,
    FormLabel,
    FormSelect,
    Row,
    Spinner
} from "react-bootstrap"

const QuillSnowEditor = lazy(() => import("Components/QuillSnowEditor"))

const LaporkanPatroli = () => {
    const [reportedDate, setReportedDate] = useState("")
    const [activities, setActivities] = useState<Api.Data[]>()
    const [warrants, setWarrants] = useState<Api.Data[]>()
    const [user, setUser] = useState<Api.Data>()
    const [category, setCategory] = useState("file")
    const [reportText, setReportText] = useState("")

    useEffect(() => {
        const d = new Date()
        let date: string | number = d.getDate()
        date = date < 10 ? `0${date}` : `${date}`
        let month: string | number = d.getMonth() + 1
        month = month < 10 ? `0${month}` : `${month}`
        const updateReportedDate = `${d.getFullYear()}-${month}-${date}`
        setReportedDate(updateReportedDate)

        Api.get(`user/${Auth.userId}`).then(async (res) => {
            const data = await res.json()
            setUser(data)
        })

        Api.get("activity").then(async (res) => {
            const data = await res.json()
            setActivities(data)
        })
    }, [])

    useEffect(() => {
        Api.get("warrant").then(async (res) => {
            const data = await res.json()
            setWarrants(data)
        })
    }, [])

    const handleCategoryInput: FormEventHandler<HTMLInputElement> = (e) => {
        setCategory(e.currentTarget.value)
    }

    const addReport: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post("report", { body }).then((res) => {
            if (!res.ok) return

            Alert.PopUp({ title: "Laporan telah disimpan!" }).fire()
        })
    }
    const handleSubmit = useHandleSubmit(addReport)

    return (
        <Fragment>
            {user && activities && warrants ? (
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="boat_id" value={user.boat_id} />

                    <Row className="row-cols-1 row-cols-xl-2">
                        <Col className="mb-4">
                            <FormLabel>Jenis Kegiatan</FormLabel>
                            <Row className="g-2 row-cols-1">
                                {activities.map(({ id, activity }) => (
                                    <Col key={id}>
                                        <FormCheck
                                            value={id}
                                            label={activity}
                                            id={activity}
                                            name="activities[]"
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col className="mb-4">
                            <FormLabel htmlFor="warrant">
                                Surat Perintah
                            </FormLabel>
                            <FormSelect name="warrant_id" id="warrant">
                                {warrants.map(({ id, letter_file_name }) => (
                                    <option value={id} key={id}>
                                        {letter_file_name}
                                    </option>
                                ))}
                            </FormSelect>
                        </Col>
                        <Col className="mb-4">
                            <FormLabel htmlFor="execution_warrant">
                                Surat Perintah Pelaksanaan
                            </FormLabel>
                            <FormControl
                                name="execution_warrant"
                                id="execution_warrant"
                                type="file"
                                accept="application/pdf"
                            />
                        </Col>
                        <Col className="mb-4">
                            <FormLabel htmlFor="reported_date">
                                Tanggal Dilaporkan
                            </FormLabel>
                            <FormControl
                                name="reported_date"
                                id="reported_date"
                                type="date"
                                defaultValue={reportedDate}
                            />
                        </Col>
                        <Col className="mb-4">
                            <FormLabel className="d-block">
                                Jenis Laporan
                            </FormLabel>
                            <FormCheck
                                type="radio"
                                id="file"
                                className="form-check-inline"
                            >
                                <FormCheck.Input
                                    type="radio"
                                    name="category"
                                    value="file"
                                    defaultChecked
                                    onInput={handleCategoryInput}
                                />
                                <FormCheck.Label>
                                    Upload File Pdf
                                </FormCheck.Label>
                            </FormCheck>
                            <FormCheck
                                type="radio"
                                id="text"
                                className="form-check-inline"
                            >
                                <FormCheck.Input
                                    type="radio"
                                    name="category"
                                    value="text"
                                    onInput={handleCategoryInput}
                                />
                                <FormCheck.Label>Tulis Laporan</FormCheck.Label>
                            </FormCheck>
                        </Col>
                        <Col className="mb-4">
                            <FormLabel htmlFor="report">Laporan</FormLabel>
                            {category === "file" && (
                                <FormControl
                                    name="report"
                                    id="report"
                                    type="file"
                                    accept="application/pdf"
                                />
                            )}

                            {category === "text" && (
                                <Fragment>
                                    <input
                                        type="hidden"
                                        name="report_text"
                                        value={reportText}
                                    />
                                    <QuillSnowEditor
                                        value={reportText}
                                        onChange={setReportText}
                                    />
                                </Fragment>
                            )}
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end gap-1 mt-4">
                        <Button type="submit">Simpan</Button>
                        <BackButton />
                    </div>
                </form>
            ) : (
                <Spinner className="d-block mx-auto" />
            )}
        </Fragment>
    )
}

export default LaporkanPatroli

import BackArrow from "Components/BackArrow"
import BackButton from "Components/BackButton"
import QuillSnowEditor from "Components/QuillSnowEditor"
import Alert from "Functions/Alert"
import Api from "Functions/Api"
import Auth from "Functions/Auth"
import useHandleSubmit from "Hooks/useHandleSubmit"
import Header from "Pages/Components/Header"
import { FormEventHandler, useEffect, useState } from "react"
import {
    Button,
    Card,
    Col,
    Container,
    FormCheck,
    FormControl,
    FormLabel,
    Row,
    Spinner
} from "react-bootstrap"
import { Fragment } from "react/jsx-runtime"

const Laporkan = () => {
    const [reportedDate, setReportedDate] = useState("")
    const [category, setCategory] = useState("file")
    const [reportText, setReportText] = useState("")
    const [user, setUser] = useState<Api.Data>()

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
    }, [])

    const handleCategoryInput: FormEventHandler<HTMLInputElement> = (e) => {
        setCategory(e.currentTarget.value)
    }

    const handleDocumentationsInput: FormEventHandler<HTMLInputElement> = (
        e
    ) => {
        const container = e.currentTarget.parentElement!
        const files = e.currentTarget.files

        if (!files) return

        container.querySelectorAll(".file-name").forEach((e) => e.remove())

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const fileNameEl = document.createElement("span")
            const fileNameText = document.createTextNode(`"${file.name}" `)

            fileNameEl.append(fileNameText)
            fileNameEl.classList.add(
                "file-name",
                "mb-0",
                "mt-1",
                "fs-11",
                "text-primary"
            )

            container.appendChild(fileNameEl)
        }
    }

    const addReportSar: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post("report-sar", { body }).then((res) => {
            res.json().then((res) => console.log(res))
            if (!res.ok) return

            Alert.PopUp({ title: "Laporan telah disimpan!" }).fire()
        })
    }
    const handleSubmit = useHandleSubmit(addReportSar)

    return (
        <Container>
            <Header>
                <h3>Laporkan Kegiatan</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Laporkan Kegiatan SAR</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        {user ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="hidden"
                                    name="boat_id"
                                    value={user.boat_id}
                                />
                                <input
                                    type="hidden"
                                    name="type"
                                    value="Harkamtibmas"
                                />

                                <Row className="row-cols-1 row-cols-xl-2">
                                    <Col className="mb-4">
                                        <FormLabel htmlFor="execution_warrant">
                                            Surat Perintah Pelaksanaan
                                        </FormLabel>
                                        <FormControl
                                            type="file"
                                            name="execution_warrant"
                                            id="execution_warrant"
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
                                            <FormCheck.Label>
                                                Tulis Laporan
                                            </FormCheck.Label>
                                        </FormCheck>
                                    </Col>
                                    <Col className="mb-4">
                                        <FormLabel htmlFor="report">
                                            Laporan
                                        </FormLabel>
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
                                    <Col className="mb-4">
                                        <FormLabel htmlFor="documentations">
                                            Upload Dokumentasi Kegiatan
                                        </FormLabel>
                                        <FormControl
                                            type="file"
                                            multiple
                                            name="documentations[]"
                                            id="documentations"
                                            onInput={handleDocumentationsInput}
                                            accept="image/*"
                                        />
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-end gap-1 mt-4">
                                    <Button type="submit">Simpan</Button>
                                    <BackButton />
                                </div>
                            </form>
                        ) : (
                            <Spinner className="mx-auto d-block" />
                        )}
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default Laporkan

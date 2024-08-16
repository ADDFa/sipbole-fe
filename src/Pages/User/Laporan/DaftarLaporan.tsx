import {
    faInfoCircle,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BackArrow from "Components/BackArrow"
import BackButton from "Components/BackButton"
import Api from "Functions/Api"
import Header from "Pages/Components/Header"
import { ChangeEventHandler, useCallback, useEffect, useState } from "react"
import {
    Alert,
    Card,
    Col,
    Container,
    FormControl,
    FormLabel,
    Spinner
} from "react-bootstrap"
import { Link } from "react-router-dom"
import LetterModal from "./Components/LetterModal"
import LetterTextModal from "./Components/LetterTextModal"
import { months } from "App/Config"

const DaftarLaporan = () => {
    const [reports, setReports] = useState<Api.Data[]>()
    const [loading, setLoading] = useState(false)
    const [month, setMonth] = useState<string>()
    const [year, setYear] = useState<string>()

    const getReport = useCallback(() => {
        setLoading(true)

        if (!year && !month) {
            setLoading(false)
            return
        }

        const url = new URL(Api.baseUrl)
        url.pathname = "api/report"
        url.search = `?year=${year}&month=${month}`

        Api.get(url).then(async (e) => {
            const reports = await e.json()
            setReports(reports)
            setLoading(false)
            console.log(reports)
        })
    }, [year, month])

    useEffect(() => {
        if (!year || !month) setReports(undefined)
        getReport()
    }, [year, month])

    const handleMonthChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const input = e.currentTarget
        const dates = input.value.split("-")
        const monthIndex = parseInt(dates[1]) - 1

        setYear(dates[0])
        setMonth(months[monthIndex])
    }

    return (
        <Container>
            <Header>
                <h3>Laporkan Kegiatan</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Daftar Laporan</Card.Title>

                        <div className="d-flex align-items-center gap-2">
                            <BackArrow />
                            <Link
                                to="/laporkan-kegiatan"
                                className="btn btn-primary"
                            >
                                Laporkan Kegiatan
                            </Link>
                        </div>
                    </Card.Header>

                    <Col className="col-12 col-lg-6 col-xl-4 p-2">
                        <FormLabel>Pilih Bulan</FormLabel>
                        <FormControl
                            type="month"
                            onChange={handleMonthChange}
                        />
                    </Col>

                    <Card.Body>
                        {(!year || !month) && (
                            <Alert
                                variant="info"
                                className="d-flex align-items-center gap-2 justify-content-center col-12 col-lg-6 mx-auto"
                            >
                                <FontAwesomeIcon
                                    size="2x"
                                    icon={faInfoCircle}
                                />
                                <span>
                                    Silakan Pilih Tahun dan Tanggal Laporan
                                </span>
                            </Alert>
                        )}

                        {reports && reports.length > 0 && !loading && (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                No.
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Tanggal
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Sprint
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Sprint Lak
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Laporan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.map(
                                            (
                                                {
                                                    date,
                                                    warrant,
                                                    execution_warrant,
                                                    report,
                                                    category,
                                                    report_text
                                                },
                                                i
                                            ) => (
                                                <tr key={i}>
                                                    <th
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        {++i}
                                                    </th>
                                                    <td className="text-center">
                                                        {date}
                                                    </td>
                                                    <td className="text-center">
                                                        <LetterModal
                                                            letter={
                                                                warrant?.letter ||
                                                                ""
                                                            }
                                                            title="Surat Perintah"
                                                        />
                                                    </td>
                                                    <td className="text-center">
                                                        <LetterModal
                                                            letter={
                                                                execution_warrant
                                                            }
                                                            title="Surat Perintah Pelaksanaan"
                                                        />
                                                    </td>
                                                    <td className="text-center">
                                                        {category ===
                                                            "file" && (
                                                            <LetterModal
                                                                title="Laporan Kegiatan"
                                                                letter={report}
                                                            />
                                                        )}

                                                        {category ===
                                                            "text" && (
                                                            <LetterTextModal
                                                                text={
                                                                    report_text
                                                                }
                                                            />
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {reports?.length === 0 && !loading && (
                            <Alert
                                variant="warning"
                                className="col-12 col-lg-6 mx-auto d-flex align-items-center justify-content-center gap-2"
                            >
                                <FontAwesomeIcon
                                    size="2x"
                                    icon={faTriangleExclamation}
                                />
                                <span>Tidak ada laporan!</span>
                            </Alert>
                        )}

                        {loading && (
                            <Spinner className="mx-auto my-3 d-block" />
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

export default DaftarLaporan

import { faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { months } from "Components/Calendar"
import Api from "Functions/Api"
import Header from "Pages/Components/Header"
import { useEffect, useState } from "react"
import { Card, Container, ListGroup, Spinner } from "react-bootstrap"
import { Link, useSearchParams } from "react-router-dom"
import HapusJadwal from "./HapusJadwal"
import BackButton from "Components/BackButton"

const ListJadwal = () => {
    const [searchParams] = useSearchParams()
    const [schedules, setSchedules] = useState<Api.Data[]>()

    useEffect(() => {
        const year = searchParams.get("year")
        let month = searchParams.get("month")!
        month = parseInt(month) < 10 ? `0${month}` : month

        const path = new URL(Api.baseUrl)
        path.pathname = "api/schedule"
        path.search = `?year=${year}&month=${month}`

        Api.get(path).then(async (res) => {
            const data = await res.json()
            setSchedules(data)
        })
    }, [searchParams])

    return (
        <Container>
            <Header>
                <h3>Jadwal</h3>
            </Header>

            <main className="mt-5 print-hidden">
                <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title className="mb-0">
                            Daftar Jadwal Riksa Kapal
                        </Card.Title>

                        <h5 className="mb-0 fw-bold">
                            {months[parseInt(searchParams.get("month")!) - 1]}{" "}
                            {searchParams.get("year")}
                        </h5>
                    </Card.Header>

                    <Card.Body className="mt-4">
                        {schedules ? (
                            <ListGroup variant="flush">
                                {schedules.map(
                                    ({
                                        id,
                                        description,
                                        date,
                                        month,
                                        year
                                    }) => (
                                        <ListGroup.Item key={id}>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h6 className="fw-bold">
                                                        {description}
                                                    </h6>
                                                    <p>{`${date} ${
                                                        months[
                                                            parseInt(month) - 1
                                                        ]
                                                    } ${year}`}</p>
                                                </div>

                                                <div className="d-flex gap-1">
                                                    <Link
                                                        to={`/admin/jadwal/edit/${id}`}
                                                        className="btn btn-warning"
                                                        title="Edit"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                        />
                                                    </Link>
                                                    <HapusJadwal
                                                        id={id}
                                                        schedules={schedules}
                                                        setSchedules={
                                                            setSchedules
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    )
                                )}
                            </ListGroup>
                        ) : (
                            <Spinner className="d-block mx-auto" />
                        )}

                        <div className="mt-5 mb-3 d-flex gap-1 justify-content-end">
                            <BackButton />
                        </div>
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default ListJadwal

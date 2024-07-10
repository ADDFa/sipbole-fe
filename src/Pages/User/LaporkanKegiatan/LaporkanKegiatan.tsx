import BackArrow from "Components/BackArrow"
import BackButton from "Components/BackButton"
import Alert from "Functions/Alert"
import Api from "Functions/Api"
import Auth from "Functions/Auth"
import useHandleSubmit from "Hooks/useHandleSubmit"
import Header from "Pages/Components/Header"
import { useEffect, useState } from "react"
import {
    Button,
    Card,
    Col,
    Container,
    FormCheck,
    FormControl,
    FormLabel,
    FormSelect,
    Row,
    Spinner
} from "react-bootstrap"

const LaporkanKegiatan = () => {
    const [activities, setActivities] = useState<Api.Data[]>()
    const [warrants, setWarrants] = useState<Api.Data[]>()
    const [user, setUser] = useState<Api.Data>()

    useEffect(() => {
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

    const addReport: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post("report", { body }).then((res) => {
            if (!res.ok) return

            Alert.PopUp({ title: "Laporan telah disimpan!" }).fire()
        })
    }
    const handleSubmit = useHandleSubmit(addReport)

    return (
        <Container>
            <Header>
                <h3>Laporkan Kegiatan</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Laporkan Kegiatan</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        {activities && warrants && user ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="hidden"
                                    name="boat_id"
                                    value={user.boat_id}
                                />

                                <div className="mb-4">
                                    <FormLabel>Jenis Kegiatan</FormLabel>
                                    <Row className="row-cols-1 row-cols-lg-2 g-2">
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
                                </div>
                                <div className="mb-4">
                                    <FormLabel htmlFor="warrant">
                                        Surat Perintah
                                    </FormLabel>
                                    <FormSelect name="warrant_id" id="warrant">
                                        {warrants.map(
                                            ({ id, letter_file_name }) => (
                                                <option value={id} key={id}>
                                                    {letter_file_name}
                                                </option>
                                            )
                                        )}
                                    </FormSelect>
                                </div>
                                <div className="mb-4">
                                    <FormLabel htmlFor="report">
                                        Laporan
                                    </FormLabel>
                                    <FormControl
                                        name="report"
                                        id="report"
                                        as="textarea"
                                        rows={10}
                                    />
                                </div>

                                <div className="d-flex justify-content-end gap-1 mt-4">
                                    <Button type="submit">Simpan</Button>
                                    <BackButton />
                                </div>
                            </form>
                        ) : (
                            <Spinner className="d-block mx-auto" />
                        )}
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default LaporkanKegiatan

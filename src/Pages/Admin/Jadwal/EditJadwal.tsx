import BackArrow from "Components/BackArrow"
import BackButton from "Components/BackButton"
import Alert from "Functions/Alert"
import Api from "Functions/Api"
import useHandleSubmit from "Hooks/useHandleSubmit"
import Header from "Pages/Components/Header"
import { useEffect, useState } from "react"
import {
    Button,
    Card,
    Container,
    FormControl,
    FormLabel,
    Spinner
} from "react-bootstrap"
import { useParams } from "react-router-dom"

const EditJadwal = () => {
    const { id } = useParams()
    const [schedule, setSchedule] = useState<Api.Data>()

    useEffect(() => {
        Api.get(`schedule/${id}`).then(async (res) => {
            const data = await res.json()
            setSchedule(data)
        })
    }, [id])

    const updateJadwal: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post(`schedule/${id}`, { body }).then(async (res) => {
            if (!res.ok) return

            const data = await res.json()
            setSchedule(data)

            Alert.PopUp({ title: "Jadwal diubah!" }).fire()
        })
    }
    const handleSubmit = useHandleSubmit(updateJadwal)

    return (
        <Container>
            <Header>
                <h3>Jadwal Riksa Kapal</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Edit Jadwal Riksa Kapal</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        {schedule ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="hidden"
                                    name="_method"
                                    value="PUT"
                                />

                                <div className="mb-3">
                                    <FormLabel htmlFor="date">
                                        Tanggal
                                    </FormLabel>
                                    <FormControl
                                        type="date"
                                        name="date"
                                        id="date"
                                        defaultValue={`${schedule.year}-${schedule.month}-${schedule.date}`}
                                    />
                                </div>
                                <div className="mb-3">
                                    <FormLabel htmlFor="description">
                                        Keterangan
                                    </FormLabel>
                                    <FormControl
                                        name="description"
                                        id="description"
                                        defaultValue={schedule.description}
                                    />
                                </div>
                                <div className="mt-5 mb-3 d-flex gap-1 justify-content-end">
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

export default EditJadwal

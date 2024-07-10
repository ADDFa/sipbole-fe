import BackArrow from "Components/BackArrow"
import BackButton from "Components/BackButton"
import Alert from "Functions/Alert"
import Api from "Functions/Api"
import useHandleSubmit from "Hooks/useHandleSubmit"
import Header from "Pages/Components/Header"
import {
    Button,
    Card,
    Container,
    FormControl,
    FormLabel
} from "react-bootstrap"

const TambahJadwal = () => {
    const addSchedule: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post("schedule", { body }).then((res) => {
            if (!res.ok) return

            Alert.PopUp({ title: "Jadwal ditambahkan!" }).fire()
        })
    }
    const handleSubmit = useHandleSubmit(addSchedule)

    return (
        <Container>
            <Header>
                <h3>Jadwal Riksa Kapal</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Tambah Jadwal Riksa Kapal</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <FormLabel htmlFor="date">Tanggal</FormLabel>
                                <FormControl
                                    type="date"
                                    name="date"
                                    id="date"
                                />
                            </div>
                            <div className="mb-3">
                                <FormLabel htmlFor="description">
                                    Keterangan
                                </FormLabel>
                                <FormControl
                                    name="description"
                                    id="description"
                                />
                            </div>
                            <div className="mt-5 mb-3 d-flex gap-1 justify-content-end">
                                <Button type="submit">Simpan</Button>
                                <BackButton />
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default TambahJadwal

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

const TambahKapal = () => {
    const addBoat: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post("boat", { body }).then(async (res) => {
            if (!res.ok) return

            Alert.PopUp({ title: "Data kapal ditambahkan!" }).fire()
        })
    }
    const handleSubmit = useHandleSubmit(addBoat)

    return (
        <Container>
            <Header>
                <h3>Kapal</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Tambah Kapal</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <FormLabel htmlFor="number">
                                    No. Lambung Kapal
                                </FormLabel>
                                <FormControl id="number" name="number" />
                            </div>
                            <div className="mb-3">
                                <FormLabel htmlFor="picture">
                                    Foto Kapal
                                </FormLabel>
                                <FormControl
                                    type="file"
                                    id="picture"
                                    name="picture"
                                    accept="image/*"
                                />
                            </div>
                            <div className="mb-3">
                                <FormLabel htmlFor="information">
                                    Keterangan
                                </FormLabel>
                                <FormControl
                                    as="textarea"
                                    id="information"
                                    name="information"
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

export default TambahKapal

import BackButton from "Components/BackButton"
import Api from "Functions/Api"
import useImageSrc from "Hooks/useImageSrc"
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
import boatPic from "assets/images/boat.jpg"
import useHandleSubmit from "Hooks/useHandleSubmit"
import BackArrow from "Components/BackArrow"
import Alert from "Functions/Alert"

const EditKapal = () => {
    const { id } = useParams()
    const [boat, setBoat] = useState<Api.Data>()
    const boatSrc = useImageSrc()

    useEffect(() => {
        Api.get(`boat/${id}`).then(async (res) => {
            const data = await res.json()
            setBoat(data)
        })
    }, [id])

    const updateBoat: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post(`boat/${id}`, { body }).then(async (res) => {
            if (!res.ok) return

            const data = await res.json()
            const updatedBoat = { ...boat, ...data }
            setBoat(updatedBoat)

            Alert.PopUp({ title: "Data kapal diupdate!" }).fire()
        })
    }
    const handleSubmit = useHandleSubmit(updateBoat)

    return (
        <Container>
            <Header>
                <h3>Kapal</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Edit Kapal</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        {boat ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="hidden"
                                    name="_method"
                                    value="PUT"
                                />

                                <div className="mb-3">
                                    <div className="col-5 col-lg-2 mx-auto">
                                        <Card>
                                            <Card.Img
                                                src={boatSrc(
                                                    boat.picture,
                                                    boatPic
                                                )}
                                                className="p-1"
                                            />
                                        </Card>
                                    </div>

                                    <FormLabel htmlFor="picture">
                                        Foto
                                    </FormLabel>
                                    <FormControl
                                        type="file"
                                        name="picture"
                                        id="picture"
                                    />
                                </div>
                                <div className="mb-3">
                                    <FormLabel htmlFor="number">
                                        No. Lambung Kapal
                                    </FormLabel>
                                    <FormControl
                                        name="number"
                                        id="number"
                                        defaultValue={boat.number}
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
                                        defaultValue={boat.information || "-"}
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

export default EditKapal

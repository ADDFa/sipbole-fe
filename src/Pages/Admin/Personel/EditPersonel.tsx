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
    FormSelect,
    Spinner
} from "react-bootstrap"
import { useParams } from "react-router-dom"

const EditPersonel = () => {
    const { id } = useParams()
    const [personel, setPersonel] = useState<Api.Data>()
    const [boats, setBoats] = useState<Api.Data[]>()

    useEffect(() => {
        Api.get("boat").then(async (res) => {
            const data = await res.json()
            setBoats(data)
        })

        Api.get(`user/${id}`).then(async (res) => {
            const data = await res.json()
            setPersonel(data)
        })
    }, [id])

    const updatePersonel: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)

        Api.post(`user/${id}`, { body }).then(async (res) => {
            if (!res.ok) return

            const data = await res.json()
            const updatePersonel = { ...personel, ...data }
            setPersonel(updatePersonel)
            Alert.PopUp({ title: "Data personel diupdate!" }).fire()
        })
    }
    const handleSubmit = useHandleSubmit(updatePersonel)

    return (
        <Container>
            <Header>
                <h3>Personel</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title className="fw-bold">
                            Edit Personel
                        </Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        {personel && boats ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="hidden"
                                    name="_method"
                                    value="PUT"
                                />

                                <div className="mb-3 mt-5">
                                    <FormLabel
                                        htmlFor="name"
                                        className="fw-bold"
                                    >
                                        Nama
                                    </FormLabel>
                                    <FormControl
                                        defaultValue={personel.name}
                                        name="name"
                                        id="name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <FormLabel
                                        htmlFor="grade"
                                        className="fw-bold"
                                    >
                                        Pangkat
                                    </FormLabel>
                                    <FormControl
                                        name="grade"
                                        id="grade"
                                        defaultValue={personel.grade}
                                    />
                                </div>
                                <div className="mb-3">
                                    <FormLabel className="fw-bold">
                                        No. Lambung Kapal
                                    </FormLabel>
                                    <FormSelect
                                        name="boat_id"
                                        defaultValue={personel.boat_id}
                                    >
                                        {boats.map(({ id, number }) => (
                                            <option key={id} value={id}>
                                                {number}
                                            </option>
                                        ))}
                                    </FormSelect>
                                </div>
                                <div className="mt-5 mb-3 d-flex gap-1 justify-content-end">
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

export default EditPersonel

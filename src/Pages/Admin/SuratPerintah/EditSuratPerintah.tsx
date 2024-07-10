import BackArrow from "Components/BackArrow"
import BackButton from "Components/BackButton"
import Alert from "Functions/Alert"
import Api from "Functions/Api"
import useHandleSubmit from "Hooks/useHandleSubmit"
import Header from "Pages/Components/Header"
import { Fragment, useEffect, useState } from "react"
import {
    Button,
    Card,
    Container,
    FormCheck,
    FormControl,
    FormLabel,
    FormSelect,
    Spinner
} from "react-bootstrap"
import { useParams } from "react-router-dom"

const EditSuratPerintah = () => {
    const { id } = useParams()
    const [warrant, setWarrant] = useState<Api.Data>()
    const [boats, setBoats] = useState<Api.Data[]>()

    useEffect(() => {
        Api.get("boat").then(async (res) => {
            const data = await res.json()
            setBoats(data)
        })

        Api.get(`warrant/${id}`).then(async (res) => {
            const data = await res.json()
            setWarrant(data)
        })
    }, [])

    const updateWarrant: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post(`warrant/${id}`, { body }).then((res) => {
            if (!res.ok) return

            Alert.PopUp({ title: "Surat perintah diupdate!" }).fire()
        })
    }
    const handleSubmit = useHandleSubmit(updateWarrant)

    const getBoatChecked = (id: string | number) => {
        const checkedBoats: Api.Data[] = warrant?.warrants_boats
        if (!checkedBoats) return false

        return !!checkedBoats.find((boat) => boat.boat_id == id)
    }

    return (
        <Container>
            <Header>
                <h3>Surat Perintah</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Edit Surat Perintah</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        {warrant && boats ? (
                            <Fragment>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="PUT"
                                    />

                                    <div className="mb-4">
                                        <FormLabel htmlFor="type">
                                            Jenis Surat
                                        </FormLabel>
                                        <FormSelect
                                            name="type"
                                            id="type"
                                            defaultValue={warrant.type}
                                        >
                                            <option value="Harkamtibmas">
                                                Harkamtibmas
                                            </option>
                                            <option value="Kegiatan Unggulan">
                                                Kegiatan Unggulan
                                            </option>
                                        </FormSelect>
                                    </div>
                                    <div className="mb-4">
                                        <FormLabel htmlFor="letter">
                                            Upload Surat Perintah
                                        </FormLabel>
                                        <FormControl
                                            type="file"
                                            name="letter"
                                            id="letter"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormLabel htmlFor="number_of_personnel">
                                            Jumlah Personel
                                        </FormLabel>
                                        <FormControl
                                            name="number_of_personnel"
                                            id="number_of_personnel"
                                            defaultValue={
                                                warrant.number_of_personnel
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <FormLabel>
                                            Tujuan (No. Lambung Kapal)
                                        </FormLabel>

                                        {boats.map(({ id, number }) => (
                                            <FormCheck
                                                key={id}
                                                label={number}
                                                id={`${number}-${id}`}
                                                name="boats[]"
                                                value={id}
                                                defaultChecked={getBoatChecked(
                                                    id
                                                )}
                                            />
                                        ))}
                                    </div>

                                    <div className="mt-5 mb-3 d-flex gap-1 justify-content-end">
                                        <Button type="submit">Simpan</Button>
                                        <BackButton />
                                    </div>
                                </form>
                            </Fragment>
                        ) : (
                            <Spinner className="mx-auto d-block" />
                        )}
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default EditSuratPerintah

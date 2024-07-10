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
    FormCheck,
    FormControl,
    FormLabel,
    FormSelect,
    Spinner
} from "react-bootstrap"

const TambahSuratPerintah = () => {
    const [boats, setBoats] = useState<Api.Data[]>()

    useEffect(() => {
        Api.get("boat").then(async (res) => {
            const data = await res.json()
            setBoats(data)
        })
    }, [])

    const addWarrant: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post("warrant", { body }).then((res) => {
            if (!res.ok) return

            Alert.PopUp({ title: "Surat perintah dikirim!" }).fire()
        })
    }
    const handleSubmit = useHandleSubmit(addWarrant)

    return (
        <Container>
            <Header>
                <h3>Surat Perintah</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Kirim Surat Perintah</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        {boats ? (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <FormLabel htmlFor="type">
                                        Jenis Surat
                                    </FormLabel>
                                    <FormSelect name="type" id="type">
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
                                        accept="application/pdf"
                                    />
                                </div>
                                <div className="mb-4">
                                    <FormLabel htmlFor="number_of_personnel">
                                        Jumlah Personel
                                    </FormLabel>
                                    <FormControl
                                        name="number_of_personnel"
                                        id="number_of_personnel"
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
                                        />
                                    ))}
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

export default TambahSuratPerintah

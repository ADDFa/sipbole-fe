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
    FormSelect
} from "react-bootstrap"

const TambahPersonel = () => {
    const [boats, setBoats] = useState<Api.Data[]>()

    useEffect(() => {
        Api.get("boat").then(async (res) => {
            const boats = await res.json()
            setBoats(boats)
        })
    }, [])

    const addPersonel: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post("user", { body }).then(async (res) => {
            if (!res.ok) return

            Alert.PopUp({ title: "Personel berhasil ditambahkan!" }).fire()

            Alert.Info({
                title: "Akun Personel",
                html: /* html */ `
                    <p class="mb-0">Berikan Akun Ini Kepada Personel.</p>
                    <p class="text-danger fs-12 fst-italic">Minta Personel Mengganti Password Guna Keamanaan Data!</p>
                    <p class="text-info fs-12">Username : ${body.get(
                        "username"
                    )} <br /> Password : 12345678</p>
                `
            }).fire()
        })
    }
    const handleSubmit = useHandleSubmit(addPersonel)

    return (
        <Container>
            <Header>
                <h3>Personel</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Tambah Personel</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <FormLabel htmlFor="username">
                                    Username
                                </FormLabel>
                                <FormControl name="username" id="username" />
                            </div>
                            <div className="mb-3">
                                <FormLabel htmlFor="name">Nama</FormLabel>
                                <FormControl name="name" id="name" />
                            </div>
                            <div className="mb-3">
                                <FormLabel htmlFor="grade">Pangkat</FormLabel>
                                <FormControl name="grade" id="grade" />
                            </div>
                            <div className="mb-3">
                                <FormLabel>No. Lambung Kapal</FormLabel>
                                <FormSelect name="boat_id">
                                    {boats?.map(({ id, number }) => (
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
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default TambahPersonel

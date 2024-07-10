import BackButton from "Components/BackButton"
import FormPassword from "Components/FormPassword"
import Alert from "Functions/Alert"
import Api from "Functions/Api"
import useHandleSubmit from "Hooks/useHandleSubmit"
import Header from "Pages/Components/Header"
import { Button, Card, Container } from "react-bootstrap"

const UbahPassword = () => {
    const updatePassword: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post(`update-password`, { body }).then(async (res) => {
            if (!res.ok) return

            Alert.PopUp({ title: "Password diubah!" }).fire()
        })
    }
    const handleSubmit = useHandleSubmit(updatePassword)

    return (
        <Container>
            <Header>
                <h3>Profile</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header>
                        <Card.Title className="fw-bold">
                            Ganti Password
                        </Card.Title>
                    </Card.Header>

                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="_method" value="PUT" />

                            <FormPassword
                                label="Password Lama"
                                name="old_password"
                            />
                            <FormPassword
                                label="Password Baru"
                                name="new_password"
                            />
                            <FormPassword
                                label="Konfirmasi Password Baru"
                                name="confirm_password"
                            />
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

export default UbahPassword

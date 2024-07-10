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
    Container,
    FormControl,
    FormLabel,
    Spinner
} from "react-bootstrap"

const EditProfile = () => {
    const [user, setUser] = useState<Api.Data>()

    useEffect(() => {
        Api.get(`user/${Auth.userId}`).then(async (res) => {
            const data = await res.json()
            setUser(data)
        })
    }, [Auth])

    const updateProfile: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post(`update-profile/${Auth.userId}`, { body }).then(
            async (res) => {
                const tokens = await res.json()
                if (!res.ok) return

                Auth.auth = tokens
                Alert.PopUp({ title: "Profile berhasil diupdate!" }).fire()
            }
        )
    }
    const handleSubmit = useHandleSubmit(updateProfile)

    return (
        <Container>
            <Header>
                <h3>Profile</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header>
                        <Card.Title>Edit Profile</Card.Title>
                    </Card.Header>

                    <Card.Body>
                        {user ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="hidden"
                                    name="_method"
                                    value="PUT"
                                />

                                <div className="mb-3">
                                    <FormLabel htmlFor="name">Nama</FormLabel>
                                    <FormControl
                                        defaultValue={user.name}
                                        name="name"
                                        id="name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <FormLabel htmlFor="username">
                                        Username
                                    </FormLabel>
                                    <FormControl
                                        defaultValue={user.credential.username}
                                        name="username"
                                        id="username"
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

export default EditProfile

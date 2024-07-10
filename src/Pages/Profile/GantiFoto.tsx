import Header from "Pages/Components/Header"
import {
    Button,
    Card,
    Container,
    FormControl,
    FormLabel,
    Spinner
} from "react-bootstrap"
import userPic from "assets/images/user.png"
import BackButton from "Components/BackButton"
import useImageSrc from "Hooks/useImageSrc"
import { Fragment, useEffect, useState } from "react"
import Api from "Functions/Api"
import useHandleSubmit from "Hooks/useHandleSubmit"
import Auth from "Functions/Auth"

const GantiFoto = () => {
    const [user, setUser] = useState<Api.Data>()
    const userSrc = useImageSrc()

    useEffect(() => {
        Api.get(`user/${Auth.userId}`).then(async (res) => {
            const data = await res.json()
            setUser(data)
        })
    }, [Auth])

    const updateProfilePic: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post(`update-profile-pic/${Auth.userId}`, { body }).then(
            async (res) => {
                if (!res.ok) return

                const updatedUser = await res.json()
                setUser(updatedUser)
            }
        )
    }
    const handleSubmit = useHandleSubmit(updateProfilePic)

    return (
        <Container>
            <Header>
                <h3>Profile</h3>
            </Header>

            <main className="mt-5">
                {user ? (
                    <Fragment>
                        <div className="text-center">
                            <img
                                width={200}
                                src={userSrc(user.profile_picture, userPic)}
                                alt="Profil"
                            />
                            <h3 className="mt-3">Adha</h3>
                        </div>

                        <Card className="rounded-4 mt-3">
                            <Card.Body>
                                <Card.Title className="fw-bold">
                                    Edit Profile
                                </Card.Title>

                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="PUT"
                                    />

                                    <div className="mb-3 mt-5">
                                        <FormLabel
                                            className="fw-bold"
                                            htmlFor="profile_picture"
                                        >
                                            Upload Foto
                                        </FormLabel>
                                        <FormControl
                                            type="file"
                                            name="profile_picture"
                                            id="profile_picture"
                                        />
                                    </div>
                                    <div className="mt-5 mb-3 d-flex gap-1 justify-content-end">
                                        <Button type="submit">Simpan</Button>
                                        <BackButton />
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                    </Fragment>
                ) : (
                    <Spinner className="d-block mx-auto" />
                )}
            </main>
        </Container>
    )
}

export default GantiFoto

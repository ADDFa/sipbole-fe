import { faCircleInfo, faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import BackArrow from "Components/BackArrow"
import BackButton from "Components/BackButton"
import Api from "Functions/Api"
import Auth from "Functions/Auth"
import Header from "Pages/Components/Header"
import { useEffect, useState } from "react"
import { Alert, Card, Container, ListGroup, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const SuratPerintah = () => {
    const navigate = useNavigate()
    const [warrants, setWarrants] = useState<Api.Data[]>()
    const [user, setUser] = useState<Api.Data>()

    useEffect(() => {
        Api.get(`user/${Auth.userId}`).then(async (res) => {
            const data = await res.json()
            setUser(data)
        })
    }, [])

    useEffect(() => {
        if (!user) return

        const getWarrantBoat = () => {
            Api.get("warrant").then(async (res) => {
                const data = await res.json()
                setWarrants(data)
            })
        }
        const interval = setInterval(getWarrantBoat, 5000)
        getWarrantBoat()

        return () => {
            clearInterval(interval)
        }
    }, [user])

    const handleWarrantClick = (warrantBoatId: string, letter: string) => {
        navigate(`/surat-perintah/${warrantBoatId}/lihat?letter=${letter}`)
    }

    return (
        <Container>
            <Header>
                <h3>Surat Perintah</h3>
            </Header>

            <main className="mt-5">
                <Card>
                    <Card.Header className="d-flex justify-content-between">
                        <Card.Title>Daftar Surat Perintah</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        <ListGroup variant="flush">
                            {warrants ? (
                                warrants.map(
                                    ({
                                        id,
                                        letter,
                                        letter_file_name,
                                        warrant_boat: {
                                            read,
                                            id: warrantBoatId
                                        }
                                    }) => (
                                        <ListGroup.Item
                                            key={id}
                                            variant={
                                                read ? "secondary" : "info"
                                            }
                                            className="d-flex gap-2 align-items-center"
                                            action
                                            onClick={() =>
                                                handleWarrantClick(
                                                    warrantBoatId,
                                                    letter
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faFilePdf}
                                                size="2x"
                                                color="#ED5D5D"
                                            />
                                            <span>{letter_file_name}</span>
                                        </ListGroup.Item>
                                    )
                                )
                            ) : (
                                <Spinner className="d-block mx-auto" />
                            )}

                            {warrants?.length === 0 && (
                                <Alert
                                    variant="info"
                                    className="text-center d-flex align-items-center justify-content-center gap-2"
                                >
                                    <FontAwesomeIcon
                                        icon={faCircleInfo}
                                        size="2x"
                                    />
                                    <span>Belum Ada Surat Perintah</span>
                                </Alert>
                            )}
                        </ListGroup>

                        <div className="d-flex justify-content-end gap-1 mt-4">
                            <BackButton />
                        </div>
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default SuratPerintah

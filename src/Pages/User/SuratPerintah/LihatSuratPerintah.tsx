import BackArrow from "Components/BackArrow"
import Api from "Functions/Api"
import Header from "Pages/Components/Header"
import { useEffect, useState } from "react"
import { Card, Container, Spinner } from "react-bootstrap"
import { useParams, useSearchParams } from "react-router-dom"

const LihatSuratPerintah = () => {
    const { warrantBoatId } = useParams()
    const [searchParams] = useSearchParams()
    const [pdf, setPdf] = useState<string>()

    useEffect(() => {
        const letter = searchParams.get("letter")!
        setPdf(`${Api.baseUrl}${letter}`)
    }, [searchParams])

    useEffect(() => {
        Api.patch(`warrant-boat/${warrantBoatId}/read`)
    }, [warrantBoatId])

    return (
        <Container>
            <Header>
                <h3>Surat Perintah</h3>
            </Header>

            <main className="mt-5">
                <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Lihat Surat Perintah</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        {pdf ? (
                            <iframe
                                width="100%"
                                height="600px"
                                title="PDF Viewer"
                                src={pdf}
                            />
                        ) : (
                            <Spinner className="d-block mx-auto" />
                        )}
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default LihatSuratPerintah

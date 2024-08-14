import BackArrow from "Components/BackArrow"
import Header from "Pages/Components/Header"
import { Card, Container, Nav } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import { lazy, Suspense } from "react"

const LaporkanPatroli = lazy(() => import("./Components/LaporkanPatroli"))
const LaporkanSar = lazy(() => import("./Components/LaporkanSar"))

const LaporkanKegiatan = () => {
    const location = useLocation()

    return (
        <Container>
            <Header>
                <h3>Laporkan Kegiatan</h3>
            </Header>

            <main className="mt-5 mx-0">
                <Card className="rounded-4">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Laporkan Kegiatan</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        <Nav
                            variant="tabs"
                            defaultActiveKey={location.hash}
                            className="mb-3"
                        >
                            <Nav.Item>
                                <Nav.Link href="#patroli">Patroli</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#sar">SAR</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        {location.hash === "#patroli" && (
                            <Suspense>
                                <LaporkanPatroli />
                            </Suspense>
                        )}
                        {location.hash === "#sar" && (
                            <Suspense>
                                <LaporkanSar />
                            </Suspense>
                        )}
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default LaporkanKegiatan

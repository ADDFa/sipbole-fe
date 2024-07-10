import Api from "Functions/Api"
import useImageSrc from "Hooks/useImageSrc"
import Header from "Pages/Components/Header"
import { Fragment, useEffect, useState } from "react"
import { Card, Container, ListGroup, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import boatPic from "assets/images/boat.jpg"
import BackArrow from "Components/BackArrow"
import BackButton from "Components/BackButton"

const DetailKapal = () => {
    const { id } = useParams()
    const [boat, setBoat] = useState<Api.Data>()
    const boatSrc = useImageSrc()

    useEffect(() => {
        Api.get(`boat/${id}`).then(async (res) => {
            const data = await res.json()
            setBoat(data)
        })
    }, [id])

    return (
        <Container>
            <Header>
                <h3>Kapal</h3>
            </Header>

            <main className="mt-5">
                <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title>Info Kapal</Card.Title>
                        <BackArrow />
                    </Card.Header>

                    <Card.Body>
                        {boat ? (
                            <Fragment>
                                <Card className="col-7 col-lg-3 mx-auto">
                                    <Card.Img
                                        className="p-1"
                                        src={boatSrc(boat.picture, boatPic)}
                                    />
                                </Card>

                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h6 className="mt-5 fw-bold">
                                            No. Lambung Kapal
                                        </h6>
                                        <p className="fs-12 mb-0">
                                            {boat.number}
                                        </p>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h6 className="mt-5 fw-bold">
                                            Keterangan
                                        </h6>
                                        <p className="fs-12 mb-0">
                                            {boat.information || "-"}
                                        </p>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h6 className="mt-5 fw-bold">
                                            Daftar Peserta
                                        </h6>
                                        <ListGroup
                                            variant="flush"
                                            as="ol"
                                            numbered
                                        >
                                            {boat.users.map(
                                                ({
                                                    id,
                                                    name
                                                }: Record<string, any>) => (
                                                    <ListGroup.Item key={id}>
                                                        {name}
                                                    </ListGroup.Item>
                                                )
                                            )}
                                        </ListGroup>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Fragment>
                        ) : (
                            <Spinner className="d-block mx-auto" />
                        )}

                        <div className="mt-5 mb-3 d-flex gap-1 justify-content-end">
                            <BackButton />
                        </div>
                    </Card.Body>
                </Card>
            </main>
        </Container>
    )
}

export default DetailKapal

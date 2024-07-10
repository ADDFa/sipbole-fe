import { FC } from "react"
import { Button, Col, Row } from "react-bootstrap"

const Type: FC<Report.Type> = ({ type, setType }) => {
    return (
        <Row className="row-cols-2 g-1">
            <Col className="col-auto">
                <Button
                    variant={`${
                        type === "Harkamtibmas" ? "" : "outline-"
                    }primary`}
                    onClick={() => setType("Harkamtibmas")}
                >
                    Harkamtibmas
                </Button>
            </Col>
            <Col className="col-auto">
                <Button
                    variant={`${
                        type === "Kegiatan Unggulan" ? "" : "outline-"
                    }primary`}
                    onClick={() => setType("Kegiatan Unggulan")}
                >
                    Kegiatan Unggulan
                </Button>
            </Col>
        </Row>
    )
}

export default Type

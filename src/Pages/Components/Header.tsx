import { FC } from "react"
import { Col, Row } from "react-bootstrap"
import ProvileNav from "Pages/Profile/Components/Nav"

const Header: FC<Header> = ({ children }) => {
    return (
        <header className="mt-4 print-hidden">
            <Row className="cols-2 g-3">
                <Col>{children}</Col>
                <Col className="d-flex justify-content-end align-items-center me-3 p-0">
                    <ProvileNav />
                </Col>
            </Row>
        </header>
    )
}

export default Header

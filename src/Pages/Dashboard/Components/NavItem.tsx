import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"
import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const NavItem: FC<Dashboard.NavItem> = ({ to, className, icon, text }) => {
    return (
        <Col className="text-center">
            <Link to={to}>
                <div className={`icon ${className}`}>
                    <FontAwesomeIcon icon={icon} size="2x" />
                </div>
                <p>{text}</p>
            </Link>
        </Col>
    )
}

export default NavItem

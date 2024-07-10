import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, memo, useState } from "react"
import { Button, ListGroup, Offcanvas } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import user from "assets/images/user.png"
import Auth from "Functions/Auth"

const Nav = () => {
    const navigate = useNavigate()
    const [profileNav, setProfileNav] = useState(false)

    const handleProvileNavShow = () => {
        setProfileNav(true)
    }

    const handleProvileNavHide = () => {
        setProfileNav(false)
    }

    const handleLogOut = () => {
        Auth.clear()
        navigate("/sign-in")
    }

    return (
        <Fragment>
            <Link to="#" role="button" onClick={handleProvileNavShow}>
                <img width={50} src={user} alt="user" />
            </Link>

            <Offcanvas
                show={profileNav}
                onHide={handleProvileNavHide}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Edit Profile</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item variant="primary bg-light">
                            <Link
                                to="/edit-profile"
                                className="d-flex gap-2 justify-content-between"
                            >
                                <span>Edit Profile</span>
                                <FontAwesomeIcon
                                    icon={faCircleArrowRight}
                                    className="fs-5"
                                />
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item variant="primary bg-light">
                            <Link
                                to="/ganti-foto"
                                className="d-flex gap-2 justify-content-between"
                            >
                                <span>Ganti Foto</span>
                                <FontAwesomeIcon
                                    icon={faCircleArrowRight}
                                    className="fs-5"
                                />
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item variant="primary bg-light">
                            <Link
                                to="/ubah-password"
                                className="d-flex gap-2 justify-content-between"
                            >
                                <span>Ubah Password</span>
                                <FontAwesomeIcon
                                    icon={faCircleArrowRight}
                                    className="fs-5"
                                />
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Offcanvas.Body>

                <div className="mx-3 py-3">
                    <Button
                        variant="danger"
                        className="w-100 rounded-pill d-flex align-items-center gap-2 justify-content-center"
                        onClick={handleLogOut}
                    >
                        <span>Logout</span>
                        <FontAwesomeIcon icon={faCircleArrowRight} />
                    </Button>
                </div>
            </Offcanvas>
        </Fragment>
    )
}

export default memo(Nav)

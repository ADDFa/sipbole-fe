import { Col, Container, Row } from "react-bootstrap"
import { lazy, Suspense, useEffect, useState } from "react"
import police from "assets/images/police.svg"
import Header from "Pages/Components/Header"
import Auth from "Functions/Auth"
import NavItem from "./Components/NavItem"
import nav from "./assets/nav"
import Api from "Functions/Api"
const InfoAdmin = lazy(() => import("./Components/InfoAdmin"))

const Dashboard = () => {
    const [user, setUser] = useState<Api.Data>()
    const [timePeriod, setTimePeriod] = useState("Pagi")
    const [navs, setNavs] = useState<Dashboard.NavItem[]>([])

    useEffect(() => {
        Api.get(`user/${Auth.userId}`).then(async (res) => {
            const data = await res.json()
            setUser(data)
        })

        const navs = Auth.role === "admin" ? nav.admin : nav.user
        setNavs(navs)

        const handleTimer = () => {
            const hours = new Date().getHours()
            if (hours > 12 && hours <= 16) setTimePeriod("Siang")
            if (hours > 16 && hours <= 19) setTimePeriod("Sore")
            if (hours > 19) setTimePeriod("Malam")
        }
        handleTimer()

        const timer = setTimeout(handleTimer, 60000)
        return () => {
            clearTimeout(timer)
        }
    }, [Auth])

    return (
        <Container>
            <Header>
                <p className="mb-0">Hallo {user ? user.name : "..."},</p>
                <h3>Selamat {timePeriod}!</h3>
            </Header>

            <nav className="my-5 dashboard-nav">
                <Row className={Auth.role === "admin" ? "row-cols-5" : ""}>
                    {navs.map((props, i) => (
                        <NavItem {...props} key={i} />
                    ))}
                </Row>
            </nav>

            <main className="dashboard-main mb-5">
                <Container>
                    <section className="card-main">
                        <Row className="bg-light cols-2 rounded-5">
                            <Col className="col-5 col-lg-6">
                                <div className="police-svg">
                                    <img src={police} alt="Police" />
                                </div>
                            </Col>
                            <Col className="text-dark col-7 col-lg-6">
                                <h1 className="fs-2 fw-bold mt-4">SI_PAL</h1>
                                <p className="mb-0">Sistem Pelaporan Online</p>
                                <p className="description">
                                    Sistem Pelaporan Online kami mempermudah
                                    pelaporan, manajemen data, dan akses
                                    multi-perangkat yang aman.
                                </p>
                            </Col>
                        </Row>
                    </section>

                    {Auth.role === "admin" && (
                        <Suspense>
                            <InfoAdmin />
                        </Suspense>
                    )}
                </Container>
            </main>
        </Container>
    )
}

export default Dashboard

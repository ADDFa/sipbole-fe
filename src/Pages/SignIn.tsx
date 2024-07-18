import Logo from "Components/Logo"
import {
    Button,
    Card,
    Container,
    FormControl,
    FormLabel
} from "react-bootstrap"
import "Functions/Api"
import Api from "Functions/Api"
import Auth from "Functions/Auth"
import { useNavigate } from "react-router-dom"
import useHandleSubmit from "Hooks/useHandleSubmit"
import FormPassword from "Components/FormPassword"
import boat from "assets/images/boat.jpg"

const SignIn = () => {
    const navigate = useNavigate()

    const signIn: Hooks.HandleSubmit.Handler = (e) => {
        const body = new FormData(e.currentTarget)
        Api.post("sign-in", { body }).then(async (res) => {
            if (!res.ok) return

            Auth.auth = await res.json()
            navigate("/dashboard")
        })
    }
    const handleSubmit = useHandleSubmit(signIn)

    return (
        <Container className="vh-100">
            <div className="text-center">
                <h3 className="text-center mt-3">
                    Hallo <br /> Selamat Datang
                </h3>
                <Logo width={170} />
            </div>

            <div className="bg-light py-3 px-4 rounded-top-5 mt-3 text-primary">
                <Card.Img src={boat} className="boat-image-sign-in" />

                <form onSubmit={handleSubmit} className="sign-in-form">
                    <div className="mb-3 mt-5">
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <FormControl name="username" id="username" />
                    </div>
                    <FormPassword label="Password" />
                    <div className="text-center my-5">
                        <Button type="submit" className="w-75 rounded-pill">
                            LOGIN
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default SignIn

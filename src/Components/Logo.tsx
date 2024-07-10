import { FC, ImgHTMLAttributes } from "react"
import logo from "../assets/logo.png"

const Logo: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
    return <img src={logo} alt="POL AIRUD" {...props} />
}

export default Logo

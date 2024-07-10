import { redirect } from "react-router-dom"
import Auth from "./Auth"

export const isLoginLoader = () => {
    const redirectTo = Auth.isLogin ? "/dashboard" : "/sign-in"
    return redirect(redirectTo)
}

export const signInLoader = () => {
    return Auth.isLogin ? redirect("/dashboard") : null
}

export const notSignInLoader = () => {
    return !Auth.isLogin ? redirect("/sign-in") : null
}

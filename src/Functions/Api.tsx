import Auth from "./Auth"
import HandleError from "./HandleError"

class Api {
    private static url = "https://si-pal.com"
    // private static url = "http://127.0.0.1:8000"

    static get baseUrl() {
        return this.url
    }

    private static getUrl(path?: string) {
        const url = new URL(this.url)
        url.pathname = `api/${path}`

        return url
    }

    private static async checkToken(): Promise<boolean> {
        const payload = JSON.parse(atob(Auth.token.split(".")[1]))

        const { exp } = payload
        if (!exp) {
            Auth.clear()
            location.href = "/sign-in"

            return false
        }

        const now = Math.ceil(new Date().getTime() / 1000)
        if (now >= exp) {
            const headers = new Headers({
                "Content-Type": "application/json"
            })

            const url = this.getUrl("refresh")

            try {
                const body = JSON.stringify({ token: Auth.refresh })
                const response = await fetch(url, {
                    method: "PATCH",
                    headers,
                    body
                })
                if (!response.ok) {
                    Auth.clear()
                    location.href = "/"

                    return false
                }

                const data = await response.json()
                Auth.auth = data
            } catch (e) {
                console.log(e)
            }
        }

        return true
    }

    private static async request(path: string | URL, init?: RequestInit) {
        const headers = new Headers(init?.headers)
        if (Auth.isLogin) {
            if (!(await this.checkToken())) {
                const response = new Response("[]", {
                    status: 500
                })
                return response
            }
            headers.append("Authorization", `Bearer ${Auth.token}`)
        }

        return new Promise<Response>(async (resolve) => {
            const url = path instanceof URL ? path : this.getUrl(path)
            init = {
                ...init,
                headers
            }

            try {
                const response = await fetch(url, init)
                resolve(response)
            } catch (e) {
                console.log(e)
            }
        })
    }

    static async get(path: string | URL, init?: RequestInit) {
        return await this.request(path, {
            method: "GET",
            ...init
        })
    }

    static async post(path: string, init?: RequestInit, config?: Api.Config) {
        const result = await this.request(path, {
            method: "POST",
            ...init
        })

        config = {
            showErrors: true,
            ...config
        }

        if (!result.ok && config?.showErrors) {
            const data = await result.clone().json()
            const error = new HandleError(data)
            error.show()
        }

        return result
    }

    static async patch(path: string, init?: RequestInit) {
        init = {
            method: "PATCH",
            ...init
        }

        const result = await this.request(path, init)
        return result
    }

    static async delete(path: string, init?: RequestInit) {
        init = {
            method: "DELETE",
            ...init
        }

        const result = await this.request(path, init)
        return result
    }
}

export default Api

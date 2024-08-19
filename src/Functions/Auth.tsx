class Auth {
    private static storageName = "auth"

    static get isLogin(): boolean {
        return !!localStorage.getItem(this.storageName)
    }

    static set auth(data: Record<string, any>) {
        localStorage.setItem(this.storageName, JSON.stringify(data))
    }

    static get auth(): Record<string, any> {
        const data = localStorage.getItem(this.storageName)
        return data ? JSON.parse(data) : {}
    }

    static get token() {
        const data = this.auth
        return data.access_token
    }

    static get refresh() {
        const data = this.auth
        return data.refresh_token
    }

    static get userId() {
        return this.auth.payload?.id
    }

    static set user(userData: Api.Data) {
        localStorage.setItem("user", JSON.stringify(userData))
    }

    static get user() {
        const userData = localStorage.getItem("user")
        return userData ? JSON.parse(userData) : {}
    }

    static get authId() {
        return this.auth.payload?.auth_id
    }

    static get role() {
        return this.auth.payload?.role
    }

    static clear() {
        localStorage.removeItem(this.storageName)
        localStorage.removeItem("user")
    }
}

export default Auth

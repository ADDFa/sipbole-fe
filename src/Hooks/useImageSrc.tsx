import Api from "Functions/Api"

const useImageSrc = () => {
    return (path: string | null, def?: string) => {
        if (!path) return def

        const src = new URL(Api.baseUrl)
        src.pathname = path

        return src.href
    }
}

export default useImageSrc

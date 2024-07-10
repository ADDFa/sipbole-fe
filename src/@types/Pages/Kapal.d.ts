namespace Kapal {
    interface Hapus {
        id: string | number
        boats: Api.Data[]
        setBoats: React.Dispatch<React.SetStateAction<Api.Data[] | undefined>>
    }
}

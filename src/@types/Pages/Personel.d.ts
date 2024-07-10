namespace Personel {
    interface Hapus {
        id: string | number
        personels: Api.Data[]
        setPersonels: React.Dispatch<
            React.SetStateAction<Api.Data[] | undefined>
        >
    }
}

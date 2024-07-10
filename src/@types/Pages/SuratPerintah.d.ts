namespace SuratPerintah {
    interface Hapus {
        id: string | number
        warrants: Api.Data[]
        setWarrants: React.Dispatch<
            React.SetStateAction<Api.Data[] | undefined>
        >
    }
}

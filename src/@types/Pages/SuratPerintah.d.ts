namespace SuratPerintah {
    interface Hapus {
        id: string | number
        warrants: Api.Data[]
        setWarrants: React.Dispatch<
            React.SetStateAction<Api.Data[] | undefined>
        >
    }

    interface LetterModal {
        title: string
        show: boolean
        onHide: () => void
        letter: string
    }
}

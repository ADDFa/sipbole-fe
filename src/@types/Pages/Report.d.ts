namespace Report {
    interface FormYear {
        year: number
        setYear: React.Dispatch<React.SetStateAction<number>>
    }

    interface ReportTable {
        reports: Api.Data[]
    }

    interface Type {
        type: Letter
        setType: React.Dispatch<React.SetStateAction<Letter>>
    }

    interface RowTableValue {
        patroli_perairan: number
        riksa_kapal: number
        sar_or_laka_air: number
        binmas_perairan: number
    }

    interface LetterModal {
        title: string
        letter: string
    }

    interface LetterTextModal {
        text: string
    }
}

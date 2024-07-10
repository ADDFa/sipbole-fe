namespace Jadwal {
    interface Hapus {
        id: string | number
        schedules: Api.Data[]
        setSchedules: React.Dispatch<
            React.SetStateAction<Api.Data[] | undefined>
        >
    }
}

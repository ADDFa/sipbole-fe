import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Alert from "Functions/Alert"
import Api from "Functions/Api"
import { FC } from "react"
import { Button } from "react-bootstrap"

const HapusJadwal: FC<Jadwal.Hapus> = ({ id, schedules, setSchedules }) => {
    const handleClick = () => {
        Alert.Confirm()
            .fire({
                text: "Hapus data jadwal?"
            })
            .then((res) => {
                if (res.isDismissed) return

                Api.delete(`schedule/${id}`).then((res) => {
                    if (!res.ok) return

                    const updatedSchedules = schedules.filter(
                        (schedule) => schedule.id != id
                    )
                    setSchedules(updatedSchedules)

                    Alert.PopUp({ title: "Jadwal dihapus!" }).fire()
                })
            })
    }

    return (
        <Button variant="danger" title="Hapus" onClick={handleClick}>
            <FontAwesomeIcon icon={faTrash} />
        </Button>
    )
}

export default HapusJadwal

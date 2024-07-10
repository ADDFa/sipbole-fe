import Alert from "Functions/Alert"
import Api from "Functions/Api"
import { FC } from "react"
import { Button } from "react-bootstrap"

const HapusKapal: FC<Kapal.Hapus> = ({ id, boats, setBoats }) => {
    const handleDelete = () => {
        Alert.Confirm()
            .fire({
                text: "Hapus data kapal?"
            })
            .then((res) => {
                if (res.isDismissed) return

                Api.delete(`boat/${id}`).then(async (res) => {
                    if (!res.ok) return

                    const boat = await res.json()
                    const updatedBoats = boats.filter(({ id }) => boat.id != id)
                    setBoats(updatedBoats)

                    Alert.PopUp({ title: "Data kapal dihapus!" }).fire()
                })
            })
    }

    return (
        <Button className="dropdown-item" onClick={handleDelete}>
            Hapus Kapal
        </Button>
    )
}

export default HapusKapal

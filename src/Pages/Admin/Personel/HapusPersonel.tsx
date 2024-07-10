import Alert from "Functions/Alert"
import Api from "Functions/Api"
import { FC } from "react"
import { Button } from "react-bootstrap"

const HapusPersonel: FC<Personel.Hapus> = ({ id, personels, setPersonels }) => {
    const handleDelete = () => {
        Alert.Confirm()
            .fire({
                text: "Hapus data personel?"
            })
            .then((res) => {
                if (res.isDismissed) return

                Api.delete(`user/${id}`).then(async (res) => {
                    if (!res.ok) return

                    const personel = await res.json()
                    const updatedPersonels = personels.filter(
                        ({ id }) => personel.id != id
                    )
                    setPersonels(updatedPersonels)

                    Alert.PopUp({ title: "Data personel dihapus!" }).fire()
                })
            })
    }

    return (
        <Button className="dropdown-item" onClick={handleDelete}>
            Hapus Personel
        </Button>
    )
}

export default HapusPersonel

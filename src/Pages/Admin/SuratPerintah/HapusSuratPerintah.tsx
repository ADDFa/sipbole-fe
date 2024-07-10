import Alert from "Functions/Alert"
import Api from "Functions/Api"
import { FC } from "react"
import { Button } from "react-bootstrap"

const HapusSuratPerintah: FC<SuratPerintah.Hapus> = ({
    id,
    warrants,
    setWarrants
}) => {
    const handleClick = () => {
        Alert.Confirm()
            .fire({ text: "Hapus surat perintah?" })
            .then((res) => {
                if (res.isDismissed) return

                Api.delete(`warrant/${id}`).then(async (res) => {
                    if (!res.ok) return

                    const warrant = await res.json()
                    const updatedWarrants = warrants.filter(
                        ({ id }) => warrant.id != id
                    )
                    setWarrants(updatedWarrants)
                })
            })
    }

    return (
        <Button onClick={handleClick} className="dropdown-item">
            Hapus Surat Perintah
        </Button>
    )
}

export default HapusSuratPerintah

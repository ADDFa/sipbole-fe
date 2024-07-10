import SuratPerintah from "Pages/User/SuratPerintah/SuratPerintah"
import LaporkanKegiatan from "Pages/User/LaporkanKegiatan/LaporkanKegiatan"
import type { RouteObject } from "react-router-dom"
import LihatSuratPerintah from "Pages/User/SuratPerintah/LihatSuratPerintah"
import Jadwal from "Pages/User/Jadwal/Jadwal"

const routes: RouteObject[] = [
    {
        path: "/laporkan-kegiatan",
        element: <LaporkanKegiatan />
    },
    {
        path: "/surat-perintah",
        element: <SuratPerintah />
    },
    {
        path: "/surat-perintah/:warrantBoatId/lihat",
        element: <LihatSuratPerintah />
    },
    {
        path: "/jadwal",
        element: <Jadwal />
    }
]

export default routes

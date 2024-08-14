import SuratPerintah from "Pages/User/SuratPerintah/SuratPerintah"
import LaporkanKegiatan from "Pages/User/Laporan/LaporkanKegiatan"
import type { RouteObject } from "react-router-dom"
import LihatSuratPerintah from "Pages/User/SuratPerintah/LihatSuratPerintah"
import Jadwal from "Pages/User/Jadwal/Jadwal"
import DaftarLaporan from "Pages/User/Laporan/DaftarLaporan"

const routes: RouteObject[] = [
    {
        path: "/laporan",
        element: <DaftarLaporan />
    },
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

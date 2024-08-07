import Kapal from "Pages/Admin/Kapal/Kapal"
import EditKapal from "Pages/Admin/Kapal/EditKapal"
import TambahKapal from "Pages/Admin/Kapal/TambahKapal"
import Personel from "Pages/Admin/Personel/Personel"
import EditPersonel from "Pages/Admin/Personel/EditPersonel"
import TambahPersonel from "Pages/Admin/Personel/TambahPersonel"
import SuratPerintah from "Pages/Admin/SuratPerintah/SuratPerintah"
import EditSuratPerintah from "Pages/Admin/SuratPerintah/EditSuratPerintah"
import TambahSuratPerintah from "Pages/Admin/SuratPerintah/TambahSuratPerintah"
import Laporan from "Pages/Admin/Laporan/Laporan"
import type { RouteObject } from "react-router-dom"
import DetailKapal from "Pages/Admin/Kapal/DetailKapal"
import Jadwal from "Pages/Admin/Jadwal/Jadwal"
import TambahJadwal from "Pages/Admin/Jadwal/TambahJadwal"
import ListJadwal from "Pages/Admin/Jadwal/ListJadwal"
import EditJadwal from "Pages/Admin/Jadwal/EditJadwal"

const routes: RouteObject[] = [
    {
        path: "kapal",
        element: <Kapal />
    },
    {
        path: "kapal/tambah",
        element: <TambahKapal />
    },
    {
        path: "kapal/:id",
        element: <DetailKapal />
    },
    {
        path: "kapal/:id/edit",
        element: <EditKapal />
    },
    {
        path: "laporan",
        element: <Laporan />
    },
    {
        path: "surat-perintah",
        element: <SuratPerintah />
    },
    {
        path: "surat-perintah/tambah",
        element: <TambahSuratPerintah />
    },
    {
        path: "surat-perintah/:id/edit",
        element: <EditSuratPerintah />
    },
    {
        path: "personel",
        element: <Personel />
    },
    {
        path: "personel/tambah",
        element: <TambahPersonel />
    },
    {
        path: "personel/:id/edit",
        element: <EditPersonel />
    },
    {
        path: "jadwal",
        element: <Jadwal />
    },
    {
        path: "jadwal/tambah",
        element: <TambahJadwal />
    },
    {
        path: "jadwal/edit",
        element: <ListJadwal />
    },
    {
        path: "jadwal/edit/:id",
        element: <EditJadwal />
    }
]

export default routes

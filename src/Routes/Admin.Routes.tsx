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
import Laporkan from "Pages/Admin/Laporan/Laporkan"
import Sar from "Pages/Admin/Laporan/Sar"

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
        path: "sar",
        element: <Sar />
    },
    {
        path: "laporkan-sar",
        element: <Laporkan />
    }
]

export default routes

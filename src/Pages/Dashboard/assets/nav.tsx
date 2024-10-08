import {
    faCalendarDays,
    faFileInvoice,
    faFilePdf,
    faFilePen,
    faPeopleGroup,
    faShip
} from "@fortawesome/free-solid-svg-icons"

const nav: Dashboard.Nav = {
    admin: [
        {
            to: "/admin/personel",
            className: "personel",
            icon: faPeopleGroup,
            text: "Personel"
        },
        {
            to: "/admin/kapal",
            className: "kapal",
            icon: faShip,
            text: "Kapal"
        },
        {
            to: "/admin/surat-perintah",
            className: "sprint",
            icon: faFilePdf,
            text: "Sprint"
        },
        {
            to: "/admin/laporan",
            className: "laporan",
            icon: faFileInvoice,
            text: "Lap. Hasil"
        },
        {
            to: "/admin/sar",
            className: "laporkan",
            icon: faFilePen,
            text: "SAR"
        }
    ],
    user: [
        {
            to: "/laporan",
            className: "laporan",
            icon: faFileInvoice,
            text: "Laporan"
        },
        {
            to: "/surat-perintah",
            className: "sprint",
            icon: faFilePdf,
            text: "Sprint"
        },
        {
            to: "/jadwal",
            className: "jadwal",
            icon: faCalendarDays,
            text: "Jadwal"
        }
    ]
}

export default nav

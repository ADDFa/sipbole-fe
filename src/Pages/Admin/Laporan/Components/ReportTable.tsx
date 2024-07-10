import { FC, useCallback, useEffect, useState } from "react"
import { Table } from "react-bootstrap"

const defaultReportVal: { [month: string]: Report.RowTableValue } = {
    jan: {
        patroli_perairan: 0,
        riksa_kapal: 0,
        sar_or_laka_air: 0,
        binmas_perairan: 0
    },
    feb: {
        patroli_perairan: 0,
        riksa_kapal: 0,
        sar_or_laka_air: 0,
        binmas_perairan: 0
    },
    mar: {
        patroli_perairan: 0,
        riksa_kapal: 0,
        sar_or_laka_air: 0,
        binmas_perairan: 0
    },
    apr: {
        patroli_perairan: 0,
        riksa_kapal: 0,
        sar_or_laka_air: 0,
        binmas_perairan: 0
    },
    mei: {
        patroli_perairan: 0,
        riksa_kapal: 0,
        sar_or_laka_air: 0,
        binmas_perairan: 0
    },
    jun: {
        patroli_perairan: 0,
        riksa_kapal: 0,
        sar_or_laka_air: 0,
        binmas_perairan: 0
    },
    jul: {
        patroli_perairan: 0,
        riksa_kapal: 0,
        sar_or_laka_air: 0,
        binmas_perairan: 0
    },
    agu: {
        patroli_perairan: 0,
        riksa_kapal: 0,
        sar_or_laka_air: 0,
        binmas_perairan: 0
    },
    sep: {
        patroli_perairan: 0,
        riksa_kapal: 0,
        sar_or_laka_air: 0,
        binmas_perairan: 0
    },
    okt: {
        patroli_perairan: 0,
        riksa_kapal: 0,
        sar_or_laka_air: 0,
        binmas_perairan: 0
    },
    nov: {
        patroli_perairan: 0,
        riksa_kapal: 0,
        sar_or_laka_air: 0,
        binmas_perairan: 0
    },
    des: {
        patroli_perairan: 0,
        riksa_kapal: 0,
        sar_or_laka_air: 0,
        binmas_perairan: 0
    }
}

const ReportTable: FC<Report.ReportTable> = ({ reports }) => {
    const [reportVal, setReportVal] = useState<{
        [month: string]: Report.RowTableValue
    }>(defaultReportVal)

    useEffect(() => {
        const reportVal = JSON.parse(JSON.stringify(defaultReportVal))

        reports.forEach(({ report: { month }, activity: { activity } }) => {
            month = month.toLowerCase()

            switch (activity) {
                case "PATROLI PERAIRAN":
                    reportVal[month]["patroli_perairan"] += 1
                    break

                case "RIKSA KAPAL":
                    reportVal[month]["riksa_kapal"] += 1
                    break

                case "SAR/LAKA AIR":
                    reportVal[month]["sar_or_laka_air"] += 1
                    break

                case "BINMAS PERAIRAN":
                    reportVal[month]["binmas_perairan"] += 1
                    break
            }
        })

        setReportVal(reportVal)
    }, [reports])

    const getTotal = useCallback(
        (key: keyof Report.RowTableValue): number => {
            let total = 0

            for (const month in reportVal) {
                total += reportVal[month][key]
            }

            return total
        },
        [reportVal]
    )

    const allActivitiesInOneMonth = useCallback(
        (month: string) => {
            let total = 0
            const data = reportVal[month]

            for (const key in data) {
                total += data[key as keyof Report.RowTableValue]
            }

            return total
        },
        [reportVal]
    )

    const amount = useCallback(() => {
        let total = 0
        for (const month in reportVal) {
            const data = reportVal[month]

            for (const key in data) {
                const value = data[key as keyof Report.RowTableValue]
                total += value
            }
        }

        return total
    }, [reportVal])

    return (
        <Table responsive className="mt-5" bordered>
            <thead className="align-middle">
                <tr>
                    <th rowSpan={2} className="text-center">
                        No.
                    </th>
                    <th rowSpan={2} className="text-center">
                        Kegiatan Rutin
                    </th>
                    <th rowSpan={1} colSpan={12} className="text-center">
                        Bulan
                    </th>
                    <th rowSpan={2} className="text-center">
                        Jumlah
                    </th>
                </tr>
                <tr>
                    <th className="text-center">Jan</th>
                    <th className="text-center">Feb</th>
                    <th className="text-center">Mar</th>
                    <th className="text-center">Apr</th>
                    <th className="text-center">Mei</th>
                    <th className="text-center">Jun</th>
                    <th className="text-center">Jul</th>
                    <th className="text-center">Agu</th>
                    <th className="text-center">Sep</th>
                    <th className="text-center">Okt</th>
                    <th className="text-center">Nov</th>
                    <th className="text-center">Des</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                <tr>
                    <th className="text-center">1</th>
                    <td>Patroli Perairan</td>
                    <td className="text-center">
                        {reportVal.jan.patroli_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.feb.patroli_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.mar.patroli_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.apr.patroli_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.mei.patroli_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.jun.patroli_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.jul.patroli_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.agu.patroli_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.sep.patroli_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.okt.patroli_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.nov.patroli_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.des.patroli_perairan}
                    </td>
                    <td className="text-center">
                        {getTotal("patroli_perairan")}
                    </td>
                </tr>
                <tr>
                    <th className="text-center">2</th>
                    <td>Riska Kapal</td>
                    <td className="text-center">{reportVal.jan.riksa_kapal}</td>
                    <td className="text-center">{reportVal.feb.riksa_kapal}</td>
                    <td className="text-center">{reportVal.mar.riksa_kapal}</td>
                    <td className="text-center">{reportVal.apr.riksa_kapal}</td>
                    <td className="text-center">{reportVal.mei.riksa_kapal}</td>
                    <td className="text-center">{reportVal.jun.riksa_kapal}</td>
                    <td className="text-center">{reportVal.jul.riksa_kapal}</td>
                    <td className="text-center">{reportVal.agu.riksa_kapal}</td>
                    <td className="text-center">{reportVal.sep.riksa_kapal}</td>
                    <td className="text-center">{reportVal.okt.riksa_kapal}</td>
                    <td className="text-center">{reportVal.nov.riksa_kapal}</td>
                    <td className="text-center">{reportVal.des.riksa_kapal}</td>
                    <td className="text-center">{getTotal("riksa_kapal")}</td>
                </tr>
                <tr>
                    <th className="text-center">3</th>
                    <td>SAR/Laka Air</td>
                    <td className="text-center">
                        {reportVal.jan.sar_or_laka_air}
                    </td>
                    <td className="text-center">
                        {reportVal.feb.sar_or_laka_air}
                    </td>
                    <td className="text-center">
                        {reportVal.mar.sar_or_laka_air}
                    </td>
                    <td className="text-center">
                        {reportVal.apr.sar_or_laka_air}
                    </td>
                    <td className="text-center">
                        {reportVal.mei.sar_or_laka_air}
                    </td>
                    <td className="text-center">
                        {reportVal.jun.sar_or_laka_air}
                    </td>
                    <td className="text-center">
                        {reportVal.jul.sar_or_laka_air}
                    </td>
                    <td className="text-center">
                        {reportVal.agu.sar_or_laka_air}
                    </td>
                    <td className="text-center">
                        {reportVal.sep.sar_or_laka_air}
                    </td>
                    <td className="text-center">
                        {reportVal.okt.sar_or_laka_air}
                    </td>
                    <td className="text-center">
                        {reportVal.nov.sar_or_laka_air}
                    </td>
                    <td className="text-center">
                        {reportVal.des.sar_or_laka_air}
                    </td>
                    <td className="text-center">
                        {getTotal("sar_or_laka_air")}
                    </td>
                </tr>
                <tr>
                    <th className="text-center">4</th>
                    <td>Binmas Perairan</td>
                    <td className="text-center">
                        {reportVal.jan.binmas_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.feb.binmas_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.mar.binmas_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.apr.binmas_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.mei.binmas_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.jun.binmas_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.jul.binmas_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.agu.binmas_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.sep.binmas_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.okt.binmas_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.nov.binmas_perairan}
                    </td>
                    <td className="text-center">
                        {reportVal.des.binmas_perairan}
                    </td>
                    <td className="text-center">
                        {getTotal("binmas_perairan")}
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr className="table-primary">
                    <th colSpan={2} className="text-center">
                        Total
                    </th>
                    <td className="text-center">
                        {allActivitiesInOneMonth("jan")}
                    </td>
                    <td className="text-center">
                        {allActivitiesInOneMonth("feb")}
                    </td>
                    <td className="text-center">
                        {allActivitiesInOneMonth("mar")}
                    </td>
                    <td className="text-center">
                        {allActivitiesInOneMonth("apr")}
                    </td>
                    <td className="text-center">
                        {allActivitiesInOneMonth("mei")}
                    </td>
                    <td className="text-center">
                        {allActivitiesInOneMonth("jun")}
                    </td>
                    <td className="text-center">
                        {allActivitiesInOneMonth("jul")}
                    </td>
                    <td className="text-center">
                        {allActivitiesInOneMonth("agu")}
                    </td>
                    <td className="text-center">
                        {allActivitiesInOneMonth("sep")}
                    </td>
                    <td className="text-center">
                        {allActivitiesInOneMonth("okt")}
                    </td>
                    <td className="text-center">
                        {allActivitiesInOneMonth("nov")}
                    </td>
                    <td className="text-center">
                        {allActivitiesInOneMonth("des")}
                    </td>
                    <td className="text-center fw-bold">{amount()}</td>
                </tr>
            </tfoot>
        </Table>
    )
}

export default ReportTable

import React, { VFC } from 'react'
import s from './TechSpecItem.module.scss'

interface TechSpecsInterface {
    techSpec: {
        code?: string | null
        value?: string | null
        is_comparable?: boolean | null
    }
}

const c = {
    tableRow: `${s.tableRow} block lg:flex lg:justify-between`,
    tableHeader: `${s.tableHeader} block text-left text-sm lg:basis-1/2`,
    tableData: `${s.tableData} block lg:basis-1/2 text-sm`
}

const TechSpecItem: VFC<TechSpecsInterface> = ({
    techSpec: { code, value }
}): JSX.Element | null => {
    return (
        <tr className={c.tableRow}>
            <th className={c.tableHeader}>{code}</th>
            <td className={c.tableData}>{value}</td>
        </tr>
    )
}

export default TechSpecItem

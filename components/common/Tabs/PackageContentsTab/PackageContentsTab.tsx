import React, { VFC } from 'react'
import type { IProductContentfulResponse } from '@components/common/types'
import type { TypeComponentsTab } from '../ProductTabContent'
import s from './PackageContents.module.scss'

const PackageContentsTab: VFC<{
    packageContents?: IProductContentfulResponse<TypeComponentsTab>
}> = ({ packageContents }) => {
    const packageContentsItems = packageContents
        ?.toString()
        .split('|')
        .map((item, index) => {
            return (
                <div className={s['package-contents-item']} key={index}>
                    {item}
                </div>
            )
        })
    return <div className={s['package-contents']}>{packageContentsItems}</div>
}

export default PackageContentsTab

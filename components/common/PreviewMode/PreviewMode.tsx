import { VFC } from 'react'
import { PreviewCalendar } from './PreviewCalendar'
import s from './PreviewCalendar.module.scss'

const c /*tw*/ = {
    previewContainer: `${s.previewContainer} flex flex-col w-full`,
    previewApplyButton: `${s.previewApplyButton}`
}

export const PreviewButton: VFC = () => {
    return (
        <div className={c.previewContainer}>
            <PreviewCalendar />
        </div>
    )
}

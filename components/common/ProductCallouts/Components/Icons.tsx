import s from '../ProductCallouts.module.scss'
import { Plus } from '@components/icons'

export const IconOpen = (): JSX.Element => {
    return (
        <div className={`${s['circle']} border rounded-full`}>
            <Plus
                width={14}
                height={14}
                className={`${s['circle-open']} m-auto relative`}
            />
        </div>
    )
}

export const IconClose = (): JSX.Element => {
    return (
        <div className={`${s['circle']} border rounded-full`}>
            <Plus
                width={14}
                height={14}
                className={`${s['circle-close']} m-auto relative`}
            />
        </div>
    )
}

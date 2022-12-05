import { FC } from 'react'
import cn from 'classnames'
import s from './TwotilewithCallout.module.scss'

export interface IcalloutContent {
    heading1?: string
    heading2?: string
    description?: string
}

const c = /*twc*/ {
    calloutText: `${s['CalloutText']} text-white font-bold font-secondary w-full flex justify-center md:justify-start`,
    calloutDescription: `${s['CalloutDescription']} text-white font-normal font-secondary tracking-widest`
}

export const TwotilewithCalloutItem: FC<IcalloutContent> = ({
    heading1,
    heading2,
    description
}) => {
    return (
        <div className={cn(s['Callout'], 'mb-6 lg:mb-12')} key={heading1}>
            <div className={c.calloutText}>
                <span className={s['CalloutText1']}>{heading1}</span>
                {heading2 && (
                    <span className={cn(s['CalloutText2'], 'pl-8')}>
                        {heading2}
                    </span>
                )}
            </div>
            <div className={c.calloutDescription}>{description}</div>
        </div>
    )
}

export default TwotilewithCalloutItem

import s from './profileGrid.module.scss'
import cn from 'classnames'
import { twc } from './ProfileStyling'

type Props = {
    firstText?: string
    secondText?: string
}

export const ProfileHeader = ({ firstText, secondText }: Props) => {
    return (
        <>
            {firstText && (
                <h6
                    className={cn(s['heading'], twc.heading)}
                    dangerouslySetInnerHTML={{ __html: firstText }}
                />
            )}
            {secondText && (
                <h2
                    className={cn(s['subHeading'], twc.subHeading)}
                    dangerouslySetInnerHTML={{ __html: secondText }}
                />
            )}
        </>
    )
}

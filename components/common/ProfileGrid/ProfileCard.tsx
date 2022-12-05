import cn from 'classnames'
import Image from '@corratech/corsair-image'
import s from './profileGrid.module.scss'
import { twc } from './ProfileStyling'
import { ProfileCardProps } from './types'

type Props = {
    details?: ProfileCardProps[]
}

export const ProfileCard = ({ details }: Props) => {
    return (
        <div
            className={cn(
                s[`profile-card-grid-${details?.length}`],
                twc.profileCardGrid
            )}
        >
            {details?.map((d: ProfileCardProps) => (
                <>
                    <div className={cn(s['card-img'], twc.cardImage)}>
                        {d.image?.file?.url && (
                            <Image
                                src={d?.image?.file?.url || ''}
                                alt={d?.image?.description}
                                layout="responsive"
                                width="100"
                                height="100"
                                objectFit="cover"
                            />
                        )}
                    </div>
                    {d.cardNumber && (
                        <h5
                            className={cn(s['card-number'], twc.cardNumber)}
                            dangerouslySetInnerHTML={{ __html: d.cardNumber }}
                        />
                    )}
                    {d.heading && (
                        <h5
                            className={cn(s['card-heading'], twc.cardHeading)}
                            dangerouslySetInnerHTML={{ __html: d.heading }}
                        />
                    )}
                    {d.description && (
                        <h5
                            className={cn(
                                s['card-subHeading'],
                                twc.cardSubHeading
                            )}
                            dangerouslySetInnerHTML={{ __html: d.description }}
                        />
                    )}
                </>
            ))}
        </div>
    )
}

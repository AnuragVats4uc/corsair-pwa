import { ProfileProps } from './types'
import { useOnScreen } from '@lib/hooks/useOnScreen'
import React, { useRef } from 'react'
import cn from 'classnames'
import { twc } from './ProfileStyling'
import s from './profileGrid.module.scss'
import { ProfileHeader } from './ProfileHeader'
import { ProfileCard } from './ProfileCard'

type Props = {
    content: ProfileProps
}

const ProfileGrid = ({ content }: Props) => {
    const { heading, subHeading, profileCard } = content
    const animateRef = useRef(null)
    const { isOnScreen } = useOnScreen(animateRef, true)
    if (!content) return null
    return (
        <section
            className={s['image-container']}
            style={{
                backgroundImage: `url(${content?.backgroundImage?.file?.url})`
            }}
        >
            <div className={s['url-image']}>
                <div
                    className={cn(s['profile-container'], twc.profileContainer)}
                >
                    <div
                        className={cn(s['inner-container'], twc.innerContainer)}
                    >
                        <div
                            className={cn(
                                s['inner-container-2'],
                                twc.innerContainer2
                            )}
                        >
                            <div className="text-center">
                                <div
                                    className={cn(s['has-animate'], {
                                        [s['onScreen']]: isOnScreen
                                    })}
                                    ref={animateRef}
                                >
                                    <ProfileHeader
                                        firstText={heading}
                                        secondText={subHeading}
                                    />
                                    <ProfileCard details={profileCard} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfileGrid

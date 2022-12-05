import { useOnScreen } from '@lib/hooks/useOnScreen'
import { useRef } from 'react'
import { twc } from './BuiltInMultiMountStyling'
import { IMGGridSystemProps } from '../types'
import ImageGrid from '../ImageGrid'

import s from './BuiltInMount.module.scss'
import cn from 'classnames'

type Props = {
    content: IMGGridSystemProps
}

export const HeaderMount = ({ content }: Props) => {
    const animateRef = useRef(null)
    const { isOnScreen } = useOnScreen(animateRef, true)
    return (
        <div className={twc.textContainer}>
            <div className={twc.innerTextContainer}>
                <div className={twc.headerBox}>
                    <div className="text-center">
                        <div
                            className={cn(s['has-animate'], {
                                [s['onScreen']]: isOnScreen
                            })}
                            ref={animateRef}
                        >
                            <ImageGrid
                                content={content}
                                mainContainer={cn(s['grid-class-built'])}
                                primaryCardGrid={s['primary-grid-built']}
                                secondaryCardGrid={s['secondary-grid-built']}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

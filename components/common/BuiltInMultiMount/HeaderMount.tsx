import { useOnScreen } from '@lib/hooks/useOnScreen'
import { useRef } from 'react'
import { twc } from './BuiltInMultiMountStyling'
import s from './BuiltInMount.module.scss'
import cn from 'classnames'
import { Button } from '@corratech/pylot-ui'
import Link from '@corratech/pylot-ui/src/Link'
import { BuiltMultiMount } from './types'
import ImageGrid from '../ImageGrid'

type Props = {
    content: BuiltMultiMount
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
                            {content.heading && (
                                <h2
                                    className={twc.heading}
                                    dangerouslySetInnerHTML={{
                                        __html: content.heading
                                    }}
                                />
                            )}
                            {content.subHeading && (
                                <h6
                                    className={twc.subHeading}
                                    dangerouslySetInnerHTML={{
                                        __html: content.subHeading
                                    }}
                                />
                            )}
                            {content.body && (
                                <p
                                    className={twc.body}
                                    dangerouslySetInnerHTML={{
                                        __html: content.body
                                    }}
                                />
                            )}
                            {content.disclaimer && (
                                <p
                                    className={twc.disclaimer}
                                    dangerouslySetInnerHTML={{
                                        __html: content.disclaimer
                                    }}
                                />
                            )}
                            {content.ctaButton && (
                                <Link href={content.ctaButton.url} passHref>
                                    <a
                                        href={content.ctaButton.url}
                                        target={
                                            content.ctaButton.openInANewTab
                                                ? '_blank'
                                                : '_self'
                                        }
                                        rel="noopener noreferrer"
                                    >
                                        <Button className={twc.ctaButton}>
                                            <span
                                                className={cn(
                                                    s['cta-text'],
                                                    'text-black'
                                                )}
                                            >
                                                {content.ctaButton.displayText}
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            )}
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

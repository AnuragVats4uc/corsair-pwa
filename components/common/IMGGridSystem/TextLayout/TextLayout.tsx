import { twc } from './TextLayoutStyling'
import { Button } from '@corratech/pylot-ui'
import Link from '@corratech/pylot-ui/src/Link'
import { IMGGridSystemProps } from '../types'

import s from './TextLayout.module.scss'
import cn from 'classnames'

type Props = {
    content: IMGGridSystemProps
}

export const TextLayout = ({ content }: Props) => {
    return (
        <div className={twc.textLayout}>
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
                            content.ctaButton.openInANewTab ? '_blank' : '_self'
                        }
                        rel="noopener noreferrer"
                    >
                        <Button className={twc.ctaButton}>
                            <span className={cn(s['cta-text'], 'text-black')}>
                                {content.ctaButton.displayText}
                            </span>
                        </Button>
                    </a>
                </Link>
            )}
        </div>
    )
}

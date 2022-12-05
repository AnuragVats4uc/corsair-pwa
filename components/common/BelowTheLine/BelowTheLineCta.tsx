import s from './BelowTheLine.module.scss'
import cn from 'classnames'
import {
    CTAType,
    ImageType
} from '@pylot-data/hooks/contentful/use-content-json'
import Link from '@corratech/pylot-ui/src/Link'
import { Button } from '@corratech/pylot-ui'

type CTAProps = {
    belowCta: CTAType
}

const c /*tw*/ = {
    BelowTheLineCtaText: `
        ${s['below-the-line-cta-text-dark-background']}
        font-aktivGrotesk flex justify-center items-center text-center cursor-pointer mx-auto`
}

export const BelowTheLineCta = ({ belowCta }: CTAProps): JSX.Element | null => {
    if (!belowCta) return null
    return (
        <div className={cn(s['below-the-line-cta'], 'mx-auto')}>
            <Link href={belowCta?.url} passHref>
                <a
                    href={belowCta?.url}
                    target={belowCta?.openInANewTab ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                >
                    <Button
                        className={c.BelowTheLineCtaText}
                        dangerouslySetInnerHTML={{
                            __html: belowCta?.displayText
                        }}
                    />
                </a>
            </Link>
        </div>
    )
}

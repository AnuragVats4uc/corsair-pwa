import { FC, useState } from 'react'
import cn from 'classnames'
import s from './Ribbon.module.scss'
import { URLType } from '@pylot-data/hooks/contentful/use-content-json'
import { useRibbon } from '@pylot-data/hooks/ribbon/use-ribbon'

const Ribbon: FC = (): JSX.Element | null => {
    const [ribbonState] = useRibbon()

    if (!ribbonState) {
        return null
    }

    const {
        desktop,
        mobile,
        background,
        backgroundMobile,
        textsAndLinks
    } = ribbonState

    const desktopUrl = background?.file.url
    const mobileUrl = backgroundMobile?.file.url

    const A: FC = () => (
        <div>
            {textsAndLinks?.map((link: URLType) => (
                <a
                    className={cn(s.link, link?.cta ? s.cta : '')}
                    style={{ color: link.color }}
                    key={link.text}
                    href={link.url}
                    target={`_${link.target.toLocaleLowerCase()}`}
                >
                    <span>{link.text}</span>
                    {link.icon && (
                        <span
                            className={s['icon']}
                            style={{
                                backgroundColor: `${link.icon.color}`,
                                maskImage: `url(${link.icon.image.file.url})`,
                                WebkitMaskImage: `url(${link.icon.image.file.url})`
                            }}
                        />
                    )}
                </a>
            ))}
        </div>
    )

    return (
        <div>
            {desktop && (
                <div
                    className={cn(
                        s['ribbon'],
                        s['show-desktop'],
                        'hidden md:flex relative z-50 bg-black'
                    )}
                    style={{ backgroundImage: `url(${desktopUrl})` }}
                >
                    <A />
                </div>
            )}
            {mobile && (
                <div
                    className={cn(
                        s['ribbon'],
                        s['show-mobile'],
                        'block md:hidden'
                    )}
                    style={{ background: `url(${mobileUrl || desktopUrl})` }}
                >
                    <A />
                </div>
            )}
        </div>
    )
}

export default Ribbon

import React from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import s from './NotFound.module.scss'
import { Interface404ParsedEntries } from 'pages/404'
import Image from '@corratech/corsair-image'

const c = {
    background: `${s.background}`,
    copy: `${s.copy} font-aktivGrotesk text-center font-medium`,
    cta: `${s.cta} bg-yellow text-black inline-block uppercase text-center font-semibold`,
    notFound: `${s.notFound} relative`,
    heading: `${s.heading} text-center font-bebasNeueExtraBold uppercase`,
    logo: `${s.logo} mx-auto my-0`,
    wrapper: `${s.wrapper} w-full text-white z-10 flex flex-col justify-center align-center absolute top-1/2 left-1/2`
}

export const Component404 = ({
    pageContent
}: Interface404ParsedEntries): JSX.Element | null => {
    const { t } = useTranslation(['common'])

    if (!pageContent) {
        return null
    }

    const {
        copy,
        ctaText,
        ctaUrl,
        desktopBackgroundImage,
        heading,
        logoImage,
        mobileBackgroundImage
    } = pageContent

    return (
        <div className={c.notFound}>
            <div className={c.background}>
                {desktopBackgroundImage && (
                    <div className="hidden lg:block">
                        <Image
                            alt={desktopBackgroundImage?.description || ''}
                            src={desktopBackgroundImage.file.url}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                )}

                {mobileBackgroundImage && (
                    <div className="block lg:hidden">
                        <Image
                            alt={mobileBackgroundImage?.description || ''}
                            src={mobileBackgroundImage.file.url}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                )}
            </div>

            <div className={c.wrapper}>
                {logoImage && (
                    <div className={c.logo}>
                        <Image
                            alt={logoImage?.description || ''}
                            src={logoImage.file.url}
                            layout="responsive"
                            width={134}
                            height={32}
                        />
                    </div>
                )}

                {heading && <h1 className={c.heading}>{t(heading)}</h1>}

                {copy && <p className={c.copy}>{t(copy)}</p>}

                {ctaUrl && ctaText && (
                    <div className={c.cta}>
                        <Link href={ctaUrl}>{t(ctaText)}</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

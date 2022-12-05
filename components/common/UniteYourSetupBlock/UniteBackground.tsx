import Image from '@corratech/corsair-image'
import s from './Unite.module.scss'

type UniteBackgroundImage = {
    backgroundMedia: {
        url: string
        description?: string
    }
}

const c = /*twc*/ {
    uniteBackground: `${s['unite-background']} relative w-auto overflow-hidden z-10 md:absolute md:w-full top-0 left-0`,
    uniteBackgroundMedia: `${s['unite-background-media']} min-h-screen max-h-screen w-full overflow-hidden relative md:hidden`,
    uniteDesktopBackground: `${s['desktop-background']} hidden relative w-full h-auto min-h-screen max-h-screen max-w-full md:block md:h-full`
}

export const UniteBackground = ({ backgroundMedia }: UniteBackgroundImage) => {
    if (!backgroundMedia) return null
    return (
        <div className={c.uniteBackground}>
            <div className={c.uniteBackgroundMedia}>
                {backgroundMedia.url && (
                    <Image
                        src={backgroundMedia.url}
                        alt={backgroundMedia.description}
                        layout="fill"
                        objectFit="cover"
                    />
                )}
            </div>
            <div className={c.uniteDesktopBackground}>
                {backgroundMedia.url && (
                    <Image
                        src={backgroundMedia.url}
                        alt={backgroundMedia.description}
                        layout="responsive"
                        width={100}
                        height={100}
                        objectFit="cover"
                    />
                )}
            </div>
        </div>
    )
}

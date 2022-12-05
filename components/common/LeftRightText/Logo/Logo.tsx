import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'
import Image from '@corratech/corsair-image'

import s from './Logo.module.scss'

const c = /*tw*/ {
    leftRightTextLogo: `${s['left-right-text-logo']} relative`
}

export interface LogoProps {
    logo: ImageType
    logoAlignment: string | undefined
}

export const Logo = ({
    logo,
    logoAlignment
}: LogoProps): JSX.Element | null => {
    if (!logo) return null
    return (
        <div
            className={c.leftRightTextLogo}
            style={{
                display: 'flex',
                justifyContent: `${logoAlignment}`
            }}
        >
            <Image
                src={logo?.file?.url}
                alt={logo?.description}
                objectFit="contain"
                width={logo.file.details.image.width}
                height={logo.file.details.image.height}
            />
        </div>
    )
}

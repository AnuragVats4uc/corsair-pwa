import Image from '@corratech/corsair-image'
import cn from 'classnames'
import s from './BlockTwoTile.module.scss'
import { ImageType } from '@pylot-data/hooks/contentful/use-content-json'

type Props = {
    logo: ImageType
    logoPosition: string
    logoWidth?: string
    logoHeight?: string
}

export const BlockTwoTileLogo = ({
    logo,
    logoPosition,
    logoWidth,
    logoHeight
}: Props) => {
    return (
        <div
            className={cn(
                s['ingo-logo'],
                `relative text-center md:self-start md:mt-0 md:mb-0 lg:text-left mt-8 ${
                    logoPosition === 'Top' && 'order-first mt-0 mb-5'
                }`
            )}
        >
            <Image
                alt={logo.description}
                src={logo?.file.url}
                width={logoWidth ?? 156}
                height={logoHeight ?? 80}
            />
        </div>
    )
}

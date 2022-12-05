import Image from '@corratech/corsair-image'
import Link from '@corratech/pylot-ui/src/Link'
import s from './image.module.scss'
import cn from 'classnames'

type ImageGridDetailsProps = {
    icon: string
    key: number
    alt: string
    url: string
    newTab: boolean
}

const c = /*tw*/ {
    gridCardLogos: 'rounded-full bg-white flex justify-center cursor-pointer'
}

const GridIcon = ({ icon, key, alt, url, newTab }: ImageGridDetailsProps) => {
    if (!icon || !url) return null

    return (
        <Link href={url} key={key}>
            <a
                href={url}
                target={newTab ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className={cn(c.gridCardLogos, s['logos'])}
            >
                <Image
                    src={icon}
                    alt={alt}
                    width={20}
                    height={20}
                    objectFit="contain"
                />
            </a>
        </Link>
    )
}

export default GridIcon

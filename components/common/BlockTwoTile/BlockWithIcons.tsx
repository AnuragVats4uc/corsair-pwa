import cn from 'classnames'
import s from './BlockTwoTile.module.scss'
import Image from '@corratech/corsair-image'
import { Icons } from './BlockTwoTileTypes'

const c = /*tw*/ {
    infoIcons: 'info-icons grid grid-cols-2 text-3xl mb-10',
    imageWithTitle: `${s['info-title']} md:text-3xl leading-7 md:leading-10 uppercase font-secondary`,
    iconDescription: `${s['icons-description']} flex justify-center font-normal font-aktivGrotesk capitalize text-left mt-3`
}

type Props = {
    icons: Icons[]
    fontColor: string
}

export const BlockWithIcons = ({ icons, fontColor }: Props) => {
    const iconsLength = icons?.length
    const textColor = {
        color: fontColor
    }

    return (
        <div
            className={cn(c.infoIcons, s[`number_of_columns_${iconsLength}`], {
                [s['fixed-column-gap']]: iconsLength >= 5
            })}
        >
            {icons?.map(({ title, image, description, width, height }) => (
                <div className="image-text text-center text-3xl" key={title}>
                    <div className="info-image mb-0">
                        <Image
                            alt={image?.description}
                            width={width}
                            height={height}
                            src={image?.file.url}
                        />
                    </div>
                    <div
                        className={cn(
                            c.imageWithTitle,
                            s[`info-title-${iconsLength}`]
                        )}
                        style={textColor}
                    >
                        {title}
                    </div>
                    <p
                        className={c.iconDescription}
                        dangerouslySetInnerHTML={{ __html: description }}
                        style={textColor}
                    />
                </div>
            ))}
        </div>
    )
}

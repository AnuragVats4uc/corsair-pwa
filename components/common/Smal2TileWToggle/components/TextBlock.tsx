import { VFC } from 'react'
import { Smal2TileWToggleProp, CharacteristicBlockProp } from '../types'
import s from '../Smal2Tile.module.scss'
import Image from '@corratech/corsair-image'

const c = /*tw*/ {
    textBlock: `${s['text-block']} text-white m-auto text-center md:text-left`,
    subheading: `${s['subheading']} text-yellow font-aktivGrotesk uppercase font-bold`,
    heading: `${s['heading']} font-bebasNeue leading-none`,
    text: `${s['text']} font-aktivGrotesk leading-relaxed`,
    characteristicBlock: `${s['char-block']} flex flex-row items-center justify-center md:justify-start`,
    charImg: `${s['char-block-image']}`,
    charText: `${s['char-block-text']} font-bebasNeue font-semibold uppercase leading-6`
}

const CharacteristicBlock: VFC<CharacteristicBlockProp> = ({ desc, img }) => {
    return (
        <div className={c.characteristicBlock}>
            <div className={c.charImg}>
                <Image
                    src={img.file.url}
                    alt={img.description}
                    width={32}
                    height={32}
                    objectFit="cover"
                />
            </div>
            <div className={c.charText}>{desc}</div>
        </div>
    )
}

export const TextBlock: VFC<Smal2TileWToggleProp> = ({
    content: {
        heading,
        subheading,
        text,
        characteristicDescription: desc,
        characteristicImage: img
    }
}) => {
    return (
        <div className={c.textBlock}>
            <div className={c.subheading}>{subheading}</div>
            <div className={c.heading}>{heading}</div>
            <div className={c.text}>{text}</div>
            {desc && img && <CharacteristicBlock desc={desc} img={img} />}
        </div>
    )
}

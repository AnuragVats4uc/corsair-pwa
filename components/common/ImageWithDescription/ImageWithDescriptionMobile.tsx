import s from './ImageWithDescription.module.scss'
import Image from '@corratech/corsair-image'
import { ImageWithDescriptionProps } from '../types'

const Mobile = ({ content }: ImageWithDescriptionProps): JSX.Element | null => {
    const FIRST_IMAGE_INDEX = 0
    const SECOND_IMAGE_INDEX = 1
    return (
        <div className="w-full px-5 md:hidden">
            <div className="left-slide">
                <div className={s['image-container']}>
                    <Image
                        src={`${content?.mobileMedia[FIRST_IMAGE_INDEX]?.file?.url}`}
                        alt={`${content?.mobileMedia[FIRST_IMAGE_INDEX]?.title}`}
                        layout="fixed"
                        width={413}
                        height={254}
                    />
                </div>
                <div className={s['text-container']}>
                    <div className={s['left-inner']}>
                        <div
                            className={`${s['inner-title']} ${s['label']}`}
                            style={{
                                color: content?.titleFontColor,
                                borderBottomColor: content?.lineBelowColor
                            }}
                        >
                            {content?.title1stImage}
                        </div>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: content?.copy || ''
                            }}
                            className={s['body-copy']}
                        />
                        <div className={s['space-between-copy-disclaimer']} />
                    </div>
                </div>
                <div className={s['right-slide']}>
                    <div className={s['image-container']}>
                        <Image
                            src={`${content?.mobileMedia[SECOND_IMAGE_INDEX]?.file?.url}`}
                            alt={`${content?.mobileMedia[SECOND_IMAGE_INDEX]?.title}`}
                            layout="fixed"
                            width={413}
                            height={254}
                        />
                    </div>
                    <div className={s['text-container']}>
                        <div className={s['right-inner']}>
                            <div
                                className={`${s['inner-title']} ${s['label']}`}
                                style={{
                                    color: content?.titleFontColor2ndImage,
                                    borderBottomColor:
                                        content?.lineBelowColor2ndImage
                                }}
                            >
                                {content?.title2ndImage}
                            </div>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: content?.copy2ndImage || ''
                                }}
                                className={s['body-copy']}
                            />
                            <div
                                className={s['space-between-copy-disclaimer']}
                            />
                            <span
                                className={`${s['right-below-text']} ${s['disclaimer-copy']}`}
                            >
                                {content?.disclaimerCopy}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mobile

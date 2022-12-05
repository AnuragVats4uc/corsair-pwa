import s from './ImageWithDescription.module.scss'
import Image from '@corratech/corsair-image'
import { ImageWithDescriptionProps } from '../types'

const ImageWithDescriptionDesktop = ({
    content
}: ImageWithDescriptionProps): JSX.Element | null => {
    return (
        <div className="w-full px-5 hidden md:block">
            <div className={s['image-outer-container']}>
                <div className={s['image-container']}>
                    <Image
                        src={`${content?.desktopMedia?.file?.url}`}
                        alt={`${content?.desktopMedia?.description}`}
                        layout="fixed"
                        width={1019}
                        height={374}
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
                        <span
                            className={`${s['right-below-text']} ${s['disclaimer-copy']}`}
                        >
                            {content?.disclaimerCopy}
                        </span>
                    </div>
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
                        <div className={s['space-between-copy-disclaimer']} />
                        <span
                            className={`${s['right-below-text']} ${s['disclaimer-copy']}`}
                        >
                            {content?.disclaimerCopy2ndImage}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageWithDescriptionDesktop

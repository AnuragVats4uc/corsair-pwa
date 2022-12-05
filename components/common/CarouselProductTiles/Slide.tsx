import s from './CarouselProductTiles.module.scss'
import { CSLObject, ProductUrl } from './CarouselProductTiles'
import { useRouter } from 'next/router'
import Image from '@corratech/corsair-image'
import { useProductUrlBuilder } from '@lib/hooks/useBuildProductUrl'
import { ModelTypeEnum } from 'config'

interface SlideProps {
    cslData: CSLObject
    key: number
}

const Slide = ({ cslData, key }: SlideProps) => {
    const router = useRouter()

    const productUrlBuilder = useProductUrlBuilder({
        page: ModelTypeEnum.PRODUCT
    })

    const getProductUrl = (item: ProductUrl) => {
        return productUrlBuilder({
            product: {
                ...item,
                url_key: item?.identifier,
                categories: [
                    {
                        url_path: item?.primaryCategory?.identifier ?? null
                    }
                ]
            }
        })
    }

    return (
        <div className={s['csl-wrapper']} key={key}>
            <div className={s['header-text-container']}>
                <div className={s['logo-container']}>
                    <Image
                        className={`${s['heading-logo']} object-contain`}
                        layout="fill"
                        src={cslData?.logo.file.url}
                        alt={cslData?.logo?.description || ''}
                    />
                </div>
                <h3 className={s['heading']}>
                    {cslData?.heading?.toUpperCase()}
                </h3>
            </div>
            <div className={s['photo-container']}>
                <div className={s['main-image']}>
                    <Image
                        className="object-cover"
                        layout="fill"
                        src={cslData?.mainImage.file.url}
                        alt={cslData?.mainImage.description || ''}
                    />
                </div>
                <div className={`${s['product-tiles-container']} md:h-full`}>
                    {cslData?.productImages?.map((prod, ind) => {
                        return (
                            <>
                                <div
                                    key={ind}
                                    className={`${s['product-tile']} transition-all hidden md:flex flex-col items-center`}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() =>
                                        router.push(
                                            `${getProductUrl(
                                                prod?.productReference
                                            )}`
                                        )
                                    }
                                    onKeyDown={() => ''}
                                >
                                    {!!prod.desktop?.image.file.url && (
                                        <div
                                            className={
                                                s['product-image-container']
                                            }
                                        >
                                            <Image
                                                src={
                                                    prod.desktop?.image.file.url
                                                }
                                                layout="fill"
                                                alt={
                                                    prod.desktop?.image
                                                        .description || ''
                                                }
                                                className={`${s['product-tile-image']} object-contain`}
                                            />
                                        </div>
                                    )}
                                    <div className={s['product-info']}>
                                        <h3 className={s['product-title']}>
                                            {prod?.desktopProductTitle}
                                        </h3>
                                        <p className={s['product-description']}>
                                            {prod?.desktopProductDescription}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    key={ind + 1}
                                    className={`${s['product-tile']} transition-all flex flex-col items-center md:hidden`}
                                >
                                    {!!prod.desktop?.image.file.url && (
                                        <div
                                            tabIndex={0}
                                            className={`${s['mobile-img']} bg-contain bg-no-repeat bg-center`}
                                            style={{
                                                backgroundImage: `url(${prod.mobile?.image.file.url})`
                                            }}
                                            onClick={() =>
                                                router.push(
                                                    `${getProductUrl(
                                                        prod?.productReference
                                                    )}`
                                                )
                                            }
                                            onKeyDown={() => ''}
                                            role="button"
                                        />
                                    )}
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Slide

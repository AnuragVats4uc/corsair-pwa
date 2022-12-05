import { VFC } from 'react'
import {
    ProductBlocksProp,
    ProductBlockProps,
    ProductBlocksWrapperProp
} from './types'
import Image from '@corratech/corsair-image'
import s from './ProductBlock.module.scss'

const ProductBlock: VFC<ProductBlockProps> = ({ productBlock }) => {
    const {
        productImage: {
            description: description,
            file: { url: image }
        },
        text,
        heading,
        link
    } = productBlock

    return (
        <div className={`${s['product-block']} text-white flex flex-row`}>
            <div className={`${s['product-block-image']}`}>
                <Image
                    className="rounded-full overflow-hidden"
                    width={130}
                    height={130}
                    alt={description || ''}
                    src={image}
                />
            </div>

            <div className="flex flex-col">
                <span
                    className={`${s['product-block-heading']} font-bebasNeue`}
                >
                    {heading}
                </span>
                <p className={`${s['product-block-text']} font-aktivGrotesk`}>
                    {text}
                </p>

                {link && (
                    <a
                        className={(s['product-block-link'], 'font-medium')}
                        style={{ color: link.color }}
                        key={link.text}
                        href={link.url}
                        target={`_${link.target.toLocaleLowerCase()}`}
                    >
                        <span>{link.text}</span>
                        {link.icon && (
                            <span
                                className={s['icon']}
                                style={{
                                    backgroundColor: `${link.icon.color}`,
                                    maskImage: `url(${link.icon.image.file.url})`,
                                    WebkitMaskImage: `url(${link.icon.image.file.url})`
                                }}
                            />
                        )}
                    </a>
                )}
            </div>
        </div>
    )
}

const ProductBlocks: VFC<ProductBlocksProp> = ({ leftPanel }) => {
    const {
        heading,
        productBlocksList,
        secondaryHeading,
        secondaryProductBlocksList
    } = leftPanel

    return (
        <div className={`${s['product-blocks']} text-white flex-grow`}>
            <div className={`${s['product-blocks-heading']} font-bebasNeue`}>
                {heading}
            </div>
            <div>
                {productBlocksList.map((productBlock, index) => {
                    return (
                        <ProductBlock key={index} productBlock={productBlock} />
                    )
                })}
            </div>
            {secondaryHeading && (
                <div
                    className={`${s['product-blocks-heading']} font-bebasNeue`}
                >
                    {secondaryHeading}
                </div>
            )}
            {secondaryProductBlocksList?.length > 0 && (
                <div>
                    {secondaryProductBlocksList.map((productBlock, index) => {
                        return (
                            <ProductBlock
                                key={index}
                                productBlock={productBlock}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

const ProductBlocksWrapper: VFC<ProductBlocksWrapperProp> = ({
    productBlocks
}) => {
    const {
        heading,
        block,
        secondaryHeading,
        secondaryBlock,
        mainImage: {
            file: { url: image }
        },
        backgroundImage: {
            file: { url: bgImage }
        }
    } = productBlocks

    const leftPanel = {
        heading,
        productBlocksList: block,
        secondaryHeading,
        secondaryProductBlocksList: secondaryBlock
    }
    return (
        <div
            style={{ backgroundImage: `url(${bgImage})` }}
            className={`overflow-visible ${s['product-block-background']}`}
        >
            <div
                className={`${s['product-block-root']} m-auto relative flex flex-row flex-grow md-max:flex-col-reverse`}
            >
                <ProductBlocks leftPanel={leftPanel} />
                <div
                    className={`${s['product-block-root-image-block']} md:w-6/12`}
                >
                    <div
                        className={`${s['product-block-image-padding']} relative w-full`}
                    >
                        <Image
                            className={s['product-block-root-image']}
                            layout="fill"
                            alt={image?.description || ''}
                            src={image}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductBlocksWrapper

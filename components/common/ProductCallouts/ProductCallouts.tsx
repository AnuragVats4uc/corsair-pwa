import { VFC, useState } from 'react'
import {
    MainImage,
    ItemsList,
    setLeftRightProducts,
    setColors,
    ProductCalloutsProp
} from '@components/common/ProductCallouts'
import s from './ProductCallouts.module.scss'
import cn from 'classnames'

export const ProductCallouts: VFC<ProductCalloutsProp> = ({
    productCallouts
}) => {
    const [expand, setExpand] = useState<string>('')
    if (!productCallouts) return null
    const { heading, theme, image, calloutItems } = productCallouts

    const { leftItems, rightItems } = setLeftRightProducts(calloutItems)
    setColors(theme)

    const handleChange = (panelTitle: string) => (
        event: React.MouseEventHandler<HTMLButtonElement>,
        isExpanded: boolean
    ) => {
        setExpand(isExpanded ? panelTitle : '')
    }

    return (
        <div
            className={`${
                theme === 'dark' ? 'bg-black' : 'bg-white'
            } bg-contain`}
        >
            <div
                className={cn(
                    `${s['callout']} font-bebasNeue`,
                    theme === 'dark' ? 'text-white' : 'text-black'
                )}
            >
                <div className={`${s['callout-heading']} text-center`}>
                    {heading}
                </div>
                <div className="block md:hidden">
                    <MainImage
                        image={image}
                        imageWidth={productCallouts?.imageWidth}
                        imageHeight={productCallouts?.imageHeight}
                    />
                    <ItemsList
                        calloutItems={calloutItems}
                        handleChange={handleChange}
                        expand={expand}
                    />
                </div>
                <div className="hidden md:block">
                    <div
                        className={`${s['callout-desktop']} flex flex-row justify-evenly`}
                    >
                        <ItemsList
                            calloutItems={leftItems}
                            handleChange={handleChange}
                            expand={expand}
                        />
                        <MainImage
                            image={image}
                            imageWidth={productCallouts?.imageWidth}
                            imageHeight={productCallouts?.imageHeight}
                        />
                        <ItemsList
                            calloutItems={rightItems}
                            handleChange={handleChange}
                            expand={expand}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCallouts

import React, { useEffect, useRef, useState } from 'react'
import type { VFC } from 'react'
import cn from 'classnames'
import s from './SmartHome.module.scss'
import { SmartHomeProduct } from './SmartHome.interfaces'
import { CtaDotItem } from './DotItem'
import { SmartHomeDescription } from './SmartHomeDescription'
import { SmartHomeZoomContainer } from './SmartHomeZoomContainer'
import type { ISmartHome } from '../types'

interface SmartHomeProps {
    content: ISmartHome
}

const ZOOM_CONTAINER_BODY_CLASS = 'zoom--container-open'

const SmartHome: VFC<SmartHomeProps> = ({ content }) => {
    const [activeProduct, setActiveProduct] = useState<SmartHomeProduct>()
    const ref = useRef<HTMLDivElement>(null)

    const {
        headerIcon,
        headerTitle,
        subtitle,
        ctaLabel,
        ctaUrl,
        video,
        backgroundImage,
        products,
        fullWidth
    } = content

    const handleBodyClass = (canUpdate = false) => {
        if (typeof document === 'undefined') return

        if (canUpdate) {
            document.documentElement.classList.add(ZOOM_CONTAINER_BODY_CLASS)
        } else {
            document.documentElement.classList.remove(ZOOM_CONTAINER_BODY_CLASS)
        }
    }

    const handleDotsClick = (product: SmartHomeProduct) => {
        setActiveProduct(product)
        handleBodyClass(true)
    }

    const dotItems = products.map((product) => {
        return (
            <div key={product.title}>
                {product.showOnMobile && (
                    <div className="lg:hidden block">
                        <CtaDotItem
                            product={product}
                            onClick={handleDotsClick}
                            showOnMobile={product.showOnMobile}
                            top={product.mobilePosition.top}
                            left={product.mobilePosition.left}
                        />
                    </div>
                )}
                <div className="hidden lg:block">
                    <CtaDotItem
                        product={product}
                        top={product.desktopPosition.top}
                        left={product.desktopPosition.left}
                        onClick={handleDotsClick}
                        showOnMobile={product.showOnMobile}
                    />
                </div>
            </div>
        )
    })

    const handleClose = (isMobile: boolean) => {
        setActiveProduct(undefined)
        handleBodyClass()
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleEsc = (event: KeyboardEvent) => {
                if (event.key.toLocaleLowerCase() === 'escape') {
                    setActiveProduct(undefined)
                    handleBodyClass()
                }
            }
            window.addEventListener('keydown', handleEsc)

            return () => {
                window.removeEventListener('keydown', handleEsc)
            }
        }
    }, [])

    return (
        <div ref={ref}>
            <div
                className={cn(s['smart-home-container'], {
                    [s['smart-home-container--zoom']]: activeProduct,
                    [s['smart-home-full-width']]: fullWidth
                })}
            >
                <SmartHomeDescription
                    ctaLabel={ctaLabel}
                    ctaUrl={ctaUrl}
                    headerTitle={headerTitle}
                    icon={headerIcon.file}
                    headerSubtitle={subtitle}
                    video={video}
                    dotItems={dotItems}
                    activeProduct={activeProduct}
                />
                <SmartHomeZoomContainer
                    activeProduct={activeProduct}
                    backgroundImage={backgroundImage}
                    products={products}
                    setActiveProduct={setActiveProduct}
                    handleClose={handleClose}
                />
            </div>
        </div>
    )
}

export default SmartHome

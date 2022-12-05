import React, { Dispatch, SetStateAction, useEffect } from 'react'
import s from './Compare.module.scss'
import { useTranslation } from 'next-i18next'
import { CompareTile } from './CompareTile'
import Slider from 'react-slick'

interface CompareProps {
    compareVisibility: boolean
    items: any[]
    setCompareItems: Dispatch<SetStateAction<any>>
    setCompareVisibility: Dispatch<SetStateAction<boolean>>
}

export const Compare = ({
    compareVisibility,
    items,
    setCompareVisibility,
    setCompareItems
}: CompareProps) => {
    const { t } = useTranslation('plp')
    const compareModifier = !compareVisibility ? s['compare--tab'] : ''
    const lastItem =
        items && items.length >= 2 ? s['lastItem--not-disabled'] : ''
    const defaultSettings = {
        arrows: true,
        dots: true,
        infinite: false,
        dotsClass: 'slick-dots',
        slidesToScroll: 2,
        slidesToShow: 2,
        beforeChange: (current: number, next: number) => {
            const $sliderWrapper = document.getElementById(
                'SliderWrapper'
            ) as HTMLElement

            const $slickPrev = document.querySelector(
                '.slick-prev'
            ) as HTMLElement

            const $slickNext = document.querySelector(
                '.slick-next'
            ) as HTMLElement

            if (!$slickPrev && !$slickNext && !$sliderWrapper) return

            if (next > 0) {
                $slickPrev.style.opacity = '1'
                $slickPrev.style.visibility = 'visible'

                $slickNext.style.opacity = '0'
                $slickNext.style.visibility = 'hidden'

                $sliderWrapper.style.marginLeft = '56px'
            } else if (next === 0) {
                $slickPrev.style.opacity = '0'
                $slickPrev.style.visibility = 'hidden'

                $slickNext.style.opacity = '1'
                $slickNext.style.visibility = 'visible'

                $sliderWrapper.style.marginLeft = '0'
            }
        },
        responsive: [
            {
                breakpoint: 891,
                settings: 'unslick'
            },
            {
                breakpoint: 1193,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 1439,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 9999,
                settings: 'unslick'
            }
        ]
    }

    /**
     * Setting the height dynamically based on clientHeight of header
     * Component only opens after user interaction, therefore will not affect SSR
     */
    useEffect(() => {
        const $compare = document.getElementById('compare')
        const $header = document.getElementById('header')

        if (!$compare || !$header) return

        const clientHeight = $header ? $header.clientHeight : null

        $compare.style.top = `${clientHeight}px`
        $compare.style.height = `calc(100vh - ${clientHeight}px)`
    }, [items])

    /**
     * Handle close click
     */
    const handleCloseClick = () => {
        setCompareVisibility(false)
    }

    /**
     * Handle compare click
     */
    const handleToggleCompareView = () => {
        setCompareVisibility(true)
    }

    /**
     * Handle clear click
     */
    const handleClearClick = () => {
        /**
         * We have use querySelectorAll since our ref would be at a distant relative
         */
        const $compareButtons = document.querySelectorAll(
            '.product-compare-wrapper input'
        )

        /**
         * Sets all checkboxes back to false
         */
        $compareButtons.forEach((element: any) => {
            if (!element.checked) return
            element.click()
        })

        setCompareItems([])
        setCompareVisibility(false)
        localStorage.removeItem('compare_items')
        localStorage.removeItem('compare_plp')
    }

    /**
     * Handle compare click
     */
    const handleCompareClick = () => {
        // TODO: Add compare click logic
    }

    /**
     * Last list item
     * @returns Last list item JSX
     */
    const LastListItem = () => {
        return (
            <div className={`${s.lastItem} ${lastItem}`}>
                <div className={`${s.lastItemArticle}`}>
                    {items.length < 2 && (
                        <p className={s.subtitle}>{`${t(
                            'Select another product to compare'
                        )}`}</p>
                    )}
                    <button
                        className={s.compareButton}
                        disabled={items.length < 2}
                        onClick={handleCompareClick}
                        type="button"
                    >
                        <span className={s.compareButtonText}>{`${t(
                            'Compare'
                        )}`}</span>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            {items && items.length > 0 && (
                <section
                    id="compare"
                    className={`${s.compare} ${compareModifier}`}
                >
                    {compareVisibility && (
                        <div className={s.wrapper}>
                            <header className={s.header}>
                                <div className={s.container}>
                                    <button
                                        onClick={handleCloseClick}
                                        type="button"
                                        className={s.hide}
                                    >
                                        {`${t('Hide')}`}
                                    </button>
                                    <h3 className={s.title}>
                                        {`${t('Compare Up To 4 Products')}`}
                                    </h3>
                                    <button
                                        onClick={handleClearClick}
                                        type="button"
                                        className={s.close}
                                    />
                                </div>
                            </header>
                            <div className={s.sliderContainer}>
                                <div
                                    className={s.sliderWrapper}
                                    id="SliderWrapper"
                                >
                                    <div className={s.list}>
                                        {/*
                                        // @ts-ignore Slick interface doesn't expect a string type for 'settings'*/}
                                        <Slider {...defaultSettings}>
                                            {items.map((item, index) => {
                                                return (
                                                    <div
                                                        className={s.item}
                                                        key={index}
                                                    >
                                                        <CompareTile
                                                            element={item}
                                                            key={index}
                                                            setCompareItems={
                                                                setCompareItems
                                                            }
                                                        />
                                                    </div>
                                                )
                                            })}
                                            {items.length < 2 && (
                                                <div className={s.item} />
                                            )}
                                            {items.length < 3 && (
                                                <div className={s.item} />
                                            )}
                                            {items.length < 4 && (
                                                <div className={s.item} />
                                            )}
                                        </Slider>
                                    </div>
                                </div>
                                <LastListItem />
                            </div>
                        </div>
                    )}
                    {!compareVisibility && (
                        <button
                            className={s.button}
                            onClick={handleToggleCompareView}
                            type="button"
                        >
                            <span className={s.buttonText}>
                                {`${t('Compare')}`}{' '}
                            </span>
                            <span className={s.count}>{`${items.length}`}</span>
                        </button>
                    )}
                </section>
            )}
        </>
    )
}

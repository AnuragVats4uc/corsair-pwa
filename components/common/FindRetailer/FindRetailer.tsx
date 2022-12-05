import { FC, useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'
import s from './FindRetailer.module.scss'
import Image from '@corratech/corsair-image'

const c = /*tw*/ {
    findRetailerModal: `${s['find-retailer-modal']} fixed w-full h-full top-0 left-0 flex justify-center items-center opacity-0 duration-300 transition-all`,
    findRetailerBoxModal: `${s['find-retailer-box-modal']} w-full relative overflow-y-auto overflow-x-hidden duration-300 transition-all`,
    productImage: `${s['product-image']} block relative w-full m-auto`,
    productInfo: `${s['product-info']} lg:flex`,
    productDetails: `${s['product-details']}`,
    retailersList: `${s['retailers-list']}  flex flex-wrap justify-center`,
    title: `${s['title']}`,
    subTitle: `${s['sub-title']} font-bold`,
    closeModalBtn: `${s['close-modal-btn']} absolute cursor-pointer`,
    retailerContainer: `${s['retailer-container']} text-center flex items-center justify-center w-full`,
    retailerImage: `${s['retailer-image']} block relative bg-white w-full`,
    retailerLinkLabel: `${s['retailer-link-label']} inline-block relative`,
    btnModal: `${s['btn-modal']} border-0 shadow-none cursor-pointer`
}

// TODO - remove this retailersData after get retailers data from service
const retailersData = {
    title: 'CORSAIR XENON 32QHD165',
    subTitle: 'Gaming Monitor',
    details: [
        ' • Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        '• Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        ' • Ut enim ad minim veniam, quis nostrud exercitation'
    ],
    // TODO - Use the real image from serivce here
    imageSource:
        'https://images.ctfassets.net/87bewhkgljl1/1RvUGUDHhK289UebGZYuOM/94e23c2c13a1761773508fc901b1273c/monitor-find-retailer-modal.png',
    retailersList: [
        {
            logo:
                'https://images.ctfassets.net/87bewhkgljl1/3n2Y05s1FKgXdQffECA2C9/c61284bb8fd385a33bdf46b0d29134e8/logo-amazon.png',
            link: 'https://dev-pwa.corsair.com/us/en'
        },
        {
            logo:
                'https://images.ctfassets.net/87bewhkgljl1/4U2dBuu5OeXwAcTp3tN1kR/7676c61ddcc41d3f057e4aacb8b60270/logo-best-buy.png',
            link: 'https://dev-pwa.corsair.com/us/en'
        },
        {
            logo:
                'https://images.ctfassets.net/87bewhkgljl1/2RbazU4Pj41I8R7ESIO5JW/379fd0142c15c512f0aa4e6d92af4f4b/logo-new-egg.png',
            link: 'https://dev-pwa.corsair.com/us/en'
        },
        {
            logo:
                'https://images.ctfassets.net/87bewhkgljl1/4la6HgIIUUnyFD1SRaprmt/622f42b964f9da2205bd8fa21f58e67d/logo-central.png',
            link: 'https://dev-pwa.corsair.com/us/en'
        },
        {
            logo:
                'https://images.ctfassets.net/87bewhkgljl1/7GwdM01xC36I95xPRLYCp5/1e4e5000e2a04bf3d6962bc4264c0f53/logo-costco.png',
            link: 'https://dev-pwa.corsair.com/us/en'
        },
        {
            logo:
                'https://images.ctfassets.net/87bewhkgljl1/6uDOZfQPQ7mESGpvdQ2Xtq/17c39ec26fd9ef6a6e39889bc5898be2/logo-game-stop.png',
            link: 'https://dev-pwa.corsair.com/us/en'
        }
    ]
}

const FindRetailer: FC = (): JSX.Element | null => {
    const { t } = useTranslation(['pdp'])
    let timerHideContent = 0
    const [isContentInTransition, setIsContentInTransition] = useState(false)
    const [retailers, setRetailers] = useState(retailersData.retailersList)
    const [
        isFindRetailerModalVisible,
        setIsFindRetailerModalVisible
    ] = useState(false)

    useEffect(() => {
        return () => {
            clearTimeout(timerHideContent)
        }
    }, [timerHideContent])
    const findRetailerModalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutsideSb = (e: Event): void => {
            if (
                findRetailerModalRef.current &&
                isFindRetailerModalVisible &&
                !findRetailerModalRef.current.contains(e.target as Node)
            ) {
                retailerModalVisibiltyHandle(false)
            }
        }

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                retailerModalVisibiltyHandle(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutsideSb)
        document.addEventListener('keydown', (e: Event) =>
            handleKey(e as KeyboardEvent)
        )
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideSb)
            document.removeEventListener('keydown', (e: Event) =>
                handleKey(e as KeyboardEvent)
            )
        }
    }, [findRetailerModalRef, isFindRetailerModalVisible])

    useEffect(() => {
        const html = document.getElementsByTagName('html')[0]
        html.classList.remove('modal-active')
        if (isFindRetailerModalVisible) html.classList.add('modal-active')
    }, [isFindRetailerModalVisible])

    const retailerModalVisibiltyHandle = (status: boolean) => {
        if (status) {
            setIsFindRetailerModalVisible(true)
            timerHideContent = window.setTimeout(() => {
                setIsContentInTransition(status)
            }, 0)
        } else {
            setIsContentInTransition(status)
            timerHideContent = window.setTimeout(() => {
                setIsFindRetailerModalVisible(status)
            }, 300)
        }
    }

    const findRetailerModal = useMemo(() => {
        return (
            <div
                className={cn(c.findRetailerModal, {
                    [s['in-transition']]: isContentInTransition,
                    [s['modal-hidden']]: !isFindRetailerModalVisible
                })}
            >
                <div
                    className={c.findRetailerBoxModal}
                    ref={findRetailerModalRef}
                >
                    <button
                        onClick={() => retailerModalVisibiltyHandle(false)}
                        className={c.closeModalBtn}
                    />
                    <div className={c.productInfo}>
                        <span className={c.productImage}>
                            <Image
                                layout="fill"
                                objectFit="contain"
                                src={retailersData.imageSource}
                            />
                        </span>
                        <div className={c.productDetails}>
                            <h1 className={c.title}>{retailersData.title}</h1>
                            <p className={c.subTitle}>
                                {retailersData.subTitle}
                            </p>
                            <div>
                                <ul>
                                    {retailersData.details.map((detail) => (
                                        <li key={detail}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={c.retailersList}>
                        {retailers.length &&
                            retailers.map((retailer) => (
                                <div
                                    key={retailer.link}
                                    className={c.retailerContainer}
                                >
                                    <a
                                        href={retailer.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-yellow"
                                    >
                                        <span className={c.retailerImage}>
                                            <Image
                                                layout="fill"
                                                objectFit="contain"
                                                src={retailer.logo}
                                            />
                                        </span>
                                        <span className={c.retailerLinkLabel}>
                                            {t('SHOP NOW')}
                                        </span>
                                    </a>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )
    }, [isFindRetailerModalVisible, isContentInTransition])

    return (
        <>
            {findRetailerModal}
            <button
                onClick={() => retailerModalVisibiltyHandle(true)}
                className={c.btnModal}
            >
                {t('Find a Retailer')}
            </button>
        </>
    )
}

export default FindRetailer

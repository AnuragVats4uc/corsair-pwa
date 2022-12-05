import { Layout } from '@components/common'
import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType
} from 'next'
import { useUI } from '@corratech/pylot-ui/context'
import { Component404 } from '@components/404'

import {
    ProductItem,
    LoaderTile
} from '@components/common/ProductTile/ProductTile'
import { PLPGrid } from '@corratech/corsair-plp-grid'
import { Pagination } from '@components/common/Pagination'
import { useCategory } from '@pylot-data/hooks/category/use-category'
import type { ProductInterface } from '@pylot-data/fwrdschema'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import { Button } from '@corratech/pylot-ui'
import {
    usePLPManager,
    SortDropdown,
    Filters,
    LinkedPagesCarousel
} from '@corratech/corsair-filters-and-sort'
import { LinkedPageElement } from '@corratech/corsair-filters-and-sort/src/FilterTypes.d'
import { usePlpProducts } from '@pylot-data/hooks/category/use-plp-products'
import { Toolbar } from '@components/corra/ProductListToolbar'
import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useState
} from 'react'
import { SEO } from '@corratech/corsair-seo'
import s from '@pagestyles/Plp.module.scss'
import { usePlpTracking } from '@corratech/pylot-tag-manager'
import { useRouter } from 'next/router'
import getContentJson from '@pylot-data/api/operations/get-content-json'
import { useContentJson } from '@pylot-data/hooks/contentful/use-content-json'
import { Meta } from '@components/common/FAQModule/FAQModule'
import type { FAQModuleCollectionType } from '@components/common/FAQModule/FAQModuleCollection'
import { FAQModuleCollection } from '@components/common/FAQModule/FAQModuleCollection'
import { SortEnum } from '@pylot-data/enums/SortEnum.d'
import Dropdown from '@components/common/Dropdown'
import {
    SocialDefaultContent,
    socialDefaultContent
} from '@config/seo/defaultContents'
import { TopCategorySection } from '@components/common/TopCategorySection'

export const CATEGORY_CONTENT_TYPE = 'collection'

interface categoryDataInterface {
    identifier: string
    title: string
    metaTitle: string
    metaDescription: string
    url: string
    jasperPimId: number
    parentCategory?: categoryDataInterface
    meta: {
        contenType: string
    }
}
export interface FAQResponse {
    meta: Meta
    faqModuleCollection: FAQModuleCollectionType[]
}
import { Compare } from '@components/common/Compare'
import { useRibbon } from '@pylot-data/hooks/ribbon/use-ribbon'
import { isTransactionalView } from 'helpers'
import HeaderFindBy from '@components/common/HeaderFindBy'
import FindByFilters from '@components/common/FindByFilters'

import { CategoryInterface } from '@pylot-data/pylotschema'
import MemoryList, { ProductListItem } from '@components/common/MemoryList'
import OptionsPLPHeader from '@components/common/OptionsPLPHeader'

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=60'
    )
    const { params, locale, query } = context
    try {
        const urlPathParts = params!.url_path as string[]
        const url_path = urlPathParts[urlPathParts.length - 1]

        /**
         * TODO: remove the old category.
         * Now disabled for testing purpose and fixing one application error.
         */
        // const categoryData = await getCategory({
        //     pageSize: query?.pageSize ? Number(query?.pageSize) : 12,
        //     currentPage: query?.page ? Number(query?.page) : 1,
        //     sort: { featured: SortEnum.Asc },
        //     url_path,
        //     locale
        // })

        // if (!categoryData) {
        //     return {
        //         notFound: true
        //     }
        // }

        // const category = categoryData?.categories?.items?.[0] ?? null
        // const categoryUid = category?.uid ?? ''

        // const marketingTiles = await getMarketingTiles({
        //     category_uid: categoryUid
        // })

        const { data: categoryContentful } = await getContentJson<any>({
            queryVariables: {
                identifier: [url_path],
                contentType: CATEGORY_CONTENT_TYPE,
                options: {
                    level: 5
                }
            },
            locale: locale
        })

        const recursiveCategoryPathCheck = (
            categoryData: categoryDataInterface,
            currentValue: Array<string>
        ) => {
            currentValue.unshift(categoryData.url)
            if (
                categoryData.parentCategory &&
                categoryData.parentCategory.url !== 'root'
            ) {
                recursiveCategoryPathCheck(
                    categoryData.parentCategory,
                    currentValue
                )
            }
            return currentValue
        }

        const categoryData =
            categoryContentful &&
            categoryContentful.contentJson &&
            categoryContentful.contentJson[0]
                ? JSON.parse(categoryContentful.contentJson[0]?.entries)
                : null

        const validUrlPath =
            categoryData !== null
                ? recursiveCategoryPathCheck(categoryData, [])
                : []

        const isValidCurrentPath =
            validUrlPath.join('/') === urlPathParts.join('/')

        //Added exception to not conflict with CRS-1473
        if (!isValidCurrentPath && url_path !== 'memory') {
            return {
                notFound: true
            }
        }

        return {
            props: {
                url_path,
                categoryData: null,
                categoryUid: url_path, //replace category uid with unique value path
                marketingTiles: [],
                categoryDataContentful: categoryContentful,
                ...(await serverSideTranslations(locale!, ['common', 'plp'])),
                completeUrlPath: validUrlPath.join('/')
            }
        }
    } catch (e) {
        console.log('PLP GETSTATICPROPS ERROR')
        console.log(e)
        return {
            props: {
                ...(await serverSideTranslations(locale!, ['common', 'plp']))
            }
        }
    }
}

export const WrappedProductItem = ({
    setCompareItems,
    product,
    setCompareVisibility,
    compareItems,
    queryID
}: {
    setCompareItems?: Dispatch<SetStateAction<ProductInterface>>
    product: ProductInterface
    setCompareVisibility: Dispatch<SetStateAction<boolean>>
    compareItems?: ProductInterface[]
    queryID?: ProductInterface
}): JSX.Element => {
    return (
        <ProductItem
            setCompareItems={setCompareItems}
            product={product}
            imageParam={{ width: 500 }}
            compareItems={compareItems}
            setCompareVisibility={setCompareVisibility}
            className={cn(s['plp-grid'])}
            queryID={queryID}
        />
    )
}
export default function PLP({
    categoryData: categoryInitialData,
    categoryUid,
    categoryDataContentful,
    url_path,
    Store,
    completeUrlPath
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    const { t } = useTranslation(['common', 'plp'])
    const { LoadingIndicator } = useUI()

    //Temporary variables for memory finder development
    //This is going to be replaced in later tickets with information from contentful
    const [currentFilter, setCurrentFilter] = useState(0)
    const optionsHeaderFindBy = [
        'FIND MEMORY',
        'BROWSE BY CATEGORY',
        'FIND BY COMPATIBILITY'
    ]
    const isMemoryPage = completeUrlPath.includes('memory')
    const isSubCategory = completeUrlPath.includes('/')
    const [memoryLayout, setMemoryLayout] = useState(0)

    const router = useRouter()
    const { filter: filterParam, pageSize, page } = router?.query
    const { locale } = router

    const { data } = useContentJson<any>(
        {
            identifier: [url_path],
            contentType: 'collection',
            options: {
                level: 5
            }
        },
        {
            revalidateOnFocus: false,
            revalidateOnMount: true,
            initialData: { data: categoryDataContentful }
        }
    )

    const categoryData = data ? data[0]?.parsedEntries : null

    const appliedFilterList = data
        ? data[0]?.parsedEntries.appliedFilterList
        : null

    const { 1: setRibbon } = useRibbon()

    setRibbon(categoryData?.ribbons)

    const getPageSizeURLParam = pageSize ? Number(pageSize) : 12

    const getCurrentPageURLParam = page ? Number(page) : 1

    const [maxVisible, setMaxVisible] = useState(getPageSizeURLParam)
    const [currentPage, setCurrentPage] = useState(getCurrentPageURLParam)

    const [compareItems, setCompareItems] = useState([])
    const [compareVisibility, setCompareVisibility] = useState(false)

    //featured as default selected,
    //There will be different default sort based on category in future
    const defaultSortData = { featured: SortEnum.Asc }

    // Note to project teams - you can remove the `isHorizontal` URL parameter option
    // by hardcoding isHorizontalFilterMenu either true or false.
    // This is only used for demo purposes in Pylot.

    const { productsResult: unfilteredProductResult } = useCategory(
        url_path,
        categoryUid,
        {
            pageSize: maxVisible,
            filter: {},
            sort: defaultSortData,
            searchCriteria: [],
            currentPage
        },
        {
            initialData: {
                data: { categories: categoryInitialData?.categories }
            },
            revalidateOnMount: true,
            revalidateOnFocus: false
        },
        {
            initialData: [
                { data: { products: categoryInitialData?.products } }
            ],
            revalidateOnMount: true,
            revalidateOnFocus: false,
            initialSize: 2
        },
        {
            headers: {
                Store
            }
        },
        !filterParam || filterParam.length === 0
    )

    const plpManager = usePLPManager({
        categoryUid,
        unfilteredAggregations: unfilteredProductResult?.aggregations
    })
    //check if applied sort or set the default sort
    const { sort } = plpManager.plpState
    const sortData =
        sort && Object.keys(sort).length
            ? plpManager.plpState.sort
            : defaultSortData

    /**
     * Handles URL pageSize search param
     */
    useEffect(() => {
        if (pageSize && page) {
            setMaxVisible(Number(pageSize))
            setCurrentPage(getCurrentPageURLParam)
            setCompareVisibility(false)
        } else if (pageSize && !page) {
            const numberPageSize = Number(pageSize)

            setCurrentPage(1)
            setCompareVisibility(false)

            if (maxVisible === numberPageSize) return

            setMaxVisible(numberPageSize)
        } else if (page) {
            setCurrentPage(getCurrentPageURLParam)
        } else if (!page) {
            setCurrentPage(1)
        }
    }, [router])

    useEffect(() => {
        // On un-mount (meaning, when user leaves the category page or switches to another one)
        // clear the PLP Manager state so that it's not persisted to the next PLP
        return () => plpManager.clearPLPState({})
        // Don't add plpManager to this effect dependency array or else an endless loop occurs
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryUid])

    useEffect(() => {
        if (!compareItems) return

        const $compareCheckboxes = document.querySelectorAll(
            '.product-compare-wrapper label'
        )

        if (compareItems.length < 4) {
            $compareCheckboxes.forEach((element: any) => {
                element.style.pointerEvents = 'all'
            })
        } else {
            $compareCheckboxes.forEach((element: any) => {
                compareItems.forEach((item: any) => {
                    if (element.children[0].id.includes(item.uid)) {
                        element.style.pointerEvents = 'all'
                    } else {
                        element.style.pointerEvents = 'none'
                    }
                })
            })
        }
    }, [compareItems])

    useEffect(() => {
        const localStorageComparePDP = localStorage.getItem('compare_plp')
        const localStorageCompareItems = localStorage.getItem('compare_items')

        if (localStorageCompareItems === '[]') return

        if (localStorageComparePDP !== window.location.pathname) {
            setCompareItems([])
            localStorage.removeItem('compare_items')
            localStorage.removeItem('compare_plp')
        } else {
            const compareItemsLocalStorage: string | null =
                localStorageCompareItems || null

            const parseCompareItems = compareItemsLocalStorage
                ? JSON.parse(compareItemsLocalStorage)
                : compareItems

            setCompareItems(parseCompareItems)
        }
    }, [])

    useEffect(() => {
        const $body = document.body
        const $cartButton = document.querySelector('[aria-label="Bag"]')

        const handleCartClick = () => {
            if (compareVisibility) setCompareVisibility(false)
        }

        $cartButton?.addEventListener('click', handleCartClick)

        if (compareVisibility && compareItems.length > 0) {
            $body.classList.add('lock-y')
        } else {
            $body.classList.remove('lock-y')
        }

        return () => {
            $cartButton?.removeEventListener('click', handleCartClick)
        }
    }, [compareVisibility])

    const {
        category,
        productItems,
        productsResult,
        error,
        isLoading: isCategoryDataLoading
    } = useCategory(
        url_path,
        categoryUid,
        {
            pageSize: maxVisible,
            currentPage,
            filter: plpManager.plpState.filters,
            sort: sortData,
            searchCriteria: plpManager.plpState.appliedSearchCritieria
        },
        {
            initialData: {
                data: { categories: categoryInitialData?.categories }
            },
            revalidateOnMount: true,
            revalidateOnFocus: false
        },
        {
            initialData: [
                { data: { products: categoryInitialData?.products } }
            ],
            revalidateOnMount: true,
            revalidateOnFocus: false,
            initialSize: 2
        },
        {
            headers: {
                Store
            }
        }
    )

    const currentLinkedPages = data ? data[0]?.parsedEntries.linkedPages : []
    const parentLinkedPages = data
        ? data[0]?.parsedEntries?.parentCategory?.linkedPages
        : []

    let linkedPages

    if (isSubCategory) {
        if (parentLinkedPages) {
            linkedPages = [...parentLinkedPages, data?.[0]?.parsedEntries]
        } else {
            linkedPages = [data?.[0]?.parsedEntries]
        }
    } else {
        linkedPages = currentLinkedPages
    }

    linkedPages?.sort((a: LinkedPageElement, b: LinkedPageElement) =>
        (a?.title || '') < (b?.title || '') ? 1 : -1
    )

    const linkedPagesWithCompleteUrlPaths = linkedPages?.map(
        (page: LinkedPageElement) => {
            const url = isSubCategory
                ? completeUrlPath
                      .split(`${category?.url_key}`)[0]
                      .concat(`${page?.identifier}`)
                : `${completeUrlPath}/${page.url || page.identifier}`

            if (page?.meta?.contentType === 'content-page') {
                return {
                    ...page,
                    url: `${page.identifier}`
                }
            }

            return {
                ...page,
                url: url
            }
        }
    )

    const productItemsLimitedLength = productItems.slice(0, maxVisible)

    const { visibleProductData, productsToRender } = usePlpProducts(
        isCategoryDataLoading,
        plpManager,
        productItemsLimitedLength,
        categoryInitialData?.products,
        productsResult,
        currentPage
    )

    const queryID = visibleProductData?.queryID as string

    const toolbar = useMemo(
        () => (
            <Toolbar
                sortFields={categoryInitialData?.products?.sort_fields}
                plpManager={plpManager}
                setMaxVisible={setMaxVisible}
                setCurrentPage={setCurrentPage}
                amountOfProducts={productsToRender.length}
            >
                <Filters
                    excludeFilter={['category_uid']}
                    category={category}
                    linkedPages={linkedPagesWithCompleteUrlPaths}
                    amountOfProducts={productsResult?.total_count}
                    plpManager={plpManager}
                    aggregations={visibleProductData?.aggregations}
                    header={category?.name}
                    id={category?.id}
                    isLoading={isCategoryDataLoading}
                    className={cn(
                        isMemoryPage ? s['memory-filter'] : '',
                        'animate-fade-in-right'
                    )}
                    isNonTransactional={!isTransactionalView('filters', locale)}
                    isMemoryPage={isMemoryPage}
                    isFilterByCompatibility={currentFilter === 1}
                    appliedFilterList={appliedFilterList}
                />
            </Toolbar>
        ),
        [categoryInitialData?.products?.sort_fields, plpManager]
    )

    const plpGrid = useMemo(() => {
        return (
            queryID && (
                <PLPGrid
                    // temporarily disabling marketing tiles
                    // marketingTiles={marketingTiles}
                    marketingTiles={[]}
                    ProductTile={(tileProps) => (
                        <WrappedProductItem queryID={queryID} {...tileProps} />
                    )}
                    LoadingTile={LoaderTile}
                    products={productsToRender}
                    isLoading={isCategoryDataLoading}
                    pageSize={maxVisible}
                    compareItems={compareItems}
                    setCompareItems={setCompareItems}
                    setCompareVisibility={setCompareVisibility}
                    className={s['grid-firefox']}
                />
            )
        )
    }, [productsToRender, compareItems, queryID])

    const memoryList = useMemo(() => {
        return (
            queryID && (
                <MemoryList
                    products={productsToRender}
                    isLoading={isCategoryDataLoading}
                    pageSize={maxVisible}
                    LoadingTile={LoaderTile}
                    ProductTile={(tileProps) => (
                        <ProductListItem queryID={queryID} {...tileProps} />
                    )}
                    className={s['memory-list']}
                />
            )
        )
    }, [productsToRender, queryID])

    usePlpTracking(category, isCategoryDataLoading, visibleProductData)

    if (error) {
        return <Component404 />
    }

    if (!category) {
        return <LoadingIndicator />
    }

    const totalProductsInCategory =
        productsResult?.total_count ??
        categoryInitialData?.products?.total_count ??
        0

    const pageInfo = productsResult?.page_info
        ? productsResult?.page_info
        : null

    const totalCount = productsResult?.total_count
        ? productsResult?.total_count
        : null

    const totalResults = productsResult?.total_count
        ? `${productsResult?.total_count} ${
              productsResult?.total_count !== 1 ? 'Results' : 'Result'
          }`
        : null

    const { seoImage } = socialDefaultContent

    const socialContent: SocialDefaultContent = {
        ...socialDefaultContent,
        seoImage: categoryData?.socialDefaultImage || seoImage
    }

    let isPaginationVisible = false
    if (pageInfo && pageInfo?.current_page && pageInfo?.total_pages) {
        isPaginationVisible = pageInfo.current_page <= pageInfo.total_pages
    }

    const memoryPageShell =
        currentFilter === 1 && memoryLayout === 0 ? memoryList : plpGrid

    const resultsHeader = (
        <span
            className={cn(
                s['results-header'],
                'absolute left-0 white text-white font-bebasNeueBold tracking-normal uppercase md-max:pt-2 md-max:pb-2'
            )}
        >
            {totalResults}
        </span>
    )

    const showItemAmountDropdown = () => {
        return (
            setCurrentPage && (
                <Dropdown
                    amountOfProducts={productsToRender.length}
                    totalProducts={totalProductsInCategory}
                    callback={setMaxVisible}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                >
                    {t('View' + ':')}
                </Dropdown>
            )
        )
    }

    const getCategoryData = (categoryData: CategoryInterface) => {
        categoryData = data ? data[0]?.parsedEntries : null

        return {
            ...category,
            meta_description: t(`${categoryData?.metaDescription}`),
            meta_title: categoryData?.metaTitle,
            staged: categoryData?.staged,
            uid: categoryData?.uid
        }
    }

    return (
        <div>
            <SEO
                category={getCategoryData(categoryData)}
                socialDefaultContent={socialContent}
            />
            {/* {category.children && category.children.length > 0 && (
                <PlpSubcategories items={category.children as []} />
            )} */}
            <div className={s['main']}>
                <TopCategorySection
                    category={categoryData}
                    breadcrumbs={category}
                />
                {isMemoryPage && (
                    <HeaderFindBy
                        options={optionsHeaderFindBy}
                        currentFilter={currentFilter}
                        setCurrentFilter={setCurrentFilter}
                    />
                )}
                <div className={s['main-page-root']}>
                    <div className="md:flex md:flex-row md:justify-items-center">
                        <div
                            id="mobileToolbar"
                            className={cn(
                                plpManager.plpState.filtersVisible
                                    ? ''
                                    : 'md-max:hidden',
                                'md:w-3/12 uppercase pt-6 mt-4'
                            )}
                        >
                            {toolbar}
                        </div>
                        <div
                            className={cn(
                                s['plp-root'],
                                `md:self-start md:w-9/12 ${
                                    currentFilter === 1 ? 'mt-6' : 'mt-0'
                                }`
                            )}
                        >
                            {currentFilter === 1 && (
                                <FindByFilters
                                    plpManager={plpManager}
                                    categoryDataContentful={
                                        categoryDataContentful.contentJson
                                            .length
                                            ? categoryDataContentful
                                                  .contentJson[0]
                                            : {}
                                    }
                                />
                            )}
                            {currentFilter != 1 &&
                                productsToRender.length <= 0 && (
                                    <div
                                        className={cn(
                                            s['toolbar-header-category'],
                                            s['wrapper-sort-filter'],
                                            'mx-auto w-full flex flex-col items-end md:items-center md:justify-end md:flex-row relative z-10'
                                        )}
                                    >
                                        {linkedPages && (
                                            <LinkedPagesCarousel
                                                category={category}
                                                linkedPages={
                                                    linkedPagesWithCompleteUrlPaths
                                                }
                                            />
                                        )}
                                    </div>
                                )}
                            {currentFilter != 1 && productsToRender.length > 0 && (
                                <div
                                    className={cn(
                                        s['toolbar-header-category'],
                                        s['wrapper-sort-filter'],
                                        'mx-auto w-full flex flex-col items-end md:items-center md:justify-end md:flex-row relative z-10'
                                    )}
                                >
                                    {linkedPages && (
                                        <LinkedPagesCarousel
                                            category={category}
                                            linkedPages={
                                                linkedPagesWithCompleteUrlPaths
                                            }
                                        />
                                    )}
                                    {totalResults && resultsHeader}
                                    <div className={cn(s['amount-wrapper'])}>
                                        {showItemAmountDropdown()}
                                    </div>

                                    {currentFilter === 1 && isMemoryPage && (
                                        <OptionsPLPHeader
                                            layout={memoryLayout}
                                            setLayout={setMemoryLayout}
                                        />
                                    )}
                                    {(
                                        productsResult ||
                                        categoryInitialData?.products
                                    )?.sort_fields && (
                                        <div
                                            className={cn(
                                                s['wrapper-dropdown']
                                            )}
                                        >
                                            <SortDropdown
                                                sortFields={
                                                    (
                                                        productsResult ||
                                                        categoryInitialData.products
                                                    ).sort_fields
                                                }
                                                applySort={plpManager.applySort}
                                                appliedSort={
                                                    plpManager.plpState.sort
                                                }
                                                isNonTransactional={
                                                    !isTransactionalView(
                                                        'sorters',
                                                        locale
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            <div
                                className={cn(
                                    s['refine-button'],
                                    'md:hidden pt-0 pb-4'
                                )}
                            >
                                <Button
                                    className={`${s['btn-label']} w-full`}
                                    onClick={() => {
                                        plpManager.setFiltersVisible(
                                            !plpManager.plpState.filtersVisible
                                        )
                                    }}
                                >
                                    {t('Refine')}
                                </Button>
                            </div>
                            {isMemoryPage ? memoryPageShell : plpGrid}
                            {isPaginationVisible && (
                                <div className="hidden md:block mt-12">
                                    <Pagination
                                        maxVisible={maxVisible}
                                        pageInfo={pageInfo}
                                        totalCount={totalCount}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        {categoryData?.faqModuleCollection?.length &&
                            !isMemoryPage && (
                                <div
                                    className={cn(
                                        s['container-classes'],
                                        s['faq-container']
                                    )}
                                >
                                    <FAQModuleCollection
                                        isPlpPage
                                        items={categoryData.faqModuleCollection}
                                    />
                                </div>
                            )}
                    </div>
                    {isPaginationVisible && (
                        <div className="md:hidden mt-12">
                            <Pagination
                                maxVisible={maxVisible}
                                isMobile
                                pageInfo={pageInfo}
                                totalCount={totalCount}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    )}
                    <div className={cn(s['refine-button'], 'md:hidden pt-6')}>
                        <Button
                            className={`${s['btn-label']} w-full`}
                            onClick={() => {
                                plpManager.setFiltersVisible(
                                    !plpManager.plpState.filtersVisible
                                )
                            }}
                        >
                            {t('Refine')}
                        </Button>
                    </div>
                </div>

                {/*
                  Commenting this lines because:
                  The client has decided to deprioritize comparison tray from MVP
                <Compare
                    compareVisibility={compareVisibility}
                    items={compareItems}
                    setCompareItems={setCompareItems}
                    setCompareVisibility={setCompareVisibility}
                /> */}
            </div>
        </div>
    )
}

PLP.Layout = Layout

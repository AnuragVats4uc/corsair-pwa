import { Layout } from '@components/common'
import { PLPGrid, EmptyPLP } from '@corratech/corsair-plp-grid'
import { useRouter } from 'next/router'
import { useSearch } from '@pylot-data/hooks/search/use-search'
import { WrappedProductItem } from './c/[...url_path]'
import { useUI } from '@corratech/pylot-ui/context'
import {
    Filters,
    usePLPManager,
    SortDropdown
} from '@corratech/corsair-filters-and-sort'
import { usePlpProducts } from '@pylot-data/hooks/category/use-plp-products'
import { Pagination } from '@components/common/Pagination'
import { Toolbar } from '@components/corra/ProductListToolbar'
import React, { useMemo, useState, useEffect } from 'react'
import { serverSideTranslations } from '@pylot-data/serverSideTranslations'
import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType
} from 'next'
import { useTranslation } from 'next-i18next'
import { SEO } from '@corratech/corsair-seo'
import s from '@pagestyles/Search.module.scss'
import { useSearchTracking } from '@corratech/pylot-tag-manager'
import { LoaderTile } from '@components/common/ProductTile/ProductTile'
import searchProducts from '@pylot-data/api/operations/search-products'
import Dropdown from '@components/common/Dropdown'
import cn from 'classnames'
import { Button } from '@corratech/pylot-ui'
import { socialDefaultContent } from '@config/seo/defaultContents'
import { isTransactionalView } from 'helpers'

const searchClassNames = {
    header: 'uppercase text-white font-aktivGrotesk',
    noResultsHeader: 'font-normal inline-block text-white font-aktivGrotesk',
    searchButton: 'block uppercase text-base font-bold text-black',
    searchTerm: 'font-bold pl-2 font-aktivGrotesk',
    showMoreButton: 'uppercase text-yellow relative my-15 pl-5 md:pl-10 xl:pl-0'
}

export const getServerSideProps: GetServerSideProps = async ({
    query,
    locale
}: GetServerSidePropsContext) => {
    const searchTerm = query.q
    if (!searchTerm) {
        return {
            redirect: {
                destination: '/'
            },
            props: {
                ...(await serverSideTranslations(locale!, ['common', 'plp']))
            }
        }
    }

    const firstPageOfResults = await searchProducts({
        searchTerm: Array.isArray(searchTerm) ? searchTerm[0] : searchTerm,
        pageSize: query?.pageSize ? Number(query?.pageSize) : 6,
        locale
    })

    return {
        props: {
            firstPageOfResults,
            ...(await serverSideTranslations(locale!, ['common', 'plp']))
        }
    }
}

export default function Search({
    firstPageOfResults
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    const { t } = useTranslation(['common', 'plp'])

    const router = useRouter()
    const { query, locale } = router
    const { pageSize, page } = query

    const { LoadingIndicator } = useUI()

    const getPageSizeURLParam = pageSize ? Number(pageSize) : 6
    const getCurrentPageURLParam = page ? Number(page) : 1

    const [currentPage, setCurrentPage] = useState(getCurrentPageURLParam)
    const [compareItems, setCompareItems] = useState([])
    const [compareVisibility, setCompareVisibility] = useState(false)
    const [maxVisible, setMaxVisible] = useState(getPageSizeURLParam)

    const { q: searchTerm = '', criteria } = query
    const { productsResult: unfilteredProductsResult } = useSearch(
        searchTerm as string,
        {
            pageSize: maxVisible,
            sort: {},
            searchCriteria: [],
            currentPage
        },
        {
            initialData: [firstPageOfResults],
            revalidateOnFocus: false
        },
        undefined,
        !criteria || criteria.length === 0
    )

    const plpManager = usePLPManager({
        unfilteredAggregations: unfilteredProductsResult?.aggregations
    })

    useEffect(() => {
        // On un-mount (meaning, when user leaves the search page or switches to another search term)
        // clear the PLP Manager state so that it's not persisted to the next search page
        return () => plpManager.clearPLPState({})
        // Don't add plpManager to this effect dependency array or else an endless loop occurs
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])

    const {
        productsResult: products,
        productItems,
        error,
        isLoading
    } = useSearch(
        searchTerm as string,
        {
            pageSize: maxVisible,
            sort: plpManager.plpState.sort,
            searchCriteria: plpManager.plpState.appliedSearchCritieria,
            currentPage
        },
        {
            initialData: [firstPageOfResults],
            revalidateOnMount: true,
            revalidateOnFocus: false,
            initialSize: 2
        }
    )

    const { visibleProductData, productsToRender } = usePlpProducts(
        isLoading,
        plpManager,
        productItems,
        null,
        products
    )
    const [showMore, setShowMore] = useState<boolean>(
        productsToRender.length >= 6
    )

    const isSearchUrl = () => {
        return !!router.asPath.includes('&q=')
    }

    const pageInfo = products?.page_info ? products?.page_info : null
    const totalCount = products?.total_count ? products?.total_count : null

    const showItemAmountDropdown = () => {
        return (
            setCurrentPage && (
                <Dropdown
                    amountOfProducts={productsToRender.length}
                    callback={setMaxVisible}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    totalProducts={firstPageOfResults.data.products.total_count}
                >
                    {t('View' + ':')}
                </Dropdown>
            )
        )
    }
    const toolbar = useMemo(
        () => (
            <Toolbar
                amountOfProducts={productsToRender.length}
                plpManager={plpManager}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                setMaxVisible={setMaxVisible}
            >
                <Filters
                    plpManager={plpManager}
                    aggregations={visibleProductData?.aggregations}
                    isLoading={isLoading}
                    isNonTransactional={!isTransactionalView('filters', locale)}
                />
            </Toolbar>
        ),
        [
            isLoading,
            plpManager,
            visibleProductData?.aggregations,
            visibleProductData?.sort_fields
        ]
    )

    const plpGrid = useMemo(
        () => (
            <PLPGrid
                ProductTile={WrappedProductItem}
                LoadingTile={LoaderTile}
                products={productsToRender}
                isLoading={isLoading}
                pageSize={maxVisible}
                compareItems={compareItems}
                setCompareItems={setCompareItems}
                setCompareVisibility={setCompareVisibility}
                searchTerm={searchTerm}
            />
        ),
        [productsToRender, isLoading]
    )

    useSearchTracking(searchTerm, visibleProductData, isLoading)

    if (!error && !visibleProductData && !isLoading) {
        return (
            <div className="text-center">
                <LoadingIndicator />
            </div>
        )
    }

    if (error) {
        return (
            <h3 className="text-center">
                {t(
                    'An unexpected error occurred. Please refresh the page or try again later.'
                )}
            </h3>
        )
    }

    const handleShowMoreClick = (e: any) => {
        e.preventDefault()
        setShowMore(false)
        setMaxVisible(12)
    }

    return (
        <div className={cn(s['plp-root'], 'mx-auto w-full')}>
            <SEO
                titleOverride={t('plp||search|Search Page')}
                disableCanonicals={
                    !!(productsToRender && productsToRender.length === 0)
                }
                noFollow={!!(productsToRender && productsToRender.length === 0)}
                socialDefaultContent={socialDefaultContent}
            />
            {((productsToRender && productsToRender.length > 0) ||
                isSearchUrl()) && (
                <div>
                    {productsToRender && productsToRender.length > 0 && (
                        <h1
                            className={`${s['search-header']} ${searchClassNames.header} ${s['heading']}`}
                        >
                            {`${t('plp|| You Searched For')}: `}&quot;
                            {searchTerm}
                            &quot;
                        </h1>
                    )}
                    <div
                        className={cn(
                            s['toolbar-header'],
                            'mx-auto w-full flex flex-col items-end md:items-center md:justify-end md:flex-row relative z-2'
                        )}
                    >
                        {showItemAmountDropdown()}

                        <SortDropdown
                            sortFields={unfilteredProductsResult?.sort_fields!}
                            applySort={plpManager.applySort}
                            appliedSort={plpManager.plpState.sort}
                            isNonTransactional={
                                !isTransactionalView('sorters', locale)
                            }
                        />
                    </div>
                </div>
            )}
            {productsToRender &&
                productsToRender.length === 0 &&
                !isSearchUrl() && <EmptyPLP searchTerm={searchTerm} />}
            {((productsToRender && productsToRender.length > 0) ||
                isSearchUrl()) && (
                <div className="md:flex md:flex-row md:justify-items-center">
                    <div className="md:w-3/12 hidden md:block">{toolbar}</div>
                    <div className="md:self-start md:w-9/12">
                        <div id="mobileToolbar" className="block md:hidden">
                            {toolbar}
                        </div>
                        {plpGrid}
                        <div className="md:hidden p-5">
                            <Button
                                className={`${s['btn-label']} w-full`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    plpManager.setFiltersVisible(
                                        !plpManager.plpState.filtersVisible
                                    )
                                }}
                            >
                                {t('Refine')}
                            </Button>
                        </div>
                        <div>
                            {showMore &&
                                productsToRender &&
                                productsToRender.length > 0 && (
                                    <button
                                        className={`${s['search-show-more']} ${searchClassNames.showMoreButton}`}
                                        type="button"
                                        onClick={handleShowMoreClick}
                                    >
                                        {t('Show More')}
                                    </button>
                                )}
                            {!showMore &&
                                productsToRender &&
                                productsToRender.length > 0 && (
                                    <>
                                        <div className="hidden md:block mt-12">
                                            <Pagination
                                                maxVisible={maxVisible}
                                                pageInfo={pageInfo}
                                                totalCount={totalCount}
                                                setCurrentPage={setCurrentPage}
                                            />
                                        </div>
                                        <div className="md:hidden">
                                            <Pagination
                                                maxVisible={maxVisible}
                                                isMobile
                                                pageInfo={pageInfo}
                                                totalCount={totalCount}
                                                setCurrentPage={setCurrentPage}
                                            />
                                        </div>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

Search.Layout = Layout

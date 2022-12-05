import { useBaseUrl } from '@config/hooks/useBaseUrl'
import { useAccount } from '@corratech/pylot-auth-manager'
import { DataLayerAction } from '@corratech/pylot-tag-manager'
import { Cart, Maybe, ProductInterface } from '@pylot-data/pylotschema'
import { ModelTypeEnum, useStoreConfig } from 'config'
import { useEffect, useRef } from 'react'
import aa, { InsightsMethodMap } from 'search-insights'
type AlgoliaData = {
    algoliaHandler: DataLayerAction
}

type AlgoliaEventHandlerData = {
    product?: ProductInterface
    queryID?: string
    position?: number
}

export type ModelUrlData = {
    [key: string]: {
        suffix?: string
        directory?: string
    }
}

export const algoliaEvents = {
    productClickedPLP: 'PLP: Product Clicked',
    productAddedToCartPLP: 'PLP: Product added to cart',
    productAddedToCartPDP: 'PDP: Product added to cart',
    autocompleteProductClicked: 'Autocomplete: Product Clicked',
    productAddedToCartAfterSearch: 'Product Added to Cart after Search'
}

export const useAlgoliaEvents = (): AlgoliaData => {
    const atcActionName = useRef<string | false>(false)
    const isFromSearch = useRef<boolean>(false)
    const { data: userData } = useAccount()
    // Algolia UserToken must contain only alphanumeric, equal, plus, slash, hyphen, or underscore characters
    const userToken = userData?.data?.customer?.email?.replace(
        /[^A-Za-z0-9=+/\-_]/g,
        '_'
    )
    const {
        base: {
            url: { model }
        },
        base: { algolia }
    } = useStoreConfig()
    const { region: currentRegion, language: locale } = useBaseUrl(
        typeof window !== 'undefined' ? window.location.href : ''
    )

    const isEnabled = !!(algolia?.appId && algolia?.apiKey && algolia?.index)
    let ALGOLIA_INDEX: Maybe<string>

    if (isEnabled && currentRegion && typeof window !== 'undefined') {
        ALGOLIA_INDEX = `products_${locale.toLocaleLowerCase()}`
        aa('init', {
            apiKey: algolia.apiKey,
            appId: algolia.appId,
            useCookie: true // if user is not logged in (userToken == undefined), get userToken from cookies
        })
    }
    useEffect(() => {
        if (userToken) {
            aa('setUserToken', userToken)
        }
    }, [userToken, algolia.defaultUserToken])

    const sendAlgoliaEvents = (
        product: ProductInterface,
        eventName: string,
        queryID?: string,
        position?: number
    ) => {
        const algoliaEventNames: { [x: string]: keyof InsightsMethodMap } = {
            [algoliaEvents.productClickedPLP]: 'clickedObjectIDs',
            [algoliaEvents.productAddedToCartPDP]: 'convertedObjectIDs',
            [algoliaEvents.autocompleteProductClicked]:
                'clickedObjectIDsAfterSearch',
            [algoliaEvents.productAddedToCartAfterSearch]:
                'convertedObjectIDsAfterSearch',
            [algoliaEvents.productAddedToCartPLP]:
                'convertedObjectIDsAfterSearch'
        }
        const isClickEvent =
            eventName === algoliaEvents.productClickedPLP ||
            eventName === algoliaEvents.autocompleteProductClicked

        if (product?.uid && ALGOLIA_INDEX) {
            aa(algoliaEventNames[eventName], {
                index: ALGOLIA_INDEX,
                eventName,
                objectIDs: [product.uid],
                queryID,
                ...(isClickEvent && { positions: [position] })
            })
        }
    }

    const getPageType = (virtualPagePath: string | undefined): string => {
        let pageTypeName = ''
        if (!virtualPagePath) return pageTypeName
        Object.entries(model as ModelUrlData).forEach(([key, value]) => {
            if (
                value.directory === virtualPagePath.split('/')[0] ||
                value.directory === virtualPagePath.split('/')[2]
            ) {
                pageTypeName = key
            }
        })
        return pageTypeName
    }

    const pageViewHandler = (data: Record<string, unknown>): void => {
        const pageTypeName = getPageType(
            data['virtualPagePath'] as string | undefined
        )
        if (pageTypeName === ModelTypeEnum.CATEGORY) {
            atcActionName.current = algoliaEvents.productAddedToCartPLP
        } else if (pageTypeName === ModelTypeEnum.PRODUCT) {
            atcActionName.current = isFromSearch.current
                ? algoliaEvents.productAddedToCartAfterSearch
                : algoliaEvents.productAddedToCartPDP
        } else {
            atcActionName.current = false
        }
        isFromSearch.current = false
    }

    const addToCartHandler = (data: AlgoliaEventHandlerData): void => {
        const { product } = data.product?.items?.[0] || data
        const { queryID } = data

        if (atcActionName.current) {
            sendAlgoliaEvents(
                product as ProductInterface,
                atcActionName.current,
                queryID as string
            )
        }
    }

    const productClickAutocompleteHandler = (
        data: AlgoliaEventHandlerData
    ): void => {
        isFromSearch.current = true
        const { product, queryID, position } = data
        sendAlgoliaEvents(
            product as ProductInterface,
            algoliaEvents.autocompleteProductClicked,
            queryID,
            position
        )
    }

    const productClickPLPHandler = (data: AlgoliaEventHandlerData): void => {
        const { product, queryID, position } = data
        sendAlgoliaEvents(
            product as ProductInterface,
            algoliaEvents.productClickedPLP,
            queryID,
            position
        )
    }

    const eventHandlers: Record<string, any> = {
        ADD_TO_CART_WITH_QUERY_ID: addToCartHandler,
        PAGE_VIEW: pageViewHandler,
        PRODUCT_CLICK_AUTOCOMPLETE: productClickAutocompleteHandler,
        PRODUCT_CLICK_PLP: productClickPLPHandler
    }

    const handleDataLayerAction: DataLayerAction = (action) => {
        if (!isEnabled) {
            return
        }
        if (action.type && typeof eventHandlers[action.type] === 'function') {
            eventHandlers[action.type](action.data)
        }
    }

    return {
        algoliaHandler: handleDataLayerAction
    }
}

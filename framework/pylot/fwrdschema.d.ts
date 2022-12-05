import { CurrencyEnum } from './enums/CurrencyEnum.d'
import { ProductStockStatus } from './enums/ProductStockStatus.d'
import { SortEnum } from './enums/SortEnum.d'
import { CountryCodeEnum } from './enums/CountryCodeEnum.d'
import { GiftCardTypeEnum } from './enums/GiftCardTypeEnum'
import { SearchCriteria } from './api/operations/get-category'

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
}

export type AddBundleProductsToCartInput = {
    cart_id: Scalars['String']
    cart_items: Array<Maybe<BundleProductCartItemInput>>
}

export type AddBundleProductsToCartOutput = {
    __typename?: 'AddBundleProductsToCartOutput'
    cart: Cart
}

export type AddConfigurableProductsToCartInput = {
    cart_id: Scalars['String']
    cart_items: Array<Maybe<ConfigurableProductCartItemInput>>
}

export type AddConfigurableProductsToCartOutput = {
    __typename?: 'AddConfigurableProductsToCartOutput'
    cart: Cart
}

export type AddCustomGiftCardProductsToCartInput = {
    cart_id: Scalars['String']
    cart_items: Array<Maybe<CustomGiftCardProductCartItemInput>>
}

export type AddDownloadableProductsToCartInput = {
    cart_id: Scalars['String']
    cart_items: Array<Maybe<DownloadableProductCartItemInput>>
}

export type AddDownloadableProductsToCartOutput = {
    __typename?: 'AddDownloadableProductsToCartOutput'
    cart: Cart
}

export type AddGiftCardProductsToCartInput = {
    cart_id: Scalars['String']
    cart_items: Array<Maybe<GiftCardProductCartItemInput>>
}

export type AddGiftCardProductsToCartOutput = {
    __typename?: 'AddGiftCardProductsToCartOutput'
    cart: Cart
    /** GiftCard Error Message */
    error_message?: Maybe<Scalars['String']>
}

export type AddProductsToCartOutput = {
    __typename?: 'AddProductsToCartOutput'
    /** Returns information about shopping cart */
    cart?: Maybe<Cart>
    /** Success/Error messages */
    messages?: Maybe<Messages>
    /** The page, that should be shown after this action */
    redirect_url?: Maybe<Scalars['String']>
    /** Action result state */
    result: Scalars['Boolean']
    /** An error encountered while adding an item to the cart. */
    user_errors: Array<Maybe<CartUserInputError>>
}

/** Contains the customer's wish list and any errors encountered */
export type AddProductsToWishlistOutput = {
    __typename?: 'AddProductsToWishlistOutput'
    /** An array of errors encountered while adding products to a wish list */
    user_errors: Array<Maybe<WishListUserInputError>>
    /** Contains the wish list with all items that were successfully added */
    wishlist: Wishlist
}

export type AddProductToRequisitionListInput = {
    items?: Maybe<Array<Maybe<RequisitionListProduct>>>
    /** Wishlist ID */
    requisitionListId?: Maybe<Scalars['Int']>
}

export type AddRmaCommentInput = {
    comment?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['Int']>
}

export type AddRmaCommentOutput = {
    __typename?: 'AddRmaCommentOutput'
    comments?: Maybe<Array<Maybe<Comments>>>
}

export type AddSimpleProductsToCartInput = {
    cart_id: Scalars['String']
    cart_items: Array<Maybe<SimpleProductCartItemInput>>
}

export type AddSimpleProductsToCartOutput = {
    __typename?: 'AddSimpleProductsToCartOutput'
    cart: Cart
}

export type AddToCart = {
    /** A flag that means that all the items should be added */
    add_all?: Maybe<Scalars['Boolean']>
    /** Encoded cart ID */
    cart_id: Scalars['String']
    /** A list of item IDs to add */
    items?: Maybe<Array<Maybe<ItemToCart>>>
    /** Wishlist ID */
    wishlist_id?: Maybe<Scalars['Int']>
}

export type AddToCartFromRequisitionList = {
    /** A flag that means that all the items should be added */
    addAll?: Maybe<Scalars['Boolean']>
    /** A flag that means that related to cart merge */
    cartId: Scalars['String']
    /** A list of item IDs to add */
    items?: Maybe<Array<Maybe<ItemToCart>>>
    /** Requisition List ID */
    requisitionListId?: Maybe<Scalars['Int']>
    /** A flag that means for cart clear */
    shouldReplace?: Maybe<Scalars['Boolean']>
}

export type AddToCartOutput = {
    __typename?: 'AddToCartOutput'
    /** Returns information about shopping cart */
    cart?: Maybe<Cart>
    /** Success/Error messages */
    messages?: Maybe<Scalars['String']>
}

export type AddToRequisitionListOutput = {
    __typename?: 'AddToRequisitionListOutput'
    /** Item added to requisition list */
    messages?: Maybe<Scalars['String']>
}

export type AddToWishlist = {
    items?: Maybe<Array<Maybe<WishlistProduct>>>
}

export type AddVirtualProductsToCartInput = {
    cart_id: Scalars['String']
    cart_items: Array<Maybe<VirtualProductCartItemInput>>
}

export type AddVirtualProductsToCartOutput = {
    __typename?: 'AddVirtualProductsToCartOutput'
    cart: Cart
}

/** A bucket that contains information for each filterable option (such as price, category ID, and custom attributes). */
export type Aggregation = {
    __typename?: 'Aggregation'
    /** Attribute code of the aggregation group. */
    attribute_code: Scalars['String']
    /** The number of options in the aggregation group. */
    count?: Maybe<Scalars['Int']>
    /** The aggregation display name. */
    label?: Maybe<Scalars['String']>
    /** Array of options for the aggregation. */
    options?: Maybe<Array<Maybe<AggregationOption>>>
}

export type AggregationOption = AggregationOptionInterface & {
    __typename?: 'AggregationOption'
    /** The number of items that match the aggregation option. */
    count?: Maybe<Scalars['Int']>
    /** Aggregation option display label. */
    label?: Maybe<Scalars['String']>
    /** The internal ID that represents the value of the option. */
    value: Scalars['String']
}

export type AggregationOptionInterface = {
    /** The number of items that match the aggregation option. */
    count?: Maybe<Scalars['Int']>
    /** Aggregation option display label. */
    label?: Maybe<Scalars['String']>
    /** The internal ID that represents the value of the option. */
    value: Scalars['String']
}

/** Amazon Pay configuration values */
export type AmazonPay = {
    __typename?: 'AmazonPay'
    /** Amazon Pay script  */
    amazon_pay_script?: Maybe<Scalars['String']>
    /** Language used to render the button and text on Amazon Pay hosted pages */
    checkout_language?: Maybe<Scalars['String']>
    /** Ledger currency provided during registration for the given merchant identifier */
    ledger_currency?: Maybe<Scalars['String']>
    /** Amazon Pay Merchant ID for Amazon Pay Product Version V2. */
    merchant_id?: Maybe<Scalars['String']>
    /** Placement of the Amazon Pay button on your website */
    placement?: Maybe<Scalars['String']>
    /** Product type selected for checkout */
    product_type?: Maybe<Scalars['String']>
    /** Is Amazon Pay set to Sandbox */
    sandbox?: Maybe<Scalars['Boolean']>
}

export type AppliedCoupon = {
    __typename?: 'AppliedCoupon'
    code: Scalars['String']
}

/** Contains the applied gift card with applied and remaining balance */
export type AppliedGiftCard = {
    __typename?: 'AppliedGiftCard'
    /** Applied balance to the current cart */
    applied_balance?: Maybe<Money>
    /** Gift card account code */
    code?: Maybe<Scalars['String']>
    /** Current balance remaining on gift card */
    current_balance?: Maybe<Money>
    /** Gift card expiration date */
    expiration_date?: Maybe<Scalars['String']>
}

/** Applied and current balance */
export type AppliedStoreCredit = {
    __typename?: 'AppliedStoreCredit'
    /** Applied store credit balance to the current cart */
    applied_balance?: Maybe<Money>
    /** Current balance remaining on store credit */
    current_balance?: Maybe<Money>
    /** Indicates whether store credits are enabled. If the feature is disabled, then the current balance will not be returned */
    enabled?: Maybe<Scalars['Boolean']>
}

export type ApplyCouponToCartInput = {
    cart_id: Scalars['String']
    coupon_code: Scalars['String']
}

export type ApplyCouponToCartOutput = {
    __typename?: 'ApplyCouponToCartOutput'
    cart: Cart
}

/** Defines the input required to run the applyGiftCardToCart mutation */
export type ApplyGiftCardToCartInput = {
    /** The unique ID that identifies the customer's cart */
    cart_id: Scalars['String']
    /** The gift card code to be applied to the cart */
    gift_card_code: Scalars['String']
}

/** Defines the possible output for the addGiftCardToCart mutation */
export type ApplyGiftCardToCartOutput = {
    __typename?: 'ApplyGiftCardToCartOutput'
    /** Describes the contents of the specified shopping cart */
    cart: Cart
    /** GiftCard Error Message */
    error_message?: Maybe<Scalars['String']>
}

export type ApplyRewardPointsToCartOutput = {
    __typename?: 'ApplyRewardPointsToCartOutput'
    /** The customer cart after reward points are applied */
    cart: Cart
}

/** Defines the input required to run the applyStoreCreditToCart mutation */
export type ApplyStoreCreditToCartInput = {
    /** The unique ID that identifies the customer's cart */
    cart_id: Scalars['String']
}

/** Defines the possible output for the applyStoreCreditToCart mutation */
export type ApplyStoreCreditToCartOutput = {
    __typename?: 'ApplyStoreCreditToCartOutput'
    /** Describes the contents of the specified shopping cart */
    cart: Cart
}

/** AreaInput defines the parameters which will be used for filter by specified location. */
export type AreaInput = {
    /** The radius for the search in KM. */
    radius: Scalars['Int']
    /** The country code where search must be performed. Required parameter together with region, city or postcode. */
    search_term: Scalars['String']
}

export type Assets = {
    __typename?: 'Assets'
    /** The payment method logo url (descriptive) */
    descriptive?: Maybe<Scalars['String']>
    /** The payment method logo url (standard) */
    standard?: Maybe<Scalars['String']>
}

/** Attribute contains the attribute_type of the specified attribute_code and entity_type */
export type Attribute = {
    __typename?: 'Attribute'
    /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
    attribute_code?: Maybe<Scalars['String']>
    /** Attribute options list. */
    attribute_options?: Maybe<Array<Maybe<AttributeOption>>>
    /** The data type of the attribute */
    attribute_type?: Maybe<Scalars['String']>
    /** The type of entity that defines the attribute */
    entity_type?: Maybe<Scalars['String']>
    /** The frontend input type of the attribute */
    input_type?: Maybe<Scalars['String']>
}

/** AttributeInput specifies the attribute_code and entity_type to search */
export type AttributeInput = {
    /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
    attribute_code?: Maybe<Scalars['String']>
    /** The type of entity that defines the attribute */
    entity_type?: Maybe<Scalars['String']>
}

/** Attribute option. */
export type AttributeOption = {
    __typename?: 'AttributeOption'
    /** Attribute option label. */
    label?: Maybe<Scalars['String']>
    /** Attribute option value. */
    value?: Maybe<Scalars['String']>
}

export type AvailablePaymentMethod = {
    __typename?: 'AvailablePaymentMethod'
    /** The payment method code */
    code: Scalars['String']
    /** The payment method title. */
    title: Scalars['String']
}

export type AvailableShippingMethod = {
    __typename?: 'AvailableShippingMethod'
    amount: Money
    available: Scalars['Boolean']
    /** @deprecated The field should not be used on the storefront */
    base_amount?: Maybe<Money>
    carrier_code: Scalars['String']
    carrier_title: Scalars['String']
    error_message?: Maybe<Scalars['String']>
    /** Could be null if method is not available */
    method_code?: Maybe<Scalars['String']>
    /** Could be null if method is not available */
    method_title?: Maybe<Scalars['String']>
    price_excl_tax: Money
    price_incl_tax: Money
}

/** Avalara Integration token data */
export type AvalaraToken = {
    __typename?: 'AvalaraToken'
    /** Access token for Avalara Integration */
    token?: Maybe<Scalars['String']>
}

/** An array containing all the billing fields of order */
export type Billing = {
    __typename?: 'Billing'
    /** Billing City of Sales Order */
    city?: Maybe<Scalars['String']>
    /** Billing Company of Sales Order */
    company?: Maybe<Scalars['String']>
    /** Billing Country of Sales Order */
    country_id?: Maybe<CountryCodeEnum>
    /** Billing Customer Name of Sales Order */
    name?: Maybe<Scalars['String']>
    /** Billing PostCode of Sales Order */
    postcode?: Maybe<Scalars['String']>
    /** Billing Region of Sales Order */
    region?: Maybe<Scalars['String']>
    /** Billing Street of Sales Order */
    street?: Maybe<Scalars['String']>
    /** Billing Telephone of Sales Order */
    telephone?: Maybe<Scalars['String']>
}

export type BillingAddressInput = {
    address?: Maybe<CartAddressInput>
    customer_address_id?: Maybe<Scalars['Int']>
    /** Set billing address same as shipping */
    same_as_shipping?: Maybe<Scalars['Boolean']>
    /** Deprecated: use `same_as_shipping` field instead */
    use_for_shipping?: Maybe<Scalars['Boolean']>
}

export type BillingCartAddress = CartAddressInterface & {
    __typename?: 'BillingCartAddress'
    city: Scalars['String']
    company?: Maybe<Scalars['String']>
    country: CartAddressCountry
    customer_address_id?: Maybe<Scalars['Int']>
    /** @deprecated The field is used only in shipping address */
    customer_notes?: Maybe<Scalars['String']>
    firstname: Scalars['String']
    lastname: Scalars['String']
    postcode?: Maybe<Scalars['String']>
    region?: Maybe<CartAddressRegion>
    street: Array<Maybe<Scalars['String']>>
    telephone: Scalars['String']
}

/** Required input for braintree paypal Checkout and Payments Standard payments */
export type BraintreeApplepayInput = {
    /**
     * Contains a fingerprint provided by Braintree JS SDK and should be sent with
     * sale transaction details to the Braintree payment gateway. Should be specified
     * only in a case if Kount (advanced fraud protection) is enabled for Braintree
     * payment integration.
     */
    device_data?: Maybe<Scalars['String']>
    /**
     * The one-time payment token generated by Braintree payment gateway based on
     * apple pay. Required field to make sale transaction.
     */
    payment_method_nonce: Scalars['String']
}

export type BraintreeCcVaultInput = {
    device_data?: Maybe<Scalars['String']>
    public_hash: Scalars['String']
}

export type BraintreeInput = {
    /**
     * Contains a fingerprint provided by Braintree JS SDK and should be sent with
     * sale transaction details to the Braintree payment gateway. Should be specified
     * only in a case if Kount (advanced fraud protection) is enabled for Braintree
     * payment integration.
     */
    device_data?: Maybe<Scalars['String']>
    /**
     * States whether an entered by a customer credit/debit card should be tokenized
     * for later usage. Required only if Vault is enabled for Braintree payment integration.
     */
    is_active_payment_token_enabler: Scalars['Boolean']
    /**
     * The one-time payment token generated by Braintree payment gateway based on
     * card details. Required field to make sale transaction.
     */
    payment_method_nonce: Scalars['String']
}

/** Required input for braintree paypal Checkout and Payments Standard payments */
export type BraintreePaypalInput = {
    /**
     * Contains a fingerprint provided by Braintree JS SDK and should be sent with
     * sale transaction details to the Braintree payment gateway. Should be specified
     * only in a case if Kount (advanced fraud protection) is enabled for Braintree
     * payment integration.
     */
    device_data?: Maybe<Scalars['String']>
    /**
     * The one-time payment token generated by Braintree payment gateway based on
     * paypal. Required field to make sale transaction.
     */
    payment_method_nonce: Scalars['String']
}

/** Breadcrumb defines the bradcrumb path details */
export type Breadcrumb = {
    __typename?: 'Breadcrumb'
    /** Category ID. */
    category_id?: Maybe<Scalars['Int']>
    /** Category level. */
    category_level?: Maybe<Scalars['Int']>
    /** Category name. */
    category_name?: Maybe<Scalars['String']>
    /** Category URL key. */
    category_url_key?: Maybe<Scalars['String']>
    /** Category URL path. */
    category_url_path?: Maybe<Scalars['String']>
    /** Breadcrumb label */
    label?: Maybe<Scalars['String']>
    /** Breadcrumb link */
    link?: Maybe<Scalars['String']>
    /** Breadcrumb title */
    title?: Maybe<Scalars['String']>
}

export type BundleCartItem = CartItemInterface & {
    __typename?: 'BundleCartItem'
    /** The list of available gift wrapping options for the cart item */
    available_gift_wrapping: Array<Maybe<GiftWrapping>>
    bundle_options: Array<Maybe<SelectedBundleOption>>
    customizable_options: Array<Maybe<SelectedCustomizableOption>>
    /** The entered gift message for the cart item */
    gift_message?: Maybe<GiftMessage>
    /** The selected gift wrapping for the cart item */
    gift_wrapping?: Maybe<GiftWrapping>
    id: Scalars['String']
    /** A resulting stock state for a configurable product, based both on parent and child stock. */
    item_stock_status: ProductStockStatus
    itemsku: Scalars['String']
    /** A combined item-level message */
    message?: Maybe<Scalars['String']>
    prices?: Maybe<CartItemPrices>
    product: ProductInterface
    qty_validation_message: Scalars['String']
    quantity: Scalars['Float']
}

export type BundleCreditMemoItem = CreditMemoItemInterface & {
    __typename?: 'BundleCreditMemoItem'
    /** A list of bundle options that are assigned to the bundle product */
    bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>
    /** Contains information about the final discount amount for the base product, including discounts on options */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The unique ID of the credit memo item, used for API purposes */
    id: Scalars['ID']
    /** The order item the credit memo is applied to */
    order_item?: Maybe<OrderItemInterface>
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price for the base product, including selected options */
    product_sale_price: Money
    /** SKU of the base product */
    product_sku: Scalars['String']
    /** The number of refunded items */
    quantity_refunded?: Maybe<Scalars['Float']>
}

export type BundleInvoiceItem = InvoiceItemInterface & {
    __typename?: 'BundleInvoiceItem'
    /** A list of bundle options that are assigned to the bundle product */
    bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>
    /** Contains information about the final discount amount for the base product, including discounts on options */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The unique ID of the invoice item */
    id: Scalars['ID']
    /** Contains details about an individual order item */
    order_item?: Maybe<OrderItemInterface>
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price for the base product including selected options */
    product_sale_price: Money
    /** The SKU of the base product */
    product_sku: Scalars['String']
    /** The number of invoiced items */
    quantity_invoiced?: Maybe<Scalars['Float']>
}

/** BundleItem defines an individual item in a bundle product. */
export type BundleItem = {
    __typename?: 'BundleItem'
    /** An ID assigned to each type of item in a bundle product. */
    option_id?: Maybe<Scalars['Int']>
    /** An array of additional options for this bundle item. */
    options?: Maybe<Array<Maybe<BundleItemOption>>>
    /** he relative position of this item compared to the other bundle items. */
    position?: Maybe<Scalars['Int']>
    /** Indicates whether the item must be included in the bundle. */
    required?: Maybe<Scalars['Boolean']>
    /** The SKU of the bundle product. */
    sku?: Maybe<Scalars['String']>
    /** The display name of the item. */
    title?: Maybe<Scalars['String']>
    /** The input type that the customer uses to select the item. Examples include radio button and checkbox. */
    type?: Maybe<Scalars['String']>
}

/** BundleItemOption defines characteristics and options for a specific bundle item. */
export type BundleItemOption = {
    __typename?: 'BundleItemOption'
    /** Indicates whether the customer can change the number of items for this option. */
    can_change_quantity?: Maybe<Scalars['Boolean']>
    /** The ID assigned to the bundled item option. */
    id?: Maybe<Scalars['Int']>
    /** Indicates whether this option is the default option. */
    is_default?: Maybe<Scalars['Boolean']>
    /** The text that identifies the bundled item option. */
    label?: Maybe<Scalars['String']>
    /** When a bundle item contains multiple options, the relative position of this option compared to the other options. */
    position?: Maybe<Scalars['Int']>
    /** The price of the selected option. */
    price?: Maybe<Scalars['Float']>
    /** One of FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>
    /** Contains details about this product option. */
    product?: Maybe<ProductInterface>
    /**
     * Indicates the quantity of this specific bundle item.
     * @deprecated The `qty` is deprecated. Use `quantity` instead.
     */
    qty?: Maybe<Scalars['Float']>
    /** Indicates the quantity of this specific bundle item. */
    quantity?: Maybe<Scalars['Float']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
}

export type BundleOptionInput = {
    id: Scalars['Int']
    quantity: Scalars['Float']
    value: Array<Maybe<Scalars['String']>>
}

export type BundleOptions = {
    __typename?: 'BundleOptions'
    /** Product name label */
    label?: Maybe<Scalars['String']>
    /** Product option name */
    name?: Maybe<Scalars['String']>
    /** Product option id */
    option_id?: Maybe<Scalars['Int']>
    /** Product option quantity */
    quantity?: Maybe<Scalars['Float']>
}

export type BundleOrderItem = OrderItemInterface & {
    __typename?: 'BundleOrderItem'
    /** A list of bundle options that are assigned to the bundle product */
    bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>
    /** The final discount information for the product */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The entered option for the base product, such as a logo or image */
    entered_options?: Maybe<Array<Maybe<OrderItemOption>>>
    /** The selected gift wrapping for the order item */
    gift_wrapping?: Maybe<GiftWrapping>
    /** The unique identifier of the order item */
    id: Scalars['ID']
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price of the base product, including selected options */
    product_sale_price: Money
    /** The SKU of the base product */
    product_sku: Scalars['String']
    /** The type of product, such as simple, configurable, etc. */
    product_type?: Maybe<Scalars['String']>
    /** URL key of the base product */
    product_url_key?: Maybe<Scalars['String']>
    /** The number of canceled items */
    quantity_canceled?: Maybe<Scalars['Float']>
    /** The number of invoiced items */
    quantity_invoiced?: Maybe<Scalars['Float']>
    /** The number of units ordered for this item */
    quantity_ordered?: Maybe<Scalars['Float']>
    /** The number of refunded items */
    quantity_refunded?: Maybe<Scalars['Float']>
    /** The number of returned items */
    quantity_returned?: Maybe<Scalars['Float']>
    /** The number of shipped items */
    quantity_shipped?: Maybe<Scalars['Float']>
    /** The selected options for the base product, such as color or size */
    selected_options?: Maybe<Array<Maybe<OrderItemOption>>>
    /** The status of the order item */
    status?: Maybe<Scalars['String']>
}

/** BundleProduct defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProduct = ProductInterface &
    PhysicalProductInterface &
    CustomizableProductInterface & {
        __typename?: 'BundleProduct'
        Product_sizechart?: Maybe<Scalars['Int']>
        Product_sizechart_text?: Maybe<Scalars['String']>
        activity?: Maybe<Scalars['String']>
        /** The attribute set assigned to the product. */
        attribute_set_id?: Maybe<Scalars['Int']>
        brand?: Maybe<Scalars['Int']>
        brand_text?: Maybe<Scalars['String']>
        /**
         * Relative canonical URL. This value is returned only if the system setting 'Use
         * Canonical Link Meta Tag For Products' is enabled
         */
        canonical_url?: Maybe<Scalars['String']>
        /** The categories assigned to a product. */
        categories?: Maybe<Array<Maybe<CategoryInterface>>>
        category_gear?: Maybe<Scalars['String']>
        climate?: Maybe<Scalars['String']>
        collar?: Maybe<Scalars['String']>
        color?: Maybe<Scalars['String']>
        color_family?: Maybe<Scalars['String']>
        color_text?: Maybe<Scalars['String']>
        /** The product's country of origin. */
        country_of_manufacture?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was created. */
        created_at?: Maybe<Scalars['String']>
        /** Crosssell Products */
        crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** Detailed information about the product. The value can include simple HTML tags. */
        description?: Maybe<ComplexTextValue>
        /** Indicates whether the bundle product has a dynamic price. */
        dynamic_price?: Maybe<Scalars['Boolean']>
        /** Indicates whether the bundle product has a dynamic SK. */
        dynamic_sku?: Maybe<Scalars['Boolean']>
        /** Indicates whether the bundle product has a dynamically calculated weight. */
        dynamic_weight?: Maybe<Scalars['Boolean']>
        eco_collection?: Maybe<Scalars['Int']>
        eco_collection_text?: Maybe<Scalars['String']>
        eligible_for_pick_up?: Maybe<Scalars['Int']>
        eligible_for_pick_up_text?: Maybe<Scalars['String']>
        erin_recommends?: Maybe<Scalars['Int']>
        erin_recommends_text?: Maybe<Scalars['String']>
        features_bags?: Maybe<Scalars['String']>
        format?: Maybe<Scalars['Int']>
        format_text?: Maybe<Scalars['String']>
        gender?: Maybe<Scalars['String']>
        /** Indicates whether a gift message is available. */
        gift_message_available?: Maybe<Scalars['String']>
        /** The ID number assigned to the product. */
        id?: Maybe<Scalars['Int']>
        /** The relative path to the main image on the product page. */
        image?: Maybe<ProductImage>
        /** Indicates whether the product can be returned */
        is_returnable?: Maybe<Scalars['String']>
        /** An array containing information about individual bundle items. */
        items?: Maybe<Array<Maybe<BundleItem>>>
        /** A number representing the product's manufacturer. */
        manufacturer?: Maybe<Scalars['Int']>
        manufacturer_text?: Maybe<Scalars['String']>
        material?: Maybe<Scalars['String']>
        /** An array of Media Gallery objects. */
        media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>
        /**
         * An array of MediaGalleryEntry objects.
         * @deprecated Use product's `media_gallery` instead
         */
        media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>
        /** A brief overview of the product for search results listings, maximum 255 characters. */
        meta_description?: Maybe<Scalars['String']>
        /** A comma-separated list of keywords that are visible only to search engines. */
        meta_keyword?: Maybe<Scalars['String']>
        /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
        meta_title?: Maybe<Scalars['String']>
        /** The product name. Customers use this name to identify the product. */
        name?: Maybe<Scalars['String']>
        new?: Maybe<Scalars['Int']>
        /** The beginning date for new product listings, and determines if the product is featured as a new product. */
        new_from_date?: Maybe<Scalars['String']>
        new_text?: Maybe<Scalars['String']>
        /** The end date for new product listings. */
        new_to_date?: Maybe<Scalars['String']>
        /** Product stock only x left count */
        only_x_left_in_stock?: Maybe<Scalars['Float']>
        /** An array of options for a customizable product. */
        options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>
        /** If the product has multiple options, determines where they appear on the product page. */
        options_container?: Maybe<Scalars['String']>
        pattern?: Maybe<Scalars['String']>
        performance_fabric?: Maybe<Scalars['Int']>
        performance_fabric_text?: Maybe<Scalars['String']>
        /**
         * A ProductPrices object, indicating the price of an item.
         * @deprecated Use price_range for product price information.
         */
        price?: Maybe<ProductPrices>
        /** A PriceRange object, indicating the range of prices for the product */
        price_range: PriceRange
        /** An array of TierPrice objects. */
        price_tiers?: Maybe<Array<Maybe<TierPrice>>>
        /** One of PRICE_RANGE or AS_LOW_AS. */
        price_view?: Maybe<PriceViewEnum>
        product_label?: Maybe<Scalars['Int']>
        product_label_text?: Maybe<Scalars['String']>
        /** An array of ProductLinks objects. */
        product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>
        /** Product review summary and review count data */
        product_reviews?: Maybe<ProductReviews>
        purpose?: Maybe<Scalars['Int']>
        purpose_text?: Maybe<Scalars['String']>
        /** Review/Rating related configurations */
        rating_configurations?: Maybe<RatingConfigurationData>
        /** The average of all the ratings given to the product. */
        rating_summary: Scalars['Float']
        /** Related Products */
        related_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The total count of all the reviews given to the product. */
        review_count: Scalars['Int']
        /** Product review summary and review count data */
        review_details?: Maybe<ReviewParameters>
        /** The list of products reviews. */
        reviews: ProductReviews
        sale?: Maybe<Scalars['Int']>
        sale_text?: Maybe<Scalars['String']>
        /** Indicates whether to ship bundle items together or individually. */
        ship_bundle_items?: Maybe<ShipBundleItemsEnum>
        /** A short description of the product. Its use depends on the theme. */
        short_description?: Maybe<ComplexTextValue>
        size?: Maybe<Scalars['String']>
        size_text?: Maybe<Scalars['String']>
        sizechart?: Maybe<Scalars['Int']>
        sizechart_text?: Maybe<Scalars['String']>
        /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
        sku?: Maybe<Scalars['String']>
        sleeve?: Maybe<Scalars['String']>
        /** The relative path to the small image, which is used on catalog pages. */
        small_image?: Maybe<ProductImage>
        /** The beginning date that a product has a special price. */
        special_from_date?: Maybe<Scalars['String']>
        /** The discounted price of the product. */
        special_price?: Maybe<Scalars['Float']>
        /** The end date that a product has a special price. */
        special_to_date?: Maybe<Scalars['String']>
        /** Stock status of the product */
        stock_status?: Maybe<ProductStockStatus>
        strap_bags?: Maybe<Scalars['String']>
        style_bags?: Maybe<Scalars['String']>
        style_bottom?: Maybe<Scalars['String']>
        style_general?: Maybe<Scalars['String']>
        /** The file name of a swatch image */
        swatch_image?: Maybe<Scalars['String']>
        /** The relative path to the product's thumbnail image. */
        thumbnail?: Maybe<ProductImage>
        /**
         * The price when tier pricing is in effect and the items purchased threshold has been reached.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_price?: Maybe<Scalars['Float']>
        /**
         * An array of ProductTierPrices objects.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>
        /**
         * One of simple, virtual, bundle, downloadable, grouped, or configurable.
         * @deprecated Use __typename instead.
         */
        type_id?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was updated. */
        updated_at?: Maybe<Scalars['String']>
        /** Upsell Products */
        upsell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The part of the URL that identifies the product */
        url_key?: Maybe<Scalars['String']>
        /** @deprecated Use product's `canonical_url` or url rewrites instead */
        url_path?: Maybe<Scalars['String']>
        /** URL rewrites list */
        url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>
        /** The part of the product URL that is appended after the url key */
        url_suffix?: Maybe<Scalars['String']>
        /**
         * An array of websites in which the product is available.
         * @deprecated The field should not be used on the storefront.
         */
        websites?: Maybe<Array<Maybe<Website>>>
        /** The weight of the item, in units defined by the store. */
        weight?: Maybe<Scalars['Float']>
    }

/** BundleProduct defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProductProduct_ReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** BundleProduct defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProductReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type BundleProductCartItemInput = {
    bundle_options: Array<Maybe<BundleOptionInput>>
    customizable_options?: Maybe<Array<Maybe<CustomizableOptionInput>>>
    data: CartItemInput
}

export type BundleShipmentItem = ShipmentItemInterface & {
    __typename?: 'BundleShipmentItem'
    /** A list of bundle options that are assigned to the bundle product */
    bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>
    /** Shipment item unique identifier */
    id: Scalars['ID']
    /** Associated order item */
    order_item?: Maybe<OrderItemInterface>
    /** Name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** Sale price for the base product */
    product_sale_price: Money
    /** SKU of the base product */
    product_sku: Scalars['String']
    /** Number of shipped items */
    quantity_shipped: Scalars['Float']
}

export type CanCreateRmaOutput = {
    __typename?: 'CanCreateRmaOutput'
    /** Is Return Available for the Order */
    is_return_available?: Maybe<Scalars['Boolean']>
}

export type Cart = {
    __typename?: 'Cart'
    /**
     * An array of coupons that have been applied to the cart
     * @deprecated Use applied_coupons instead
     */
    applied_coupon?: Maybe<AppliedCoupon>
    /** An array of `AppliedCoupon` objects. Each object contains the `code` text attribute, which specifies the coupon code */
    applied_coupons?: Maybe<Array<Maybe<AppliedCoupon>>>
    /** Contains the code attribute, which specifies the applied gift card codes */
    applied_gift_cards?: Maybe<Array<Maybe<AppliedGiftCard>>>
    /** The amount of reward points applied to the cart */
    applied_reward_points?: Maybe<RewardPointsAmount>
    /** Contains store credit information applied on the cart */
    applied_store_credit?: Maybe<AppliedStoreCredit>
    /** The list of available gift wrapping options for the cart */
    available_gift_wrappings: Array<Maybe<GiftWrapping>>
    /** Available payment methods */
    available_payment_methods?: Maybe<Array<Maybe<AvailablePaymentMethod>>>
    billing_address: BillingCartAddress
    /** Flag to check if cart has any errors. */
    can_checkout?: Maybe<Scalars['Boolean']>
    email?: Maybe<Scalars['String']>
    /** The entered gift message for the cart */
    gift_message?: Maybe<GiftMessage>
    /** Wether customer requested gift receipt for the cart */
    gift_receipt_included: Scalars['Boolean']
    /** The selected gift wrapping for the cart */
    gift_wrapping?: Maybe<GiftWrapping>
    /** The ID of the cart. */
    id: Scalars['ID']
    is_virtual: Scalars['Boolean']
    items?: Maybe<Array<Maybe<CartItemInterface>>>
    /** A list of messages, added to the cart */
    messages?: Maybe<Array<Maybe<CartMessage>>>
    prices?: Maybe<CartPrices>
    /** Wether customer requested printed card for the cart */
    printed_card_included: Scalars['Boolean']
    selected_payment_method?: Maybe<SelectedPaymentMethod>
    shipping_addresses: Array<Maybe<ShippingCartAddress>>
    total_quantity: Scalars['Float']
}

export type CartAddressCountry = {
    __typename?: 'CartAddressCountry'
    code: Scalars['String']
    label: Scalars['String']
}

export type CartAddressInput = {
    city: Scalars['String']
    company?: Maybe<Scalars['String']>
    country_code: Scalars['String']
    firstname: Scalars['String']
    lastname: Scalars['String']
    postcode?: Maybe<Scalars['String']>
    region?: Maybe<Scalars['String']>
    region_id?: Maybe<Scalars['Int']>
    /** Determines whether to save the address in the customer's address book. The default value is true */
    save_in_address_book?: Maybe<Scalars['Boolean']>
    street: Array<Maybe<Scalars['String']>>
    telephone: Scalars['String']
}

export type CartAddressInterface = {
    city: Scalars['String']
    company?: Maybe<Scalars['String']>
    country: CartAddressCountry
    firstname: Scalars['String']
    lastname: Scalars['String']
    postcode?: Maybe<Scalars['String']>
    region?: Maybe<CartAddressRegion>
    street: Array<Maybe<Scalars['String']>>
    telephone: Scalars['String']
}

export type CartAddressRegion = {
    __typename?: 'CartAddressRegion'
    code?: Maybe<Scalars['String']>
    label?: Maybe<Scalars['String']>
    region_id?: Maybe<Scalars['Int']>
}

export type CartDiscount = {
    __typename?: 'CartDiscount'
    amount: Money
    label: Array<Maybe<Scalars['String']>>
}

export type CartItemInput = {
    /** An array of entered options for the base product, such as personalization text */
    entered_options?: Maybe<Array<Maybe<EnteredOptionInput>>>
    /** For child products, the SKU of its parent product */
    parent_sku?: Maybe<Scalars['String']>
    quantity: Scalars['Float']
    /** The selected options for the base product, such as color or size */
    selected_options?: Maybe<Array<Maybe<Scalars['ID']>>>
    sku: Scalars['String']
}

export type CartItemInterface = {
    id: Scalars['String']
    /** A resulting stock state for a configurable product, based both on parent and child stock. */
    item_stock_status: ProductStockStatus
    itemsku: Scalars['String']
    /** A combined item-level message */
    message?: Maybe<Scalars['String']>
    prices?: Maybe<CartItemPrices>
    product: ProductInterface
    qty_validation_message: Scalars['String']
    quantity: Scalars['Float']
}

export type CartItemPrices = {
    __typename?: 'CartItemPrices'
    /** An array of discounts to be applied to the cart item */
    discounts?: Maybe<Array<Maybe<Discount>>>
    price: Money
    row_total: Money
    row_total_including_tax: Money
    /** Tax amount applied to the item */
    tax_amount?: Maybe<Money>
    /** Tax percentage applied to the item */
    tax_percent?: Maybe<Scalars['Float']>
    /** The total of all discounts applied to the item */
    total_item_discount?: Maybe<Money>
}

/** Deprecated: `cart_items` field of `ShippingCartAddress` returns now  `CartItemInterface` instead of `CartItemQuantity` */
export type CartItemQuantity = {
    __typename?: 'CartItemQuantity'
    /** @deprecated `cart_items` field of `ShippingCartAddress` returns now `CartItemInterface` instead of `CartItemQuantity` */
    cart_item_id: Scalars['Int']
    /** @deprecated `cart_items` field of `ShippingCartAddress` returns now `CartItemInterface` instead of `CartItemQuantity` */
    quantity: Scalars['Float']
}

export type CartItemSelectedOptionValuePrice = {
    __typename?: 'CartItemSelectedOptionValuePrice'
    type: PriceTypeEnum
    units: Scalars['String']
    value: Scalars['Float']
}

export type CartItemUpdateInput = {
    cart_item_id: Scalars['Int']
    customizable_options?: Maybe<Array<Maybe<CustomizableOptionInput>>>
    /** Gift message details for the cart item */
    gift_message?: Maybe<GiftMessageInput>
    /** The unique identifier of the gift wrapping to be used for the cart item */
    gift_wrapping_id?: Maybe<Scalars['ID']>
    quantity?: Maybe<Scalars['Float']>
}

export type CartMessage = {
    __typename?: 'CartMessage'
    /** Flag that marks item-level messages */
    is_item_message: Scalars['Boolean']
    /** Message text content */
    text: Scalars['String']
    /** Message type */
    type: Scalars['String']
}

export type CartPrices = {
    __typename?: 'CartPrices'
    applied_taxes?: Maybe<Array<Maybe<CartTaxItem>>>
    /** @deprecated Use discounts instead  */
    discount?: Maybe<CartDiscount>
    /** An array of applied discounts */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The list of prices for the selected gift options */
    gift_options?: Maybe<GiftOptionsPrices>
    grand_total?: Maybe<Money>
    subtotal_excluding_tax?: Maybe<Money>
    subtotal_including_tax?: Maybe<Money>
    subtotal_with_discount_excluding_tax?: Maybe<Money>
}

export type CartTaxItem = {
    __typename?: 'CartTaxItem'
    amount: Money
    label: Scalars['String']
}

/** An error encountered while adding an item to the the cart. */
export type CartUserInputError = {
    __typename?: 'CartUserInputError'
    /** Cart-specific error code */
    code: CartUserInputErrorType
    /** A localized error message */
    message: Scalars['String']
}

export enum CartUserInputErrorType {
    ProductNotFound = 'PRODUCT_NOT_FOUND',
    NotSalable = 'NOT_SALABLE',
    InsufficientStock = 'INSUFFICIENT_STOCK',
    Undefined = 'UNDEFINED'
}

export type Categories = {
    __typename?: 'Categories'
    /** The payment method assets */
    asset_urls?: Maybe<Array<Maybe<Assets>>>
    /** The payment method identifier */
    identifier: Scalars['String']
    /** The payment method name */
    name: Scalars['String']
}

/**
 * CategoryFilterInput defines the filters to be used in the search. A filter
 * contains at least one attribute, a comparison operator, and the value that is
 * being searched for.
 */
export type CategoryFilterInput = {
    /** Filter by category ID that uniquely identifies the category. */
    ids?: Maybe<FilterEqualTypeInput>
    /** Filter by the display name of the category. */
    name?: Maybe<FilterMatchTypeInput>
    /** Filter by the part of the URL that identifies the category. */
    url_key?: Maybe<FilterEqualTypeInput>
    /** Filter by the URL path for the category. */
    url_path?: Maybe<FilterEqualTypeInput>
}

/** CategoryInterface contains the custom category attributes. */
export type CategoryInterface = {
    active_promo_block?: Maybe<Scalars['Int']>
    /** Should show menu content or not */
    active_submenu?: Maybe<Scalars['Int']>
    allowed_tiles?: Maybe<Scalars['String']>
    automatic_sorting?: Maybe<Scalars['String']>
    available_sort_by?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Breadcrumbs, parent categories info. */
    breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>
    /**
     * Relative canonical URL. This value is returned only if the system setting 'Use
     * Canonical Link Meta Tag For Categories' is enabled
     */
    canonical_url?: Maybe<Scalars['String']>
    children_count?: Maybe<Scalars['String']>
    /** Category CMS Block. */
    cms_block?: Maybe<CmsBlock>
    /** Timestamp indicating when the category was created. */
    created_at?: Maybe<Scalars['String']>
    custom_layout_update_file?: Maybe<Scalars['String']>
    /** The attribute to use for sorting. */
    default_sort_by?: Maybe<Scalars['String']>
    /** An optional description of the category. */
    description?: Maybe<Scalars['String']>
    display_mode?: Maybe<Scalars['String']>
    filter_price_range?: Maybe<Scalars['Float']>
    /** An ID that uniquely identifies the category. */
    id?: Maybe<Scalars['Int']>
    image?: Maybe<Scalars['String']>
    include_in_menu?: Maybe<Scalars['Int']>
    is_anchor?: Maybe<Scalars['Int']>
    landing_page?: Maybe<Scalars['Int']>
    /** Indicates the depth of the category within the tree. */
    level?: Maybe<Scalars['Int']>
    marketing_tile_1?: Maybe<Scalars['String']>
    marketing_tile_2?: Maybe<Scalars['String']>
    marketing_tile_3?: Maybe<Scalars['String']>
    marketing_tile_4?: Maybe<Scalars['String']>
    marketing_tile_5?: Maybe<Scalars['String']>
    /** Returns array of marketing tiles attributes html */
    marketing_tiles?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Megamenu promo banner attribute. */
    menu_content?: Maybe<Scalars['String']>
    meta_description?: Maybe<Scalars['String']>
    meta_keywords?: Maybe<Scalars['String']>
    meta_title?: Maybe<Scalars['String']>
    /** The display name of the category. */
    name?: Maybe<Scalars['String']>
    /** Category Path. */
    path?: Maybe<Scalars['String']>
    /** Category path in store. */
    path_in_store?: Maybe<Scalars['String']>
    /** The position of the category relative to other categories at the same level in tree. */
    position?: Maybe<Scalars['Int']>
    primary_promo_block?: Maybe<Scalars['String']>
    /**
     * The number of products in the category that are marked as visible. By default,
     * in complex products, parent products are visible, but their child products are not.
     */
    product_count?: Maybe<Scalars['Int']>
    /** The list of products assigned to the category. */
    products?: Maybe<CategoryProducts>
    secondary_promo_block?: Maybe<Scalars['String']>
    /** Timestamp indicating when the category was updated. */
    updated_at?: Maybe<Scalars['String']>
    /** The url key assigned to the category. */
    url_key?: Maybe<Scalars['String']>
    /** The url path assigned to the category. */
    url_path?: Maybe<Scalars['String']>
    /** The part of the category URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']>
    view_more_category?: Maybe<Scalars['String']>
}

/** CategoryInterface contains the custom category attributes. */
export type CategoryInterfaceProductsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
    sort?: Maybe<ProductAttributeSortInput>
}

/** The category products object returned in the Category query. */
export type CategoryProducts = {
    __typename?: 'CategoryProducts'
    /** An array of products that are assigned to the category. */
    items?: Maybe<Array<Maybe<ProductInterface>>>
    /** An object that includes the page_info and currentPage values specified in the query. */
    page_info?: Maybe<SearchResultPageInfo>
    /**
     * The number of products in the category that are marked as visible. By default,
     * in complex products, parent products are visible, but their child products are not.
     */
    total_count?: Maybe<Scalars['Int']>
}

/** A collection of CategoryTree objects and pagination information. */
export type CategoryResult = {
    __typename?: 'CategoryResult'
    /** A list of categories that match the filter criteria. */
    items?: Maybe<Array<Maybe<CategoryTree>>>
    /** An object that includes the page_info and currentPage values specified in the query. */
    page_info?: Maybe<SearchResultPageInfo>
    /** The total number of categories that match the criteria. */
    total_count?: Maybe<Scalars['Int']>
}

/** Category Tree implementation. */
export type CategoryTree = CategoryInterface & {
    __typename?: 'CategoryTree'
    active_promo_block?: Maybe<Scalars['Int']>
    /** Should show menu content or not */
    active_submenu?: Maybe<Scalars['Int']>
    allowed_tiles?: Maybe<Scalars['String']>
    automatic_sorting?: Maybe<Scalars['String']>
    available_sort_by?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Breadcrumbs, parent categories info. */
    breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>
    /**
     * Relative canonical URL. This value is returned only if the system setting 'Use
     * Canonical Link Meta Tag For Categories' is enabled
     */
    canonical_url?: Maybe<Scalars['String']>
    /** Child categories tree. */
    children?: Maybe<Array<Maybe<CategoryTree>>>
    children_count?: Maybe<Scalars['String']>
    /** Category CMS Block. */
    cms_block?: Maybe<CmsBlock>
    /** Timestamp indicating when the category was created. */
    created_at?: Maybe<Scalars['String']>
    custom_layout_update_file?: Maybe<Scalars['String']>
    /** The attribute to use for sorting. */
    default_sort_by?: Maybe<Scalars['String']>
    /** An optional description of the category. */
    description?: Maybe<Scalars['String']>
    display_mode?: Maybe<Scalars['String']>
    filter_price_range?: Maybe<Scalars['Float']>
    /** An ID that uniquely identifies the category. */
    id?: Maybe<Scalars['Int']>
    image?: Maybe<Scalars['String']>
    include_in_menu?: Maybe<Scalars['Int']>
    is_anchor?: Maybe<Scalars['Int']>
    landing_page?: Maybe<Scalars['Int']>
    /** Indicates the depth of the category within the tree. */
    level?: Maybe<Scalars['Int']>
    marketing_tile_1?: Maybe<Scalars['String']>
    marketing_tile_2?: Maybe<Scalars['String']>
    marketing_tile_3?: Maybe<Scalars['String']>
    marketing_tile_4?: Maybe<Scalars['String']>
    marketing_tile_5?: Maybe<Scalars['String']>
    /** Returns array of marketing tiles attributes html */
    marketing_tiles?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Megamenu promo banner attribute. */
    menu_content?: Maybe<Scalars['String']>
    meta_description?: Maybe<Scalars['String']>
    meta_keywords?: Maybe<Scalars['String']>
    meta_title?: Maybe<Scalars['String']>
    /** The display name of the category. */
    name?: Maybe<Scalars['String']>
    /** Category Path. */
    path?: Maybe<Scalars['String']>
    /** Category path in store. */
    path_in_store?: Maybe<Scalars['String']>
    /** The position of the category relative to other categories at the same level in tree. */
    position?: Maybe<Scalars['Int']>
    primary_promo_block?: Maybe<Scalars['String']>
    /**
     * The number of products in the category that are marked as visible. By default,
     * in complex products, parent products are visible, but their child products are not.
     */
    product_count?: Maybe<Scalars['Int']>
    /** The list of products assigned to the category. */
    products?: Maybe<CategoryProducts>
    secondary_promo_block?: Maybe<Scalars['String']>
    /** Timestamp indicating when the category was updated. */
    updated_at?: Maybe<Scalars['String']>
    /** The url key assigned to the category. */
    url_key?: Maybe<Scalars['String']>
    /** The url path assigned to the category. */
    url_path?: Maybe<Scalars['String']>
    /** The part of the category URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']>
    view_more_category?: Maybe<Scalars['String']>
}

/** Category Tree implementation. */
export type CategoryTreeProductsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
    sort?: Maybe<ProductAttributeSortInput>
}

/** Defines all Checkout Agreement information */
export type CheckoutAgreement = {
    __typename?: 'CheckoutAgreement'
    /** Checkout Agreement identifier */
    agreement_id: Scalars['Int']
    /** Checkout Agreement checkbox text */
    checkbox_text: Scalars['String']
    /** Checkout Agreement content */
    content: Scalars['String']
    /** Checkout Agreement content height */
    content_height?: Maybe<Scalars['String']>
    /** Is Checkout Agreement content in HTML format */
    is_html: Scalars['Boolean']
    mode: CheckoutAgreementMode
    /** Checkout Agreement name */
    name: Scalars['String']
}

export enum CheckoutAgreementMode {
    Auto = 'AUTO',
    Manual = 'MANUAL'
}

/** An error encountered while adding an item the the cart. */
export type CheckoutUserInputError = {
    __typename?: 'CheckoutUserInputError'
    /** Checkout-specific error code */
    code: CheckoutUserInputErrorCodes
    /** Localized error message */
    message: Scalars['String']
    /**
     * Path to the input field that caused an error. See the GraphQL specification
     * about path errors for details: http://spec.graphql.org/draft/#sec-Errors
     */
    path: Array<Maybe<Scalars['String']>>
}

export enum CheckoutUserInputErrorCodes {
    ReorderNotAvailable = 'REORDER_NOT_AVAILABLE',
    ProductNotFound = 'PRODUCT_NOT_FOUND',
    NotSalable = 'NOT_SALABLE',
    InsufficientStock = 'INSUFFICIENT_STOCK',
    Undefined = 'UNDEFINED'
}

/** CMS block defines all CMS block information */
export type CmsBlock = {
    __typename?: 'CmsBlock'
    /** CMS block content */
    content?: Maybe<Scalars['String']>
    /** CMS block identifier */
    identifier?: Maybe<Scalars['String']>
    /** CMS block title */
    title?: Maybe<Scalars['String']>
}

/** CMS blocks information */
export type CmsBlocks = {
    __typename?: 'CmsBlocks'
    /** An array of CMS blocks */
    items?: Maybe<Array<Maybe<CmsBlock>>>
}

/** CMS page defines all CMS page information */
export type CmsPage = {
    __typename?: 'CmsPage'
    /** An array of strings that defines the Company's street address. */
    breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>
    /** Cms Page Hierarchy menu */
    cms_hierarchy?: Maybe<Scalars['String']>
    /** CMS page content */
    content?: Maybe<Scalars['String']>
    /** CMS page content heading */
    content_heading?: Maybe<Scalars['String']>
    /** Identifier of the CMS page */
    identifier?: Maybe<Scalars['String']>
    /** CMS page meta description */
    meta_description?: Maybe<Scalars['String']>
    /** CMS page meta keywords */
    meta_keywords?: Maybe<Scalars['String']>
    /** CMS page meta title */
    meta_title?: Maybe<Scalars['String']>
    /** CMS page content heading */
    page_layout?: Maybe<Scalars['String']>
    /** CMS page title */
    title?: Maybe<Scalars['String']>
    /** URL key of CMS page */
    url_key?: Maybe<Scalars['String']>
}

export type ColorSwatchData = SwatchDataInterface & {
    __typename?: 'ColorSwatchData'
    /** Type of the swatch) */
    type?: Maybe<Scalars['String']>
    /** Value of swatch item (HEX color code, image link or textual value) */
    value?: Maybe<Scalars['String']>
}

/** Comments added to a return */
export type Comments = {
    __typename?: 'Comments'
    /** Comment on return */
    comment?: Maybe<Scalars['String']>
    /** Comment created at */
    created_at?: Maybe<Scalars['String']>
    /** Is comment added by Admin */
    is_admin?: Maybe<Scalars['Int']>
    /** Comment status */
    status?: Maybe<Scalars['String']>
}

/** Company entity output data schema. */
export type Company = {
    __typename?: 'Company'
    /** Returns the list of all permission resources. */
    acl_resources?: Maybe<Array<Maybe<CompanyAclResource>>>
    /** An object containing information about Company Administrator. */
    company_admin?: Maybe<Customer>
    /** Company email address. */
    email?: Maybe<Scalars['String']>
    /** Returns the complete data about company structure. */
    hierarchy?: Maybe<CompanyHierarchyOutput>
    /** Company id. */
    id: Scalars['ID']
    /** Company legal address. */
    legal_address?: Maybe<CompanyLegalAddress>
    /** Company legal name. */
    legal_name?: Maybe<Scalars['String']>
    /** Company name. */
    name?: Maybe<Scalars['String']>
    /** List of payment methods available for a Company. */
    payment_methods?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Company re-seller id. */
    reseller_id?: Maybe<Scalars['String']>
    /** Returns company role by id. */
    role?: Maybe<CompanyRole>
    /** Returns the list of defined roles at Company. */
    roles: CompanyRoles
    /** Company sales representative. */
    sales_representative?: Maybe<CompanySalesRepresentative>
    /** Returns company team data. */
    team?: Maybe<Array<Maybe<CompanyTeam>>>
    /** Returns company user by id. */
    user?: Maybe<Customer>
    /** Information about the company users. */
    users?: Maybe<CompanyUsers>
    /** Company VAT/TAX id. */
    vat_id?: Maybe<Scalars['String']>
}

/** Company entity output data schema. */
export type CompanyRolesArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** Company entity output data schema. */
export type CompanyUsersArgs = {
    filter?: Maybe<CompanyUsersFilterInput>
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** Output data schema for an object with Role permission resource information. */
export type CompanyAclResource = {
    __typename?: 'CompanyAclResource'
    /** An array of sub-resources. */
    children?: Maybe<Array<Maybe<CompanyAclResource>>>
    /** ACL resource id. */
    id: Scalars['ID']
    /** ACL resource permission. */
    permission?: Maybe<Scalars['String']>
    /** ACL resource sort order. */
    sortOrder?: Maybe<Scalars['Int']>
    /** ACL resource label. */
    text?: Maybe<Scalars['String']>
}

/** Defines the Company's Administrator input data schema. */
export type CompanyAdminInput = {
    /** Company Administrator's email address. Required. */
    email: Scalars['String']
    /** Company Administrator's first name. Required. */
    firstname: Scalars['String']
    /** Company Administrator's gender (Male - 1, Female - 2, Not Specified - 3). */
    gender?: Maybe<Scalars['Int']>
    /** Company Administrator's custom job title. */
    job_title?: Maybe<Scalars['String']>
    /** Company Administrator's last name. Required. */
    lastname: Scalars['String']
}

/** Defines the Company input data schema for creating a new entity. */
export type CompanyCreateInput = {
    /** An object containing Company Administrator information. Required. */
    company_admin: CompanyAdminInput
    /** Company email address. Required. */
    company_email: Scalars['String']
    /** Company name. Required. */
    company_name: Scalars['String']
    /** An object containing Company legal address data. Required. */
    legal_address: CompanyLegalAddressCreateInput
    /** Company legal name. */
    legal_name?: Maybe<Scalars['String']>
    /** Company re-seller ID. */
    reseller_id?: Maybe<Scalars['String']>
    /** Company VAT/TAX ID. */
    vat_tax_id?: Maybe<Scalars['String']>
}

/** Company credit output data schema. */
export type CompanyCreditOutput = {
    __typename?: 'CompanyCreditOutput'
    /** Company available credit */
    available_credit?: Maybe<Scalars['String']>
    /** Company credit limit */
    credit_history?: Maybe<Array<Maybe<CreditHistoryOutput>>>
    /** Company credit limit */
    credit_limit?: Maybe<Scalars['String']>
    /** Company outstanding balance */
    outstanding_balance?: Maybe<Scalars['String']>
    /** Company credit limit */
    total_count?: Maybe<Scalars['Int']>
}

/** Company Hierarchy element output data schema. */
export type CompanyHierarchyElement = {
    __typename?: 'CompanyHierarchyElement'
    /** An array of child elements. */
    children?: Maybe<Array<Maybe<CompanyHierarchyElement>>>
    /** Hierarchy element description. */
    description?: Maybe<Scalars['String']>
    /** Hierarchy element entity id. */
    entity_id?: Maybe<Scalars['String']>
    /** icon type customer or team. */
    icon_type?: Maybe<Scalars['String']>
    /** Hierarchy element name. */
    text?: Maybe<Scalars['String']>
    /** Hierarchy element tree id. */
    tree_id?: Maybe<Scalars['String']>
    /** Hierarchy element type. */
    type?: Maybe<Scalars['String']>
}

/** Response object schema for a Company Hierarchy query. */
export type CompanyHierarchyOutput = {
    __typename?: 'CompanyHierarchyOutput'
    /** Indicator of maximun nesting of elements within a whole Company Hierarchy. */
    max_nesting?: Maybe<Scalars['Int']>
    /** An array of Company structure elements. */
    structure?: Maybe<CompanyHierarchyElement>
}

/** Defines the input data schema for updating the Company Hierarchy. */
export type CompanyHierarchyUpdateInput = {
    /** A target parent element tree ID within a Company's Hierarchy. Required. */
    parent_tree_id: Scalars['ID']
    /** Company Hierarchy element's hierarchical ID that is being moved to another parent. Required. */
    tree_id: Scalars['ID']
}

/** Company legal address output data schema. */
export type CompanyLegalAddress = {
    __typename?: 'CompanyLegalAddress'
    /** City name. */
    city?: Maybe<Scalars['String']>
    /** Country code. */
    country_code?: Maybe<CountryCodeEnum>
    /** ZIP/postal code. */
    postcode?: Maybe<Scalars['String']>
    /** An object containing region data for the Company. */
    region?: Maybe<CustomerAddressRegion>
    /** An array of strings that defines the Company's street address. */
    street?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Company's phone number. */
    telephone?: Maybe<Scalars['String']>
}

/** Defines the Company legal address input data schema for creating a new entity. */
export type CompanyLegalAddressCreateInput = {
    /** Company's city name. Required. */
    city: Scalars['String']
    /** Company's country ID. Required. See 'countries' query. Required. */
    country_id: Scalars['String']
    /** Company's ZIP/postal code. Required. */
    postcode: Scalars['String']
    /** An object containing the region name and/or region ID. Required. */
    region?: Maybe<CustomerAddressRegionInput>
    /**
     * An array of strings that define the Company street address. Required array
     * value for a field with strings as values of array.
     */
    street: Array<Maybe<Scalars['String']>>
    /** Company's phone number. Required. */
    telephone: Scalars['String']
}

/**
 * Defines the Company legal address input data schema for updating an existing
 * entity. Allows only needed fields to be passed for update.
 */
export type CompanyLegalAddressUpdateInput = {
    /** Company's city name. */
    city?: Maybe<Scalars['String']>
    /** Company's country ID. See 'countries' query. */
    country_id?: Maybe<Scalars['String']>
    /** Company's ZIP/postal code. */
    postcode?: Maybe<Scalars['String']>
    /** An object containing the region name and/or region ID. Required. */
    region?: Maybe<CustomerAddressRegionInput>
    /** An array of strings that define the Company street address. */
    street?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Company's phone number. */
    telephone?: Maybe<Scalars['String']>
}

/** Company role output data schema returned in response to a query by Role id. */
export type CompanyRole = {
    __typename?: 'CompanyRole'
    /** Role id. */
    id: Scalars['ID']
    /** Role name. */
    name?: Maybe<Scalars['String']>
    /** A list of permission resources defined for a Role. */
    permissions?: Maybe<Array<Maybe<CompanyAclResource>>>
    /** Total number of Users with such Role within Company Hierarchy. */
    users_count?: Maybe<Scalars['Int']>
}

/** Defines the input data schema for creating a new Company role. */
export type CompanyRoleCreateInput = {
    /** Role name. Required. */
    name: Scalars['String']
    /** A list of Role permission resources. Required array value for a field with strings as values of array. */
    permissions: Array<Maybe<Scalars['String']>>
}

/** Company role output data schema. */
export type CompanyRoleOutput = {
    __typename?: 'CompanyRoleOutput'
    /** Message of company role operation */
    message?: Maybe<Scalars['String']>
    /** Status of company role operation: true - success; false - fail. */
    status?: Maybe<Scalars['Boolean']>
}

/** Output data schema for an object returned by a Company roles search query. */
export type CompanyRoles = {
    __typename?: 'CompanyRoles'
    /** A list of company roles that match the specified search criteria. */
    items?: Maybe<Array<Maybe<CompanyRole>>>
    /** Pagination meta data. */
    page_info?: Maybe<SearchResultPageInfo>
    /** The total number of objects matching the specified filter. */
    total_count?: Maybe<Scalars['Int']>
}

/** Defines the input data schema for updating an existing Company role. */
export type CompanyRoleUpdateInput = {
    /** Role ID. Required. */
    id: Scalars['ID']
    /** Role name. */
    name?: Maybe<Scalars['String']>
    /** A list of Role permission resources. Array value for a field, if provided, should consist only of string values. */
    permissions?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Company sales representative information output data schema. */
export type CompanySalesRepresentative = {
    __typename?: 'CompanySalesRepresentative'
    /** Sales representative email address. */
    email?: Maybe<Scalars['String']>
    /** Sales representative first name. */
    firstname?: Maybe<Scalars['String']>
    /** Sales representative last name. */
    lastname?: Maybe<Scalars['String']>
}

/** Company Team entity output data schema. */
export type CompanyTeam = {
    __typename?: 'CompanyTeam'
    /** Team description. */
    description?: Maybe<Scalars['String']>
    /** Team id. */
    id: Scalars['ID']
    /** Team name. */
    name?: Maybe<Scalars['String']>
}

/** Defines the input data schema for creating a new Company team. */
export type CompanyTeamCreateInput = {
    /** Team description. */
    description?: Maybe<Scalars['String']>
    /** Team name. Required. */
    name: Scalars['String']
    /** A target structure element ID within a Company's Hierarchy for a team to be assigned to. */
    target_id?: Maybe<Scalars['ID']>
}

/** Company team output data schema. */
export type CompanyTeamOutput = {
    __typename?: 'CompanyTeamOutput'
    /** Message of company team operation */
    message?: Maybe<Scalars['String']>
    /** Status of company team operation: true - success; false - fail. */
    status?: Maybe<Scalars['Boolean']>
}

/** Defines the input data schema for updating an existing Company team. */
export type CompanyTeamUpdateInput = {
    /** Team description. */
    description?: Maybe<Scalars['String']>
    /** Team ID. Required. */
    id: Scalars['ID']
    /** Team name. */
    name?: Maybe<Scalars['String']>
}

/** Defines the Company input data schema for updating an existing entity. Allows only needed fields to be passed for update. */
export type CompanyUpdateInput = {
    /** Company email address. */
    company_email?: Maybe<Scalars['String']>
    /** Company name. */
    company_name?: Maybe<Scalars['String']>
    /** An object containing Company legal address data. */
    legal_address?: Maybe<CompanyLegalAddressUpdateInput>
    /** Company legal name. */
    legal_name?: Maybe<Scalars['String']>
    /** Company re-seller ID. */
    reseller_id?: Maybe<Scalars['String']>
    /** Company VAT/TAX ID. */
    vat_tax_id?: Maybe<Scalars['String']>
}

/** Defines the input data schema for creating a new Customer - Company user. */
export type CompanyUserCreateInput = {
    /** Company user's email address. Required. */
    email: Scalars['String']
    /** Company user's first name. Required. */
    firstname: Scalars['String']
    /** Company user's job title. Required. */
    job_title: Scalars['String']
    /** Company user's last name. Required. */
    lastname: Scalars['String']
    /** Company user's role ID. Required. */
    role_id: Scalars['ID']
    /** Company user's status ID. Required. */
    status: Scalars['Int']
    /** A target structure element ID within a Company's Hierarchy for a user to be assigned to. */
    target_id?: Maybe<Scalars['ID']>
    /** Company user's phone number. Required. */
    telephone: Scalars['String']
}

export type CompanyUserDetails = {
    __typename?: 'CompanyUserDetails'
    /** User email address. */
    email?: Maybe<Scalars['String']>
    /** User first name. */
    firstname?: Maybe<Scalars['String']>
    /** User Id. */
    id?: Maybe<Scalars['Int']>
    /** User job_title */
    job_title?: Maybe<Scalars['String']>
    /** User last name. */
    lastname?: Maybe<Scalars['String']>
    /** User role id */
    role_id?: Maybe<Scalars['Int']>
    /** User role name. */
    role_name?: Maybe<Scalars['String']>
    /** User current status */
    status?: Maybe<Scalars['Boolean']>
    /** User telephone */
    telephone?: Maybe<Scalars['String']>
}

/** Output data schema for an object returned by a Company users search query. */
export type CompanyUsers = {
    __typename?: 'CompanyUsers'
    /** An array of 'CompanyUser' objects that match the specified search criteria. */
    items?: Maybe<Array<Maybe<CompanyUserDetails>>>
    /** Pagination meta data. */
    page_info?: Maybe<SearchResultPageInfo>
    /** The number of objects returned. */
    total_count?: Maybe<Scalars['Int']>
}

/** Defines the input filters for a Company Users query */
export type CompanyUsersFilterInput = {
    /** Filter Customers by their status within a Company structure. Defaults to 'active'. Required. */
    status?: Maybe<CompanyUserStatusEnum>
}

/** List of available Company user statuses. */
export enum CompanyUserStatusEnum {
    /** Only active users */
    Active = 'ACTIVE',
    /** Only inactive users */
    Inactive = 'INACTIVE'
}

/** Defines the input data schema for updating an existing Customer - Company user. */
export type CompanyUserUpdateInput = {
    /** Company user's email address. */
    email?: Maybe<Scalars['String']>
    /** Company user's first name. */
    firstname?: Maybe<Scalars['String']>
    /** Company user's ID (Customer ID). Required. */
    id: Scalars['ID']
    /** Company user's job title. */
    job_title?: Maybe<Scalars['String']>
    /** Company user's last name. */
    lastname?: Maybe<Scalars['String']>
    /** Company user's role ID. */
    role_id?: Maybe<Scalars['ID']>
    /** Company user's status ID. */
    status?: Maybe<Scalars['Int']>
    /** Company user's phone number. */
    telephone?: Maybe<Scalars['String']>
}

export type ComplexTextValue = {
    __typename?: 'ComplexTextValue'
    /** HTML format */
    html: Scalars['String']
}

export type ConfigOptions = {
    __typename?: 'ConfigOptions'
    /** Product options label */
    label?: Maybe<Scalars['String']>
    /** Product options option id */
    option_id?: Maybe<Scalars['String']>
    /** Product options label option value */
    option_value?: Maybe<Scalars['String']>
    /** Product options value */
    value?: Maybe<Scalars['String']>
}

/**
 * ConfigurableAttributeOption contains the value_index (and other related
 * information) assigned to a configurable product option
 */
export type ConfigurableAttributeOption = {
    __typename?: 'ConfigurableAttributeOption'
    /** The ID assigned to the attribute */
    code?: Maybe<Scalars['String']>
    /** A string that describes the configurable attribute option */
    label?: Maybe<Scalars['String']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
    /** A unique index number assigned to the configurable product option */
    value_index?: Maybe<Scalars['Int']>
}

export type ConfigurableCartItem = CartItemInterface & {
    __typename?: 'ConfigurableCartItem'
    /** The list of available gift wrapping options for the cart item */
    available_gift_wrapping: Array<Maybe<GiftWrapping>>
    configurable_options: Array<Maybe<SelectedConfigurableOption>>
    customizable_options?: Maybe<Array<Maybe<SelectedCustomizableOption>>>
    /** The entered gift message for the cart item */
    gift_message?: Maybe<GiftMessage>
    /** The selected gift wrapping for the cart item */
    gift_wrapping?: Maybe<GiftWrapping>
    id: Scalars['String']
    uid: Scalars['String']
    /** A resulting stock state for a configurable product, based both on parent and child stock. */
    item_stock_status: ProductStockStatus
    itemsku: Scalars['String']
    /** A combined item-level message */
    message?: Maybe<Scalars['String']>
    prices?: Maybe<CartItemPrices>
    product: ProductInterface
    qty_validation_message: Scalars['String']
    quantity: Scalars['Float']
}

/** ConfigurableProduct defines basic features of a configurable product and its simple product variants */
export type ConfigurableProduct = ProductInterface &
    PhysicalProductInterface &
    CustomizableProductInterface & {
        __typename?: 'ConfigurableProduct'
        Product_sizechart?: Maybe<Scalars['Int']>
        Product_sizechart_text?: Maybe<Scalars['String']>
        activity?: Maybe<Scalars['String']>
        /** The attribute set assigned to the product. */
        attribute_set_id?: Maybe<Scalars['Int']>
        brand?: Maybe<Scalars['Int']>
        brand_text?: Maybe<Scalars['String']>
        /**
         * Relative canonical URL. This value is returned only if the system setting 'Use
         * Canonical Link Meta Tag For Products' is enabled
         */
        canonical_url?: Maybe<Scalars['String']>
        /** The categories assigned to a product. */
        categories?: Maybe<Array<Maybe<CategoryInterface>>>
        category_gear?: Maybe<Scalars['String']>
        climate?: Maybe<Scalars['String']>
        collar?: Maybe<Scalars['String']>
        color?: Maybe<Scalars['String']>
        color_family?: Maybe<Scalars['String']>
        color_text?: Maybe<Scalars['String']>
        /** An array of linked simple product items */
        configurable_options?: Maybe<Array<Maybe<ConfigurableProductOptions>>>
        /** The product's country of origin. */
        country_of_manufacture?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was created. */
        created_at?: Maybe<Scalars['String']>
        /** Crosssell Products */
        crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** Detailed information about the product. The value can include simple HTML tags. */
        description?: Maybe<ComplexTextValue>
        eco_collection?: Maybe<Scalars['Int']>
        eco_collection_text?: Maybe<Scalars['String']>
        eligible_for_pick_up?: Maybe<Scalars['Int']>
        eligible_for_pick_up_text?: Maybe<Scalars['String']>
        erin_recommends?: Maybe<Scalars['Int']>
        erin_recommends_text?: Maybe<Scalars['String']>
        features_bags?: Maybe<Scalars['String']>
        format?: Maybe<Scalars['Int']>
        format_text?: Maybe<Scalars['String']>
        gender?: Maybe<Scalars['String']>
        /** Indicates whether a gift message is available. */
        gift_message_available?: Maybe<Scalars['String']>
        /** The ID number assigned to the product. */
        id?: Maybe<Scalars['Int']>
        /** The relative path to the main image on the product page. */
        image?: Maybe<ProductImage>
        /** Indicates whether the product can be returned */
        is_returnable?: Maybe<Scalars['String']>
        /** A number representing the product's manufacturer. */
        manufacturer?: Maybe<Scalars['Int']>
        manufacturer_text?: Maybe<Scalars['String']>
        material?: Maybe<Scalars['String']>
        /** An array of Media Gallery objects. */
        media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>
        /**
         * An array of MediaGalleryEntry objects.
         * @deprecated Use product's `media_gallery` instead
         */
        media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>
        /** A brief overview of the product for search results listings, maximum 255 characters. */
        meta_description?: Maybe<Scalars['String']>
        /** A comma-separated list of keywords that are visible only to search engines. */
        meta_keyword?: Maybe<Scalars['String']>
        /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
        meta_title?: Maybe<Scalars['String']>
        /** The product name. Customers use this name to identify the product. */
        name?: Maybe<Scalars['String']>
        new?: Maybe<Scalars['Int']>
        /** The beginning date for new product listings, and determines if the product is featured as a new product. */
        new_from_date?: Maybe<Scalars['String']>
        new_text?: Maybe<Scalars['String']>
        /** The end date for new product listings. */
        new_to_date?: Maybe<Scalars['String']>
        /** Product stock only x left count */
        only_x_left_in_stock?: Maybe<Scalars['Float']>
        /** An array of options for a customizable product. */
        options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>
        /** If the product has multiple options, determines where they appear on the product page. */
        options_container?: Maybe<Scalars['String']>
        pattern?: Maybe<Scalars['String']>
        performance_fabric?: Maybe<Scalars['Int']>
        performance_fabric_text?: Maybe<Scalars['String']>
        /**
         * A ProductPrices object, indicating the price of an item.
         * @deprecated Use price_range for product price information.
         */
        price?: Maybe<ProductPrices>
        /** A PriceRange object, indicating the range of prices for the product */
        price_range: PriceRange
        /** An array of TierPrice objects. */
        price_tiers?: Maybe<Array<Maybe<TierPrice>>>
        product_label?: Maybe<Scalars['Int']>
        product_label_text?: Maybe<Scalars['String']>
        /** An array of ProductLinks objects. */
        product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>
        /** Product review summary and review count data */
        product_reviews?: Maybe<ProductReviews>
        purpose?: Maybe<Scalars['Int']>
        purpose_text?: Maybe<Scalars['String']>
        /** Review/Rating related configurations */
        rating_configurations?: Maybe<RatingConfigurationData>
        /** The average of all the ratings given to the product. */
        rating_summary: Scalars['Float']
        /** Related Products */
        related_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The total count of all the reviews given to the product. */
        review_count: Scalars['Int']
        /** Product review summary and review count data */
        review_details?: Maybe<ReviewParameters>
        /** The list of products reviews. */
        reviews: ProductReviews
        sale?: Maybe<Scalars['Int']>
        sale_text?: Maybe<Scalars['String']>
        /** A short description of the product. Its use depends on the theme. */
        short_description?: Maybe<ComplexTextValue>
        size?: Maybe<Scalars['String']>
        size_text?: Maybe<Scalars['String']>
        sizechart?: Maybe<Scalars['Int']>
        sizechart_text?: Maybe<Scalars['String']>
        /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
        sku?: Maybe<Scalars['String']>
        sleeve?: Maybe<Scalars['String']>
        /** The relative path to the small image, which is used on catalog pages. */
        small_image?: Maybe<ProductImage>
        /** The beginning date that a product has a special price. */
        special_from_date?: Maybe<Scalars['String']>
        /** The discounted price of the product. */
        special_price?: Maybe<Scalars['Float']>
        /** The end date that a product has a special price. */
        special_to_date?: Maybe<Scalars['String']>
        staged?: Maybe<Scalars['Boolean']>
        /** Stock status of the product */
        stock_status?: Maybe<ProductStockStatus>
        strap_bags?: Maybe<Scalars['String']>
        style_bags?: Maybe<Scalars['String']>
        style_bottom?: Maybe<Scalars['String']>
        style_general?: Maybe<Scalars['String']>
        /** The file name of a swatch image */
        swatch_image?: Maybe<Scalars['String']>
        /** The relative path to the product's thumbnail image. */
        thumbnail?: Maybe<ProductImage>
        /**
         * The price when tier pricing is in effect and the items purchased threshold has been reached.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_price?: Maybe<Scalars['Float']>
        /**
         * An array of ProductTierPrices objects.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>
        /**
         * One of simple, virtual, bundle, downloadable, grouped, or configurable.
         * @deprecated Use __typename instead.
         */
        type_id?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was updated. */
        updated_at?: Maybe<Scalars['String']>
        /** Upsell Products */
        upsell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The part of the URL that identifies the product */
        url_key?: Maybe<Scalars['String']>
        /** @deprecated Use product's `canonical_url` or url rewrites instead */
        url_path?: Maybe<Scalars['String']>
        /** URL rewrites list */
        url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>
        /** The part of the product URL that is appended after the url key */
        url_suffix?: Maybe<Scalars['String']>
        /** An array of variants of products */
        variants?: Maybe<Array<Maybe<ConfigurableVariant>>>
        /**
         * An array of websites in which the product is available.
         * @deprecated The field should not be used on the storefront.
         */
        websites?: Maybe<Array<Maybe<Website>>>
        /** The weight of the item, in units defined by the store. */
        weight?: Maybe<Scalars['Float']>
    }

/** ConfigurableProduct defines basic features of a configurable product and its simple product variants */
export type ConfigurableProductProduct_ReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** ConfigurableProduct defines basic features of a configurable product and its simple product variants */
export type ConfigurableProductReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type ConfigurableProductCartItemInput = {
    customizable_options?: Maybe<Array<Maybe<CustomizableOptionInput>>>
    data: CartItemInput
    /** Configurable product SKU. */
    parent_sku?: Maybe<Scalars['String']>
    variant_sku?: Maybe<Scalars['String']>
}

/** ConfigurableProductOptions defines configurable attributes for the specified product */
export type ConfigurableProductOptions = {
    __typename?: 'ConfigurableProductOptions'
    /** A string that identifies the attribute */
    attribute_code?: Maybe<Scalars['String']>
    /**
     * The ID assigned to the attribute
     * @deprecated Use attribute_id_v2 instead
     */
    attribute_id?: Maybe<Scalars['String']>
    /** The ID assigned to the attribute */
    attribute_id_v2?: Maybe<Scalars['Int']>
    /** The configurable option ID number assigned by the system */
    id?: Maybe<Scalars['Int']>
    /** A string that describes the configurable product option, which is displayed on the UI */
    label?: Maybe<Scalars['String']>
    /** A number that indicates the order in which the attribute is displayed */
    position?: Maybe<Scalars['Int']>
    /** This is the same as a product's id field */
    product_id?: Maybe<Scalars['Int']>
    /** Indicates whether the option is the default */
    use_default?: Maybe<Scalars['Boolean']>
    /** An array that defines the value_index codes assigned to the configurable product */
    values?: Maybe<Array<Maybe<ConfigurableProductOptionsValues>>>
}

/** ConfigurableProductOptionsValues contains the index number assigned to a configurable product option */
export type ConfigurableProductOptionsValues = {
    __typename?: 'ConfigurableProductOptionsValues'
    /** The label of the product on the default store */
    default_label?: Maybe<Scalars['String']>
    /** The label of the product */
    label?: Maybe<Scalars['String']>
    /** The label of the product on the current store */
    store_label?: Maybe<Scalars['String']>
    /** Swatch data for configurable product option */
    swatch_data?: Maybe<ImageSwatchData>
    /** Indicates whether to use the default_label */
    use_default_value?: Maybe<Scalars['Boolean']>
    /** A unique index number assigned to the configurable product option */
    value_index?: Maybe<Scalars['Int']>
}

/** An array containing all the simple product variants of a configurable product */
export type ConfigurableVariant = {
    __typename?: 'ConfigurableVariant'
    attributes?: Maybe<Array<Maybe<ConfigurableAttributeOption>>>
    product?: Maybe<SimpleProduct>
}

export type ContactInput = {
    comment: Scalars['String']
    email: Scalars['String']
    name: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type ContactOutput = {
    __typename?: 'ContactOutput'
    /** Response Message */
    response?: Maybe<Scalars['String']>
}

export type CopyMoveRequisitionListInput = {
    /** Selected items to move */
    selectedItems?: Maybe<Array<Maybe<SelectedItemIds>>>
    /** Source Requistion List ID */
    sourceRequisitionListId?: Maybe<Scalars['Int']>
    /** Target Requistion List ID */
    targetRequisitionListId?: Maybe<Scalars['Int']>
}

export type CopyRequisitionListOutput = {
    __typename?: 'CopyRequisitionListOutput'
    /** Copied requistion list items to selected requisition list */
    messages?: Maybe<Scalars['String']>
}

export type CopyWishlistInput = {
    items?: Maybe<Array<Maybe<WishlistProductData>>>
    /** Wishlist ID */
    wishlistId?: Maybe<Scalars['Int']>
}

export type CopyWishlistOutput = {
    __typename?: 'CopyWishlistOutput'
    /** Copy wishlist response */
    messages?: Maybe<Scalars['String']>
}

export type Country = {
    __typename?: 'Country'
    available_regions?: Maybe<Array<Maybe<Region>>>
    full_name_english?: Maybe<Scalars['String']>
    full_name_locale?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    three_letter_abbreviation?: Maybe<Scalars['String']>
    two_letter_abbreviation?: Maybe<Scalars['String']>
}

/** Attribute groups data */
export type CountryCodePatterns = {
    __typename?: 'CountryCodePatterns'
    /** Pattern Example */
    example?: Maybe<Scalars['String']>
    /** Pattern Regular Expression */
    pattern?: Maybe<Scalars['String']>
    /** ID */
    pattern_id?: Maybe<Scalars['String']>
}

export type CountryCodes = {
    __typename?: 'CountryCodes'
    code?: Maybe<Scalars['String']>
    /** zip code pattern list. */
    patterns?: Maybe<Array<Maybe<CountryCodePatterns>>>
}

/** Create company output data schema. */
export type CreateCompanyOutput = {
    __typename?: 'CreateCompanyOutput'
    /** Message of company create operation */
    message?: Maybe<Scalars['String']>
    /** Status of create operation: true - success; false - fail. */
    status?: Maybe<Scalars['Boolean']>
}

/** Create company user output data schema. */
export type CreateCompanyUserOutput = {
    __typename?: 'CreateCompanyUserOutput'
    /** New company user instance. */
    user: Customer
}

export type CreateEmptyCartInput = {
    cart_id?: Maybe<Scalars['String']>
}

export type CreateKlarnaPaymentsSessionInput = {
    cart_id: Scalars['String']
}

export type CreateKlarnaPaymentsSessionOutput = {
    __typename?: 'createKlarnaPaymentsSessionOutput'
    /** The payment method client token */
    client_token?: Maybe<Scalars['String']>
    error_message?: Maybe<Scalars['String']>
    /** The payment method categories */
    payment_method_categories?: Maybe<Array<Maybe<Categories>>>
}

/** Contains the secure information used to authorize transaction. Applies to Payflow Pro and Payments Pro payment methods. */
export type CreatePayflowProTokenOutput = {
    __typename?: 'CreatePayflowProTokenOutput'
    response_message: Scalars['String']
    result: Scalars['Int']
    result_code: Scalars['Int']
    secure_token: Scalars['String']
    secure_token_id: Scalars['String']
}

export type CreateProductReviewInput = {
    /** The customer's nickname. Defaults to the customer name, if logged in */
    nickname: Scalars['String']
    /** Ratings details by category. e.g price: 5, quality: 4 etc */
    ratings: Array<Maybe<ProductReviewRatingInput>>
    /** The SKU of the reviewed product */
    sku: Scalars['String']
    /** The summary (title) of the review */
    summary: Scalars['String']
    /** The review text. */
    text: Scalars['String']
}

export type CreateProductReviewOutput = {
    __typename?: 'CreateProductReviewOutput'
    /** Contains the completed product review */
    review: ProductReview
}

export type CreateReorderCartInput = {
    cart_id: Scalars['String']
    /** order unique identifier */
    order_id: Scalars['Int']
}

export type CreateReorderCartOutput = {
    __typename?: 'CreateReorderCartOutput'
    cart: Cart
}

export type CreateReviewOutput = {
    __typename?: 'CreateReviewOutput'
    /** Success Message */
    message?: Maybe<Scalars['String']>
}

export type CreateRmaRequestInput = {
    customer_custom_email?: Maybe<Scalars['String']>
    items: Array<Maybe<RmaRequestItemInput>>
    order_id?: Maybe<Scalars['Int']>
    rma_comment?: Maybe<Scalars['String']>
}

export type CreateRmaRequestOutput = {
    __typename?: 'CreateRmaRequestOutput'
    response?: Maybe<Scalars['String']>
}

/** Required fields for Payflow Pro and Payments Pro credit card payments */
export type CreditCardDetailsInput = {
    /** Credit card expiration month */
    cc_exp_month: Scalars['Int']
    /** Credit card expiration year */
    cc_exp_year: Scalars['Int']
    /** Last 4 digits of the credit card */
    cc_last_4: Scalars['Int']
    /** Credit card type */
    cc_type: Scalars['String']
}

/** Company credit history output data schema. */
export type CreditHistoryOutput = {
    __typename?: 'CreditHistoryOutput'
    /** amount */
    amount?: Maybe<Scalars['String']>
    /** Company available credit */
    available_credit?: Maybe<Scalars['String']>
    /** Company credit limit */
    credit_limit?: Maybe<Scalars['String']>
    /** custom_reference_number */
    custom_reference_number?: Maybe<Scalars['String']>
    /** Opertaion data time */
    date?: Maybe<Scalars['String']>
    /** opertation type */
    operation?: Maybe<Scalars['String']>
    /** opertation outstanding balance */
    outstanding_balance?: Maybe<Scalars['String']>
    /** opertion performed by */
    updated_by?: Maybe<Scalars['String']>
}

/** Credit memo details */
export type CreditMemo = {
    __typename?: 'CreditMemo'
    /** Comments on the credit memo */
    comments?: Maybe<Array<Maybe<SalesCommentItem>>>
    /** The unique ID of the credit memo, used for API purposes */
    id: Scalars['ID']
    /** An array containing details about refunded items */
    items?: Maybe<Array<Maybe<CreditMemoItemInterface>>>
    /** The sequential credit memo number */
    number: Scalars['String']
    /** Contains details about the total refunded amount */
    total?: Maybe<CreditMemoTotal>
}

export type CreditMemoItem = CreditMemoItemInterface & {
    __typename?: 'CreditMemoItem'
    /** Contains information about the final discount amount for the base product, including discounts on options */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The unique ID of the credit memo item, used for API purposes */
    id: Scalars['ID']
    /** The order item the credit memo is applied to */
    order_item?: Maybe<OrderItemInterface>
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price for the base product, including selected options */
    product_sale_price: Money
    /** SKU of the base product */
    product_sku: Scalars['String']
    /** The number of refunded items */
    quantity_refunded?: Maybe<Scalars['Float']>
}

/** Credit memo item details */
export type CreditMemoItemInterface = {
    /** Contains information about the final discount amount for the base product, including discounts on options */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The unique ID of the credit memo item, used for API purposes */
    id: Scalars['ID']
    /** The order item the credit memo is applied to */
    order_item?: Maybe<OrderItemInterface>
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price for the base product, including selected options */
    product_sale_price: Money
    /** SKU of the base product */
    product_sku: Scalars['String']
    /** The number of refunded items */
    quantity_refunded?: Maybe<Scalars['Float']>
}

export type CreditMemoItems = {
    __typename?: 'CreditMemoItems'
    /** Additional data of CreditMemo item */
    additional_data?: Maybe<Scalars['String']>
    /** Discount of CreditMemo item */
    discount_amount?: Maybe<Money>
    /** GiftCard Details of CreditMemo Item */
    giftcard_details?: Maybe<Array<Maybe<GiftCardDetails>>>
    /** Id of the product */
    id?: Maybe<Scalars['Int']>
    /** Item Id of the product */
    item_id?: Maybe<Scalars['Int']>
    /** Name of the product */
    name: Scalars['String']
    /** Patent Item Id of the product */
    parent_item_id?: Maybe<Scalars['Int']>
    /** Price of CreditMemo item */
    price?: Maybe<Money>
    /** Product Options of CreditMemo Item */
    product_options?: Maybe<Array<Maybe<ProductOptions>>>
    /** Product Type of the product */
    product_type?: Maybe<Scalars['String']>
    /** Quantity of CreditMemo items */
    quantity_refunded?: Maybe<Scalars['Float']>
    /** Row Total of CreditMemo item */
    row_total?: Maybe<Money>
    /** Row Total incl tax of CreditMemo item */
    row_total_incl_tax?: Maybe<Money>
    /** Sku of the product */
    sku: Scalars['String']
    /** Tax Amount of CreditMemo item */
    tax_amount?: Maybe<Money>
}

export type CreditMemos = {
    __typename?: 'CreditMemos'
    /** Base Customer Balance Amount of Credit memo */
    base_customer_balance_amount?: Maybe<Money>
    /** Base Gift Card Amount of Credit memo */
    base_gift_card_amount?: Maybe<Money>
    /** Credit memo product details */
    creditmemo_items?: Maybe<Array<Maybe<CreditMemoItems>>>
    /** Customer Balance Amount of Credit memo */
    customer_balance_amount?: Maybe<Money>
    /** Discount Amount of the Credit memo */
    discount_amount?: Maybe<Money>
    /** Gift Card Amount of Credit memo */
    gift_card_amount?: Maybe<Money>
    /** Grand Total of the Credit memo */
    grand_total?: Maybe<Money>
    /** Credit memo unique identifier */
    id: Scalars['ID']
    /** Credit memo number */
    number: Scalars['String']
    /** Shipping Amount of the Credit memo */
    shipping_amount?: Maybe<Money>
    /** Subtotal of the Credit memo */
    subtotal?: Maybe<Money>
    /** Tax Amount of the Credit memo */
    tax_amount?: Maybe<Money>
}

/** Credit memo price details */
export type CreditMemoTotal = {
    __typename?: 'CreditMemoTotal'
    /** An adjustment manually applied to the order */
    adjustment: Money
    /** The final base grand total amount in the base currency */
    base_grand_total: Money
    /** The applied discounts to the credit memo */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The final total amount, including shipping, discounts, and taxes */
    grand_total: Money
    /** Contains details about the shipping and handling costs for the credit memo */
    shipping_handling?: Maybe<ShippingHandling>
    /** The subtotal of the invoice, excluding shipping, discounts, and taxes */
    subtotal: Money
    /** The credit memo tax details */
    taxes?: Maybe<Array<Maybe<TaxItem>>>
    /** The shipping amount for the credit memo */
    total_shipping: Money
    /** The amount of tax applied to the credit memo */
    total_tax: Money
}

export type Currency = {
    __typename?: 'Currency'
    available_currency_codes?: Maybe<Array<Maybe<Scalars['String']>>>
    base_currency_code?: Maybe<Scalars['String']>
    base_currency_symbol?: Maybe<Scalars['String']>
    /** @deprecated Symbol was missed. Use `default_display_currency_code`. */
    default_display_currecy_code?: Maybe<Scalars['String']>
    /** @deprecated Symbol was missed. Use `default_display_currency_symbol`. */
    default_display_currecy_symbol?: Maybe<Scalars['String']>
    default_display_currency_code?: Maybe<Scalars['String']>
    default_display_currency_symbol?: Maybe<Scalars['String']>
    exchange_rates?: Maybe<Array<Maybe<ExchangeRate>>>
}

/** CustomAttributeMetadata defines an array of attribute_codes and entity_types */
export type CustomAttributeMetadata = {
    __typename?: 'CustomAttributeMetadata'
    /** An array of attributes */
    items?: Maybe<Array<Maybe<Attribute>>>
}

/** Customer defines the customer name and address and other details */
export type Customer = {
    __typename?: 'Customer'
    /** An array containing the customer's shipping and billing addresses */
    addresses?: Maybe<Array<Maybe<CustomerAddress>>>
    /** Timestamp indicating when the account was created */
    created_at?: Maybe<Scalars['String']>
    /** The customer's date of birth */
    date_of_birth?: Maybe<Scalars['String']>
    /** The ID assigned to the billing address */
    default_billing?: Maybe<Scalars['String']>
    /** The ID assigned to the shipping address */
    default_shipping?: Maybe<Scalars['String']>
    /**
     * The customer's date of birth
     * @deprecated Use `date_of_birth` instead
     */
    dob?: Maybe<Scalars['String']>
    /** The customer's email address. Required */
    email?: Maybe<Scalars['String']>
    /** The customer's first name */
    firstname?: Maybe<Scalars['String']>
    /** The customer's gender (Male - 1, Female - 2) */
    gender?: Maybe<Scalars['Int']>
    /** @deprecated Customer group should not be exposed in the storefront scenarios */
    group_id?: Maybe<Scalars['Int']>
    /**
     * The ID assigned to the customer
     * @deprecated id is not needed as part of Customer because on server side it can be identified based on customer token used for authentication. There is no need to know customer ID on the client side.
     */
    id?: Maybe<Scalars['Int']>
    /** Indicates whether the customer is subscribed to the company's newsletter */
    is_subscribed?: Maybe<Scalars['Boolean']>
    /** The customer's family name */
    lastname?: Maybe<Scalars['String']>
    /** The customer's middle name */
    middlename?: Maybe<Scalars['String']>
    /** The wishlist query returns the list of wish lists */
    multiple_wishlist?: Maybe<Array<Maybe<WishlistOutput>>>
    orders?: Maybe<CustomerOrders>
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']>
    /** Contains the customer's product reviews */
    reviews: ProductReviews
    /** Customer reward points details */
    reward_points?: Maybe<RewardPoints>
    /** Contains the store credit information applied for the logged in customer */
    store_credit?: Maybe<CustomerStoreCredit>
    /** A value such as Sr., Jr., or III */
    suffix?: Maybe<Scalars['String']>
    /** The customer's Value-added tax (VAT) number (for corporate customers) */
    taxvat?: Maybe<Scalars['String']>
    /** Get Customer specific review details */
    user_reviews?: Maybe<CustomerReviewData>
    /** Contains the contents of a customer's wish lists */
    wishlist: Wishlist
}

/** Customer defines the customer name and address and other details */
export type CustomerMultiple_WishlistArgs = {
    wishlistId?: Maybe<Scalars['Int']>
}

/** Customer defines the customer name and address and other details */
export type CustomerOrdersArgs = {
    filter?: Maybe<CustomerOrdersFilterInput>
    currentPage?: Maybe<Scalars['Int']>
    pageSize?: Maybe<Scalars['Int']>
}

/** Customer defines the customer name and address and other details */
export type CustomerReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** Customer defines the customer name and address and other details */
export type CustomerUser_ReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** CustomerAddress contains detailed information about a customer's billing and shipping addresses */
export type CustomerAddress = {
    __typename?: 'CustomerAddress'
    /** The city or town */
    city?: Maybe<Scalars['String']>
    /** The customer's company */
    company?: Maybe<Scalars['String']>
    /** The customer's country */
    country_code?: Maybe<CountryCodeEnum>
    /**
     * The customer's country
     * @deprecated Use `country_code` instead.
     */
    country_id?: Maybe<Scalars['String']>
    /** @deprecated Custom attributes should not be put into container */
    custom_attributes?: Maybe<Array<Maybe<CustomerAddressAttribute>>>
    /**
     * The customer ID
     * @deprecated customer_id is not needed as part of CustomerAddress, address ID (id) is unique identifier for the addresses.
     */
    customer_id?: Maybe<Scalars['Int']>
    /** Indicates whether the address is the default billing address */
    default_billing?: Maybe<Scalars['Boolean']>
    /** Indicates whether the address is the default shipping address */
    default_shipping?: Maybe<Scalars['Boolean']>
    /** Address extension attributes */
    extension_attributes?: Maybe<Array<Maybe<CustomerAddressAttribute>>>
    /** The fax number */
    fax?: Maybe<Scalars['String']>
    /** The first name of the person associated with the shipping/billing address */
    firstname?: Maybe<Scalars['String']>
    /** The ID assigned to the address object */
    id?: Maybe<Scalars['Int']>
    /** The family name of the person associated with the shipping/billing address */
    lastname?: Maybe<Scalars['String']>
    /** The middle name of the person associated with the shipping/billing address */
    middlename?: Maybe<Scalars['String']>
    /** The customer's ZIP or postal code */
    postcode?: Maybe<Scalars['String']>
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']>
    /** An object containing the region name, region code, and region ID */
    region?: Maybe<CustomerAddressRegion>
    /** The unique ID for a pre-defined region */
    region_id?: Maybe<Scalars['Int']>
    /** An array of strings that define the street number and name */
    street?: Maybe<Array<Maybe<Scalars['String']>>>
    /** A value such as Sr., Jr., or III */
    suffix?: Maybe<Scalars['String']>
    /** The telephone number */
    telephone?: Maybe<Scalars['String']>
    /** The customer's Value-added tax (VAT) number (for corporate customers) */
    vat_id?: Maybe<Scalars['String']>
    /** The ID assigned to the address object */
    uid?: Maybe<Scalars['ID']>
}

export type CustomerAddressAttribute = {
    __typename?: 'CustomerAddressAttribute'
    /** Attribute code */
    attribute_code?: Maybe<Scalars['String']>
    /** Attribute value */
    value?: Maybe<Scalars['String']>
}

export type CustomerAddressAttributeInput = {
    /** Attribute code */
    attribute_code: Scalars['String']
    /** Attribute value */
    value: Scalars['String']
}

export type CustomerAddressInput = {
    /** The city or town */
    city?: Maybe<Scalars['String']>
    /** The customer's company */
    company?: Maybe<Scalars['String']>
    /** The customer's country */
    country_code?: Maybe<CountryCodeEnum>
    /** Deprecated: use `country_code` instead. */
    country_id?: Maybe<CountryCodeEnum>
    /** Deprecated: Custom attributes should not be put into container. */
    custom_attributes?: Maybe<Array<Maybe<CustomerAddressAttributeInput>>>
    /** Indicates whether the address is the default billing address */
    default_billing?: Maybe<Scalars['Boolean']>
    /** Indicates whether the address is the default shipping address */
    default_shipping?: Maybe<Scalars['Boolean']>
    /** The fax number */
    fax?: Maybe<Scalars['String']>
    /** The first name of the person associated with the shipping/billing address */
    firstname?: Maybe<Scalars['String']>
    /** The family name of the person associated with the shipping/billing address */
    lastname?: Maybe<Scalars['String']>
    /** The middle name of the person associated with the shipping/billing address */
    middlename?: Maybe<Scalars['String']>
    /** The customer's ZIP or postal code */
    postcode?: Maybe<Scalars['String']>
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']>
    /** An object containing the region name, region code, and region ID */
    region?: Maybe<CustomerAddressRegionInput>
    /** An array of strings that define the street number and name */
    street?: Maybe<Array<Maybe<Scalars['String']>>>
    /** A value such as Sr., Jr., or III */
    suffix?: Maybe<Scalars['String']>
    /** The telephone number */
    telephone?: Maybe<Scalars['String']>
    /** The customer's Tax/VAT number (for corporate customers) */
    vat_id?: Maybe<Scalars['String']>
}

/** CustomerAddressRegion defines the customer's state or province */
export type CustomerAddressRegion = {
    __typename?: 'CustomerAddressRegion'
    /** The state or province name */
    region?: Maybe<Scalars['String']>
    /** The address region code */
    region_code?: Maybe<Scalars['String']>
    /** The unique ID for a pre-defined region */
    region_id?: Maybe<Scalars['Int']>
}

/** CustomerAddressRegionInput defines the customer's state or province */
export type CustomerAddressRegionInput = {
    /** The state or province name */
    region?: Maybe<Scalars['String']>
    /** The address region code */
    region_code?: Maybe<Scalars['String']>
    /** The unique ID for a pre-defined region */
    region_id?: Maybe<Scalars['Int']>
}

export type CustomerCreateInput = {
    /** The customer's date of birth */
    date_of_birth?: Maybe<Scalars['String']>
    /** Deprecated: Use `date_of_birth` instead */
    dob?: Maybe<Scalars['String']>
    /** The customer's email address. Required for customer creation */
    email: Scalars['String']
    /** The customer's first name */
    firstname: Scalars['String']
    /** The customer's gender (Male - 1, Female - 2) */
    gender?: Maybe<Scalars['Int']>
    /** Indicates whether the customer is subscribed to the company's newsletter */
    is_subscribed?: Maybe<Scalars['Boolean']>
    /** The customer's family name */
    lastname: Scalars['String']
    /** The customer's middle name */
    middlename?: Maybe<Scalars['String']>
    /** The customer's password */
    password?: Maybe<Scalars['String']>
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']>
    /** A value such as Sr., Jr., or III */
    suffix?: Maybe<Scalars['String']>
    /** The customer's Tax/VAT number (for corporate customers) */
    taxvat?: Maybe<Scalars['String']>
}

export type CustomerDownloadableProduct = {
    __typename?: 'CustomerDownloadableProduct'
    date?: Maybe<Scalars['String']>
    download_url?: Maybe<Scalars['String']>
    order_increment_id?: Maybe<Scalars['String']>
    remaining_downloads?: Maybe<Scalars['String']>
    status?: Maybe<Scalars['String']>
}

export type CustomerDownloadableProducts = {
    __typename?: 'CustomerDownloadableProducts'
    /** List of purchased downloadable items */
    items?: Maybe<Array<Maybe<CustomerDownloadableProduct>>>
}

export type CustomerInput = {
    /** The customer's date of birth */
    date_of_birth?: Maybe<Scalars['String']>
    /** Deprecated: Use `date_of_birth` instead */
    dob?: Maybe<Scalars['String']>
    /** The customer's email address. Required for customer creation */
    email?: Maybe<Scalars['String']>
    /** The customer's first name */
    firstname?: Maybe<Scalars['String']>
    /** The customer's gender (Male - 1, Female - 2) */
    gender?: Maybe<Scalars['Int']>
    /** Indicates whether the customer is subscribed to the company's newsletter */
    is_subscribed?: Maybe<Scalars['Boolean']>
    /** The customer's family name */
    lastname?: Maybe<Scalars['String']>
    /** The customer's middle name */
    middlename?: Maybe<Scalars['String']>
    /** The customer's password */
    password?: Maybe<Scalars['String']>
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']>
    /** A value such as Sr., Jr., or III */
    suffix?: Maybe<Scalars['String']>
    /** The customer's Tax/VAT number (for corporate customers) */
    taxvat?: Maybe<Scalars['String']>
}

/** Contains details about each of the customer's orders */
export type CustomerOrder = {
    __typename?: 'CustomerOrder'
    /** The billing address for the order */
    billing_address?: Maybe<OrderAddress>
    /** The shipping carrier for the order delivery */
    carrier?: Maybe<Scalars['String']>
    /** Comments about the order */
    comments?: Maybe<Array<Maybe<SalesCommentItem>>>
    /** @deprecated Use the order_date attribute instead */
    created_at?: Maybe<Scalars['String']>
    /** A list of credit memos */
    credit_memos?: Maybe<Array<Maybe<CreditMemo>>>
    /** The entered gift message for the order */
    gift_message?: Maybe<GiftMessage>
    /** Whether customer requested gift receipt for the order */
    gift_receipt_included: Scalars['Boolean']
    /** The selected gift wrapping for the order */
    gift_wrapping?: Maybe<GiftWrapping>
    /** @deprecated Use the totals.grand_total attribute instead */
    grand_total?: Maybe<Scalars['Float']>
    /** Unique identifier for the order */
    id: Scalars['ID']
    /** @deprecated Use the id attribute instead */
    increment_id?: Maybe<Scalars['String']>
    /** A list of invoices for the order */
    invoices: Array<Maybe<Invoice>>
    /** An array containing the items purchased in this order */
    items?: Maybe<Array<Maybe<OrderItemInterface>>>
    /** The order number */
    number: Scalars['String']
    /** The date the order was placed */
    order_date: Scalars['String']
    /** @deprecated Use the number attribute instead */
    order_number: Scalars['String']
    /** Payment details for the order */
    payment_methods?: Maybe<Array<Maybe<OrderPaymentMethod>>>
    /** Whether customer requested printed card for the order */
    printed_card_included: Scalars['Boolean']
    /** A list of shipments for the order */
    shipments?: Maybe<Array<Maybe<OrderShipment>>>
    /** The shipping address for the order */
    shipping_address?: Maybe<OrderAddress>
    /** The delivery method for the order */
    shipping_method?: Maybe<Scalars['String']>
    /** The current status of the order */
    status: Scalars['String']
    /** Contains details about the calculated totals for this order */
    total?: Maybe<OrderTotal>
}

/** The collection of orders that match the conditions defined in the filter */
export type CustomerOrders = {
    __typename?: 'CustomerOrders'
    /** An array of customer orders */
    items: Array<Maybe<CustomerOrder>>
    /** An object that includes the current_page, page_info, and page_size values specified in the query */
    page_info?: Maybe<SearchResultPageInfo>
    /** The total count of customer orders */
    total_count?: Maybe<Scalars['Int']>
}

/** Identifies the filter to use for filtering orders. */
export type CustomerOrdersFilterInput = {
    /** Filters by order number. */
    number?: Maybe<FilterStringTypeInput>
}

export type CustomerOutput = {
    __typename?: 'CustomerOutput'
    customer: Customer
}

export type CustomerPaymentTokens = {
    __typename?: 'CustomerPaymentTokens'
    /** An array of payment tokens */
    items: Array<Maybe<PaymentToken>>
}

/** Get Customer specific reviews */
export type CustomerReview = {
    __typename?: 'CustomerReview'
    /** Reviewed product name */
    product_name?: Maybe<Scalars['String']>
    /** Reviewed product URL */
    product_url?: Maybe<Scalars['String']>
    /** Customer rating for product */
    rating?: Maybe<Scalars['Int']>
    /** review added date */
    review_added_at?: Maybe<Scalars['String']>
    /** Review content */
    review_detail?: Maybe<Scalars['String']>
}

/** Get Customer specific reviews */
export type CustomerReviewData = {
    __typename?: 'CustomerReviewData'
    customer_reviews_data?: Maybe<Array<Maybe<CustomerReview>>>
    /** Total count */
    total_count?: Maybe<Scalars['Int']>
    /** Total count */
    total_pages?: Maybe<Scalars['Int']>
}

/** Sales Order GraphQl gather Data of Customer Order Information */
export type CustomerSalesOrder = {
    __typename?: 'CustomerSalesOrder'
    /** Creation date of Sales Order */
    created_at?: Maybe<Scalars['String']>
    /** Creation date Formatted of Sales Order */
    created_at_date?: Maybe<Scalars['String']>
    /** Creation time Formatted of Sales Order */
    created_at_time?: Maybe<Scalars['String']>
    /** Grand Total of the Sales Order */
    grand_total?: Maybe<Money>
    /** order unique identifier */
    id: Scalars['Int']
    /** Increment Id of Sales Order */
    increment_id?: Maybe<Scalars['String']>
    /** Purchase Order Number of the Sales Order */
    po_number?: Maybe<Scalars['String']>
    /** An array of all items data of order */
    reorder_items?: Maybe<Array<Maybe<Items>>>
    /** ReOrder Status of Sales Order */
    reorder_status?: Maybe<Scalars['Boolean']>
    /** Shipping Address details */
    ship_to?: Maybe<Array<Maybe<Shipping>>>
    /** Status of the Sales Order */
    status?: Maybe<Scalars['String']>
}

export type CustomerSalesOrders = {
    __typename?: 'CustomerSalesOrders'
    /** Array of Orders */
    items?: Maybe<Array<Maybe<CustomerSalesOrder>>>
    /** Total Sales Orders unique ship to filter */
    ship_to_filter?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Total Sales Orders unique status filter */
    status_filter?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Total Sales Orders for the customer */
    total_count?: Maybe<Scalars['Int']>
}

/** Contains store credit information with balance and history */
export type CustomerStoreCredit = {
    __typename?: 'CustomerStoreCredit'
    /**
     * Customer Store credit balance history. If the history or store credit feature
     * is disabled, then a null value will be returned.
     */
    balance_history?: Maybe<CustomerStoreCreditHistory>
    /** Current balance on store credit */
    current_balance?: Maybe<Money>
    /** Indicates whether store credits are enabled. If the feature is disabled, then the balance will not be returned */
    enabled?: Maybe<Scalars['Boolean']>
}

/** Contains store credit information with balance and history */
export type CustomerStoreCreditBalance_HistoryArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** Lists changes to the amount of store credit available to the customer. */
export type CustomerStoreCreditHistory = {
    __typename?: 'CustomerStoreCreditHistory'
    /** An array containing information about changes to the store credit available to the customer. */
    items?: Maybe<Array<Maybe<CustomerStoreCreditHistoryItem>>>
    /** An object that includes the current_page page_info and page_size values specified in the query. */
    page_info?: Maybe<SearchResultPageInfo>
    /** The number of items returned. */
    total_count?: Maybe<Scalars['Int']>
}

/** Defines store credit history information */
export type CustomerStoreCreditHistoryItem = {
    __typename?: 'CustomerStoreCreditHistoryItem'
    /** Action that was made on the store credit */
    action?: Maybe<Scalars['String']>
    /** The store credit available to the customer as a result of this action.  */
    actual_balance?: Maybe<Money>
    /** The amount added to or subtracted from the store credit as a result of this action. */
    balance_change?: Maybe<Money>
    /** Date and time when the store credit change was made */
    date_time_changed?: Maybe<Scalars['String']>
}

export type CustomerToken = {
    __typename?: 'CustomerToken'
    /** The customer token */
    token?: Maybe<Scalars['String']>
}

export type CustomerUpdateInput = {
    /** The customer's date of birth */
    date_of_birth?: Maybe<Scalars['String']>
    /** Deprecated: Use `date_of_birth` instead */
    dob?: Maybe<Scalars['String']>
    /** The customer's first name */
    firstname?: Maybe<Scalars['String']>
    /** The customer's gender (Male - 1, Female - 2) */
    gender?: Maybe<Scalars['Int']>
    /** Indicates whether the customer is subscribed to the company's newsletter */
    is_subscribed?: Maybe<Scalars['Boolean']>
    /** The customer's family name */
    lastname?: Maybe<Scalars['String']>
    /** The customer's middle name */
    middlename?: Maybe<Scalars['String']>
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']>
    /** A value such as Sr., Jr., or III */
    suffix?: Maybe<Scalars['String']>
    /** The customer's Tax/VAT number (for corporate customers) */
    taxvat?: Maybe<Scalars['String']>
}

export type CustomGiftCardProductCartItemInput = {
    /** Custom GiftCard Amount. */
    custom_giftcard_amount?: Maybe<Scalars['Float']>
    data: CartItemInput
    /** GiftCard Amount. */
    giftcard_amount?: Maybe<Scalars['String']>
    /** GiftCard Message. */
    giftcard_message?: Maybe<Scalars['String']>
    /** GiftCard Sender Email. */
    giftcard_recipient_email?: Maybe<Scalars['String']>
    /** GiftCard Receipent Name. */
    giftcard_recipient_name?: Maybe<Scalars['String']>
    /** GiftCard Sender Email. */
    giftcard_sender_email?: Maybe<Scalars['String']>
    /** GiftCard Sender Name. */
    giftcard_sender_name?: Maybe<Scalars['String']>
}

/** CustomizableAreaOption contains information about a text area that is defined as part of a customizable option. */
export type CustomizableAreaOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableAreaOption'
    /** Option ID. */
    option_id?: Maybe<Scalars['Int']>
    /** The Stock Keeping Unit of the base product. */
    product_sku?: Maybe<Scalars['String']>
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']>
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
    /** An object that defines a text area. */
    value?: Maybe<CustomizableAreaValue>
}

/** CustomizableAreaValue defines the price and sku of a product whose page contains a customized text area. */
export type CustomizableAreaValue = {
    __typename?: 'CustomizableAreaValue'
    /** The maximum number of characters that can be entered for this customizable option. */
    max_characters?: Maybe<Scalars['Int']>
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']>
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
}

/**
 * CustomizableCheckbbixOption contains information about a set of checkbox values
 * that are defined as part of a customizable option.
 */
export type CustomizableCheckboxOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableCheckboxOption'
    /** Option ID. */
    option_id?: Maybe<Scalars['Int']>
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']>
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
    /** An array that defines a set of checkbox values. */
    value?: Maybe<Array<Maybe<CustomizableCheckboxValue>>>
}

/** CustomizableCheckboxValue defines the price and sku of a product whose page contains a customized set of checkbox values. */
export type CustomizableCheckboxValue = {
    __typename?: 'CustomizableCheckboxValue'
    /** The ID assigned to the value. */
    option_type_id?: Maybe<Scalars['Int']>
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']>
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']>
    /** The order in which the checkbox value is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
}

/** CustomizableDateOption contains information about a date picker that is defined as part of a customizable option. */
export type CustomizableDateOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableDateOption'
    /** Option ID. */
    option_id?: Maybe<Scalars['Int']>
    /** The Stock Keeping Unit of the base product. */
    product_sku?: Maybe<Scalars['String']>
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']>
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
    /** An object that defines a date field in a customizable option. */
    value?: Maybe<CustomizableDateValue>
}

/** CustomizableDateValue defines the price and sku of a product whose page contains a customized date picker. */
export type CustomizableDateValue = {
    __typename?: 'CustomizableDateValue'
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']>
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
}

/** CustomizableDropDownOption contains information about a drop down menu that is defined as part of a customizable option. */
export type CustomizableDropDownOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableDropDownOption'
    /** Option ID. */
    option_id?: Maybe<Scalars['Int']>
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']>
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
    /** An array that defines the set of options for a drop down menu. */
    value?: Maybe<Array<Maybe<CustomizableDropDownValue>>>
}

/** CustomizableDropDownValue defines the price and sku of a product whose page contains a customized drop down menu. */
export type CustomizableDropDownValue = {
    __typename?: 'CustomizableDropDownValue'
    /** The ID assigned to the value. */
    option_type_id?: Maybe<Scalars['Int']>
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']>
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']>
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
}

/** CustomizableFieldOption contains information about a text field that is defined as part of a customizable option. */
export type CustomizableFieldOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableFieldOption'
    /** Option ID. */
    option_id?: Maybe<Scalars['Int']>
    /** The Stock Keeping Unit of the base product. */
    product_sku?: Maybe<Scalars['String']>
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']>
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
    /** An object that defines a text field. */
    value?: Maybe<CustomizableFieldValue>
}

/** CustomizableFieldValue defines the price and sku of a product whose page contains a customized text field. */
export type CustomizableFieldValue = {
    __typename?: 'CustomizableFieldValue'
    /** The maximum number of characters that can be entered for this customizable option. */
    max_characters?: Maybe<Scalars['Int']>
    /** The price of the custom value. */
    price?: Maybe<Scalars['Float']>
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
}

/** CustomizableFileOption contains information about a file picker that is defined as part of a customizable option. */
export type CustomizableFileOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableFileOption'
    /** Option ID. */
    option_id?: Maybe<Scalars['Int']>
    /** The Stock Keeping Unit of the base product. */
    product_sku?: Maybe<Scalars['String']>
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']>
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
    /** An object that defines a file value. */
    value?: Maybe<CustomizableFileValue>
}

/** CustomizableFileValue defines the price and sku of a product whose page contains a customized file picker. */
export type CustomizableFileValue = {
    __typename?: 'CustomizableFileValue'
    /** The file extension to accept. */
    file_extension?: Maybe<Scalars['String']>
    /** The maximum width of an image. */
    image_size_x?: Maybe<Scalars['Int']>
    /** The maximum height of an image. */
    image_size_y?: Maybe<Scalars['Int']>
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']>
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
}

/** CustomizableMultipleOption contains information about a multiselect that is defined as part of a customizable option. */
export type CustomizableMultipleOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableMultipleOption'
    /** Option ID. */
    option_id?: Maybe<Scalars['Int']>
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']>
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
    /** An array that defines the set of options for a multiselect. */
    value?: Maybe<Array<Maybe<CustomizableMultipleValue>>>
}

/** CustomizableMultipleValue defines the price and sku of a product whose page contains a customized multiselect. */
export type CustomizableMultipleValue = {
    __typename?: 'CustomizableMultipleValue'
    /** The ID assigned to the value. */
    option_type_id?: Maybe<Scalars['Int']>
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']>
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']>
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
}

export type CustomizableOptionInput = {
    id: Scalars['Int']
    value_string: Scalars['String']
}

/**
 * The CustomizableOptionInterface contains basic information about a customizable
 * option. It can be implemented by several types of configurable options.
 */
export type CustomizableOptionInterface = {
    /** Option ID. */
    option_id?: Maybe<Scalars['Int']>
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']>
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
}

/** CustomizableProductInterface contains information about customizable product options. */
export type CustomizableProductInterface = {
    /** An array of options for a customizable product. */
    options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>
}

/** CustomizableRadioOption contains information about a set of radio buttons that are defined as part of a customizable option. */
export type CustomizableRadioOption = CustomizableOptionInterface & {
    __typename?: 'CustomizableRadioOption'
    /** Option ID. */
    option_id?: Maybe<Scalars['Int']>
    /** Indicates whether the option is required. */
    required?: Maybe<Scalars['Boolean']>
    /** The order in which the option is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
    /** An array that defines a set of radio buttons. */
    value?: Maybe<Array<Maybe<CustomizableRadioValue>>>
}

/** CustomizableRadioValue defines the price and sku of a product whose page contains a customized set of radio buttons. */
export type CustomizableRadioValue = {
    __typename?: 'CustomizableRadioValue'
    /** The ID assigned to the value. */
    option_type_id?: Maybe<Scalars['Int']>
    /** The price assigned to this option. */
    price?: Maybe<Scalars['Float']>
    /** FIXED, PERCENT, or DYNAMIC. */
    price_type?: Maybe<PriceTypeEnum>
    /** The Stock Keeping Unit for this option. */
    sku?: Maybe<Scalars['String']>
    /** The order in which the radio button is displayed. */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name for this option. */
    title?: Maybe<Scalars['String']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
}

/** Delete company user output data schema. */
export type DeleteCompanyUserOutput = {
    __typename?: 'DeleteCompanyUserOutput'
    /** Status of delete operation: true - success; false - fail. */
    status: Scalars['Boolean']
}

export type DeletePaymentTokenOutput = {
    __typename?: 'DeletePaymentTokenOutput'
    customerPaymentTokens?: Maybe<CustomerPaymentTokens>
    result: Scalars['Boolean']
}

/** Defines an individual discount. A discount can be applied to the cart as a whole or to an item. */
export type Discount = {
    __typename?: 'Discount'
    /** The amount of the discount */
    amount: Money
    /** A description of the discount */
    label: Scalars['String']
}

/** Social Sharing */
export type Dotdigital = {
    __typename?: 'Dotdigital'
    /** DotDigital footer newsletter configurations */
    footer_newsletter?: Maybe<Signup>
    /** Is DotDigital enabled */
    is_enabled?: Maybe<Scalars['Boolean']>
    /** DotDigital TrackingDetails */
    tracking?: Maybe<TrackingDetails>
}

export type DotDigitalAccountFormInput = {
    /** Additional Subscriptions */
    additional_subscriptions?: Maybe<Scalars['String']>
    /** Data Fields */
    data_fields?: Maybe<Scalars['String']>
    /** customer email */
    email: Scalars['String']
    /** Is Subscribed */
    is_subscribed: Scalars['Boolean']
    /** Preferences */
    preferences?: Maybe<Scalars['String']>
    /** Was Subscribed */
    was_subscribed?: Maybe<Scalars['Boolean']>
}

export type DotDigitalFormInput = {
    /** Address book id */
    addressbookid?: Maybe<Scalars['String']>
    /** checkboxes slected by customer */
    checkboxes_clicked?: Maybe<Scalars['String']>
    /** Consent Url */
    ci_consenturl?: Maybe<Scalars['String']>
    /** Is consent form enabled */
    ci_isconsentform?: Maybe<Scalars['Boolean']>
    /** Is Consent Checkbox */
    ci_userConsentCheckBox?: Maybe<Scalars['String']>
    /** Consent Text */
    ci_userConsentText?: Maybe<Scalars['String']>
    /** The customer's email */
    email: Scalars['String']
    /** Form action url to submit */
    form_action: Scalars['String']
    /** Form Id */
    formid: Scalars['String']
    /** Return Url */
    return_url?: Maybe<Scalars['String']>
    /** User Id */
    userid: Scalars['String']
}

export type DotDigitalFormSubmission = {
    __typename?: 'DotDigitalFormSubmission'
    /** Result of form submission */
    result?: Maybe<Scalars['String']>
}

/** Downloadable Cart Item */
export type DownloadableCartItem = CartItemInterface & {
    __typename?: 'DownloadableCartItem'
    customizable_options?: Maybe<Array<Maybe<SelectedCustomizableOption>>>
    id: Scalars['String']
    /** A resulting stock state for a configurable product, based both on parent and child stock. */
    item_stock_status: ProductStockStatus
    itemsku: Scalars['String']
    /** An array containing information about the links for the added to cart downloadable product */
    links?: Maybe<Array<Maybe<DownloadableProductLinks>>>
    /** A combined item-level message */
    message?: Maybe<Scalars['String']>
    prices?: Maybe<CartItemPrices>
    product: ProductInterface
    qty_validation_message: Scalars['String']
    quantity: Scalars['Float']
    /** DownloadableProductSamples defines characteristics of a downloadable product */
    samples?: Maybe<Array<Maybe<DownloadableProductSamples>>>
}

export type DownloadableCreditMemoItem = CreditMemoItemInterface & {
    __typename?: 'DownloadableCreditMemoItem'
    /** Contains information about the final discount amount for the base product, including discounts on options */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** A list of downloadable links that are refunded from the downloadable product */
    downloadable_links?: Maybe<Array<Maybe<DownloadableItemsLinks>>>
    /** The unique ID of the credit memo item, used for API purposes */
    id: Scalars['ID']
    /** The order item the credit memo is applied to */
    order_item?: Maybe<OrderItemInterface>
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price for the base product, including selected options */
    product_sale_price: Money
    /** SKU of the base product */
    product_sku: Scalars['String']
    /** The number of refunded items */
    quantity_refunded?: Maybe<Scalars['Float']>
}

export enum DownloadableFileTypeEnum {
    File = 'FILE',
    Url = 'URL'
}

export type DownloadableInvoiceItem = InvoiceItemInterface & {
    __typename?: 'DownloadableInvoiceItem'
    /** Contains information about the final discount amount for the base product, including discounts on options */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** A list of downloadable links that are invoiced from the downloadable product */
    downloadable_links?: Maybe<Array<Maybe<DownloadableItemsLinks>>>
    /** The unique ID of the invoice item */
    id: Scalars['ID']
    /** Contains details about an individual order item */
    order_item?: Maybe<OrderItemInterface>
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price for the base product including selected options */
    product_sale_price: Money
    /** The SKU of the base product */
    product_sku: Scalars['String']
    /** The number of invoiced items */
    quantity_invoiced?: Maybe<Scalars['Float']>
}

/** DownloadableProductLinks defines characteristics of a downloadable product */
export type DownloadableItemsLinks = {
    __typename?: 'DownloadableItemsLinks'
    /** A number indicating the sort order */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name of the link */
    title?: Maybe<Scalars['String']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
}

export type DownloadableOrderItem = OrderItemInterface & {
    __typename?: 'DownloadableOrderItem'
    /** The final discount information for the product */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** A list of downloadable links that are ordered from the downloadable product */
    downloadable_links?: Maybe<Array<Maybe<DownloadableItemsLinks>>>
    /** The entered option for the base product, such as a logo or image */
    entered_options?: Maybe<Array<Maybe<OrderItemOption>>>
    /** The selected gift wrapping for the order item */
    gift_wrapping?: Maybe<GiftWrapping>
    /** The unique identifier of the order item */
    id: Scalars['ID']
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price of the base product, including selected options */
    product_sale_price: Money
    /** The SKU of the base product */
    product_sku: Scalars['String']
    /** The type of product, such as simple, configurable, etc. */
    product_type?: Maybe<Scalars['String']>
    /** URL key of the base product */
    product_url_key?: Maybe<Scalars['String']>
    /** The number of canceled items */
    quantity_canceled?: Maybe<Scalars['Float']>
    /** The number of invoiced items */
    quantity_invoiced?: Maybe<Scalars['Float']>
    /** The number of units ordered for this item */
    quantity_ordered?: Maybe<Scalars['Float']>
    /** The number of refunded items */
    quantity_refunded?: Maybe<Scalars['Float']>
    /** The number of returned items */
    quantity_returned?: Maybe<Scalars['Float']>
    /** The number of shipped items */
    quantity_shipped?: Maybe<Scalars['Float']>
    /** The selected options for the base product, such as color or size */
    selected_options?: Maybe<Array<Maybe<OrderItemOption>>>
    /** The status of the order item */
    status?: Maybe<Scalars['String']>
}

/** DownloadableProduct defines a product that the customer downloads */
export type DownloadableProduct = ProductInterface &
    CustomizableProductInterface & {
        __typename?: 'DownloadableProduct'
        Product_sizechart?: Maybe<Scalars['Int']>
        Product_sizechart_text?: Maybe<Scalars['String']>
        activity?: Maybe<Scalars['String']>
        /** The attribute set assigned to the product. */
        attribute_set_id?: Maybe<Scalars['Int']>
        brand?: Maybe<Scalars['Int']>
        brand_text?: Maybe<Scalars['String']>
        /**
         * Relative canonical URL. This value is returned only if the system setting 'Use
         * Canonical Link Meta Tag For Products' is enabled
         */
        canonical_url?: Maybe<Scalars['String']>
        /** The categories assigned to a product. */
        categories?: Maybe<Array<Maybe<CategoryInterface>>>
        category_gear?: Maybe<Scalars['String']>
        climate?: Maybe<Scalars['String']>
        collar?: Maybe<Scalars['String']>
        color?: Maybe<Scalars['String']>
        color_family?: Maybe<Scalars['String']>
        color_text?: Maybe<Scalars['String']>
        /** The product's country of origin. */
        country_of_manufacture?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was created. */
        created_at?: Maybe<Scalars['String']>
        /** Crosssell Products */
        crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** Detailed information about the product. The value can include simple HTML tags. */
        description?: Maybe<ComplexTextValue>
        /** An array containing information about the links for this downloadable product */
        downloadable_product_links?: Maybe<
            Array<Maybe<DownloadableProductLinks>>
        >
        /** An array containing information about samples of this downloadable product. */
        downloadable_product_samples?: Maybe<
            Array<Maybe<DownloadableProductSamples>>
        >
        eco_collection?: Maybe<Scalars['Int']>
        eco_collection_text?: Maybe<Scalars['String']>
        eligible_for_pick_up?: Maybe<Scalars['Int']>
        eligible_for_pick_up_text?: Maybe<Scalars['String']>
        erin_recommends?: Maybe<Scalars['Int']>
        erin_recommends_text?: Maybe<Scalars['String']>
        features_bags?: Maybe<Scalars['String']>
        format?: Maybe<Scalars['Int']>
        format_text?: Maybe<Scalars['String']>
        gender?: Maybe<Scalars['String']>
        /** Indicates whether a gift message is available. */
        gift_message_available?: Maybe<Scalars['String']>
        /** The ID number assigned to the product. */
        id?: Maybe<Scalars['Int']>
        /** The relative path to the main image on the product page. */
        image?: Maybe<ProductImage>
        /** Indicates whether the product can be returned */
        is_returnable?: Maybe<Scalars['String']>
        /** A value of 1 indicates that each link in the array must be purchased separately */
        links_purchased_separately?: Maybe<Scalars['Int']>
        /** The heading above the list of downloadable products */
        links_title?: Maybe<Scalars['String']>
        /** A number representing the product's manufacturer. */
        manufacturer?: Maybe<Scalars['Int']>
        manufacturer_text?: Maybe<Scalars['String']>
        material?: Maybe<Scalars['String']>
        /** An array of Media Gallery objects. */
        media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>
        /**
         * An array of MediaGalleryEntry objects.
         * @deprecated Use product's `media_gallery` instead
         */
        media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>
        /** A brief overview of the product for search results listings, maximum 255 characters. */
        meta_description?: Maybe<Scalars['String']>
        /** A comma-separated list of keywords that are visible only to search engines. */
        meta_keyword?: Maybe<Scalars['String']>
        /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
        meta_title?: Maybe<Scalars['String']>
        /** The product name. Customers use this name to identify the product. */
        name?: Maybe<Scalars['String']>
        new?: Maybe<Scalars['Int']>
        /** The beginning date for new product listings, and determines if the product is featured as a new product. */
        new_from_date?: Maybe<Scalars['String']>
        new_text?: Maybe<Scalars['String']>
        /** The end date for new product listings. */
        new_to_date?: Maybe<Scalars['String']>
        /** Product stock only x left count */
        only_x_left_in_stock?: Maybe<Scalars['Float']>
        /** An array of options for a customizable product. */
        options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>
        /** If the product has multiple options, determines where they appear on the product page. */
        options_container?: Maybe<Scalars['String']>
        pattern?: Maybe<Scalars['String']>
        performance_fabric?: Maybe<Scalars['Int']>
        performance_fabric_text?: Maybe<Scalars['String']>
        /**
         * A ProductPrices object, indicating the price of an item.
         * @deprecated Use price_range for product price information.
         */
        price?: Maybe<ProductPrices>
        /** A PriceRange object, indicating the range of prices for the product */
        price_range: PriceRange
        /** An array of TierPrice objects. */
        price_tiers?: Maybe<Array<Maybe<TierPrice>>>
        product_label?: Maybe<Scalars['Int']>
        product_label_text?: Maybe<Scalars['String']>
        /** An array of ProductLinks objects. */
        product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>
        /** Product review summary and review count data */
        product_reviews?: Maybe<ProductReviews>
        purpose?: Maybe<Scalars['Int']>
        purpose_text?: Maybe<Scalars['String']>
        /** Review/Rating related configurations */
        rating_configurations?: Maybe<RatingConfigurationData>
        /** The average of all the ratings given to the product. */
        rating_summary: Scalars['Float']
        /** Related Products */
        related_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The total count of all the reviews given to the product. */
        review_count: Scalars['Int']
        /** Product review summary and review count data */
        review_details?: Maybe<ReviewParameters>
        /** The list of products reviews. */
        reviews: ProductReviews
        sale?: Maybe<Scalars['Int']>
        sale_text?: Maybe<Scalars['String']>
        /** A short description of the product. Its use depends on the theme. */
        short_description?: Maybe<ComplexTextValue>
        size?: Maybe<Scalars['String']>
        size_text?: Maybe<Scalars['String']>
        sizechart?: Maybe<Scalars['Int']>
        sizechart_text?: Maybe<Scalars['String']>
        /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
        sku?: Maybe<Scalars['String']>
        sleeve?: Maybe<Scalars['String']>
        /** The relative path to the small image, which is used on catalog pages. */
        small_image?: Maybe<ProductImage>
        /** The beginning date that a product has a special price. */
        special_from_date?: Maybe<Scalars['String']>
        /** The discounted price of the product. */
        special_price?: Maybe<Scalars['Float']>
        /** The end date that a product has a special price. */
        special_to_date?: Maybe<Scalars['String']>
        /** Stock status of the product */
        stock_status?: Maybe<ProductStockStatus>
        strap_bags?: Maybe<Scalars['String']>
        style_bags?: Maybe<Scalars['String']>
        style_bottom?: Maybe<Scalars['String']>
        style_general?: Maybe<Scalars['String']>
        /** The file name of a swatch image */
        swatch_image?: Maybe<Scalars['String']>
        /** The relative path to the product's thumbnail image. */
        thumbnail?: Maybe<ProductImage>
        /**
         * The price when tier pricing is in effect and the items purchased threshold has been reached.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_price?: Maybe<Scalars['Float']>
        /**
         * An array of ProductTierPrices objects.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>
        /**
         * One of simple, virtual, bundle, downloadable, grouped, or configurable.
         * @deprecated Use __typename instead.
         */
        type_id?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was updated. */
        updated_at?: Maybe<Scalars['String']>
        /** Upsell Products */
        upsell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The part of the URL that identifies the product */
        url_key?: Maybe<Scalars['String']>
        /** @deprecated Use product's `canonical_url` or url rewrites instead */
        url_path?: Maybe<Scalars['String']>
        /** URL rewrites list */
        url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>
        /** The part of the product URL that is appended after the url key */
        url_suffix?: Maybe<Scalars['String']>
        /**
         * An array of websites in which the product is available.
         * @deprecated The field should not be used on the storefront.
         */
        websites?: Maybe<Array<Maybe<Website>>>
    }

/** DownloadableProduct defines a product that the customer downloads */
export type DownloadableProductProduct_ReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** DownloadableProduct defines a product that the customer downloads */
export type DownloadableProductReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type DownloadableProductCartItemInput = {
    customizable_options?: Maybe<Array<Maybe<CustomizableOptionInput>>>
    data: CartItemInput
    downloadable_product_links?: Maybe<
        Array<Maybe<DownloadableProductLinksInput>>
    >
}

/** DownloadableProductLinks defines characteristics of a downloadable product */
export type DownloadableProductLinks = {
    __typename?: 'DownloadableProductLinks'
    /** @deprecated This information should not be exposed on frontend */
    id?: Maybe<Scalars['Int']>
    /** @deprecated This information should not be exposed on frontend */
    is_shareable?: Maybe<Scalars['Boolean']>
    /** @deprecated `sample_url` serves to get the downloadable sample */
    link_type?: Maybe<DownloadableFileTypeEnum>
    /** @deprecated This information should not be exposed on frontend */
    number_of_downloads?: Maybe<Scalars['Int']>
    /** The price of the downloadable product */
    price?: Maybe<Scalars['Float']>
    /** @deprecated `sample_url` serves to get the downloadable sample */
    sample_file?: Maybe<Scalars['String']>
    /** @deprecated `sample_url` serves to get the downloadable sample */
    sample_type?: Maybe<DownloadableFileTypeEnum>
    /** URL to the downloadable sample */
    sample_url?: Maybe<Scalars['String']>
    /** A number indicating the sort order */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name of the link */
    title?: Maybe<Scalars['String']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
}

export type DownloadableProductLinksInput = {
    link_id: Scalars['Int']
}

/** DownloadableProductSamples defines characteristics of a downloadable product */
export type DownloadableProductSamples = {
    __typename?: 'DownloadableProductSamples'
    /** @deprecated This information should not be exposed on frontend */
    id?: Maybe<Scalars['Int']>
    /** @deprecated `sample_url` serves to get the downloadable sample */
    sample_file?: Maybe<Scalars['String']>
    /** @deprecated `sample_url` serves to get the downloadable sample */
    sample_type?: Maybe<DownloadableFileTypeEnum>
    /** URL to the downloadable sample */
    sample_url?: Maybe<Scalars['String']>
    /** A number indicating the sort order */
    sort_order?: Maybe<Scalars['Int']>
    /** The display name of the sample */
    title?: Maybe<Scalars['String']>
}

/** Defines a customer-entered option */
export type EnteredOptionInput = {
    /** An encoded ID */
    uid: Scalars['ID']
    /** Text the customer entered */
    value: Scalars['String']
}

/** EntityUrl is an output object containing the `id`, `relative_url`, and `type` attributes */
export type EntityUrl = {
    __typename?: 'EntityUrl'
    /** @deprecated The canonical_url field is deprecated, use relative_url instead. */
    canonical_url?: Maybe<Scalars['String']>
    /** The ID assigned to the object associated with the specified url. This could be a product ID, category ID, or page ID. */
    id?: Maybe<Scalars['Int']>
    /** 301 or 302 HTTP code for url permanent or temporary redirect or 0 for the 200 no redirect */
    redirectCode?: Maybe<Scalars['Int']>
    /** The internal relative URL. If the specified  url is a redirect, the query returns the redirected URL, not the original. */
    relative_url?: Maybe<Scalars['String']>
    /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
    type?: Maybe<UrlRewriteEntityTypeEnum>
}

export type ExchangeRate = {
    __typename?: 'ExchangeRate'
    currency_to?: Maybe<Scalars['String']>
    rate?: Maybe<Scalars['Float']>
}

/** Facebook social sharing attribute values */
export type Facebook = {
    __typename?: 'Facebook'
    /** Facebook additional attributes */
    additional_attributes?: Maybe<Scalars['String']>
    /** Is Facebook sharing enabled */
    is_enabled?: Maybe<Scalars['Boolean']>
    /** Facebook sharing url */
    sharing_url?: Maybe<Scalars['String']>
    /** Facebook Title */
    title?: Maybe<Scalars['String']>
}

/** Defines a filter that matches the input exactly. */
export type FilterEqualTypeInput = {
    /** A string to filter on */
    eq?: Maybe<Scalars['String']>
    /** An array of values to filter on */
    in?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Defines a filter that performs a fuzzy search. */
export type FilterMatchTypeInput = {
    /** One or more words to filter on */
    match?: Maybe<Scalars['String']>
}

/** Defines a filter that matches a range of values, such as prices or dates. */
export type FilterRangeTypeInput = {
    /** The beginning of the range */
    from?: Maybe<Scalars['String']>
    /** The end of the range */
    to?: Maybe<Scalars['String']>
}

/** Defines a filter for an input string. */
export type FilterStringTypeInput = {
    /** Filters items that are exactly the same as the specified string. */
    eq?: Maybe<Scalars['String']>
    /** Filters items that are exactly the same as entries specified in an array of strings. */
    in?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Defines a filter that performs a fuzzy search using the specified string. */
    match?: Maybe<Scalars['String']>
}

/** FilterTypeInput specifies which action will be performed in a query  */
export type FilterTypeInput = {
    /** Equals */
    eq?: Maybe<Scalars['String']>
    finset?: Maybe<Array<Maybe<Scalars['String']>>>
    /** From. Must be used with 'to' */
    from?: Maybe<Scalars['String']>
    /** Greater than */
    gt?: Maybe<Scalars['String']>
    /** Greater than or equal to */
    gteq?: Maybe<Scalars['String']>
    /** In. The value can contain a set of comma-separated values */
    in?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Like. The specified value can contain % (percent signs) to allow matching of 0 or more characters */
    like?: Maybe<Scalars['String']>
    /** Less than */
    lt?: Maybe<Scalars['String']>
    /** Less than or equal to */
    lteq?: Maybe<Scalars['String']>
    /** More than or equal to */
    moreq?: Maybe<Scalars['String']>
    /** Not equal to */
    neq?: Maybe<Scalars['String']>
    /** Not in. The value can contain a set of comma-separated values */
    nin?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Not null */
    notnull?: Maybe<Scalars['String']>
    /** Is null */
    null?: Maybe<Scalars['String']>
    /** To. Must be used with 'from' */
    to?: Maybe<Scalars['String']>
}

/** A single FPT that can be applied to a product price. */
export type FixedProductTax = {
    __typename?: 'FixedProductTax'
    /** Amount of the FPT as a money object. */
    amount?: Maybe<Money>
    /** The label assigned to the FPT to be displayed on the frontend. */
    label?: Maybe<Scalars['String']>
}

/** This enumeration display settings for the fixed product tax */
export enum FixedProductTaxDisplaySettings {
    /**
     * The displayed price includes the FPT amount without displaying the
     * ProductPrice.fixed_product_taxes values. This value corresponds to 'Including FPT only'
     */
    IncludeFptWithoutDetails = 'INCLUDE_FPT_WITHOUT_DETAILS',
    /**
     * The displayed price includes the FPT amount while displaying the values of
     * ProductPrice.fixed_product_taxes separately. This value corresponds to
     * 'Including FPT and FPT description'
     */
    IncludeFptWithDetails = 'INCLUDE_FPT_WITH_DETAILS',
    /**
     * The displayed price does not include the FPT amount. The values of
     * ProductPrice.fixed_product_taxes and the price including the FPT are displayed
     * separately. This value corresponds to 'Excluding FPT, Including FPT
     * description and final price'
     */
    ExcludeFptAndIncludeWithDetails = 'EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS',
    /**
     * The displayed price does not include the FPT amount. The values from
     * ProductPrice.fixed_product_taxes are not displayed. This value corresponds to
     * 'Excluding FPT'
     */
    ExcludeFptWithoutDetails = 'EXCLUDE_FPT_WITHOUT_DETAILS',
    /** The FPT feature is not enabled. You can omit  ProductPrice.fixed_product_taxes from your query */
    FptDisabled = 'FPT_DISABLED'
}

/** DotDigital newsletter configurations */
export type GetSubscriptionData = {
    __typename?: 'GetSubscriptionData'
    /** Sub Title */
    additional_books?: Maybe<Scalars['String']>
    /** Sub Title */
    can_show_anything?: Maybe<Scalars['Boolean']>
    /** Sub Title */
    customer_consent_text?: Maybe<Scalars['String']>
    /** Sub Title */
    data_fields?: Maybe<Scalars['String']>
    /** Is newsletter enabled */
    is_subscribed?: Maybe<Scalars['Boolean']>
    /** Sub Title */
    preferences?: Maybe<Scalars['String']>
}

/** Contains details about the gift card account */
export type GiftCardAccount = {
    __typename?: 'GiftCardAccount'
    /** Balance remaining on gift card */
    balance?: Maybe<Money>
    /** Gift card account code */
    code?: Maybe<Scalars['String']>
    /** Gift card expiration date */
    expiration_date?: Maybe<Scalars['String']>
}

export type GiftCardAccountInput = {
    /** Defines the input required to identify the gift card account */
    gift_card_code: Scalars['String']
}

/** GiftCardAmounts contains the value of a gift card, the website that generated the card, and related information */
export type GiftCardAmounts = {
    __typename?: 'GiftCardAmounts'
    /** An internal attribute ID. */
    attribute_id?: Maybe<Scalars['Int']>
    /** A string that encodes option details. */
    uid: Scalars['ID']
    /** The value of the gift card */
    value?: Maybe<Scalars['Float']>
    /** An ID that is assigned to each unique gift card amount. */
    value_id?: Maybe<Scalars['Int']>
    /** ID of the website that generated the gift card */
    website_id?: Maybe<Scalars['Int']>
    /** The value of the gift card */
    website_value?: Maybe<Scalars['Float']>
}

/** GiftCard Cart Item */
export type GiftCardCartItem = CartItemInterface & {
    __typename?: 'GiftCardCartItem'
    /** The amount and currency of the gift card */
    amount: Money
    /** An array of customizations made to the gift card */
    customizable_options?: Maybe<Array<Maybe<SelectedCustomizableOption>>>
    giftcard_options: Array<Maybe<SelectGiftCardOptions>>
    id: Scalars['String']
    /** A resulting stock state for a configurable product, based both on parent and child stock. */
    item_stock_status: ProductStockStatus
    itemsku: Scalars['String']
    /** A message to the recipient */
    message?: Maybe<Scalars['String']>
    prices?: Maybe<CartItemPrices>
    product: ProductInterface
    qty_validation_message: Scalars['String']
    quantity: Scalars['Float']
    /** The email of the person receiving the gift card */
    recipient_email?: Maybe<Scalars['String']>
    /** The name of the person receiving the gift card */
    recipient_name: Scalars['String']
    /** The email of the sender */
    sender_email?: Maybe<Scalars['String']>
    /** The name of the sender */
    sender_name: Scalars['String']
}

export type GiftCardCreditMemoItem = CreditMemoItemInterface & {
    __typename?: 'GiftCardCreditMemoItem'
    /** Contains information about the final discount amount for the base product, including discounts on options */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** Selected gift card properties for an credit memo item */
    gift_card?: Maybe<GiftCardItem>
    /** The unique ID of the credit memo item, used for API purposes */
    id: Scalars['ID']
    /** The order item the credit memo is applied to */
    order_item?: Maybe<OrderItemInterface>
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price for the base product, including selected options */
    product_sale_price: Money
    /** SKU of the base product */
    product_sku: Scalars['String']
    /** The number of refunded items */
    quantity_refunded?: Maybe<Scalars['Float']>
}

export type GiftCardDetails = {
    __typename?: 'GiftCardDetails'
    /** GiftCard Message */
    giftcard_message?: Maybe<Scalars['String']>
    /** GiftCard Recipient Email Address */
    giftcard_recipient_email?: Maybe<Scalars['String']>
    /** GiftCard Recipient Name */
    giftcard_recipient_name?: Maybe<Scalars['String']>
    /** GiftCard Sender Email Address */
    giftcard_sender_email?: Maybe<Scalars['String']>
    /** GiftCard Sender Name */
    giftcard_sender_name?: Maybe<Scalars['String']>
}

export type GiftCardInvoiceItem = InvoiceItemInterface & {
    __typename?: 'GiftCardInvoiceItem'
    /** Contains information about the final discount amount for the base product, including discounts on options */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** Selected gift card properties for an invoice item */
    gift_card?: Maybe<GiftCardItem>
    /** The unique ID of the invoice item */
    id: Scalars['ID']
    /** Contains details about an individual order item */
    order_item?: Maybe<OrderItemInterface>
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price for the base product including selected options */
    product_sale_price: Money
    /** The SKU of the base product */
    product_sku: Scalars['String']
    /** The number of invoiced items */
    quantity_invoiced?: Maybe<Scalars['Float']>
}

export type GiftCardItem = {
    __typename?: 'GiftCardItem'
    /** Entered gift card message intended for the recipient */
    message?: Maybe<Scalars['String']>
    /** Entered gift card recipient email for virtual cards */
    recipient_email?: Maybe<Scalars['String']>
    /** Entered gift card sender namefor physical and virtual cards */
    recipient_name?: Maybe<Scalars['String']>
    /** Entered gift card sender email for virtual cards */
    sender_email?: Maybe<Scalars['String']>
    /** Entered gift card sender name for physical and virtual cards */
    sender_name?: Maybe<Scalars['String']>
}

export type GiftCardOrderItem = OrderItemInterface & {
    __typename?: 'GiftCardOrderItem'
    /** The final discount information for the product */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The entered option for the base product, such as a logo or image */
    entered_options?: Maybe<Array<Maybe<OrderItemOption>>>
    /** Selected gift card properties for an order item */
    gift_card?: Maybe<GiftCardItem>
    /** The selected gift wrapping for the order item */
    gift_wrapping?: Maybe<GiftWrapping>
    /** The unique identifier of the order item */
    id: Scalars['ID']
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price of the base product, including selected options */
    product_sale_price: Money
    /** The SKU of the base product */
    product_sku: Scalars['String']
    /** The type of product, such as simple, configurable, etc. */
    product_type?: Maybe<Scalars['String']>
    /** URL key of the base product */
    product_url_key?: Maybe<Scalars['String']>
    /** The number of canceled items */
    quantity_canceled?: Maybe<Scalars['Float']>
    /** The number of invoiced items */
    quantity_invoiced?: Maybe<Scalars['Float']>
    /** The number of units ordered for this item */
    quantity_ordered?: Maybe<Scalars['Float']>
    /** The number of refunded items */
    quantity_refunded?: Maybe<Scalars['Float']>
    /** The number of returned items */
    quantity_returned?: Maybe<Scalars['Float']>
    /** The number of shipped items */
    quantity_shipped?: Maybe<Scalars['Float']>
    /** The selected options for the base product, such as color or size */
    selected_options?: Maybe<Array<Maybe<OrderItemOption>>>
    /** The status of the order item */
    status?: Maybe<Scalars['String']>
}

/**
 * GiftCardProduct defines properties of a gift card, including the minimum and
 * maximum values and an array that contains the current and past values on the
 * specific gift card
 */
export type GiftCardProduct = ProductInterface &
    PhysicalProductInterface &
    CustomizableProductInterface & {
        __typename?: 'GiftCardProduct'
        Product_sizechart?: Maybe<Scalars['Int']>
        Product_sizechart_text?: Maybe<Scalars['String']>
        activity?: Maybe<Scalars['String']>
        /** Indicates whether the customer can provide a message to accompany the gift card. */
        allow_message?: Maybe<Scalars['Boolean']>
        /** Indicates whether customers have the ability to set the value of the gift card. */
        allow_open_amount?: Maybe<Scalars['Boolean']>
        /** The attribute set assigned to the product. */
        attribute_set_id?: Maybe<Scalars['Int']>
        brand?: Maybe<Scalars['Int']>
        brand_text?: Maybe<Scalars['String']>
        /**
         * Relative canonical URL. This value is returned only if the system setting 'Use
         * Canonical Link Meta Tag For Products' is enabled
         */
        canonical_url?: Maybe<Scalars['String']>
        /** The categories assigned to a product. */
        categories?: Maybe<Array<Maybe<CategoryInterface>>>
        category_gear?: Maybe<Scalars['String']>
        climate?: Maybe<Scalars['String']>
        collar?: Maybe<Scalars['String']>
        color?: Maybe<Scalars['String']>
        color_family?: Maybe<Scalars['String']>
        color_text?: Maybe<Scalars['String']>
        /** The product's country of origin. */
        country_of_manufacture?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was created. */
        created_at?: Maybe<Scalars['String']>
        /** Crosssell Products */
        crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** Detailed information about the product. The value can include simple HTML tags. */
        description?: Maybe<ComplexTextValue>
        eco_collection?: Maybe<Scalars['Int']>
        eco_collection_text?: Maybe<Scalars['String']>
        eligible_for_pick_up?: Maybe<Scalars['Int']>
        eligible_for_pick_up_text?: Maybe<Scalars['String']>
        erin_recommends?: Maybe<Scalars['Int']>
        erin_recommends_text?: Maybe<Scalars['String']>
        features_bags?: Maybe<Scalars['String']>
        format?: Maybe<Scalars['Int']>
        format_text?: Maybe<Scalars['String']>
        gender?: Maybe<Scalars['String']>
        /** An array of giftcard options. */
        gift_card_options: Array<Maybe<CustomizableOptionInterface>>
        /** Indicates whether a gift message is available. */
        gift_message_available?: Maybe<Scalars['String']>
        /** An array that contains information about the values and ID of a gift card. */
        giftcard_amounts?: Maybe<Array<Maybe<GiftCardAmounts>>>
        /** Either VIRTUAL, PHYSICAL, or COMBINED. */
        giftcard_type?: Maybe<GiftCardTypeEnum>
        /** The ID number assigned to the product. */
        id?: Maybe<Scalars['Int']>
        /** The relative path to the main image on the product page. */
        image?: Maybe<ProductImage>
        /** Indicates whether the customer can redeem the value on the card for cash. */
        is_redeemable?: Maybe<Scalars['Boolean']>
        /** Indicates whether the product can be returned */
        is_returnable?: Maybe<Scalars['String']>
        /** The number of days after purchase until the gift card expires. A null value means there is no limit. */
        lifetime?: Maybe<Scalars['Int']>
        /** A number representing the product's manufacturer. */
        manufacturer?: Maybe<Scalars['Int']>
        manufacturer_text?: Maybe<Scalars['String']>
        material?: Maybe<Scalars['String']>
        /** An array of Media Gallery objects. */
        media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>
        /**
         * An array of MediaGalleryEntry objects.
         * @deprecated Use product's `media_gallery` instead
         */
        media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>
        /** Indicates whether the customer can provide a message to accompany the gift card. */
        message_max_length?: Maybe<Scalars['Int']>
        /** A brief overview of the product for search results listings, maximum 255 characters. */
        meta_description?: Maybe<Scalars['String']>
        /** A comma-separated list of keywords that are visible only to search engines. */
        meta_keyword?: Maybe<Scalars['String']>
        /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
        meta_title?: Maybe<Scalars['String']>
        /** The product name. Customers use this name to identify the product. */
        name?: Maybe<Scalars['String']>
        new?: Maybe<Scalars['Int']>
        /** The beginning date for new product listings, and determines if the product is featured as a new product. */
        new_from_date?: Maybe<Scalars['String']>
        new_text?: Maybe<Scalars['String']>
        /** The end date for new product listings. */
        new_to_date?: Maybe<Scalars['String']>
        /** Product stock only x left count */
        only_x_left_in_stock?: Maybe<Scalars['Float']>
        /** The minimum acceptable value of an open amount gift card. */
        open_amount_max?: Maybe<Scalars['Float']>
        /** The minimum acceptable value of an open amount gift card. */
        open_amount_min?: Maybe<Scalars['Float']>
        /** An array of options for a customizable product. */
        options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>
        /** If the product has multiple options, determines where they appear on the product page. */
        options_container?: Maybe<Scalars['String']>
        pattern?: Maybe<Scalars['String']>
        performance_fabric?: Maybe<Scalars['Int']>
        performance_fabric_text?: Maybe<Scalars['String']>
        /**
         * A ProductPrices object, indicating the price of an item.
         * @deprecated Use price_range for product price information.
         */
        price?: Maybe<ProductPrices>
        /** A PriceRange object, indicating the range of prices for the product */
        price_range: PriceRange
        /** An array of TierPrice objects. */
        price_tiers?: Maybe<Array<Maybe<TierPrice>>>
        product_label?: Maybe<Scalars['Int']>
        product_label_text?: Maybe<Scalars['String']>
        /** An array of ProductLinks objects. */
        product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>
        /** Product review summary and review count data */
        product_reviews?: Maybe<ProductReviews>
        purpose?: Maybe<Scalars['Int']>
        purpose_text?: Maybe<Scalars['String']>
        /** Review/Rating related configurations */
        rating_configurations?: Maybe<RatingConfigurationData>
        /** The average of all the ratings given to the product. */
        rating_summary: Scalars['Float']
        /** Related Products */
        related_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The total count of all the reviews given to the product. */
        review_count: Scalars['Int']
        /** Product review summary and review count data */
        review_details?: Maybe<ReviewParameters>
        /** The list of products reviews. */
        reviews: ProductReviews
        sale?: Maybe<Scalars['Int']>
        sale_text?: Maybe<Scalars['String']>
        /** A short description of the product. Its use depends on the theme. */
        short_description?: Maybe<ComplexTextValue>
        size?: Maybe<Scalars['String']>
        size_text?: Maybe<Scalars['String']>
        sizechart?: Maybe<Scalars['Int']>
        sizechart_text?: Maybe<Scalars['String']>
        /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
        sku?: Maybe<Scalars['String']>
        sleeve?: Maybe<Scalars['String']>
        /** The relative path to the small image, which is used on catalog pages. */
        small_image?: Maybe<ProductImage>
        /** The beginning date that a product has a special price. */
        special_from_date?: Maybe<Scalars['String']>
        /** The discounted price of the product. */
        special_price?: Maybe<Scalars['Float']>
        /** The end date that a product has a special price. */
        special_to_date?: Maybe<Scalars['String']>
        /** Stock status of the product */
        stock_status?: Maybe<ProductStockStatus>
        strap_bags?: Maybe<Scalars['String']>
        style_bags?: Maybe<Scalars['String']>
        style_bottom?: Maybe<Scalars['String']>
        style_general?: Maybe<Scalars['String']>
        /** The file name of a swatch image */
        swatch_image?: Maybe<Scalars['String']>
        /** The relative path to the product's thumbnail image. */
        thumbnail?: Maybe<ProductImage>
        /**
         * The price when tier pricing is in effect and the items purchased threshold has been reached.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_price?: Maybe<Scalars['Float']>
        /**
         * An array of ProductTierPrices objects.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>
        /**
         * One of simple, virtual, bundle, downloadable, grouped, or configurable.
         * @deprecated Use __typename instead.
         */
        type_id?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was updated. */
        updated_at?: Maybe<Scalars['String']>
        /** Upsell Products */
        upsell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The part of the URL that identifies the product */
        url_key?: Maybe<Scalars['String']>
        /** @deprecated Use product's `canonical_url` or url rewrites instead */
        url_path?: Maybe<Scalars['String']>
        /** URL rewrites list */
        url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>
        /** The part of the product URL that is appended after the url key */
        url_suffix?: Maybe<Scalars['String']>
        /**
         * An array of websites in which the product is available.
         * @deprecated The field should not be used on the storefront.
         */
        websites?: Maybe<Array<Maybe<Website>>>
        /** The weight of the item, in units defined by the store. */
        weight?: Maybe<Scalars['Float']>
    }

/**
 * GiftCardProduct defines properties of a gift card, including the minimum and
 * maximum values and an array that contains the current and past values on the
 * specific gift card
 */
export type GiftCardProductProduct_ReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/**
 * GiftCardProduct defines properties of a gift card, including the minimum and
 * maximum values and an array that contains the current and past values on the
 * specific gift card
 */
export type GiftCardProductReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type GiftCardProductCartItemInput = {
    data: CartItemInput
    /** GiftCard Amount. */
    giftcard_amount?: Maybe<Scalars['Float']>
    /** GiftCard Message. */
    giftcard_message?: Maybe<Scalars['String']>
    /** GiftCard Sender Email. */
    giftcard_recipient_email?: Maybe<Scalars['String']>
    /** GiftCard Receipent Name. */
    giftcard_recipient_name?: Maybe<Scalars['String']>
    /** GiftCard Sender Email. */
    giftcard_sender_email?: Maybe<Scalars['String']>
    /** GiftCard Sender Name. */
    giftcard_sender_name?: Maybe<Scalars['String']>
}

export type GiftCards = {
    __typename?: 'GiftCards'
    /** Amount of Gift Card */
    amount?: Maybe<Money>
    /** Base Amount of Gift Card */
    base_amount?: Maybe<Money>
    /** Gift Card Code */
    code?: Maybe<Scalars['String']>
}

export type GiftCardShipmentItem = ShipmentItemInterface & {
    __typename?: 'GiftCardShipmentItem'
    /** Selected gift card properties for an shipment item */
    gift_card?: Maybe<GiftCardItem>
    /** Shipment item unique identifier */
    id: Scalars['ID']
    /** Associated order item */
    order_item?: Maybe<OrderItemInterface>
    /** Name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** Sale price for the base product */
    product_sale_price: Money
    /** SKU of the base product */
    product_sku: Scalars['String']
    /** Number of shipped items */
    quantity_shipped: Scalars['Float']
}

/** Contains the text of a gift message, its sender, and recipient */
export type GiftMessage = {
    __typename?: 'GiftMessage'
    /** Sender name */
    from: Scalars['String']
    /** Gift message text */
    message: Scalars['String']
    /** Recipient name */
    to: Scalars['String']
}

/** Contains the text of a gift message, its sender, and recipient */
export type GiftMessageInput = {
    /** Sender name */
    from: Scalars['String']
    /** Gift message text */
    message: Scalars['String']
    /** Recepient name */
    to: Scalars['String']
}

export type GiftOptionsPrices = {
    __typename?: 'GiftOptionsPrices'
    /** Price of the gift wrapping for all individual order items */
    gift_wrapping_for_items?: Maybe<Money>
    /** Price of the gift wrapping for the whole order */
    gift_wrapping_for_order?: Maybe<Money>
    /** Price for the printed card */
    printed_card?: Maybe<Money>
}

export type GiftWrapping = {
    __typename?: 'GiftWrapping'
    /** Gift wrapping design name */
    design: Scalars['String']
    /** Gift wrapping unique identifier */
    id: Scalars['ID']
    uid: Scalars['ID']
    /** Gift wrapping preview image */
    image?: Maybe<GiftWrappingImage>
    /** Gift wrapping price */
    price: Money
}

export type GiftWrappingImage = {
    __typename?: 'GiftWrappingImage'
    /** Gift wrapping preview image label */
    label: Scalars['String']
    /** Gift wrapping preview image URL */
    url: Scalars['String']
}

/** GroupedProduct defines a grouped product */
export type GroupedProduct = ProductInterface &
    PhysicalProductInterface & {
        __typename?: 'GroupedProduct'
        Product_sizechart?: Maybe<Scalars['Int']>
        Product_sizechart_text?: Maybe<Scalars['String']>
        activity?: Maybe<Scalars['String']>
        /** The attribute set assigned to the product. */
        attribute_set_id?: Maybe<Scalars['Int']>
        brand?: Maybe<Scalars['Int']>
        brand_text?: Maybe<Scalars['String']>
        /**
         * Relative canonical URL. This value is returned only if the system setting 'Use
         * Canonical Link Meta Tag For Products' is enabled
         */
        canonical_url?: Maybe<Scalars['String']>
        /** The categories assigned to a product. */
        categories?: Maybe<Array<Maybe<CategoryInterface>>>
        category_gear?: Maybe<Scalars['String']>
        climate?: Maybe<Scalars['String']>
        collar?: Maybe<Scalars['String']>
        color?: Maybe<Scalars['String']>
        color_family?: Maybe<Scalars['String']>
        color_text?: Maybe<Scalars['String']>
        /** The product's country of origin. */
        country_of_manufacture?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was created. */
        created_at?: Maybe<Scalars['String']>
        /** Crosssell Products */
        crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** Detailed information about the product. The value can include simple HTML tags. */
        description?: Maybe<ComplexTextValue>
        eco_collection?: Maybe<Scalars['Int']>
        eco_collection_text?: Maybe<Scalars['String']>
        eligible_for_pick_up?: Maybe<Scalars['Int']>
        eligible_for_pick_up_text?: Maybe<Scalars['String']>
        erin_recommends?: Maybe<Scalars['Int']>
        erin_recommends_text?: Maybe<Scalars['String']>
        features_bags?: Maybe<Scalars['String']>
        format?: Maybe<Scalars['Int']>
        format_text?: Maybe<Scalars['String']>
        gender?: Maybe<Scalars['String']>
        /** Indicates whether a gift message is available. */
        gift_message_available?: Maybe<Scalars['String']>
        /** The ID number assigned to the product. */
        id?: Maybe<Scalars['Int']>
        /** The relative path to the main image on the product page. */
        image?: Maybe<ProductImage>
        /** Indicates whether the product can be returned */
        is_returnable?: Maybe<Scalars['String']>
        /** An array containing grouped product items */
        items?: Maybe<Array<Maybe<GroupedProductItem>>>
        /** A number representing the product's manufacturer. */
        manufacturer?: Maybe<Scalars['Int']>
        manufacturer_text?: Maybe<Scalars['String']>
        material?: Maybe<Scalars['String']>
        /** An array of Media Gallery objects. */
        media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>
        /**
         * An array of MediaGalleryEntry objects.
         * @deprecated Use product's `media_gallery` instead
         */
        media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>
        /** A brief overview of the product for search results listings, maximum 255 characters. */
        meta_description?: Maybe<Scalars['String']>
        /** A comma-separated list of keywords that are visible only to search engines. */
        meta_keyword?: Maybe<Scalars['String']>
        /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
        meta_title?: Maybe<Scalars['String']>
        /** The product name. Customers use this name to identify the product. */
        name?: Maybe<Scalars['String']>
        new?: Maybe<Scalars['Int']>
        /** The beginning date for new product listings, and determines if the product is featured as a new product. */
        new_from_date?: Maybe<Scalars['String']>
        new_text?: Maybe<Scalars['String']>
        /** The end date for new product listings. */
        new_to_date?: Maybe<Scalars['String']>
        /** Product stock only x left count */
        only_x_left_in_stock?: Maybe<Scalars['Float']>
        /** If the product has multiple options, determines where they appear on the product page. */
        options_container?: Maybe<Scalars['String']>
        pattern?: Maybe<Scalars['String']>
        performance_fabric?: Maybe<Scalars['Int']>
        performance_fabric_text?: Maybe<Scalars['String']>
        /**
         * A ProductPrices object, indicating the price of an item.
         * @deprecated Use price_range for product price information.
         */
        price?: Maybe<ProductPrices>
        /** A PriceRange object, indicating the range of prices for the product */
        price_range: PriceRange
        /** An array of TierPrice objects. */
        price_tiers?: Maybe<Array<Maybe<TierPrice>>>
        product_label?: Maybe<Scalars['Int']>
        product_label_text?: Maybe<Scalars['String']>
        /** An array of ProductLinks objects. */
        product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>
        /** Product review summary and review count data */
        product_reviews?: Maybe<ProductReviews>
        purpose?: Maybe<Scalars['Int']>
        purpose_text?: Maybe<Scalars['String']>
        /** Review/Rating related configurations */
        rating_configurations?: Maybe<RatingConfigurationData>
        /** The average of all the ratings given to the product. */
        rating_summary: Scalars['Float']
        /** Related Products */
        related_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The total count of all the reviews given to the product. */
        review_count: Scalars['Int']
        /** Product review summary and review count data */
        review_details?: Maybe<ReviewParameters>
        /** The list of products reviews. */
        reviews: ProductReviews
        sale?: Maybe<Scalars['Int']>
        sale_text?: Maybe<Scalars['String']>
        /** A short description of the product. Its use depends on the theme. */
        short_description?: Maybe<ComplexTextValue>
        size?: Maybe<Scalars['String']>
        size_text?: Maybe<Scalars['String']>
        sizechart?: Maybe<Scalars['Int']>
        sizechart_text?: Maybe<Scalars['String']>
        /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
        sku?: Maybe<Scalars['String']>
        sleeve?: Maybe<Scalars['String']>
        /** The relative path to the small image, which is used on catalog pages. */
        small_image?: Maybe<ProductImage>
        /** The beginning date that a product has a special price. */
        special_from_date?: Maybe<Scalars['String']>
        /** The discounted price of the product. */
        special_price?: Maybe<Scalars['Float']>
        /** The end date that a product has a special price. */
        special_to_date?: Maybe<Scalars['String']>
        /** Stock status of the product */
        stock_status?: Maybe<ProductStockStatus>
        strap_bags?: Maybe<Scalars['String']>
        style_bags?: Maybe<Scalars['String']>
        style_bottom?: Maybe<Scalars['String']>
        style_general?: Maybe<Scalars['String']>
        /** The file name of a swatch image */
        swatch_image?: Maybe<Scalars['String']>
        /** The relative path to the product's thumbnail image. */
        thumbnail?: Maybe<ProductImage>
        /**
         * The price when tier pricing is in effect and the items purchased threshold has been reached.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_price?: Maybe<Scalars['Float']>
        /**
         * An array of ProductTierPrices objects.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>
        /**
         * One of simple, virtual, bundle, downloadable, grouped, or configurable.
         * @deprecated Use __typename instead.
         */
        type_id?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was updated. */
        updated_at?: Maybe<Scalars['String']>
        /** Upsell Products */
        upsell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The part of the URL that identifies the product */
        url_key?: Maybe<Scalars['String']>
        /** @deprecated Use product's `canonical_url` or url rewrites instead */
        url_path?: Maybe<Scalars['String']>
        /** URL rewrites list */
        url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>
        /** The part of the product URL that is appended after the url key */
        url_suffix?: Maybe<Scalars['String']>
        /**
         * An array of websites in which the product is available.
         * @deprecated The field should not be used on the storefront.
         */
        websites?: Maybe<Array<Maybe<Website>>>
        /** The weight of the item, in units defined by the store. */
        weight?: Maybe<Scalars['Float']>
    }

/** GroupedProduct defines a grouped product */
export type GroupedProductProduct_ReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** GroupedProduct defines a grouped product */
export type GroupedProductReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** GroupedProductItem contains information about an individual grouped product item */
export type GroupedProductItem = {
    __typename?: 'GroupedProductItem'
    /** The relative position of this item compared to the other group items */
    position?: Maybe<Scalars['Int']>
    /** The ProductInterface object, which contains details about this product option */
    product?: Maybe<ProductInterface>
    /** The quantity of this grouped product item */
    qty?: Maybe<Scalars['Float']>
}

/** Guest user data. */
export type GuestInput = {
    /** User email */
    email: Scalars['String']
    /** User lastname */
    lastname: Scalars['String']
    /** Order id */
    order_id: Scalars['String']
}

/**
 * A set of relative URLs that PayPal will use in response to various actions
 * during the authorization process. Magento prepends the base URL to this value to
 * create a full URL. For example, if the full URL is
 * https://www.example.com/path/to/page.html, the relative URL is
 * path/to/page.html. Use this input for Payments Pro Hosted Solution payment method.
 */
export type HostedProInput = {
    /**
     * The relative URL of the page that PayPal will redirect to when the buyer
     * cancels the transaction in order to choose a different payment method. If the
     * full URL to this page is https://www.example.com/paypal/action/cancel.html,
     * the relative URL is paypal/action/cancel.html.
     */
    cancel_url: Scalars['String']
    /**
     * The relative URL of the final confirmation page that PayPal will redirect to
     * upon payment success. If the full URL to this page is
     * https://www.example.com/paypal/action/return.html, the relative URL is
     * paypal/action/return.html.
     */
    return_url: Scalars['String']
}

/** Contains secure URL used for Payments Pro Hosted Solution payment method. */
export type HostedProUrl = {
    __typename?: 'HostedProUrl'
    /** Secure Url generated by PayPal */
    secure_form_url?: Maybe<Scalars['String']>
}

/** The required input to request the secure URL for Payments Pro Hosted Solution payment. */
export type HostedProUrlInput = {
    /** The unique ID that identifies the customer's cart */
    cart_id: Scalars['String']
}

/** The object details of target path parameters */
export type HttpQueryParameter = {
    __typename?: 'HttpQueryParameter'
    /** Parameter name */
    name?: Maybe<Scalars['String']>
    /** Parameter value */
    value?: Maybe<Scalars['String']>
}

export type ImageSwatchData = SwatchDataInterface & {
    __typename?: 'ImageSwatchData'
    /** Thumbnail swatch image URL */
    thumbnail?: Maybe<Scalars['String']>
    /** Type of the swatch) */
    type?: Maybe<Scalars['String']>
    /** Value of swatch item (HEX color code, image link or textual value) */
    value?: Maybe<Scalars['String']>
}

/** Invoice details */
export type Invoice = {
    __typename?: 'Invoice'
    /** Base Customer Balance Amount of the invoice */
    base_customer_balance_amount?: Maybe<Money>
    /** Base Gift Card Amount of the invoice */
    base_gift_card_amount?: Maybe<Money>
    /** Comments on the invoice */
    comments?: Maybe<Array<Maybe<SalesCommentItem>>>
    /** Customer Balance Amount of the invoice */
    customer_balance_amount?: Maybe<Money>
    /** Discount Amount of the invoice */
    discount_amount?: Maybe<Money>
    /** Gift Card Amount of the invoice */
    gift_card_amount?: Maybe<Money>
    /** Grand Total of the invoice */
    grand_total?: Maybe<Money>
    /** Invoice unique identifier */
    id: Scalars['ID']
    /** Invoiced product details */
    invoiced_items?: Maybe<Array<Maybe<InvoiceItem>>>
    /** Invoiced product details */
    items?: Maybe<Array<Maybe<InvoiceItemInterface>>>
    /** Invoice number */
    number: Scalars['String']
    /** Shipping Amount of the invoice */
    shipping_amount?: Maybe<Money>
    /** Subtotal of the invoice */
    subtotal?: Maybe<Money>
    /** Tax Amount of the invoice */
    tax_amount?: Maybe<Money>
    /** Invoice total amount details */
    total?: Maybe<InvoiceTotal>
}

export type InvoiceItem = InvoiceItemInterface & {
    __typename?: 'InvoiceItem'
    /** Additional data of invoiced items */
    additional_data?: Maybe<Scalars['String']>
    /** Contains information about the final discount amount for the base product, including discounts on options */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** GiftCard Details of Invoiced Item */
    giftcard_details?: Maybe<Array<Maybe<GiftCardDetails>>>
    /** Id of the product */
    id?: Maybe<Scalars['Int']>
    /** Item Id of the product */
    item_id?: Maybe<Scalars['Int']>
    /** Name of the product */
    name: Scalars['String']
    /** Contains details about an individual order item */
    order_item?: Maybe<OrderItemInterface>
    /** Patent Item Id of the product */
    parent_item_id?: Maybe<Scalars['Int']>
    /** Price of invoiced items */
    price?: Maybe<Money>
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** Product Options of Invoiced Item */
    product_options?: Maybe<Array<Maybe<ProductOptions>>>
    /** The sale price for the base product including selected options */
    product_sale_price: Money
    /** The SKU of the base product */
    product_sku: Scalars['String']
    /** Product Type of the product */
    product_type?: Maybe<Scalars['String']>
    /** Number of invoiced items */
    quantity_invoiced?: Maybe<Scalars['Float']>
    /** Row Total of invoiced items */
    row_total?: Maybe<Money>
    /** Sku of the product */
    sku: Scalars['String']
    /** Tax Amount of invoiced items */
    tax_amount?: Maybe<Money>
}

/** Invoice item details */
export type InvoiceItemInterface = {
    /** Contains information about the final discount amount for the base product, including discounts on options */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The unique ID of the invoice item */
    id: Scalars['ID']
    /** Contains details about an individual order item */
    order_item?: Maybe<OrderItemInterface>
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price for the base product including selected options */
    product_sale_price: Money
    /** The SKU of the base product */
    product_sku: Scalars['String']
    /** The number of invoiced items */
    quantity_invoiced?: Maybe<Scalars['Float']>
}

/** Contains price details from an invoice */
export type InvoiceTotal = {
    __typename?: 'InvoiceTotal'
    /** The final base grand total amount in the base currency */
    base_grand_total: Money
    /** The applied discounts to the invoice */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The final total amount, including shipping, discounts, and taxes */
    grand_total: Money
    /** Contains details about the shipping and handling costs for the invoice */
    shipping_handling?: Maybe<ShippingHandling>
    /** The subtotal of the invoice, excluding shipping, discounts, and taxes */
    subtotal: Money
    /** The invoice tax details */
    taxes?: Maybe<Array<Maybe<TaxItem>>>
    /** The shipping amount for the invoice */
    total_shipping: Money
    /** The amount of tax applied to the invoice */
    total_tax: Money
}

export type IsEmailAvailableOutput = {
    __typename?: 'IsEmailAvailableOutput'
    /** Is email availabel value */
    is_email_available?: Maybe<Scalars['Boolean']>
}

/** Products returned in a sales order */
export type ItemOptions = {
    __typename?: 'ItemOptions'
    /** Product options label */
    label?: Maybe<Scalars['String']>
    /** Product options option id */
    option_id?: Maybe<Scalars['Int']>
    /** Product options label option value */
    option_value?: Maybe<Scalars['String']>
    /** Product options value */
    value?: Maybe<Scalars['String']>
}

/** An array containing all the items of order */
export type Items = {
    __typename?: 'Items'
    /** Condition of Sales Return Item */
    condition?: Maybe<Scalars['String']>
    /** GiftCard Details of Sales Order Item */
    giftcard_details?: Maybe<Array<Maybe<GiftCardDetails>>>
    /** Product image url */
    image_url?: Maybe<Scalars['String']>
    /** Product url key */
    item_options?: Maybe<Array<Maybe<ItemOptions>>>
    /** Name of Return Item */
    name?: Maybe<Scalars['String']>
    /** Parent SKU of Sales Order Item */
    parent_sku?: Maybe<Scalars['String']>
    /** Price of Sales Order Item */
    price?: Maybe<Money>
    /** Product brand */
    product_brand?: Maybe<Scalars['String']>
    /** Product Entity Id */
    product_id?: Maybe<Scalars['Int']>
    /** Product Options of Sales Order Item */
    product_options?: Maybe<Array<Maybe<ProductOptions>>>
    /** Product Type of Sales Order Item */
    product_type?: Maybe<Scalars['String']>
    /** Product url key */
    product_url?: Maybe<Scalars['String']>
    /** Quantity of Sales Return Item */
    qty?: Maybe<Scalars['String']>
    /** Qty BackOrdered of Sales Order Item */
    qty_backordered?: Maybe<Scalars['Float']>
    /** Qty Canceled of Sales Order Item */
    qty_canceled?: Maybe<Scalars['Float']>
    /** Qty Invoiced of Sales Order Item */
    qty_invoiced?: Maybe<Scalars['Float']>
    /** Qty Ordered of Sales Order Item */
    qty_ordered?: Maybe<Scalars['Float']>
    /** Qty Refunded of Sales Order Item */
    qty_refunded?: Maybe<Scalars['Float']>
    /** Qty Returned of Sales Order Item */
    qty_returned?: Maybe<Scalars['Float']>
    /** Qty Shipped of Sales Order Item */
    qty_shipped?: Maybe<Scalars['Float']>
    /** reason of Sales Return Item */
    reason?: Maybe<Scalars['String']>
    /** Requested Quantity of Sales Return Item */
    request_qty?: Maybe<Scalars['String']>
    /** Resolution of Sales Return Item */
    resolution?: Maybe<Scalars['String']>
    /** Row Total of Sales Order Item */
    row_total?: Maybe<Money>
    /** Product shipping availablity message */
    shipping_availability?: Maybe<Scalars['String']>
    /** SKU of Sales Return Item */
    sku?: Maybe<Scalars['String']>
    /** Small image URL of Sales Order item */
    small_image?: Maybe<Scalars['String']>
    /** Status of Sales Return Item */
    status?: Maybe<Scalars['String']>
    /** Title of Sales Order Item */
    title?: Maybe<Scalars['String']>
}

/** A list of options of the selected bundle product */
export type ItemSelectedBundleOption = {
    __typename?: 'ItemSelectedBundleOption'
    /** The unique identifier of the option */
    id: Scalars['ID']
    /** The label of the option */
    label: Scalars['String']
    /** A list of products that represent the values of the parent option */
    values?: Maybe<Array<Maybe<ItemSelectedBundleOptionValue>>>
}

/** A list of values for the selected bundle product */
export type ItemSelectedBundleOptionValue = {
    __typename?: 'ItemSelectedBundleOptionValue'
    /** The unique identifier of the value */
    id: Scalars['ID']
    /** The price of the child bundle product */
    price: Money
    /** The name of the child bundle product */
    product_name: Scalars['String']
    /** The SKU of the child bundle product */
    product_sku: Scalars['String']
    /** Indicates how many of this bundle product were ordered */
    quantity: Scalars['Float']
}

export type ItemToCart = {
    /** Requisition List item id to add */
    itemId?: Maybe<Scalars['Int']>
    /** Wishlist item ID to add */
    item_id?: Maybe<Scalars['Int']>
    /** Item qty to add */
    qty?: Maybe<Scalars['Int']>
}

export type ItemToUpdate = {
    /** The customer's comment about this item */
    description?: Maybe<Scalars['String']>
    /** The wish list item ID */
    id?: Maybe<Scalars['Int']>
    /** The quantity of this wish list item */
    qty?: Maybe<Scalars['Float']>
}

/** The key-value type */
export type KeyValue = {
    __typename?: 'KeyValue'
    /** The name part of the name/value pair */
    name?: Maybe<Scalars['String']>
    /** The value part of the name/value pair */
    value?: Maybe<Scalars['String']>
}

export type KlarnaInput = {
    /** The authorization token must be provided to set any Klarna Payments method */
    authorization_token: Scalars['String']
}

export type LayerFilter = {
    __typename?: 'LayerFilter'
    /**
     * Array of filter items.
     * @deprecated Use Aggregation.options instead.
     */
    filter_items?: Maybe<Array<Maybe<LayerFilterItemInterface>>>
    /**
     * Count of filter items in filter group.
     * @deprecated Use Aggregation.count instead.
     */
    filter_items_count?: Maybe<Scalars['Int']>
    /**
     * Layered navigation filter name.
     * @deprecated Use Aggregation.label instead.
     */
    name?: Maybe<Scalars['String']>
    /**
     * Request variable name for filter query.
     * @deprecated Use Aggregation.attribute_code instead.
     */
    request_var?: Maybe<Scalars['String']>
}

export type LayerFilterItem = LayerFilterItemInterface & {
    __typename?: 'LayerFilterItem'
    /**
     * Count of items by filter.
     * @deprecated Use AggregationOption.count instead.
     */
    items_count?: Maybe<Scalars['Int']>
    /**
     * Filter label.
     * @deprecated Use AggregationOption.label instead.
     */
    label?: Maybe<Scalars['String']>
    /**
     * Value for filter request variable to be used in query.
     * @deprecated Use AggregationOption.value instead.
     */
    value_string?: Maybe<Scalars['String']>
}

export type LayerFilterItemInterface = {
    /**
     * Count of items by filter.
     * @deprecated Use AggregationOption.count instead.
     */
    items_count?: Maybe<Scalars['Int']>
    /**
     * Filter label.
     * @deprecated Use AggregationOption.label instead.
     */
    label?: Maybe<Scalars['String']>
    /**
     * Value for filter request variable to be used in query.
     * @deprecated Use AggregationOption.value instead.
     */
    value_string?: Maybe<Scalars['String']>
}

/** MediaGalleryEntry defines characteristics about images and videos associated with a specific product. */
export type MediaGalleryEntry = {
    __typename?: 'MediaGalleryEntry'
    /** Contains a ProductMediaGalleryEntriesContent object. */
    content?: Maybe<ProductMediaGalleryEntriesContent>
    /** Whether the image is hidden from view. */
    disabled?: Maybe<Scalars['Boolean']>
    /** The path of the image on the server. */
    file?: Maybe<Scalars['String']>
    /** The identifier assigned to the object. */
    id?: Maybe<Scalars['Int']>
    /** The alt text displayed on the UI when the user points to the image. */
    label?: Maybe<Scalars['String']>
    /** image or video. */
    media_type?: Maybe<Scalars['String']>
    /** The media item's position after it has been sorted. */
    position?: Maybe<Scalars['Int']>
    /** Array of image types. It can have the following values: image, small_image, thumbnail. */
    types?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Contains a ProductMediaGalleryEntriesVideoContent object. */
    video_content?: Maybe<ProductMediaGalleryEntriesVideoContent>
}

/** Contains basic information about a product image or video. */
export type MediaGalleryInterface = {
    /** Whether the image is hidden from view. */
    disabled?: Maybe<Scalars['Boolean']>
    /** The label of the product image or video. */
    label?: Maybe<Scalars['String']>
    /** The media item's position after it has been sorted. */
    position?: Maybe<Scalars['Int']>
    /** Array of image types. It can have the following values: image, small_image, thumbnail. */
    types?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The URL of the product image or video. */
    url?: Maybe<Scalars['String']>
}

export type Messages = {
    __typename?: 'Messages'
    /** Error messages */
    error?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Success messages */
    success?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A Money object defines a monetary value, including a numeric value and a currency code. */
export type Money = {
    __typename?: 'Money'
    /** A three-letter currency code, such as USD or EUR */
    currency?: Maybe<CurrencyEnum>
    /** A number expressing a monetary value */
    value?: Maybe<Scalars['Float']>
}

export type MoveRequisitionListOutput = {
    __typename?: 'MoveRequisitionListOutput'
    /** Moved requistion list items to selected requisition list */
    messages?: Maybe<Scalars['String']>
}

export type Mutation = {
    __typename?: 'Mutation'
    addBundleProductsToCart?: Maybe<AddBundleProductsToCartOutput>
    addConfigurableProductsToCart?: Maybe<AddConfigurableProductsToCartOutput>
    addCustomGiftCardProductsToCart?: Maybe<AddGiftCardProductsToCartOutput>
    addDownloadableProductsToCart?: Maybe<AddDownloadableProductsToCartOutput>
    addGiftCardProductsToCart?: Maybe<AddGiftCardProductsToCartOutput>
    /** Add product to Requisition list */
    addProductToRequisitionList?: Maybe<AddToRequisitionListOutput>
    /** Add product to wish list */
    addProductToWishlist?: Maybe<WishlistOutput>
    /** Add any type of product to the cart */
    addProductsToCart?: Maybe<AddProductsToCartOutput>
    /** Add products to the cart */
    addProductsToCartRequisitionList?: Maybe<AddToCartOutput>
    /** Add products to the cart from wishlist. */
    addProductsToCartWishlist?: Maybe<AddProductsToCartOutput>
    /** Adds one or more products to the specified wish list. This mutation supports all product types */
    addProductsToWishlist?: Maybe<AddProductsToWishlistOutput>
    addRmaComment?: Maybe<AddRmaCommentOutput>
    addSimpleProductsToCart?: Maybe<AddSimpleProductsToCartOutput>
    addVirtualProductsToCart?: Maybe<AddVirtualProductsToCartOutput>
    applyCouponToCart?: Maybe<ApplyCouponToCartOutput>
    /** Apply a pre-defined gift card code to the specified cart. */
    applyGiftCardToCart?: Maybe<ApplyGiftCardToCartOutput>
    /** Apply all available points, up to the cart total. Partial redemption is not available */
    applyRewardPointsToCart?: Maybe<ApplyRewardPointsToCartOutput>
    /** Apply store credit to the specified cart. */
    applyStoreCreditToCart?: Maybe<ApplyStoreCreditToCartOutput>
    /** Changes the password for the logged-in customer */
    changeCustomerPassword?: Maybe<Customer>
    contactFormSubmit?: Maybe<ContactOutput>
    /** Copy Requisition List Items */
    copyRequisitionList?: Maybe<CopyRequisitionListOutput>
    /** Copy Wishlist */
    copyWishlist?: Maybe<CopyWishlistOutput>
    /** Creates Client Token for Braintree Javascript SDK initialization. */
    createBraintreeClientToken: Scalars['String']
    /** Create new Company. */
    createCompany?: Maybe<CreateCompanyOutput>
    /** Create new Company role. */
    createCompanyRole?: Maybe<CompanyRoleOutput>
    /** Create Company Team. */
    createCompanyTeam?: Maybe<CompanyTeamOutput>
    /** Create new Company User (Customer assigned to Company). */
    createCompanyUser?: Maybe<CreateCompanyUserOutput>
    /** Create customer account */
    createCustomer?: Maybe<CustomerOutput>
    /** Create customer address */
    createCustomerAddress?: Maybe<CustomerAddress>
    /** Create customer account in checkout */
    createCustomerIncheckout?: Maybe<CustomerToken>
    /** Create customer account */
    createCustomerV2?: Maybe<CustomerOutput>
    /** Creates an empty shopping cart for a guest or logged in user */
    createEmptyCart?: Maybe<Scalars['String']>
    /** Creates a Klarna Payments Session. */
    createKlarnaPaymentsSession?: Maybe<CreateKlarnaPaymentsSessionOutput>
    /** Create NewsLetter Subscriber and returns its Id and corresponding message */
    createNewsSubscriber?: Maybe<NewsSubscriberCreate>
    /** Initiates a transaction and receives a token. Use this mutation for Payflow Pro and Payments Pro payment methods */
    createPayflowProToken?: Maybe<CreatePayflowProTokenOutput>
    /**
     * Initiates an Express Checkout transaction and receives a token. Use this
     * mutation for Express Checkout and Payments Standard payment methods.
     */
    createPaypalExpressToken?: Maybe<PaypalExpressTokenOutput>
    /** Creates a product review for the specified SKU */
    createProductReview: CreateProductReviewOutput
    /** Create Requisition List */
    createRequisitionList?: Maybe<RequisitionListOutput>
    createRmaRequest?: Maybe<CreateRmaRequestOutput>
    /** Create a new stored card */
    createTokenBaseCard?: Maybe<TokenBaseCard>
    /** Create Wishlist */
    createWishlist?: Maybe<WishlistOutput>
    /** Create new Review */
    create_product_review?: Maybe<CreateReviewOutput>
    /** Delete Company Role by ID. */
    deleteCompanyRole?: Maybe<CompanyRoleOutput>
    /** Delete Company Team entity by ID. */
    deleteCompanyTeam?: Maybe<CompanyTeamOutput>
    /** Delete Company User by ID. */
    deleteCompanyUser?: Maybe<DeleteCompanyUserOutput>
    /** Delete customer address */
    deleteCustomerAddress?: Maybe<Scalars['Boolean']>
    /** Delete a customer payment token */
    deletePaymentToken?: Maybe<DeletePaymentTokenOutput>
    /** Delete a stored card */
    deleteTokenBaseCard?: Maybe<Scalars['Boolean']>
    /** DotDigital Form Submission. */
    dotdigitalAccountFormSubmission?: Maybe<DotDigitalFormSubmission>
    /** DotDigital Form Submission. */
    dotdigitalformsubmission?: Maybe<DotDigitalFormSubmission>
    /** Retrieve the customer token */
    generateCustomerToken?: Maybe<CustomerToken>
    /** Handles payment response and saves payment in Quote. Use this mutations for Payflow Pro and Payments Pro payment methods. */
    handlePayflowProResponse?: Maybe<PayflowProResponseOutput>
    /** Merges the source cart into the destination cart */
    mergeCarts: Cart
    /** Move Requisition List */
    moveRequisitionList?: Maybe<MoveRequisitionListOutput>
    /** Move Wishlist */
    moveWishlist?: Maybe<CopyWishlistOutput>
    /** Permanent Delete User by ID. */
    permanentDeleteUser?: Maybe<PermanentDeleteUserOutput>
    placeOrder?: Maybe<PlaceOrderOutput>
    /** Redeem gift card for store credit. */
    redeemGiftCardBalanceAsStoreCredit?: Maybe<GiftCardAccount>
    removeCouponFromCart?: Maybe<RemoveCouponFromCartOutput>
    removeGiftCardFromCart?: Maybe<RemoveGiftCardFromCartOutput>
    removeItemFromCart?: Maybe<RemoveItemFromCartOutput>
    /** Remove Item Wishlist */
    removeItemWishlist?: Maybe<RemoveItemWishlistOutput>
    /** Removes one or more products from the specified wish list */
    removeProductsFromWishlist?: Maybe<RemoveProductsFromWishlistOutput>
    /** Remove Requisition List */
    removeRequisitionList?: Maybe<RemoveRequisitionListOutput>
    /** Remove Item from Requisition List */
    removeRequisitionListItem?: Maybe<RemoveRequisitionListItemOutput>
    /** Cancel the application of reward points to the cart */
    removeRewardPointsFromCart?: Maybe<RemoveRewardPointsFromCartOutput>
    /** Remove applied store credit from the specified cart. */
    removeStoreCreditFromCart?: Maybe<RemoveStoreCreditFromCartOutput>
    /** Remove Wishlist */
    removeWishlist?: Maybe<RemoveWishlistOutput>
    /** Rename Requisition List */
    renameRequisitionList?: Maybe<RenameRequisitionListOutput>
    /** Rename Wishlist */
    renameWishlist?: Maybe<RenameWishlistOutput>
    reorderCreateCart?: Maybe<CreateReorderCartOutput>
    /** Adds all products from a customer's previous order to the cart. */
    reorderItems?: Maybe<ReorderItemsOutput>
    /** Request an email with a reset password token for the registered customer identified by the specified email. */
    requestPasswordResetEmail?: Maybe<Scalars['Boolean']>
    /**
     * Reset a customer's password using the reset password token that the customer
     * received in an email after requesting it using requestPasswordResetEmail.
     */
    resetPassword?: Maybe<Scalars['Boolean']>
    /** Revoke the customer token */
    revokeCustomerToken?: Maybe<RevokeCustomerTokenOutput>
    /** Recommends Product by Sending Single/Multiple Email */
    sendEmailToFriend?: Maybe<SendEmailToFriendOutput>
    setBillingAddressOnCart?: Maybe<SetBillingAddressOnCartOutput>
    /** Set gift options like gift wrapping or gift message for the entire cart */
    setGiftOptionsOnCart?: Maybe<SetGiftOptionsOnCartOutput>
    setGuestEmailOnCart?: Maybe<SetGuestEmailOnCartOutput>
    /** @deprecated Should use setPaymentMethodOnCart and placeOrder mutations in single request. */
    setPaymentMethodAndPlaceOrder?: Maybe<PlaceOrderOutput>
    setPaymentMethodOnCart?: Maybe<SetPaymentMethodOnCartOutput>
    setShippingAddressesOnCart?: Maybe<SetShippingAddressesOnCartOutput>
    setShippingMethodsOnCart?: Maybe<SetShippingMethodsOnCartOutput>
    /** Share Wishlist */
    shareWishlist?: Maybe<ShareWishlistOutput>
    /** Subscribes the specified email to a newsletter */
    subscribeEmailToNewsletter?: Maybe<SubscribeEmailToNewsletterOutput>
    updateCartItems?: Maybe<UpdateCartItemsOutput>
    /** Update Company information. */
    updateCompany?: Maybe<UpdateCompanyOutput>
    /** Update Company Hierarchy element's parent node assignment. */
    updateCompanyHierarchy?: Maybe<UpdateCompanyHierarchyOutput>
    /** Update Company role data. */
    updateCompanyRole?: Maybe<CompanyRoleOutput>
    /** Update Company Team data. */
    updateCompanyTeam?: Maybe<CompanyTeamOutput>
    /** Update Company User information. */
    updateCompanyUser?: Maybe<UpdateCompanyUserOutput>
    /** Deprecated. Use UpdateCustomerV2 instead. */
    updateCustomer?: Maybe<CustomerOutput>
    /** Update customer address */
    updateCustomerAddress?: Maybe<CustomerAddress>
    updateCustomerEmail?: Maybe<CustomerOutput>
    /** Update the customer's personal information */
    updateCustomerV2?: Maybe<CustomerOutput>
    /** Updates one or more products in the specified wish list */
    updateProductsInWishlist?: Maybe<UpdateProductsInWishlistOutput>
    /** Update Requisition List */
    updateRequisitionList?: Maybe<UpdateRequisitionListOutput>
    /** Update an existing stored card */
    updateTokenBaseCard?: Maybe<TokenBaseCard>
    /** Update Wishlist */
    updateWishlist?: Maybe<UpdateWishlistOutput>
    /** Apply a pre-defined gift card code to the specified cart. */
    validateApplyGiftCardToCart?: Maybe<ApplyGiftCardToCartOutput>
    /** Verify recaptcha token */
    verifyRecaptchaV3?: Maybe<VerifyRecaptchaV3Output>
}

export type MutationAddBundleProductsToCartArgs = {
    input?: Maybe<AddBundleProductsToCartInput>
}

export type MutationAddConfigurableProductsToCartArgs = {
    input?: Maybe<AddConfigurableProductsToCartInput>
}

export type MutationAddCustomGiftCardProductsToCartArgs = {
    input?: Maybe<AddCustomGiftCardProductsToCartInput>
}

export type MutationAddDownloadableProductsToCartArgs = {
    input?: Maybe<AddDownloadableProductsToCartInput>
}

export type MutationAddGiftCardProductsToCartArgs = {
    input?: Maybe<AddGiftCardProductsToCartInput>
}

export type MutationAddProductToRequisitionListArgs = {
    input?: Maybe<AddProductToRequisitionListInput>
}

export type MutationAddProductToWishlistArgs = {
    input?: Maybe<AddToWishlist>
}

export type MutationAddProductsToCartArgs = {
    cartId: Scalars['String']
    cartItems: Array<CartItemInput>
}

export type MutationAddProductsToCartRequisitionListArgs = {
    input?: Maybe<AddToCartFromRequisitionList>
}

export type MutationAddProductsToCartWishlistArgs = {
    input?: Maybe<AddToCart>
}

export type MutationAddProductsToWishlistArgs = {
    wishlistId: Scalars['ID']
    wishlistItems: Array<WishlistItemInput>
}

export type MutationAddRmaCommentArgs = {
    input?: Maybe<AddRmaCommentInput>
}

export type MutationAddSimpleProductsToCartArgs = {
    input?: Maybe<AddSimpleProductsToCartInput>
}

export type MutationAddVirtualProductsToCartArgs = {
    input?: Maybe<AddVirtualProductsToCartInput>
}

export type MutationApplyCouponToCartArgs = {
    input?: Maybe<ApplyCouponToCartInput>
}

export type MutationApplyGiftCardToCartArgs = {
    input?: Maybe<ApplyGiftCardToCartInput>
}

export type MutationApplyRewardPointsToCartArgs = {
    cartId: Scalars['ID']
}

export type MutationApplyStoreCreditToCartArgs = {
    input: ApplyStoreCreditToCartInput
}

export type MutationChangeCustomerPasswordArgs = {
    currentPassword: Scalars['String']
    newPassword: Scalars['String']
}

export type MutationContactFormSubmitArgs = {
    input: ContactInput
}

export type MutationCopyRequisitionListArgs = {
    input?: Maybe<CopyMoveRequisitionListInput>
}

export type MutationCopyWishlistArgs = {
    input?: Maybe<CopyWishlistInput>
}

export type MutationCreateCompanyArgs = {
    input: CompanyCreateInput
}

export type MutationCreateCompanyRoleArgs = {
    input: CompanyRoleCreateInput
}

export type MutationCreateCompanyTeamArgs = {
    input: CompanyTeamCreateInput
}

export type MutationCreateCompanyUserArgs = {
    input: CompanyUserCreateInput
}

export type MutationCreateCustomerArgs = {
    input: CustomerInput
}

export type MutationCreateCustomerAddressArgs = {
    input: CustomerAddressInput
}

export type MutationCreateCustomerIncheckoutArgs = {
    input: CustomerInput
}

export type MutationCreateCustomerV2Args = {
    input: CustomerCreateInput
}

export type MutationCreateEmptyCartArgs = {
    input?: Maybe<CreateEmptyCartInput>
}

export type MutationCreateKlarnaPaymentsSessionArgs = {
    input?: Maybe<CreateKlarnaPaymentsSessionInput>
}

export type MutationCreateNewsSubscriberArgs = {
    subscriberEmail: Scalars['String']
}

export type MutationCreatePayflowProTokenArgs = {
    input: PayflowProTokenInput
}

export type MutationCreatePaypalExpressTokenArgs = {
    input: PaypalExpressTokenInput
}

export type MutationCreateProductReviewArgs = {
    input: CreateProductReviewInput
}

export type MutationCreateRequisitionListArgs = {
    input?: Maybe<RequisitionListInfo>
}

export type MutationCreateRmaRequestArgs = {
    input?: Maybe<CreateRmaRequestInput>
}

export type MutationCreateTokenBaseCardArgs = {
    input: TokenBaseCardCreateInput
}

export type MutationCreateWishlistArgs = {
    input?: Maybe<WishlistInfo>
}

export type MutationCreate_Product_ReviewArgs = {
    input: ReviewInput
}

export type MutationDeleteCompanyRoleArgs = {
    id: Scalars['ID']
}

export type MutationDeleteCompanyTeamArgs = {
    id: Scalars['ID']
}

export type MutationDeleteCompanyUserArgs = {
    id: Scalars['ID']
}

export type MutationDeleteCustomerAddressArgs = {
    id: Scalars['Int']
}

export type MutationDeletePaymentTokenArgs = {
    public_hash: Scalars['String']
}

export type MutationDeleteTokenBaseCardArgs = {
    hash: Scalars['String']
}

export type MutationDotdigitalAccountFormSubmissionArgs = {
    input: DotDigitalAccountFormInput
}

export type MutationDotdigitalformsubmissionArgs = {
    input: DotDigitalFormInput
}

export type MutationGenerateCustomerTokenArgs = {
    email: Scalars['String']
    password: Scalars['String']
}

export type MutationHandlePayflowProResponseArgs = {
    input: PayflowProResponseInput
}

export type MutationMergeCartsArgs = {
    source_cart_id: Scalars['String']
    destination_cart_id: Scalars['String']
}

export type MutationMoveRequisitionListArgs = {
    input?: Maybe<CopyMoveRequisitionListInput>
}

export type MutationMoveWishlistArgs = {
    input?: Maybe<CopyWishlistInput>
}

export type MutationPermanentDeleteUserArgs = {
    id: Scalars['ID']
}

export type MutationPlaceOrderArgs = {
    input?: Maybe<PlaceOrderInput>
}

export type MutationRedeemGiftCardBalanceAsStoreCreditArgs = {
    input: GiftCardAccountInput
}

export type MutationRemoveCouponFromCartArgs = {
    input?: Maybe<RemoveCouponFromCartInput>
}

export type MutationRemoveGiftCardFromCartArgs = {
    input?: Maybe<RemoveGiftCardFromCartInput>
}

export type MutationRemoveItemFromCartArgs = {
    input?: Maybe<RemoveItemFromCartInput>
}

export type MutationRemoveItemWishlistArgs = {
    input?: Maybe<RemoveItemWishlistInput>
}

export type MutationRemoveProductsFromWishlistArgs = {
    wishlistId: Scalars['ID']
    wishlistItemsIds: Array<Scalars['ID']>
}

export type MutationRemoveRequisitionListArgs = {
    input?: Maybe<RequisitionListInput>
}

export type MutationRemoveRequisitionListItemArgs = {
    input?: Maybe<RemoveRequisitionListItemInput>
}

export type MutationRemoveRewardPointsFromCartArgs = {
    cartId: Scalars['ID']
}

export type MutationRemoveStoreCreditFromCartArgs = {
    input: RemoveStoreCreditFromCartInput
}

export type MutationRemoveWishlistArgs = {
    input?: Maybe<RemoveWishlistInfo>
}

export type MutationRenameRequisitionListArgs = {
    input?: Maybe<RenameRequisitionListInput>
}

export type MutationRenameWishlistArgs = {
    input?: Maybe<RenameWishlistInput>
}

export type MutationReorderCreateCartArgs = {
    input?: Maybe<CreateReorderCartInput>
}

export type MutationReorderItemsArgs = {
    orderNumber: Scalars['String']
}

export type MutationRequestPasswordResetEmailArgs = {
    email: Scalars['String']
}

export type MutationResetPasswordArgs = {
    email: Scalars['String']
    resetPasswordToken: Scalars['String']
    newPassword: Scalars['String']
}

export type MutationSendEmailToFriendArgs = {
    input?: Maybe<SendEmailToFriendInput>
}

export type MutationSetBillingAddressOnCartArgs = {
    input?: Maybe<SetBillingAddressOnCartInput>
}

export type MutationSetGiftOptionsOnCartArgs = {
    input?: Maybe<SetGiftOptionsOnCartInput>
}

export type MutationSetGuestEmailOnCartArgs = {
    input?: Maybe<SetGuestEmailOnCartInput>
}

export type MutationSetPaymentMethodAndPlaceOrderArgs = {
    input?: Maybe<SetPaymentMethodAndPlaceOrderInput>
}

export type MutationSetPaymentMethodOnCartArgs = {
    input?: Maybe<SetPaymentMethodOnCartInput>
}

export type MutationSetShippingAddressesOnCartArgs = {
    input?: Maybe<SetShippingAddressesOnCartInput>
}

export type MutationSetShippingMethodsOnCartArgs = {
    input?: Maybe<SetShippingMethodsOnCartInput>
}

export type MutationShareWishlistArgs = {
    input?: Maybe<ShareWishlistInput>
}

export type MutationSubscribeEmailToNewsletterArgs = {
    email: Scalars['String']
}

export type MutationUpdateCartItemsArgs = {
    input?: Maybe<UpdateCartItemsInput>
}

export type MutationUpdateCompanyArgs = {
    input: CompanyUpdateInput
}

export type MutationUpdateCompanyHierarchyArgs = {
    input: CompanyHierarchyUpdateInput
}

export type MutationUpdateCompanyRoleArgs = {
    input: CompanyRoleUpdateInput
}

export type MutationUpdateCompanyTeamArgs = {
    input: CompanyTeamUpdateInput
}

export type MutationUpdateCompanyUserArgs = {
    input: CompanyUserUpdateInput
}

export type MutationUpdateCustomerArgs = {
    input: CustomerInput
}

export type MutationUpdateCustomerAddressArgs = {
    id: Scalars['Int']
    input?: Maybe<CustomerAddressInput>
}

export type MutationUpdateCustomerEmailArgs = {
    email: Scalars['String']
    password: Scalars['String']
}

export type MutationUpdateCustomerV2Args = {
    input: CustomerUpdateInput
}

export type MutationUpdateProductsInWishlistArgs = {
    wishlistId: Scalars['ID']
    wishlistItems: Array<WishlistItemUpdateInput>
}

export type MutationUpdateRequisitionListArgs = {
    input?: Maybe<UpdateRequisitionListInput>
}

export type MutationUpdateTokenBaseCardArgs = {
    input: TokenBaseCardUpdateInput
}

export type MutationUpdateWishlistArgs = {
    input?: Maybe<UpdateWishlistInput>
}

export type MutationValidateApplyGiftCardToCartArgs = {
    input?: Maybe<ApplyGiftCardToCartInput>
}

export type MutationVerifyRecaptchaV3Args = {
    input?: Maybe<VerifyRecaptchaV3Input>
}

export type NewsSubscriberCreate = {
    __typename?: 'NewsSubscriberCreate'
    /** Success or error Message */
    message?: Maybe<Scalars['String']>
}

export type Order = {
    __typename?: 'Order'
    /** Creation date of Sales Order */
    created_at?: Maybe<Scalars['String']>
    /** Customer Email of Sales Order */
    customer_email?: Maybe<Scalars['String']>
    /** Customer First Name of Sales Order */
    customer_firstname?: Maybe<Scalars['String']>
    /** Customer Last Name of Sales Order */
    customer_lastname?: Maybe<Scalars['String']>
    /** Customer Full Name of Sales Order */
    customer_name?: Maybe<Scalars['String']>
    /** Discount Amount of the Sales Order */
    discount_amount?: Maybe<Money>
    /** Grand Total of the Sales Order */
    grand_total?: Maybe<Money>
    /** order unique identifier */
    id: Scalars['Int']
    /** Increment Id of Sales Order */
    increment_id?: Maybe<Scalars['String']>
    /** Specifies if this otder was placed by Guest cusotmer */
    is_guest_customer?: Maybe<Scalars['Boolean']>
    /** @deprecated The order_id field is deprecated, use order_number instead. */
    order_id?: Maybe<Scalars['String']>
    order_number: Scalars['String']
    /** Shipping Amount of the Sales Order */
    shipping_amount?: Maybe<Money>
    /** Shipping Description of the Sales Order */
    shipping_description?: Maybe<Scalars['String']>
    /** Shipping Method of the Sales Order */
    shipping_method?: Maybe<Scalars['String']>
    /** Status of Sales Order */
    status?: Maybe<Scalars['String']>
    /** Subtotal of the Sales Order */
    subtotal?: Maybe<Money>
    /** Tax Amount of the Sales Order */
    tax_amount?: Maybe<Money>
    /** Number of Orders Placed by the Customer */
    total_order_count: Scalars['Int']
}

/** OrderAddress contains detailed information about an order's billing and shipping addresses */
export type OrderAddress = {
    __typename?: 'OrderAddress'
    /** The city or town */
    city: Scalars['String']
    /** The customer's company */
    company?: Maybe<Scalars['String']>
    /** The customer's country */
    country_code?: Maybe<CountryCodeEnum>
    /** The fax number */
    fax?: Maybe<Scalars['String']>
    /** The first name of the person associated with the shipping/billing address */
    firstname: Scalars['String']
    /** The family name of the person associated with the shipping/billing address */
    lastname: Scalars['String']
    /** The middle name of the person associated with the shipping/billing address */
    middlename?: Maybe<Scalars['String']>
    /** The customer's order ZIP or postal code */
    postcode?: Maybe<Scalars['String']>
    /** An honorific, such as Dr., Mr., or Mrs. */
    prefix?: Maybe<Scalars['String']>
    /** The state or province name */
    region?: Maybe<Scalars['String']>
    /** The unique ID for a pre-defined region */
    region_id?: Maybe<Scalars['ID']>
    /** An array of strings that define the street number and name */
    street: Array<Maybe<Scalars['String']>>
    /** A value such as Sr., Jr., or III */
    suffix?: Maybe<Scalars['String']>
    /** The telephone number */
    telephone: Scalars['String']
    /** The customer's Value-added tax (VAT) number (for corporate customers) */
    vat_id?: Maybe<Scalars['String']>
}

/** Sales Order GraphQl gather Data of specific order information */
export type OrderDetails = {
    __typename?: 'OrderDetails'
    /** Base Customer Balance Amount of the Sales Order */
    base_customer_balance_amount?: Maybe<Money>
    /** Base Gift Card Amount of the Sales Order */
    base_gift_card_amount?: Maybe<Money>
    /** An array of billing data of order */
    billing?: Maybe<Array<Maybe<Billing>>>
    /** Promo Code applied in Order */
    coupon_code?: Maybe<Scalars['String']>
    /** Creation date of Sales Order */
    created_at?: Maybe<Scalars['String']>
    /** Invoice list for the order */
    credit_memos?: Maybe<Array<Maybe<CreditMemos>>>
    /** Customer Balance Amount of the Sales Order */
    customer_balance_amount?: Maybe<Money>
    /** Customer Email of Sales Order */
    customer_email?: Maybe<Scalars['String']>
    /** Customer First Name of Sales Order */
    customer_firstname?: Maybe<Scalars['String']>
    /** Customer Last Name of Sales Order */
    customer_lastname?: Maybe<Scalars['String']>
    /** Customer Full Name of Sales Order */
    customer_name?: Maybe<Scalars['String']>
    /** Discount Amount of the Sales Order */
    discount_amount?: Maybe<Money>
    /** Discount Description of promo rules */
    discount_description?: Maybe<Scalars['String']>
    /** Gift Card Amount of the Sales Order */
    gift_card_amount?: Maybe<Money>
    /** Gift Cards of the Sales Order */
    gift_cards?: Maybe<Array<Maybe<GiftCards>>>
    /** Grand Total of the Sales Order */
    grand_total?: Maybe<Money>
    /** order unique identifier */
    id: Scalars['Int']
    /** Increment Id of Sales Order */
    increment_id?: Maybe<Scalars['String']>
    /** Invoice list for the order */
    invoices?: Maybe<Array<Maybe<Invoice>>>
    /** Specifies if this otder was placed by Guest cusotmer */
    is_guest_customer?: Maybe<Scalars['Boolean']>
    /** Is user subscribed */
    is_subscribed?: Maybe<Scalars['Boolean']>
    /** Is Order Virtual? */
    is_virtual?: Maybe<Scalars['Boolean']>
    /** An array of all items data of order */
    items?: Maybe<Array<Maybe<Items>>>
    /** Payment Details for the order */
    payment?: Maybe<Array<Maybe<Payment>>>
    /** ReOrder Status of Sales Order */
    reorder_status?: Maybe<Scalars['Boolean']>
    /** Shipment list for the order */
    shipments?: Maybe<Array<Maybe<OrderShipment>>>
    /** An array of shipping data of order */
    shipping?: Maybe<Array<Maybe<Shipping>>>
    /** Shipping Amount of the Sales Order */
    shipping_amount?: Maybe<Money>
    /** Shipping Description of the Sales Order */
    shipping_description?: Maybe<Scalars['String']>
    /** Shipping Method of the Sales Order */
    shipping_method?: Maybe<Scalars['String']>
    /** Status of Sales Order */
    status?: Maybe<Scalars['String']>
    /** Subtotal of the Sales Order */
    subtotal?: Maybe<Money>
    /** Tax Amount of the Sales Order */
    tax_amount?: Maybe<Money>
}

export type OrderItem = OrderItemInterface & {
    __typename?: 'OrderItem'
    /** The final discount information for the product */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The entered option for the base product, such as a logo or image */
    entered_options?: Maybe<Array<Maybe<OrderItemOption>>>
    /** The selected gift wrapping for the order item */
    gift_wrapping?: Maybe<GiftWrapping>
    /** The unique identifier of the order item */
    id: Scalars['ID']
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price of the base product, including selected options */
    product_sale_price: Money
    /** The SKU of the base product */
    product_sku: Scalars['String']
    /** The type of product, such as simple, configurable, etc. */
    product_type?: Maybe<Scalars['String']>
    /** URL key of the base product */
    product_url_key?: Maybe<Scalars['String']>
    /** The number of canceled items */
    quantity_canceled?: Maybe<Scalars['Float']>
    /** The number of invoiced items */
    quantity_invoiced?: Maybe<Scalars['Float']>
    /** The number of units ordered for this item */
    quantity_ordered?: Maybe<Scalars['Float']>
    /** The number of refunded items */
    quantity_refunded?: Maybe<Scalars['Float']>
    /** The number of returned items */
    quantity_returned?: Maybe<Scalars['Float']>
    /** The number of shipped items */
    quantity_shipped?: Maybe<Scalars['Float']>
    /** The selected options for the base product, such as color or size */
    selected_options?: Maybe<Array<Maybe<OrderItemOption>>>
    /** The status of the order item */
    status?: Maybe<Scalars['String']>
}

/** Order item details */
export type OrderItemInterface = {
    /** The final discount information for the product */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The entered option for the base product, such as a logo or image */
    entered_options?: Maybe<Array<Maybe<OrderItemOption>>>
    /** The selected gift wrapping for the order item */
    gift_wrapping?: Maybe<GiftWrapping>
    /** The unique identifier of the order item */
    id: Scalars['ID']
    /** The name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** The sale price of the base product, including selected options */
    product_sale_price: Money
    /** The SKU of the base product */
    product_sku: Scalars['String']
    /** The type of product, such as simple, configurable, etc. */
    product_type?: Maybe<Scalars['String']>
    /** URL key of the base product */
    product_url_key?: Maybe<Scalars['String']>
    /** The number of canceled items */
    quantity_canceled?: Maybe<Scalars['Float']>
    /** The number of invoiced items */
    quantity_invoiced?: Maybe<Scalars['Float']>
    /** The number of units ordered for this item */
    quantity_ordered?: Maybe<Scalars['Float']>
    /** The number of refunded items */
    quantity_refunded?: Maybe<Scalars['Float']>
    /** The number of returned items */
    quantity_returned?: Maybe<Scalars['Float']>
    /** The number of shipped items */
    quantity_shipped?: Maybe<Scalars['Float']>
    /** The selected options for the base product, such as color or size */
    selected_options?: Maybe<Array<Maybe<OrderItemOption>>>
    /** The status of the order item */
    status?: Maybe<Scalars['String']>
}

/** Represents order item options like selected or entered */
export type OrderItemOption = {
    __typename?: 'OrderItemOption'
    /** The name of the option */
    label: Scalars['String']
    /** The value of the option */
    value: Scalars['String']
}

/** Contains details about the payment method used to pay for the order */
export type OrderPaymentMethod = {
    __typename?: 'OrderPaymentMethod'
    /** Additional data per payment method type */
    additional_data?: Maybe<Array<Maybe<KeyValue>>>
    /** The label that describes the payment method */
    name: Scalars['String']
    /** The payment method code that indicates how the order was paid for */
    type: Scalars['String']
}

/** Order shipment details */
export type OrderShipment = {
    __typename?: 'OrderShipment'
    /** Billing address for the order */
    billing_address?: Maybe<Array<Maybe<Billing>>>
    /** Comments added to the shipment */
    comments?: Maybe<Array<Maybe<SalesCommentItem>>>
    /** Shipment unique identifier */
    id: Scalars['ID']
    /** Contains items included in the shipment */
    items?: Maybe<Array<Maybe<ShipmentItemInterface>>>
    /** Shipment Increment Id */
    number: Scalars['String']
    /** Items included in the shipment */
    shipped_items?: Maybe<Array<Maybe<ShipmentItem>>>
    /** Shipping address for the order */
    shipping_address?: Maybe<Array<Maybe<Shipping>>>
    /** Shipping description for the order */
    shipping_description: Scalars['String']
    /** Shipping method for the order */
    shipping_method: Scalars['String']
    /** Contains shipment tracking details */
    tracking?: Maybe<Array<Maybe<ShipmentTracking>>>
    /** Tracking details for the order */
    tracks?: Maybe<Array<Maybe<TrackItem>>>
}

/** Contains details about the sales total amounts used to calculate the final price */
export type OrderTotal = {
    __typename?: 'OrderTotal'
    /** The final base grand total amount in the base currency */
    base_grand_total: Money
    /** The applied discounts to the order */
    discounts?: Maybe<Array<Maybe<Discount>>>
    /** The final total amount, including shipping, discounts, and taxes */
    grand_total: Money
    /** Contains details about the shipping and handling costs for the order */
    shipping_handling?: Maybe<ShippingHandling>
    /** The subtotal of the order, excluding shipping, discounts, and taxes */
    subtotal: Money
    /** The order tax details */
    taxes?: Maybe<Array<Maybe<TaxItem>>>
    /** The shipping amount for the order */
    total_shipping: Money
    /** The amount of tax applied to the order */
    total_tax: Money
}

/** Required input for Payflow Express Checkout payments */
export type PayflowExpressInput = {
    /** The unique ID of the PayPal user */
    payer_id: Scalars['String']
    /** The token returned by the createPaypalExpressToken mutation */
    token: Scalars['String']
}

/**
 * A set of relative URLs that PayPal will use in response to various actions
 * during the authorization process. Magento prepends the base URL to this value to
 * create a full URL. For example, if the full URL is
 * https://www.example.com/path/to/page.html, the relative URL is
 * path/to/page.html. Use this input for Payflow Link and Payments Advanced payment methods.
 */
export type PayflowLinkInput = {
    /**
     * The relative URL of the page that PayPal will redirect to when the buyer
     * cancels the transaction in order to choose a different payment method. If the
     * full URL to this page is https://www.example.com/paypal/action/cancel.html,
     * the relative URL is paypal/action/cancel.html.
     */
    cancel_url: Scalars['String']
    /**
     * The relative URL of the transaction error page that PayPal will redirect to
     * upon payment error. If the full URL to this page is
     * https://www.example.com/paypal/action/error.html, the relative URL is
     * paypal/action/error.html.
     */
    error_url: Scalars['String']
    /**
     * The relative URL of the order confirmation page that PayPal will redirect to
     * when the payment is successful and additional confirmation is not needed. If
     * the full URL to this page is
     * https://www.example.com/paypal/action/return.html, the relative URL is
     * paypal/action/return.html.
     */
    return_url: Scalars['String']
}

/** Mode for payment: TEST or LIVE. Applies to Payflow Link and Payments Advanced payment methods. */
export enum PayflowLinkMode {
    Test = 'TEST',
    Live = 'LIVE'
}

/**
 * Contains information used to generate PayPal iframe for transaction. Applies to
 * Payflow Link and Payments Advanced payment methods.
 */
export type PayflowLinkToken = {
    __typename?: 'PayflowLinkToken'
    /** Mode for Payflow transaction */
    mode?: Maybe<PayflowLinkMode>
    /** PayPal URL used for requesting Payflow form */
    paypal_url?: Maybe<Scalars['String']>
    /** Secure token generated by PayPal */
    secure_token?: Maybe<Scalars['String']>
    /** Secure token ID generated by PayPal */
    secure_token_id?: Maybe<Scalars['String']>
}

/** Input required to fetch payment token information for Payflow Link and Payments Advanced payment methods. */
export type PayflowLinkTokenInput = {
    /** The unique ID that identifies the customer's cart */
    cart_id: Scalars['String']
}

/** Required input for Payflow Pro and Payments Pro payment methods. */
export type PayflowProInput = {
    /** Required input for credit card related information */
    cc_details: CreditCardDetailsInput
    /**
     * States whether details about the customer's credit/debit card should be
     * tokenized for later usage. Required only if Vault is enabled for PayPal
     * Payflow Pro payment integration.
     */
    is_active_payment_token_enabler?: Maybe<Scalars['Boolean']>
}

/** Input required to complete payment. Applies to Payflow Pro and Payments Pro payment methods. */
export type PayflowProResponseInput = {
    cart_id: Scalars['String']
    paypal_payload: Scalars['String']
}

export type PayflowProResponseOutput = {
    __typename?: 'PayflowProResponseOutput'
    cart: Cart
}

/** Contains the secure information used to authorize transaction. Applies to Payflow Pro and Payments Pro payment methods. */
export type PayflowProToken = {
    __typename?: 'PayflowProToken'
    response_message: Scalars['String']
    result: Scalars['Int']
    result_code: Scalars['Int']
    secure_token: Scalars['String']
    secure_token_id: Scalars['String']
}

/** Input required to fetch payment token information for Payflow Pro and Payments Pro payment methods. */
export type PayflowProTokenInput = {
    /** The unique ID that identifies the customer's cart */
    cart_id: Scalars['String']
    /** A set of relative URLs that PayPal uses for callback. */
    urls: PayflowProUrlInput
}

/**
 * A set of relative URLs that PayPal will use in response to various actions
 * during the authorization process. Magento prepends the base URL to this value to
 * create a full URL. For example, if the full URL is
 * https://www.example.com/path/to/page.html, the relative URL is
 * path/to/page.html. Use this input for Payflow Pro and Payment Pro payment methods.
 */
export type PayflowProUrlInput = {
    /**
     * The relative URL of the page that PayPal will redirect to when the buyer
     * cancels the transaction in order to choose a different payment method. If the
     * full URL to this page is https://www.example.com/paypal/action/cancel.html,
     * the relative URL is paypal/action/cancel.html.
     */
    cancel_url: Scalars['String']
    /**
     * The relative URL of the transaction error page that PayPal will redirect to
     * upon payment error. If the full URL to this page is
     * https://www.example.com/paypal/action/error.html, the relative URL is
     * paypal/action/error.html.
     */
    error_url: Scalars['String']
    /**
     * The relative URL of the final confirmation page that PayPal will redirect to
     * upon payment success. If the full URL to this page is
     * https://www.example.com/paypal/action/return.html, the relative URL is
     * paypal/action/return.html.
     */
    return_url: Scalars['String']
}

export type Payment = {
    __typename?: 'Payment'
    /** Cc Last 4 */
    cc_number: Scalars['String']
    /** Credit Card Type */
    cc_type: Scalars['String']
    /** Payment Method of the Sales Order */
    payment_method?: Maybe<Scalars['String']>
    /** Payment Method title of the Sales Order */
    payment_method_title?: Maybe<Scalars['String']>
}

export type PaymentMethodInput = {
    braintree?: Maybe<BraintreeInput>
    braintree_applepay?: Maybe<BraintreeApplepayInput>
    braintree_cc_vault?: Maybe<BraintreeCcVaultInput>
    braintree_paypal?: Maybe<BraintreePaypalInput>
    /** Payment method code */
    code: Scalars['String']
    /** Required input for PayPal Hosted pro payments */
    hosted_pro?: Maybe<HostedProInput>
    iwd_applepay?: Maybe<BraintreeApplepayInput>
    klarna?: Maybe<KlarnaInput>
    /** Required input for Payflow Express Checkout payments */
    payflow_express?: Maybe<PayflowExpressInput>
    /** Required input for PayPal Payflow Link and Payments Advanced payments */
    payflow_link?: Maybe<PayflowLinkInput>
    /** Required input type for PayPal Payflow Pro and Payment Pro payments */
    payflowpro?: Maybe<PayflowProInput>
    /** Required input type for PayPal Payflow Pro vault payments */
    payflowpro_cc_vault?: Maybe<VaultTokenInput>
    /** Required input for Express Checkout and Payments Standard payments */
    paypal_express?: Maybe<PaypalExpressInput>
    /** Purchase order number */
    purchase_order_number?: Maybe<Scalars['String']>
    /** TokenBase payment method input */
    tokenbase_data?: Maybe<TokenBaseCardPaymentInput>
}

/** The stored payment method available to the customer */
export type PaymentToken = {
    __typename?: 'PaymentToken'
    /** Stored account details */
    details?: Maybe<Scalars['String']>
    /** The payment method code associated with the token */
    payment_method_code: Scalars['String']
    /** The public hash of the token */
    public_hash: Scalars['String']
    type: PaymentTokenTypeEnum
}

/** The list of available payment token types */
export enum PaymentTokenTypeEnum {
    Card = 'card',
    Account = 'account'
}

/** Required input for Express Checkout and Payments Standard payments */
export type PaypalExpressInput = {
    /** The unique ID of the PayPal user */
    payer_id: Scalars['String']
    /** The token returned by the createPaypalExpressToken mutation */
    token: Scalars['String']
}

/** Deprecated: use type `PaypalExpressTokenOutput` instead */
export type PaypalExpressToken = {
    __typename?: 'PaypalExpressToken'
    /**
     * A set of URLs that allow the buyer to authorize payment and adjust checkout details
     * @deprecated Use field `paypal_urls` of type `PaypalExpressTokenOutput` instead
     */
    paypal_urls?: Maybe<PaypalExpressUrlList>
    /**
     * The token returned by PayPal
     * @deprecated Use field `token` of type `PaypalExpressTokenOutput` instead
     */
    token?: Maybe<Scalars['String']>
}

/** Defines the attributes required to receive a payment token for Express Checkout and Payments Standard payment methods. */
export type PaypalExpressTokenInput = {
    /** The unique ID that identifies the customer's cart */
    cart_id: Scalars['String']
    /** Payment method code */
    code: Scalars['String']
    /** Indicates whether the buyer selected the quick checkout button. The default value is false */
    express_button?: Maybe<Scalars['Boolean']>
    /** A set of relative URLs that PayPal uses in response to various actions during the authorization process */
    urls: PaypalExpressUrlsInput
    /** Indicates whether the buyer clicked the PayPal credit button. The default value is false */
    use_paypal_credit?: Maybe<Scalars['Boolean']>
}

/**
 * Contains the token returned by PayPal and a set of URLs that allow the buyer to
 * authorize payment and adjust checkout details. Applies to Express Checkout and
 * Payments Standard payment methods.
 */
export type PaypalExpressTokenOutput = {
    __typename?: 'PaypalExpressTokenOutput'
    /** A set of URLs that allow the buyer to authorize payment and adjust checkout details */
    paypal_urls?: Maybe<PaypalExpressUrlList>
    /** The token returned by PayPal */
    token?: Maybe<Scalars['String']>
}

/**
 * A set of URLs that allow the buyer to authorize payment and adjust checkout
 * details for Express Checkout and Payments Standard transactions.
 */
export type PaypalExpressUrlList = {
    __typename?: 'PaypalExpressUrlList'
    /** The PayPal URL that allows the buyer to edit their checkout details */
    edit?: Maybe<Scalars['String']>
    /** The URL to the PayPal login page */
    start?: Maybe<Scalars['String']>
}

/**
 * A set of relative URLs that PayPal will use in response to various actions
 * during the authorization process. Magento prepends the base URL to this value to
 * create a full URL. For example, if the full URL is
 * https://www.example.com/path/to/page.html, the relative URL is
 * path/to/page.html. Use this input for Express Checkout and Payments Standard
 * payment methods.
 */
export type PaypalExpressUrlsInput = {
    /**
     * The relative URL of the page that PayPal will redirect to when the buyer
     * cancels the transaction in order to choose a different payment method. If the
     * full URL to this page is https://www.example.com/paypal/action/cancel.html,
     * the relative URL is paypal/action/cancel.html.
     */
    cancel_url: Scalars['String']
    /**
     * The relative URL of the page that PayPal will redirect to when the payment has
     * been put on hold for additional review. This condition mostly applies to ACH
     * transactions, and is not applicable to most PayPal solutions. If the full URL
     * to this page is https://www.example.com/paypal/action/success_pending.html,
     * the relative URL is paypal/action/success_pending.html.
     */
    pending_url?: Maybe<Scalars['String']>
    /**
     * The relative URL of the final confirmation page that PayPal will redirect to
     * upon payment success. If the full URL to this page is
     * https://www.example.com/paypal/action/return.html, the relative URL is
     * paypal/action/return.html.
     */
    return_url: Scalars['String']
    /**
     * The relative URL of the order confirmation page that PayPal will redirect to
     * when the payment is successful and additional confirmation is not needed. Not
     * applicable to most PayPal solutions. If the full URL to this page is
     * https://www.example.com/paypal/action/success.html, the relative URL is
     * paypal/action/success.html.
     */
    success_url?: Maybe<Scalars['String']>
}

/** Delete company user output data schema. */
export type PermanentDeleteUserOutput = {
    __typename?: 'PermanentDeleteUserOutput'
    /** Message of delete operation */
    message?: Maybe<Scalars['String']>
    /** Status of delete operation: true - success; false - fail. */
    status?: Maybe<Scalars['Boolean']>
}

/** PhysicalProductInterface contains attributes specific to tangible products. */
export type PhysicalProductInterface = {
    /** The weight of the item, in units defined by the store. */
    weight?: Maybe<Scalars['Float']>
}

/** Defines Pickup Location information. */
export type PickupLocation = {
    __typename?: 'PickupLocation'
    city?: Maybe<Scalars['String']>
    contact_name?: Maybe<Scalars['String']>
    country_id?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    fax?: Maybe<Scalars['String']>
    latitude?: Maybe<Scalars['Float']>
    longitude?: Maybe<Scalars['Float']>
    name?: Maybe<Scalars['String']>
    phone?: Maybe<Scalars['String']>
    pickup_location_code?: Maybe<Scalars['String']>
    postcode?: Maybe<Scalars['String']>
    region?: Maybe<Scalars['String']>
    region_id?: Maybe<Scalars['Int']>
    street?: Maybe<Scalars['String']>
}

/** PickupLocationFilterInput defines the list of attributes and filters for the search. */
export type PickupLocationFilterInput = {
    /** Filter by city. */
    city?: Maybe<FilterTypeInput>
    /** Filter by country. */
    country_id?: Maybe<FilterTypeInput>
    /** Filter by pickup location name. */
    name?: Maybe<FilterTypeInput>
    /** Filter by pickup location code. */
    pickup_location_code?: Maybe<FilterTypeInput>
    /** Filter by postcode. */
    postcode?: Maybe<FilterTypeInput>
    /** Filter by region. */
    region?: Maybe<FilterTypeInput>
    /** Filter by region id. */
    region_id?: Maybe<FilterTypeInput>
    /** Filter by street. */
    street?: Maybe<FilterTypeInput>
}

/** Top level object returned in a pickup locations search. */
export type PickupLocations = {
    __typename?: 'PickupLocations'
    /** An array of pickup locations that match the specific search request. */
    items?: Maybe<Array<Maybe<PickupLocation>>>
    /** An object that includes the page_info and currentPage values specified in the query. */
    page_info?: Maybe<SearchResultPageInfo>
    /** The number of products returned. */
    total_count?: Maybe<Scalars['Int']>
}

/**
 * PickupLocationSortInput specifies attribute to use for sorting search results
 * and indicates whether the results are sorted in ascending or descending order.
 */
export type PickupLocationSortInput = {
    /** City where pickup location is placed. */
    city?: Maybe<SortEnum>
    /** Name of the contact person. */
    contact_name?: Maybe<SortEnum>
    /** Id of the country in two letters. */
    country_id?: Maybe<SortEnum>
    /** Description of the pickup location. */
    description?: Maybe<SortEnum>
    /**
     * Distance to the address, requested by distance filter. Applicable only with
     * distance filter. If distance sort order is present, all other sort orders will be ignored.
     */
    distance?: Maybe<SortEnum>
    /** Contact email of the pickup location. */
    email?: Maybe<SortEnum>
    /** Contact fax of the pickup location. */
    fax?: Maybe<SortEnum>
    /** Geographic latitude where pickup location is placed. */
    latitude?: Maybe<SortEnum>
    /** Geographic longitude where pickup location is placed. */
    longitude?: Maybe<SortEnum>
    /** The pickup location name. Customer use this to identify the pickup location. */
    name?: Maybe<SortEnum>
    /** Contact phone number of the pickup location. */
    phone?: Maybe<SortEnum>
    /** A code assigned to pickup location to identify the source. */
    pickup_location_code?: Maybe<SortEnum>
    /** Postcode where pickup location is placed. */
    postcode?: Maybe<SortEnum>
    /** Name of the region. */
    region?: Maybe<SortEnum>
    /** Id of the region. */
    region_id?: Maybe<SortEnum>
    /** Street where pickup location is placed. */
    street?: Maybe<SortEnum>
}

export type PlaceOrderInput = {
    cart_id: Scalars['String']
}

export type PlaceOrderOutput = {
    __typename?: 'PlaceOrderOutput'
    order: Order
}

/**
 * Price is deprecated, replaced by ProductPrice. The Price object defines the
 * price of a product as well as any tax-related adjustments.
 */
export type Price = {
    __typename?: 'Price'
    /**
     * An array that provides information about tax, weee, or weee_tax adjustments.
     * @deprecated Price is deprecated, use ProductPrice.
     */
    adjustments?: Maybe<Array<Maybe<PriceAdjustment>>>
    /**
     * The price of a product plus a three-letter currency code.
     * @deprecated Price is deprecated, use ProductPrice.
     */
    amount?: Maybe<Money>
}

/**
 * PriceAdjustment is deprecated. Taxes will be included or excluded in the price.
 * The PricedAdjustment object defines the amount of money to apply as an
 * adjustment, the type of adjustment to apply, and whether the item is included or
 * excluded from the adjustment.
 */
export type PriceAdjustment = {
    __typename?: 'PriceAdjustment'
    /** The amount of the price adjustment and its currency code. */
    amount?: Maybe<Money>
    /**
     * Indicates whether the adjustment involves tax, weee, or weee_tax.
     * @deprecated PriceAdjustment is deprecated.
     */
    code?: Maybe<PriceAdjustmentCodesEnum>
    /**
     * Indicates whether the entity described by the code attribute is included or excluded from the adjustment.
     * @deprecated PriceAdjustment is deprecated.
     */
    description?: Maybe<PriceAdjustmentDescriptionEnum>
}

/** PriceAdjustment.code is deprecated. This enumeration contains values defined in modules other than the Catalog module. */
export enum PriceAdjustmentCodesEnum {
    Tax = 'TAX',
    Weee = 'WEEE',
    WeeeTax = 'WEEE_TAX'
}

/** PriceAdjustmentDescriptionEnum is deprecated. This enumeration states whether a price adjustment is included or excluded. */
export enum PriceAdjustmentDescriptionEnum {
    Included = 'INCLUDED',
    Excluded = 'EXCLUDED'
}

/** Price range for a product. If the product has a single price, the minimum and maximum price will be the same. */
export type PriceRange = {
    __typename?: 'PriceRange'
    /** The highest possible price for the product. */
    maximum_price?: Maybe<ProductPrice>
    /** The lowest possible price for the product. */
    minimum_price: ProductPrice
}

/** This enumeration the price type. */
export enum PriceTypeEnum {
    Fixed = 'FIXED',
    Percent = 'PERCENT',
    Dynamic = 'DYNAMIC'
}

/** This enumeration defines whether a bundle product's price is displayed as the lowest possible value or as a range. */
export enum PriceViewEnum {
    PriceRange = 'PRICE_RANGE',
    AsLowAs = 'AS_LOW_AS'
}

/**
 * ProductAttributeFilterInput defines the filters to be used in the search. A
 * filter contains at least one attribute, a comparison operator, and the value
 * that is being searched for.
 */
export type ProductAttributeFilterInput = {
    /** Attribute label: Activity */
    activity?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Brand */
    brand?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Category Gear */
    category_gear?: Maybe<FilterEqualTypeInput>
    /** Filter product by category uid */
    category_uid?: Maybe<FilterEqualTypeInput>
    /** Filter product by category id */
    category_id?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Climate */
    climate?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Collar */
    collar?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Color */
    color?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Color Family */
    color_family?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Description */
    description?: Maybe<FilterMatchTypeInput>
    /** Attribute label: Eco Collection */
    eco_collection?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Erin Recommends */
    erin_recommends?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Features */
    features_bags?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Format */
    format?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Gender */
    gender?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Material */
    material?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Product Name */
    name?: Maybe<FilterMatchTypeInput>
    /** Attribute label: New */
    new?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Pattern */
    pattern?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Performance Fabric */
    performance_fabric?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Price */
    price?: Maybe<FilterRangeTypeInput>
    /** Attribute label: Purpose */
    purpose?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Sale */
    sale?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Short Description */
    short_description?: Maybe<FilterMatchTypeInput>
    /** Attribute label: Size */
    size?: Maybe<FilterEqualTypeInput>
    /** Attribute label: SKU */
    sku?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Sleeve */
    sleeve?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Strap/Handle */
    strap_bags?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Style Bags */
    style_bags?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Style Bottom */
    style_bottom?: Maybe<FilterEqualTypeInput>
    /** Attribute label: Style General */
    style_general?: Maybe<FilterEqualTypeInput>
    /** The part of the URL that identifies the product */
    url_key?: Maybe<FilterEqualTypeInput>
}

/**
 * ProductAttributeSortInput specifies the attribute to use for sorting search
 * results and indicates whether the results are sorted in ascending or descending
 * order. It's possible to sort products using searchable attributes with enabled
 * 'Use in Filter Options' option
 */
export type ProductAttributeSortInput = {
    /** Attribute label: Product Name */
    name?: Maybe<SortEnum>
    /** Sort by the position assigned to each product. */
    position?: Maybe<SortEnum>
    /** Attribute label: Price */
    price?: Maybe<SortEnum>
    /** Sort by the search relevance score (default). */
    relevance?: Maybe<SortEnum>
}

/** A discount applied to a product price. */
export type ProductDiscount = {
    __typename?: 'ProductDiscount'
    /** The actual value of the discount. */
    amount_off?: Maybe<Scalars['Float']>
    /** The discount expressed a percentage. */
    percent_off?: Maybe<Scalars['Float']>
}

/**
 * ProductFilterInput is deprecated, use @ProductAttributeFilterInput instead.
 * ProductFilterInput defines the filters to be used in the search. A filter
 * contains at least one attribute, a comparison operator, and the value that is
 * being searched for.
 */
export type ProductFilterInput = {
    /** Category ID the product belongs to. */
    category_id?: Maybe<FilterTypeInput>
    /** The product's country of origin. */
    country_of_manufacture?: Maybe<FilterTypeInput>
    /** Timestamp indicating when the product was created. */
    created_at?: Maybe<FilterTypeInput>
    /** The name of a custom layout. */
    custom_layout?: Maybe<FilterTypeInput>
    /** XML code that is applied as a layout update to the product page. */
    custom_layout_update?: Maybe<FilterTypeInput>
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: Maybe<FilterTypeInput>
    /** Indicates whether a gift message is available. */
    gift_message_available?: Maybe<FilterTypeInput>
    /** Indicates whether additional attributes have been created for the product. */
    has_options?: Maybe<FilterTypeInput>
    /** The relative path to the main image on the product page. */
    image?: Maybe<FilterTypeInput>
    /** The label assigned to a product image. */
    image_label?: Maybe<FilterTypeInput>
    /** Indicates whether the product can be returned */
    is_returnable?: Maybe<FilterTypeInput>
    /** A number representing the product's manufacturer. */
    manufacturer?: Maybe<FilterTypeInput>
    /** The numeric maximal price of the product. Do not include the currency code. */
    max_price?: Maybe<FilterTypeInput>
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: Maybe<FilterTypeInput>
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: Maybe<FilterTypeInput>
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: Maybe<FilterTypeInput>
    /** The numeric minimal price of the product. Do not include the currency code. */
    min_price?: Maybe<FilterTypeInput>
    /** The product name. Customers use this name to identify the product. */
    name?: Maybe<FilterTypeInput>
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    news_from_date?: Maybe<FilterTypeInput>
    /** The end date for new product listings. */
    news_to_date?: Maybe<FilterTypeInput>
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: Maybe<FilterTypeInput>
    /** The keyword required to perform a logical OR comparison. */
    or?: Maybe<ProductFilterInput>
    /** The price of an item. */
    price?: Maybe<FilterTypeInput>
    /** Indicates whether the product has required options. */
    required_options?: Maybe<FilterTypeInput>
    /** A short description of the product. Its use depends on the theme. */
    short_description?: Maybe<FilterTypeInput>
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: Maybe<FilterTypeInput>
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: Maybe<FilterTypeInput>
    /** The label assigned to a product's small image. */
    small_image_label?: Maybe<FilterTypeInput>
    /** The beginning date that a product has a special price. */
    special_from_date?: Maybe<FilterTypeInput>
    /** The discounted price of the product. Do not include the currency code. */
    special_price?: Maybe<FilterTypeInput>
    /** The end date that a product has a special price. */
    special_to_date?: Maybe<FilterTypeInput>
    /** The file name of a swatch image */
    swatch_image?: Maybe<FilterTypeInput>
    /** The relative path to the product's thumbnail image. */
    thumbnail?: Maybe<FilterTypeInput>
    /** The label assigned to a product's thumbnail image. */
    thumbnail_label?: Maybe<FilterTypeInput>
    /** The price when tier pricing is in effect and the items purchased threshold has been reached. */
    tier_price?: Maybe<FilterTypeInput>
    /** Timestamp indicating when the product was updated. */
    updated_at?: Maybe<FilterTypeInput>
    /** The part of the URL that identifies the product */
    url_key?: Maybe<FilterTypeInput>
    url_path?: Maybe<FilterTypeInput>
    /** The weight of the item, in units defined by the store. */
    weight?: Maybe<FilterTypeInput>
}

/** Product image information. Contains the image URL and label. */
export type ProductImage = MediaGalleryInterface & {
    __typename?: 'ProductImage'
    /** Whether the image is hidden from view. */
    disabled?: Maybe<Scalars['Boolean']>
    /** The label of the product image or video. */
    label?: Maybe<Scalars['String']>
    /** The media item's position after it has been sorted. */
    position?: Maybe<Scalars['Int']>
    /** Array of image types. It can have the following values: image, small_image, thumbnail. */
    types?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The URL of the product image or video. */
    url?: Maybe<Scalars['String']>
}

/**
 * The ProductInterface contains attributes that are common to all types of
 * products. Note that descriptions may not be available for custom and EAV attributes.
 */
export type ProductInterface = {
    Product_sizechart?: Maybe<Scalars['Int']>
    Product_sizechart_text?: Maybe<Scalars['String']>
    activity?: Maybe<Scalars['String']>
    /** The attribute set assigned to the product. */
    attribute_set_id?: Maybe<Scalars['Int']>
    brand?: Maybe<Scalars['Int']>
    brand_text?: Maybe<Scalars['String']>
    /**
     * Relative canonical URL. This value is returned only if the system setting 'Use
     * Canonical Link Meta Tag For Products' is enabled
     */
    canonical_url?: Maybe<Scalars['String']>
    /** The categories assigned to a product. */
    categories?: Maybe<Array<Maybe<CategoryInterface>>>
    category_gear?: Maybe<Scalars['String']>
    climate?: Maybe<Scalars['String']>
    collar?: Maybe<Scalars['String']>
    color?: Maybe<Scalars['String']>
    color_family?: Maybe<Scalars['String']>
    color_text?: Maybe<Scalars['String']>
    /** The product's country of origin. */
    country_of_manufacture?: Maybe<Scalars['String']>
    /** Timestamp indicating when the product was created. */
    created_at?: Maybe<Scalars['String']>
    /** Crosssell Products */
    crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: Maybe<ComplexTextValue>
    eco_collection?: Maybe<Scalars['Int']>
    eco_collection_text?: Maybe<Scalars['String']>
    eligible_for_pick_up?: Maybe<Scalars['Int']>
    eligible_for_pick_up_text?: Maybe<Scalars['String']>
    erin_recommends?: Maybe<Scalars['Int']>
    erin_recommends_text?: Maybe<Scalars['String']>
    features_bags?: Maybe<Scalars['String']>
    format?: Maybe<Scalars['Int']>
    format_text?: Maybe<Scalars['String']>
    gender?: Maybe<Scalars['String']>
    /** Indicates whether a gift message is available. */
    gift_message_available?: Maybe<Scalars['String']>
    /** The ID number assigned to the product. */
    id?: Maybe<Scalars['Int']>
    /** The relative path to the main image on the product page. */
    image?: Maybe<ProductImage>
    /** Indicates whether the product can be returned */
    is_returnable?: Maybe<Scalars['String']>
    /** A number representing the product's manufacturer. */
    manufacturer?: Maybe<Scalars['Int']>
    manufacturer_text?: Maybe<Scalars['String']>
    material?: Maybe<Scalars['String']>
    /** An array of Media Gallery objects. */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>
    /**
     * An array of MediaGalleryEntry objects.
     * @deprecated Use product's `media_gallery` instead
     */
    media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: Maybe<Scalars['String']>
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: Maybe<Scalars['String']>
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: Maybe<Scalars['String']>
    /** The product name. Customers use this name to identify the product. */
    name?: Maybe<Scalars['String']>
    new?: Maybe<Scalars['Int']>
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    new_from_date?: Maybe<Scalars['String']>
    new_text?: Maybe<Scalars['String']>
    /** The end date for new product listings. */
    new_to_date?: Maybe<Scalars['String']>
    /** Product stock only x left count */
    only_x_left_in_stock?: Maybe<Scalars['Float']>
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: Maybe<Scalars['String']>
    pattern?: Maybe<Scalars['String']>
    performance_fabric?: Maybe<Scalars['Int']>
    performance_fabric_text?: Maybe<Scalars['String']>
    /**
     * A ProductPrices object, indicating the price of an item.
     * @deprecated Use price_range for product price information.
     */
    price?: Maybe<ProductPrices>
    /** A PriceRange object, indicating the range of prices for the product */
    price_range: PriceRange
    /** An array of TierPrice objects. */
    price_tiers?: Maybe<Array<Maybe<TierPrice>>>
    product_label?: Maybe<Scalars['Int']>
    product_label_text?: Maybe<Scalars['String']>
    /** An array of ProductLinks objects. */
    product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>
    /** Product review summary and review count data */
    product_reviews?: Maybe<ProductReviews>
    purpose?: Maybe<Scalars['Int']>
    purpose_text?: Maybe<Scalars['String']>
    /** Algolia search result query ID sent back to Algolia through events. */
    queryID?: Maybe<Scalars['String']>
    /** Review/Rating related configurations */
    rating_configurations?: Maybe<RatingConfigurationData>
    /** The average of all the ratings given to the product. */
    rating_summary: Scalars['Float']
    /** Related Accessories */
    related_accessories_skus?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Related Products */
    related_products?: Maybe<Array<Maybe<ProductInterface>>>
    /** The total count of all the reviews given to the product. */
    review_count: Scalars['Int']
    /** Product review summary and review count data */
    review_details?: Maybe<ReviewParameters>
    /** The list of products reviews. */
    reviews: ProductReviews
    sale?: Maybe<Scalars['Int']>
    sale_text?: Maybe<Scalars['String']>
    /** A short description of the product. Its use depends on the theme. */
    short_description?: Maybe<ComplexTextValue>
    size?: Maybe<Scalars['String']>
    size_text?: Maybe<Scalars['String']>
    sizechart?: Maybe<Scalars['Int']>
    sizechart_text?: Maybe<Scalars['String']>
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: Maybe<Scalars['String']>
    sleeve?: Maybe<Scalars['String']>
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: Maybe<ProductImage>
    /** The beginning date that a product has a special price. */
    special_from_date?: Maybe<Scalars['String']>
    /** The discounted price of the product. */
    special_price?: Maybe<Scalars['Float']>
    /** The end date that a product has a special price. */
    special_to_date?: Maybe<Scalars['String']>
    /** Stock status of the product */
    stock_status?: Maybe<ProductStockStatus>
    strap_bags?: Maybe<Scalars['String']>
    style_bags?: Maybe<Scalars['String']>
    style_bottom?: Maybe<Scalars['String']>
    style_general?: Maybe<Scalars['String']>
    /** The file name of a swatch image */
    swatch_image?: Maybe<Scalars['String']>
    /** The relative path to the product's thumbnail image. */
    thumbnail?: Maybe<ProductImage>
    /**
     * The price when tier pricing is in effect and the items purchased threshold has been reached.
     * @deprecated Use price_tiers for product tier price information.
     */
    tier_price?: Maybe<Scalars['Float']>
    /**
     * An array of ProductTierPrices objects.
     * @deprecated Use price_tiers for product tier price information.
     */
    tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>
    /**
     * One of simple, virtual, bundle, downloadable, grouped, or configurable.
     * @deprecated Use __typename instead.
     */
    type_id?: Maybe<Scalars['String']>
    /** Timestamp indicating when the product was updated. */
    updated_at?: Maybe<Scalars['String']>
    uid?: Maybe<Scalars['Number']>
    /** Upsell Products */
    upsell_products?: Maybe<Array<Maybe<ProductInterface>>>
    /** The part of the URL that identifies the product */
    url_key?: Maybe<Scalars['String']>
    /** @deprecated Use product's `canonical_url` or url rewrites instead */
    url_path?: Maybe<Scalars['String']>
    /** URL rewrites list */
    url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>
    /** The part of the product URL that is appended after the url key */
    url_suffix?: Maybe<Scalars['String']>
    /**
     * An array of websites in which the product is available.
     * @deprecated The field should not be used on the storefront.
     */
    websites?: Maybe<Array<Maybe<Website>>>
    max_qty?: Maybe<number>

    // controls the display of variations in the PDP
    show_variations?: Maybe<Scalars['Boolean']>

    // control the display of the buy button in pdp and PLP
    not_sellable?: Maybe<Scalars['Boolean']>

    // If product applies for free shipping
    free_shipping?: Maybe<Scalars['Boolean']>

    // To set the days that the ship could last
    ships_within?: Maybe<Scalars['Int']>
}

/**
 * The ProductInterface contains attributes that are common to all types of
 * products. Note that descriptions may not be available for custom and EAV attributes.
 */
export type ProductInterfaceProduct_ReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/**
 * The ProductInterface contains attributes that are common to all types of
 * products. Note that descriptions may not be available for custom and EAV attributes.
 */
export type ProductInterfaceReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** ProductLinks is an implementation of ProductLinksInterface. */
export type ProductLinks = ProductLinksInterface & {
    __typename?: 'ProductLinks'
    /** One of related, associated, upsell, or crosssell. */
    link_type?: Maybe<Scalars['String']>
    /** The SKU of the linked product. */
    linked_product_sku?: Maybe<Scalars['String']>
    /** The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable). */
    linked_product_type?: Maybe<Scalars['String']>
    /** The position within the list of product links. */
    position?: Maybe<Scalars['Int']>
    /** The identifier of the linked product. */
    sku?: Maybe<Scalars['String']>
}

/** ProductLinks contains information about linked products, including the link type and product type of each item. */
export type ProductLinksInterface = {
    /** One of related, associated, upsell, or crosssell. */
    link_type?: Maybe<Scalars['String']>
    /** The SKU of the linked product. */
    linked_product_sku?: Maybe<Scalars['String']>
    /** The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable). */
    linked_product_type?: Maybe<Scalars['String']>
    /** The position within the list of product links. */
    position?: Maybe<Scalars['Int']>
    /** The identifier of the linked product. */
    sku?: Maybe<Scalars['String']>
}

/** ProductMediaGalleryEntriesContent contains an image in base64 format and basic information about the image. */
export type ProductMediaGalleryEntriesContent = {
    __typename?: 'ProductMediaGalleryEntriesContent'
    /** The image in base64 format. */
    base64_encoded_data?: Maybe<Scalars['String']>
    /** The file name of the image. */
    name?: Maybe<Scalars['String']>
    /** The MIME type of the file, such as image/png. */
    type?: Maybe<Scalars['String']>
}

/** ProductMediaGalleryEntriesVideoContent contains a link to a video file and basic information about the video. */
export type ProductMediaGalleryEntriesVideoContent = {
    __typename?: 'ProductMediaGalleryEntriesVideoContent'
    /** Must be external-video. */
    media_type?: Maybe<Scalars['String']>
    /** A description of the video. */
    video_description?: Maybe<Scalars['String']>
    /** Optional data about the video. */
    video_metadata?: Maybe<Scalars['String']>
    /** Describes the video source. */
    video_provider?: Maybe<Scalars['String']>
    /** The title of the video. */
    video_title?: Maybe<Scalars['String']>
    /** The URL to the video. */
    video_url?: Maybe<Scalars['String']>
}

export type ProductOptions = {
    __typename?: 'ProductOptions'
    /** Bundle Product options */
    bundle_options?: Maybe<Array<Maybe<BundleOptions>>>
    /** Config Product options */
    config_options?: Maybe<Array<Maybe<ConfigOptions>>>
}

/** Represents a product price. */
export type ProductPrice = {
    __typename?: 'ProductPrice'
    /** The price discount. Represents the difference between the regular and final price. */
    discount?: Maybe<ProductDiscount>
    /** The final price of the product after discounts applied. */
    final_price: Money
    /** The multiple FPTs that can be applied to a product price. */
    fixed_product_taxes?: Maybe<Array<Maybe<FixedProductTax>>>
    /** The regular price of the product. */
    regular_price: Money
}

/**
 * ProductPrices is deprecated, replaced by PriceRange. The ProductPrices object
 * contains the regular price of an item, as well as its minimum and maximum
 * prices. Only composite products, which include bundle, configurable, and grouped
 * products, can contain a minimum and maximum price.
 */
export type ProductPrices = {
    __typename?: 'ProductPrices'
    /**
     * The highest possible final price for all the options defined within a
     * composite product. If you are specifying a price range, this would be the to value.
     * @deprecated Use PriceRange.maximum_price.
     */
    maximalPrice?: Maybe<Price>
    /**
     * The lowest possible final price for all the options defined within a composite
     * product. If you are specifying a price range, this would be the from value.
     * @deprecated Use PriceRange.minimum_price.
     */
    minimalPrice?: Maybe<Price>
    /**
     * The base price of a product.
     * @deprecated Use regular_price from PriceRange.minimum_price or PriceRange.maximum_price.
     */
    regularPrice?: Maybe<Price>
}

/** Details of a product review */
export type ProductReview = {
    __typename?: 'ProductReview'
    /** The average rating for product review. */
    average_rating: Scalars['Float']
    /** Date indicating when the review was created. */
    created_at: Scalars['String']
    /** The customer's nickname. Defaults to the customer name, if logged in */
    nickname: Scalars['String']
    /** Contains details about the reviewed product */
    product: ProductInterface
    /** An array of ratings by rating category, such as quality, price, and value */
    ratings_breakdown: Array<Maybe<ProductReviewRating>>
    /** The summary (title) of the review */
    summary: Scalars['String']
    /** The review text. */
    text: Scalars['String']
}

export type ProductReviewRating = {
    __typename?: 'ProductReviewRating'
    /** The label assigned to an aspect of a product that is being rated, such as quality or price */
    name: Scalars['String']
    /** The rating value given by customer. By default, possible values range from 1 to 5. */
    value: Scalars['String']
}

export type ProductReviewRatingInput = {
    /** An encoded rating ID. */
    id: Scalars['String']
    /** An encoded rating value id. */
    value_id: Scalars['String']
}

export type ProductReviewRatingMetadata = {
    __typename?: 'ProductReviewRatingMetadata'
    /** An encoded rating ID. */
    id: Scalars['String']
    /** The label assigned to an aspect of a product that is being rated, such as quality or price */
    name: Scalars['String']
    /** List of product review ratings sorted by position. */
    values: Array<Maybe<ProductReviewRatingValueMetadata>>
}

export type ProductReviewRatingsMetadata = {
    __typename?: 'ProductReviewRatingsMetadata'
    /** List of product reviews sorted by position */
    items: Array<Maybe<ProductReviewRatingMetadata>>
}

export type ProductReviewRatingValueMetadata = {
    __typename?: 'ProductReviewRatingValueMetadata'
    /** A ratings scale, such as the number of stars awarded */
    value: Scalars['String']
    /** An encoded rating value id. */
    value_id: Scalars['String']
}

/** The ProductReviews is the top-level object returned for the ProductReviews query */
export type ProductReviews = {
    __typename?: 'ProductReviews'
    /** An array of product reviews. */
    items: Array<Maybe<ProductReview>>
    /** Metadata for pagination rendering. */
    page_info: SearchResultPageInfo
    product_reviews_data?: Maybe<Array<Maybe<ProductReviewsData>>>
    /** Total count */
    total_count?: Maybe<Scalars['Int']>
    /** Total count */
    total_pages?: Maybe<Scalars['Int']>
}

/** Get Customer specific reviews */
export type ProductReviewsData = {
    __typename?: 'ProductReviewsData'
    /** Customer rating for product */
    product_rating?: Maybe<Scalars['String']>
    /** Product review added date */
    product_review_added_at?: Maybe<Scalars['String']>
    /** Produt reviewr's Nickname */
    product_review_by?: Maybe<Scalars['String']>
    /** Product Review content */
    product_review_detail?: Maybe<Scalars['String']>
    /** Product Review Title */
    product_review_title?: Maybe<Scalars['String']>
}

/** The Products object is the top-level object returned in a product search. */
export type Products = {
    __typename?: 'Products'
    /** Layered navigation aggregations. */
    aggregations?: Maybe<Array<Maybe<Aggregation>>>
    /**
     * Layered navigation filters array.
     * @deprecated Use aggregations instead
     */
    filters?: Maybe<Array<Maybe<LayerFilter>>>
    /** An array of products that match the specified search criteria. */
    items?: Maybe<Array<Maybe<ProductInterface>>>
    /** An object that includes the page_info and currentPage values specified in the query. */
    page_info?: Maybe<SearchResultPageInfo>
    /** An object that includes the default sort field and all available sort fields. */
    sort_fields?: Maybe<SortFields>
    /**
     * The number of products that are marked as visible. By default, in complex
     * products, parent products are visible, but their child products are not.
     */
    total_count?: Maybe<Scalars['Int']>
    /** Algolia search result query ID sent back to Algolia through events. */
    queryID?: Maybe<Scalars['String']>
}

export type Keywords = {
    keywords: string[]
}

/**
 * ProductSortInput is deprecated, use @ProductAttributeSortInput instead.
 * ProductSortInput specifies the attribute to use for sorting search results and
 * indicates whether the results are sorted in ascending or descending order.
 */
export type ProductSortInput = {
    /** The product's country of origin. */
    country_of_manufacture?: Maybe<SortEnum>
    /** Timestamp indicating when the product was created. */
    created_at?: Maybe<SortEnum>
    /** The name of a custom layout. */
    custom_layout?: Maybe<SortEnum>
    /** XML code that is applied as a layout update to the product page. */
    custom_layout_update?: Maybe<SortEnum>
    /** Detailed information about the product. The value can include simple HTML tags. */
    description?: Maybe<SortEnum>
    /** Indicates whether a gift message is available. */
    gift_message_available?: Maybe<SortEnum>
    /** Indicates whether additional attributes have been created for the product. */
    has_options?: Maybe<SortEnum>
    /** The relative path to the main image on the product page. */
    image?: Maybe<SortEnum>
    /** The label assigned to a product image. */
    image_label?: Maybe<SortEnum>
    /** Indicates whether the product can be returned */
    is_returnable?: Maybe<SortEnum>
    /** A number representing the product's manufacturer. */
    manufacturer?: Maybe<SortEnum>
    /** A brief overview of the product for search results listings, maximum 255 characters. */
    meta_description?: Maybe<SortEnum>
    /** A comma-separated list of keywords that are visible only to search engines. */
    meta_keyword?: Maybe<SortEnum>
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    meta_title?: Maybe<SortEnum>
    /** The product name. Customers use this name to identify the product. */
    name?: Maybe<SortEnum>
    /** The beginning date for new product listings, and determines if the product is featured as a new product. */
    news_from_date?: Maybe<SortEnum>
    /** The end date for new product listings. */
    news_to_date?: Maybe<SortEnum>
    /** If the product has multiple options, determines where they appear on the product page. */
    options_container?: Maybe<SortEnum>
    /** The price of the item. */
    price?: Maybe<SortEnum>
    /** Indicates whether the product has required options. */
    required_options?: Maybe<SortEnum>
    /** A short description of the product. Its use depends on the theme. */
    short_description?: Maybe<SortEnum>
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
    sku?: Maybe<SortEnum>
    /** The relative path to the small image, which is used on catalog pages. */
    small_image?: Maybe<SortEnum>
    /** The label assigned to a product's small image. */
    small_image_label?: Maybe<SortEnum>
    /** The beginning date that a product has a special price. */
    special_from_date?: Maybe<SortEnum>
    /** The discounted price of the product. */
    special_price?: Maybe<SortEnum>
    /** The end date that a product has a special price. */
    special_to_date?: Maybe<SortEnum>
    /** The file name of a swatch image */
    swatch_image?: Maybe<SortEnum>
    /** The relative path to the product's thumbnail image. */
    thumbnail?: Maybe<SortEnum>
    /** The label assigned to a product's thumbnail image. */
    thumbnail_label?: Maybe<SortEnum>
    /** The price when tier pricing is in effect and the items purchased threshold has been reached. */
    tier_price?: Maybe<SortEnum>
    /** Timestamp indicating when the product was updated. */
    updated_at?: Maybe<SortEnum>
    /** The part of the URL that identifies the product */
    url_key?: Maybe<SortEnum>
    url_path?: Maybe<SortEnum>
    /** The weight of the item, in units defined by the store. */
    weight?: Maybe<SortEnum>
}

/**
 * ProductTierPrices is deprecated and has been replaced by TierPrice. The
 * ProductTierPrices object defines a tier price, which is a quantity discount
 * offered to a specific customer group.
 */
export type ProductTierPrices = {
    __typename?: 'ProductTierPrices'
    /**
     * The ID of the customer group.
     * @deprecated customer_group_id is not relevant for storefront.
     */
    customer_group_id?: Maybe<Scalars['String']>
    /**
     * The percentage discount of the item.
     * @deprecated ProductTierPrices is deprecated. Use TierPrice.discount.
     */
    percentage_value?: Maybe<Scalars['Float']>
    /**
     * The number of items that must be purchased to qualify for tier pricing.
     * @deprecated ProductTierPrices is deprecated, use TierPrice.quantity.
     */
    qty?: Maybe<Scalars['Float']>
    /**
     * The price of the fixed price item.
     * @deprecated ProductTierPrices is deprecated. Use TierPrice.final_price
     */
    value?: Maybe<Scalars['Float']>
    /**
     * The ID assigned to the website.
     * @deprecated website_id is not relevant for storefront.
     */
    website_id?: Maybe<Scalars['Float']>
}

/** Contains information about a product video. */
export type ProductVideo = MediaGalleryInterface & {
    __typename?: 'ProductVideo'
    /** Whether the image is hidden from view. */
    disabled?: Maybe<Scalars['Boolean']>
    /** The label of the product image or video. */
    label?: Maybe<Scalars['String']>
    /** The media item's position after it has been sorted. */
    position?: Maybe<Scalars['Int']>
    /** Array of image types. It can have the following values: image, small_image, thumbnail. */
    types?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The URL of the product image or video. */
    url?: Maybe<Scalars['String']>
    /** Contains a ProductMediaGalleryEntriesVideoContent object. */
    video_content?: Maybe<ProductMediaGalleryEntriesVideoContent>
}

export type Query = {
    __typename?: 'Query'
    /** Subscription Data */
    SubscriptionData?: Maybe<GetSubscriptionData>
    /** Get a list of available store views and their config information. */
    availableStores?: Maybe<Array<Maybe<StoreConfig>>>
    /** Query which returns the Avalara Integration token */
    avalaraToken?: Maybe<AvalaraToken>
    /** Check whether RMA available */
    canCreateRma?: Maybe<CanCreateRmaOutput>
    /** Returns information about shopping cart */
    cart?: Maybe<Cart>
    categories?: Maybe<CategoryResult>
    /**
     * The category query searches for categories that match the criteria specified in the search and filter attributes.
     * @deprecated Use 'categoryList' query instead of 'category' query
     */
    category?: Maybe<CategoryTree>
    /** Returns an array of categories based on the specified filters. */
    categoryList?: Maybe<Array<Maybe<CategoryTree>>>
    /** The Checkout Agreements information */
    checkoutAgreements?: Maybe<Array<Maybe<CheckoutAgreement>>>
    /** The CMS block query returns information about CMS blocks */
    cmsBlocks?: Maybe<CmsBlocks>
    /** The CMS page query returns information about a CMS page */
    cmsPage?: Maybe<CmsPage>
    /** Company assigned to the currently authenticated user */
    company?: Maybe<Company>
    /** The countries query provides information for all countries. */
    countries?: Maybe<Array<Maybe<Country>>>
    /** The countries query provides information for a single country. */
    country?: Maybe<Country>
    /** The currency query returns information about store currency. */
    currency?: Maybe<Currency>
    /** The customAttributeMetadata query returns the attribute type, given an attribute code and entity type */
    customAttributeMetadata?: Maybe<CustomAttributeMetadata>
    /** The customer query returns information about a customer account */
    customer?: Maybe<Customer>
    /** Returns information about the customer shopping cart */
    customerCart: Cart
    /** The query returns the contents of a customer's downloadable products */
    customerDownloadableProducts?: Maybe<CustomerDownloadableProducts>
    /** @deprecated Use orders from customer instead */
    customerOrders?: Maybe<CustomerOrders>
    /** Return a list of customer payment tokens */
    customerPaymentTokens?: Maybe<CustomerPaymentTokens>
    /** Get all Orders for a customer */
    customerSalesOrders?: Maybe<CustomerSalesOrders>
    /** Get company credit details */
    getCompanyCredit?: Maybe<CompanyCreditOutput>
    /** Get company structure hierarchy by id */
    getCompanyStructureHierarchy?: Maybe<Array<Maybe<CompanyHierarchyElement>>>
    /** Get company user details by id */
    getCompanyUserDetails?: Maybe<CompanyUserDetails>
    /** Retrieve secure PayPal url for Payments Pro Hosted Solution transaction. */
    getHostedProUrl?: Maybe<HostedProUrl>
    /** Get max value of requisition list creation */
    getMaxCountRequisitionList?: Maybe<Scalars['Int']>
    /** Retrieve payment credentials for transaction. Use this query for Payflow Link and Payments Advanced payment methods. */
    getPayflowLinkToken?: Maybe<PayflowLinkToken>
    /** Recently Viewed Product Configuration */
    getRecentlyViewedConfig?: Maybe<RecentlyViewedConfigOutput>
    /** An array of Rma attributes */
    getRmaFormAttributes?: Maybe<RmaFormAttributes>
    /** An array of Rma Items */
    getRmaFormItems?: Maybe<RmaFormItems>
    /** Return the target rule for the product */
    getTargetRule?: Maybe<TargetRuleOutput>
    /** Get information for gift card account by code */
    giftCardAccount?: Maybe<GiftCardAccount>
    /** Retrieves order data for guest users. */
    guestOrderDetails?: Maybe<OrderDetails>
    /** The requisition list query checks whether Requisition list is enabled */
    isActiveRequisitionList?: Maybe<Scalars['Boolean']>
    isEmailAvailable?: Maybe<IsEmailAvailableOutput>
    /** An array of Returns By Customer Id */
    listReturnsByCustomer?: Maybe<ReturnsByCustomer>
    /** An array of Returns By Order Id */
    listReturnsByOrder?: Maybe<ReturnsByOrder>
    /** The wishlist query returns the list of wish lists */
    multiple_wishlist?: Maybe<Array<Maybe<WishlistOutput>>>
    /** The wishlist query checks whether multiple wish list nis enabled */
    multiple_wishlist_enabled?: Maybe<Scalars['Boolean']>
    /** The Order Details query returns information about a Sales order */
    orderDetails?: Maybe<OrderDetails>
    /** The pickup locations query searches for locations that match the search request requirements. */
    pickupLocations?: Maybe<PickupLocations>
    /** Retrieves metadata required by clients to render the Reviews section. */
    productReviewRatingsMetadata: ProductReviewRatingsMetadata
    /** The products query searches for products that match the criteria specified in the search and filter attributes. */
    products?: Maybe<Products>
    /** Keywords query returns suggested keywords based on the search term */
    keywords?: Maybe<Keywords>
    /** The requisition list query returns the contents of a customer's requisition list */
    requisitionList?: Maybe<RequisitionListOutput>
    /** The Return Details query returns information about a Sales Return */
    returnDetails?: Maybe<ReturnDetails>
    /** The wishlist query returns the contents of a shred customer's wish list */
    shared_wishlist?: Maybe<WishlistOutput>
    /** The store config query */
    storeConfig?: Maybe<StoreConfig>
    /** Get the current customer's stored card(s), if any. Takes optional hash for a specific card. */
    tokenBaseCards?: Maybe<Array<Maybe<TokenBaseCard>>>
    /** Get checkout configuration for the given TokenBase payment method. */
    tokenBaseCheckoutConfig?: Maybe<TokenBaseCheckoutConfig>
    /**
     * The urlResolver query returns the relative URL for a specified product,
     * category or CMS page, using as input a url_key appended by the url_suffix, if one exists
     */
    urlResolver?: Maybe<EntityUrl>
    /** Metadata tags (HTML) relevant to the current URL key */
    urlSeoMetadata?: Maybe<Scalars['String']>
    /**
     * The wishlist query returns the contents of a customer's wish list
     * @deprecated Moved under `Customer` `wishlist`
     */
    wishlist?: Maybe<WishlistOutput>
    /** Regular expression list for each country. */
    zip_code_validators?: Maybe<ZipCodeValidatorsOutput>
}

export type QuerySubscriptionDataArgs = {
    email: Scalars['String']
}

export type QueryCanCreateRmaArgs = {
    orderId?: Maybe<Scalars['Int']>
}

export type QueryCartArgs = {
    cart_id: Scalars['String']
}

export type QueryCategoriesArgs = {
    filters?: Maybe<CategoryFilterInput>
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type QueryCategoryArgs = {
    id?: Maybe<Scalars['Int']>
}

export type QueryCategoryListArgs = {
    filters?: Maybe<CategoryFilterInput>
}

export type QueryCmsBlocksArgs = {
    identifiers?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryCmsPageArgs = {
    id?: Maybe<Scalars['Int']>
    identifier?: Maybe<Scalars['String']>
}

export type QueryCountryArgs = {
    id?: Maybe<Scalars['String']>
}

export type QueryCustomAttributeMetadataArgs = {
    attributes: Array<AttributeInput>
}

export type QueryCustomerSalesOrdersArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type QueryGetCompanyCreditArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type QueryGetCompanyStructureHierarchyArgs = {
    tree_id: Scalars['ID']
}

export type QueryGetCompanyUserDetailsArgs = {
    id: Scalars['ID']
}

export type QueryGetHostedProUrlArgs = {
    input: HostedProUrlInput
}

export type QueryGetPayflowLinkTokenArgs = {
    input: PayflowLinkTokenInput
}

export type QueryGetRmaFormItemsArgs = {
    orderId?: Maybe<Scalars['Int']>
}

export type QueryGetTargetRuleArgs = {
    type?: Maybe<Scalars['Int']>
}

export type QueryGiftCardAccountArgs = {
    input: GiftCardAccountInput
}

export type QueryGuestOrderDetailsArgs = {
    input?: Maybe<GuestInput>
}

export type QueryIsEmailAvailableArgs = {
    email: Scalars['String']
}

export type QueryListReturnsByCustomerArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type QueryListReturnsByOrderArgs = {
    orderId?: Maybe<Scalars['Int']>
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type QueryMultiple_WishlistArgs = {
    wishlistId?: Maybe<Scalars['Int']>
}

export type QueryOrderDetailsArgs = {
    id?: Maybe<Scalars['Int']>
}

export type QueryPickupLocationsArgs = {
    area?: Maybe<AreaInput>
    filters?: Maybe<PickupLocationFilterInput>
    sort?: Maybe<PickupLocationSortInput>
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type QueryProductsArgs = {
    search?: Maybe<Scalars['String']>
    filter?: Maybe<ProductAttributeFilterInput>
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
    sort?: Maybe<ProductAttributeSortInput>
    searchCriteria?: SearchCriteria[]
}

export type QueryRequisitionListArgs = {
    requisitionListId?: Maybe<Scalars['Int']>
}

export type QueryReturnDetailsArgs = {
    id?: Maybe<Scalars['Int']>
}

export type QueryShared_WishlistArgs = {
    code?: Maybe<Scalars['String']>
}

export type QueryTokenBaseCardsArgs = {
    hash?: Maybe<Scalars['String']>
}

export type QueryTokenBaseCheckoutConfigArgs = {
    method: Scalars['String']
}

export type QueryUrlResolverArgs = {
    url: Scalars['String']
}

export type QueryUrlSeoMetadataArgs = {
    url: Scalars['String']
}

/** Return rating comnfiguration parameters */
export type RatingConfigurationData = {
    __typename?: 'RatingConfigurationData'
    /** Rating attributes configured on the current store. */
    rating_attributes?: Maybe<Scalars['String']>
}

export type RecentlyViewedConfigOutput = {
    __typename?: 'RecentlyViewedConfigOutput'
    /** Recently Viewed Product Settings */
    IsEnable?: Maybe<Scalars['Int']>
    /** Maximum Number Of Product */
    MaximumNumberOfProduct?: Maybe<Scalars['Int']>
}

export type Region = {
    __typename?: 'Region'
    code?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['Int']>
    name?: Maybe<Scalars['String']>
}

export type RemoveCouponFromCartInput = {
    cart_id: Scalars['String']
}

export type RemoveCouponFromCartOutput = {
    __typename?: 'RemoveCouponFromCartOutput'
    cart?: Maybe<Cart>
}

/** Defines the input required to run the removeGiftCardFromCart mutation */
export type RemoveGiftCardFromCartInput = {
    /** The unique ID that identifies the customer's cart */
    cart_id: Scalars['String']
    /** The gift card code to be removed to the cart */
    gift_card_code: Scalars['String']
}

/** Defines the possible output for the removeGiftCardFromCart mutation */
export type RemoveGiftCardFromCartOutput = {
    __typename?: 'RemoveGiftCardFromCartOutput'
    /** Describes the contents of the specified shopping cart */
    cart: Cart
}

export type RemoveItemFromCartInput = {
    cart_id: Scalars['String']
    cart_item_id: Scalars['Int']
}

export type RemoveItemFromCartOutput = {
    __typename?: 'RemoveItemFromCartOutput'
    cart: Cart
}

export type RemoveItemWishlistInput = {
    items?: Maybe<Array<Maybe<WishlistRemoveItem>>>
}

export type RemoveItemWishlistOutput = {
    __typename?: 'RemoveItemWishlistOutput'
    /** Remove item wishlist message */
    messages?: Maybe<Scalars['String']>
}

/** Contains the customer's wish list and any errors encountered */
export type RemoveProductsFromWishlistOutput = {
    __typename?: 'RemoveProductsFromWishlistOutput'
    /** An array of errors encountered while deleting products from a wish list */
    user_errors: Array<Maybe<WishListUserInputError>>
    /** Contains the wish list with after items were successfully deleted */
    wishlist: Wishlist
}

export type RemoveRequisitionListItemInput = {
    items?: Maybe<Array<Maybe<RequisitionListItem>>>
    /** Requisition List ID */
    requisitionListId?: Maybe<Scalars['Int']>
}

export type RemoveRequisitionListItemOutput = {
    __typename?: 'RemoveRequisitionListItemOutput'
    /** Remove item from requisition list message */
    messages?: Maybe<Scalars['String']>
}

export type RemoveRequisitionListOutput = {
    __typename?: 'RemoveRequisitionListOutput'
    /** Requisition list remove response */
    messages?: Maybe<Scalars['String']>
}

export type RemoveRewardPointsFromCartOutput = {
    __typename?: 'RemoveRewardPointsFromCartOutput'
    /** The customer cart after reward points are removed */
    cart: Cart
}

/** Defines the input required to run the removeStoreCreditFromCart mutation */
export type RemoveStoreCreditFromCartInput = {
    /** The unique ID that identifies the customer's cart */
    cart_id: Scalars['String']
}

/** Defines the possible output for the removeStoreCreditFromCart mutation */
export type RemoveStoreCreditFromCartOutput = {
    __typename?: 'RemoveStoreCreditFromCartOutput'
    /** Describes the contents of the specified shopping cart */
    cart: Cart
}

export type RemoveWishlistInfo = {
    /** Wishlist ID */
    wishlistId?: Maybe<Scalars['Int']>
}

export type RemoveWishlistOutput = {
    __typename?: 'RemoveWishlistOutput'
    /** Wishlist remove response */
    messages?: Maybe<Scalars['String']>
}

export type RenameRequisitionListInput = {
    /** Requisition list description */
    description?: Maybe<Scalars['String']>
    /** Requisition list name */
    name?: Maybe<Scalars['String']>
    /** Requisition List ID */
    requisitionListId?: Maybe<Scalars['Int']>
}

export type RenameRequisitionListOutput = {
    __typename?: 'RenameRequisitionListOutput'
    /** Requisition list rename response */
    messages?: Maybe<Scalars['String']>
}

export type RenameWishlistInput = {
    /** Wishlist name */
    name?: Maybe<Scalars['String']>
    /** A flag that means wishlist public or not */
    visibility?: Maybe<Scalars['Boolean']>
    /** Requisition List ID */
    wishlistId?: Maybe<Scalars['Int']>
}

export type RenameWishlistOutput = {
    __typename?: 'RenameWishlistOutput'
    /** Wishlist rename response */
    messages?: Maybe<Scalars['String']>
}

export type ReorderItemsOutput = {
    __typename?: 'ReorderItemsOutput'
    /** Contains detailed information about the customer's cart. */
    cart: Cart
    /** An array of reordering errors. */
    userInputErrors: Array<Maybe<CheckoutUserInputError>>
}

export type RequisitionItemList = {
    __typename?: 'RequisitionItemList'
    /** Requisition Item list ID */
    itemId?: Maybe<Scalars['Int']>
    product?: Maybe<ProductInterface>
    /** Item quantity */
    qty?: Maybe<Scalars['Int']>
    /** Requisition item options */
    selectedProductId?: Maybe<Scalars['String']>
    /** Requisition item sku */
    sku?: Maybe<Scalars['String']>
    /** Requisition item store ID */
    storeId?: Maybe<Scalars['Int']>
}

export type RequisitionList = {
    __typename?: 'RequisitionList'
    /** Requisition list description */
    description?: Maybe<Scalars['String']>
    /** Requisition list ID */
    id?: Maybe<Scalars['Int']>
    /** An array of items in the customer's Requisition list */
    items?: Maybe<Array<Maybe<RequisitionItemList>>>
    /** The number of items in the wish list */
    items_count?: Maybe<Scalars['Int']>
    /** Requisition list name */
    name?: Maybe<Scalars['String']>
    /** Requisition list updated at */
    updatedAt?: Maybe<Scalars['String']>
}

export type RequisitionListItemsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type RequisitionListInfo = {
    /** Requisition list description */
    description?: Maybe<Scalars['String']>
    /** Requisition list name */
    name?: Maybe<Scalars['String']>
}

export type RequisitionListInput = {
    /** Requisition List ID */
    requisitionListId?: Maybe<Scalars['Int']>
}

export type RequisitionListItem = {
    /** Requisition list item ID */
    itemId?: Maybe<Scalars['Int']>
}

export type RequisitionListItemToUpdate = {
    /** The wish list item ID */
    id?: Maybe<Scalars['Int']>
    /** The quantity of this wish list item */
    qty?: Maybe<Scalars['Float']>
}

export type RequisitionListOutput = {
    __typename?: 'RequisitionListOutput'
    /** Total Requisition list */
    count?: Maybe<Scalars['Int']>
    /** Requisition list ID's */
    requisitionList?: Maybe<Array<Maybe<RequisitionList>>>
}

export type RequisitionListProduct = {
    /** Item quantity */
    qty: Scalars['Int']
    /** Product SKU */
    sku?: Maybe<Scalars['String']>
    /** A list of super attributes for configurable products */
    super_attribute?: Maybe<Array<Maybe<SuperAttribute>>>
}

/** Sales Return GraphQl gather Data of specific order information */
export type ReturnDetails = {
    __typename?: 'ReturnDetails'
    /** An array of all comments added on return */
    comments?: Maybe<Array<Maybe<Comments>>>
    /** Rma return customer custom email  */
    customer_custom_email?: Maybe<Scalars['String']>
    /** Rma return customer email  */
    customer_email?: Maybe<Scalars['String']>
    /** Rma return customer name  */
    customer_name?: Maybe<Scalars['String']>
    /** Rma requested date */
    date_requested?: Maybe<Scalars['String']>
    /** Return unique identifier */
    entity_id: Scalars['Int']
    /** Increment Id of Sales Return */
    increment_id?: Maybe<Scalars['String']>
    /** An array of all items data of return */
    items?: Maybe<Array<Maybe<Items>>>
    /** Entity Id of Sales Order */
    order_id?: Maybe<Scalars['Int']>
    /** Increment Id of Sales Order */
    order_increment_id?: Maybe<Scalars['String']>
    /** Rma return address  */
    return_address?: Maybe<Scalars['String']>
    /** Rma current status */
    status?: Maybe<Scalars['String']>
}

/** List all Returns Items created by a customer */
export type ReturnItemsCustomer = {
    __typename?: 'ReturnItemsCustomer'
    /** Rma submit date */
    date_requested?: Maybe<Scalars['String']>
    /** Rma id */
    id?: Maybe<Scalars['String']>
    /** Rma Increment id */
    increment_id?: Maybe<Scalars['String']>
    /** Rma ship from customer name */
    ship_from?: Maybe<Scalars['String']>
    /** Rma processing status */
    status?: Maybe<Scalars['String']>
}

export type ReturnItemsOrder = {
    __typename?: 'ReturnItemsOrder'
    /** Rma submit date */
    date_requested?: Maybe<Scalars['String']>
    /** Rma id */
    id?: Maybe<Scalars['String']>
    /** Rma Increment id */
    increment_id?: Maybe<Scalars['String']>
    /** Rma ship from customer name */
    ship_from?: Maybe<Scalars['String']>
    /** Rma processing status */
    status?: Maybe<Scalars['String']>
}

/** List all Returns created by a customer */
export type ReturnsByCustomer = {
    __typename?: 'ReturnsByCustomer'
    /** Array of Return Items By a customer */
    returns_by_customer?: Maybe<Array<Maybe<ReturnItemsCustomer>>>
    /** Total Sales Returns for the customer */
    total_count?: Maybe<Scalars['Int']>
}

export type ReturnsByOrder = {
    __typename?: 'ReturnsByOrder'
    /** Array of Return Items For an Order */
    returns_by_order?: Maybe<Array<Maybe<ReturnItemsOrder>>>
    /** Total Sales Returns created for the Order */
    total_count?: Maybe<Scalars['Int']>
}

export type ReviewInput = {
    /** The detail of the review. */
    detail?: Maybe<Scalars['String']>
    /** The nickname of the reviewer. */
    nickname?: Maybe<Scalars['String']>
    /** Current Product ID */
    product_id?: Maybe<Scalars['Int']>
    /** product ratings */
    ratings?: Maybe<Scalars['String']>
    /** The title of the review. */
    title?: Maybe<Scalars['String']>
}

/** ReviewParameters defines the usage of Review summary and Review count to be listed */
export type ReviewParameters = {
    __typename?: 'ReviewParameters'
    /** Return number of reviews associated with the Product */
    review_count?: Maybe<Scalars['Int']>
    /** Review Summary associated with the product in percentage. */
    review_summary?: Maybe<Scalars['Float']>
}

export type RevokeCustomerTokenOutput = {
    __typename?: 'RevokeCustomerTokenOutput'
    result: Scalars['Boolean']
}

export type RewardPoints = {
    __typename?: 'RewardPoints'
    /** The current balance of reward points */
    balance?: Maybe<RewardPointsAmount>
    /**
     * The balance history of reward points. If the ability for customers to view the
     * balance history has been disabled in the Admin, this field will be set to null
     */
    balance_history?: Maybe<Array<Maybe<RewardPointsBalanceHistoryItem>>>
    /** The current exchange rates for reward points */
    exchange_rates?: Maybe<RewardPointsExchangeRates>
    /** The subscription status of emails related to reward points */
    subscription_status?: Maybe<RewardPointsSubscriptionStatus>
}

export type RewardPointsAmount = {
    __typename?: 'RewardPointsAmount'
    /** Reward points amount in store currency */
    money: Money
    /** Reward points amount in points */
    points: Scalars['Float']
}

export type RewardPointsBalanceHistoryItem = {
    __typename?: 'RewardPointsBalanceHistoryItem'
    /** Reward points balance after the completion of the transaction */
    balance?: Maybe<RewardPointsAmount>
    /** The reason the balance changed */
    change_reason: Scalars['String']
    /** Transaction date */
    date: Scalars['String']
    /** The number of points added or deducted in the transaction */
    points_change: Scalars['Float']
}

/** Exchange rates depend on the customer group */
export type RewardPointsExchangeRates = {
    __typename?: 'RewardPointsExchangeRates'
    /** How many points are earned for a given amount spent */
    earning?: Maybe<RewardPointsRate>
    /** How many points must be redeemed to get a given amount of currency discount at the checkout */
    redemption?: Maybe<RewardPointsRate>
}

export type RewardPointsRate = {
    __typename?: 'RewardPointsRate'
    /**
     * The money value for exchange rate. For earnings this is amount spent to earn
     * the specified points. For redemption this is the amount of money the number of
     * points represents.
     */
    currency_amount: Scalars['Float']
    /**
     * The number of points for exchange rate. For earnings this is the number of
     * points earned. For redemption this is the number of points needed for redemption.
     */
    points: Scalars['Float']
}

export type RewardPointsSubscriptionStatus = {
    __typename?: 'RewardPointsSubscriptionStatus'
    /** Customer subscription status to 'Reward points balance updates' emails */
    balance_updates: RewardPointsSubscriptionStatusesEnum
    /** Customer subscription status to 'Reward points expiration notifications' emails */
    points_expiration_notifications: RewardPointsSubscriptionStatusesEnum
}

export enum RewardPointsSubscriptionStatusesEnum {
    Subscribed = 'SUBSCRIBED',
    NotSubscribed = 'NOT_SUBSCRIBED'
}

export type RmaAttributeValues = {
    __typename?: 'RmaAttributeValues'
    /** Rma attribute option id */
    option_id?: Maybe<Scalars['String']>
    /** Rma attribute option value */
    option_value?: Maybe<Scalars['String']>
}

export type RmaFormAttribute = {
    __typename?: 'RmaFormAttribute'
    /** Rma attribute code */
    code?: Maybe<Scalars['String']>
    /** Rma attribute label */
    label?: Maybe<Scalars['String']>
    /** Rma attribute type */
    type?: Maybe<Scalars['String']>
    /** An array of rma attribute values */
    values?: Maybe<Array<Maybe<RmaAttributeValues>>>
}

export type RmaFormAttributes = {
    __typename?: 'RmaFormAttributes'
    /** Array of Rma Attributes */
    attributes?: Maybe<Array<Maybe<RmaFormAttribute>>>
}

export type RmaFormItem = {
    __typename?: 'RmaFormItem'
    /** Rma order item available qty */
    available_qty?: Maybe<Scalars['Int']>
    /** Rma order item id */
    order_item_id?: Maybe<Scalars['Int']>
    /** Rma order item name for display */
    product_name?: Maybe<Scalars['String']>
}

export type RmaFormItems = {
    __typename?: 'RmaFormItems'
    /** Array of Rma Attributes */
    return_items?: Maybe<Array<Maybe<RmaFormItem>>>
}

export type RmaRequestItemInput = {
    condition: Scalars['Int']
    order_item_id: Scalars['Int']
    qty_requested: Scalars['Int']
    reason: Scalars['String']
    reason_other?: Maybe<Scalars['String']>
    resolution: Scalars['Int']
}

/** Comment item details */
export type SalesCommentItem = {
    __typename?: 'SalesCommentItem'
    /** The text of the message */
    message: Scalars['String']
    /** The timestamp of the comment */
    timestamp: Scalars['String']
}

export type SalesItemInterface = {
    __typename?: 'SalesItemInterface'
    /** The entered gift message for the order item */
    gift_message?: Maybe<GiftMessage>
}

/** SearchResultPageInfo provides navigation for the query response */
export type SearchResultPageInfo = {
    __typename?: 'SearchResultPageInfo'
    /** Specifies which page of results to return */
    current_page?: Maybe<Scalars['Int']>
    /** Specifies the maximum number of items to return */
    page_size?: Maybe<Scalars['Int']>
    /** Total pages */
    total_pages?: Maybe<Scalars['Int']>
}

export type SelectedBundleOption = {
    __typename?: 'SelectedBundleOption'
    id: Scalars['Int']
    label: Scalars['String']
    type: Scalars['String']
    values: Array<Maybe<SelectedBundleOptionValue>>
}

export type SelectedBundleOptionValue = {
    __typename?: 'SelectedBundleOptionValue'
    id: Scalars['Int']
    label: Scalars['String']
    price: Scalars['Float']
    quantity: Scalars['Float']
}

export type SelectedConfigurableOption = {
    __typename?: 'SelectedConfigurableOption'
    id: Scalars['Int']
    configurable_product_option_uid: Scalars['String']
    configurable_product_option_value_uid: Scalars['String']
    option_label: Scalars['String']
    value_id: Scalars['Int']
    value_label: Scalars['String']
}

export type SelectedCustomizableOption = {
    __typename?: 'SelectedCustomizableOption'
    id: Scalars['Int']
    is_required: Scalars['Boolean']
    label: Scalars['String']
    sort_order: Scalars['Int']
    values: Array<Maybe<SelectedCustomizableOptionValue>>
}

export type SelectedCustomizableOptionValue = {
    __typename?: 'SelectedCustomizableOptionValue'
    id: Scalars['Int']
    label: Scalars['String']
    price: CartItemSelectedOptionValuePrice
    value: Scalars['String']
}

export type SelectedData = {
    __typename?: 'SelectedData'
    /** Selected attribute label */
    attribute_label?: Maybe<Scalars['String']>
    /** Selected option label */
    option_label?: Maybe<Scalars['String']>
    /** Selected product ID */
    product_id?: Maybe<Scalars['Int']>
}

export type SelectedItemIds = {
    /** The requistion list item ID */
    id?: Maybe<Scalars['Int']>
}

export type SelectedPaymentMethod = {
    __typename?: 'SelectedPaymentMethod'
    /** The payment method code */
    code: Scalars['String']
    /** The purchase order number. */
    purchase_order_number?: Maybe<Scalars['String']>
    /** The payment method title. */
    title: Scalars['String']
}

export type SelectedShippingMethod = {
    __typename?: 'SelectedShippingMethod'
    amount: Money
    /** @deprecated The field should not be used on the storefront */
    base_amount?: Maybe<Money>
    carrier_code: Scalars['String']
    carrier_title: Scalars['String']
    method_code: Scalars['String']
    method_title: Scalars['String']
}

export type SelectGiftCardOptions = {
    __typename?: 'SelectGiftCardOptions'
    /** GiftCard Amount. */
    giftcard_amount?: Maybe<Money>
    /** GiftCard Message. */
    giftcard_message?: Maybe<Scalars['String']>
    /** GiftCard Sender Email. */
    giftcard_recipient_email?: Maybe<Scalars['String']>
    /** GiftCard Receipent Name. */
    giftcard_recipient_name?: Maybe<Scalars['String']>
    /** GiftCard Sender Email. */
    giftcard_sender_email?: Maybe<Scalars['String']>
    /** GiftCard Sender Name. */
    giftcard_sender_name?: Maybe<Scalars['String']>
}

export type SendEmailToFriendInput = {
    product_id: Scalars['Int']
    recipients: Array<Maybe<SendEmailToFriendRecipientInput>>
    sender: SendEmailToFriendSenderInput
}

export type SendEmailToFriendOutput = {
    __typename?: 'SendEmailToFriendOutput'
    recipients?: Maybe<Array<Maybe<SendEmailToFriendRecipient>>>
    sender?: Maybe<SendEmailToFriendSender>
}

export type SendEmailToFriendRecipient = {
    __typename?: 'SendEmailToFriendRecipient'
    email: Scalars['String']
    name: Scalars['String']
}

export type SendEmailToFriendRecipientInput = {
    email: Scalars['String']
    name: Scalars['String']
}

export type SendEmailToFriendSender = {
    __typename?: 'SendEmailToFriendSender'
    email: Scalars['String']
    message: Scalars['String']
    name: Scalars['String']
}

export type SendEmailToFriendSenderInput = {
    email: Scalars['String']
    message: Scalars['String']
    name: Scalars['String']
}

export type SendFriendConfiguration = {
    __typename?: 'SendFriendConfiguration'
    /** Indicates whether the Email to a Friend feature is enabled. */
    enabled_for_customers: Scalars['Boolean']
    /** Indicates whether the Email to a Friend feature is enabled for guests. */
    enabled_for_guests: Scalars['Boolean']
}

export type SeoMetadataOutput = {
    __typename?: 'SeoMetadataOutput'
    /** Store city */
    address_locality?: Maybe<Scalars['String']>
    /** Store region code */
    address_region?: Maybe<Scalars['String']>
    /** Store alternative name */
    alternate_name?: Maybe<Scalars['String']>
    /** Breadcrumbs JSON enabled */
    breadcrumbs_enabled?: Maybe<Scalars['Boolean']>
    /** Store contact option */
    contact_option?: Maybe<Scalars['String']>
    /** Store contact type */
    contact_type?: Maybe<Scalars['String']>
    /** Store description */
    description?: Maybe<Scalars['String']>
    /** Store email */
    email?: Maybe<Scalars['String']>
    /** Store locale code */
    locale?: Maybe<Scalars['String']>
    /** Store logo URL */
    logo?: Maybe<Scalars['String']>
    /** Store logo alt text */
    logo_alt?: Maybe<Scalars['String']>
    /** SEO metadata tags enabled */
    metadata_enabled?: Maybe<Scalars['Boolean']>
    /** OpenGraph tags enabled */
    og_enabled?: Maybe<Scalars['Boolean']>
    /** Organization JSON enabled */
    organization_enabled?: Maybe<Scalars['Boolean']>
    /** Additional pages, where organization JSON is enabled */
    organization_pages?: Maybe<Scalars['String']>
    /** Store telephone */
    phone?: Maybe<Scalars['String']>
    /** Store postcode */
    postal_code?: Maybe<Scalars['String']>
    /** Product image placeholder */
    product_image_placeholder?: Maybe<Scalars['String']>
    /** Store alternative URLs */
    same_as?: Maybe<Scalars['String']>
    /** Store search URL variable */
    search_query_input?: Maybe<Scalars['String']>
    /** Store search URL schema */
    search_target?: Maybe<Scalars['String']>
    /** Sitelinks search box JSON enabled */
    searchbox_enabled?: Maybe<Scalars['Boolean']>
    /** Store name */
    store_name?: Maybe<Scalars['String']>
    /** Store street address */
    street_address?: Maybe<Scalars['String']>
    /** Twitter tags enabled */
    twitter_enabled?: Maybe<Scalars['Boolean']>
    /** Store Twitter handle */
    twitter_site?: Maybe<Scalars['String']>
}

export type SetBillingAddressOnCartInput = {
    billing_address: BillingAddressInput
    cart_id: Scalars['String']
}

export type SetBillingAddressOnCartOutput = {
    __typename?: 'SetBillingAddressOnCartOutput'
    cart: Cart
}

export type SetGiftOptionsOnCartInput = {
    /** The unique ID that identifies the shopper's cart */
    cart_id: Scalars['String']
    /** Gift message details for the cart */
    gift_message?: Maybe<GiftMessageInput>
    /** Whether customer requested gift receipt for the cart */
    gift_receipt_included: Scalars['Boolean']
    /** The unique identifier of the gift wrapping to be used for the cart */
    gift_wrapping_id?: Maybe<Scalars['ID']>
    /** Whether customer requested printed card for the cart */
    printed_card_included: Scalars['Boolean']
}

export type SetGiftOptionsOnCartOutput = {
    __typename?: 'SetGiftOptionsOnCartOutput'
    /** The modified cart object */
    cart: Cart
}

export type SetGuestEmailOnCartInput = {
    cart_id: Scalars['String']
    email: Scalars['String']
}

export type SetGuestEmailOnCartOutput = {
    __typename?: 'SetGuestEmailOnCartOutput'
    cart: Cart
}

export type SetPaymentMethodAndPlaceOrderInput = {
    cart_id: Scalars['String']
    payment_method: PaymentMethodInput
}

export type SetPaymentMethodOnCartInput = {
    cart_id: Scalars['String']
    payment_method: PaymentMethodInput
}

export type SetPaymentMethodOnCartOutput = {
    __typename?: 'SetPaymentMethodOnCartOutput'
    cart: Cart
}

export type SetShippingAddressesOnCartInput = {
    cart_id: Scalars['String']
    shipping_addresses: Array<Maybe<ShippingAddressInput>>
}

export type SetShippingAddressesOnCartOutput = {
    __typename?: 'SetShippingAddressesOnCartOutput'
    cart: Cart
}

export type SetShippingMethodsOnCartInput = {
    cart_id: Scalars['String']
    shipping_methods: Array<Maybe<ShippingMethodInput>>
}

export type SetShippingMethodsOnCartOutput = {
    __typename?: 'SetShippingMethodsOnCartOutput'
    cart: Cart
}

export type ShareWishlistInput = {
    /** Emails */
    emails?: Maybe<Scalars['String']>
    /** message */
    message?: Maybe<Scalars['String']>
    /** Wishlist ID */
    wishlistId?: Maybe<Scalars['Int']>
}

export type ShareWishlistOutput = {
    __typename?: 'ShareWishlistOutput'
    /** Share wishlist message */
    messages?: Maybe<Scalars['String']>
}

/** This enumeration defines whether bundle items must be shipped together. */
export enum ShipBundleItemsEnum {
    Together = 'TOGETHER',
    Separately = 'SEPARATELY'
}

export type ShipmentItem = ShipmentItemInterface & {
    __typename?: 'ShipmentItem'
    /** Additional data of shipped items */
    additional_data?: Maybe<Scalars['String']>
    /** Id of the product */
    id?: Maybe<Scalars['Int']>
    /** Item Id of the product */
    item_id?: Maybe<Scalars['Int']>
    /** Name of the product */
    name: Scalars['String']
    /** Associated order item */
    order_item?: Maybe<OrderItemInterface>
    /** Parent Item Id of the product */
    parent_item_id?: Maybe<Scalars['Int']>
    /** Price of shipped items */
    price?: Maybe<Money>
    /** Name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** Product Options of Shipped Item */
    product_options?: Maybe<Array<Maybe<ProductOptions>>>
    /** Sale price for the base product */
    product_sale_price: Money
    /** SKU of the base product */
    product_sku: Scalars['String']
    /** Product Type of the product */
    product_type?: Maybe<Scalars['String']>
    /** Number of shipped items */
    quantity_shipped?: Maybe<Scalars['Float']>
    /** Sku of the product */
    sku: Scalars['String']
}

/** Order shipment item details */
export type ShipmentItemInterface = {
    /** Shipment item unique identifier */
    id: Scalars['ID']
    /** Associated order item */
    order_item?: Maybe<OrderItemInterface>
    /** Name of the base product */
    product_name?: Maybe<Scalars['String']>
    /** Sale price for the base product */
    product_sale_price: Money
    /** SKU of the base product */
    product_sku: Scalars['String']
    /** Number of shipped items */
    quantity_shipped: Scalars['Float']
}

/** Order shipment tracking details */
export type ShipmentTracking = {
    __typename?: 'ShipmentTracking'
    /** The shipping carrier for the order delivery */
    carrier: Scalars['String']
    /** The tracking number of the order shipment */
    number?: Maybe<Scalars['String']>
    /** The shipment tracking title */
    title: Scalars['String']
}

/** An array containing all the shipping fields of order */
export type Shipping = {
    __typename?: 'Shipping'
    /** Shipping City of Sales Order */
    city?: Maybe<Scalars['String']>
    /** Shipping Company of Sales Order */
    company?: Maybe<Scalars['String']>
    /** Shipping Country of Sales Order */
    country_id?: Maybe<CountryCodeEnum>
    /** Customer address Id */
    customer_address_id?: Maybe<Scalars['Int']>
    /** Shipping Customer Name of Sales Order */
    name?: Maybe<Scalars['String']>
    /** Shipping PostCode of Sales Order */
    postcode?: Maybe<Scalars['String']>
    /** Shipping Region of Sales Order */
    region?: Maybe<Scalars['String']>
    /** Shipping Street of Sales Order */
    street?: Maybe<Scalars['String']>
    /** Shipping Telephone of Sales Order */
    telephone?: Maybe<Scalars['String']>
}

export type ShippingAddressInput = {
    address?: Maybe<CartAddressInput>
    customer_address_id?: Maybe<Scalars['Int']>
    customer_notes?: Maybe<Scalars['String']>
    /** The code of Pickup Location which will be used for In-Store Pickup. */
    pickup_location_code?: Maybe<Scalars['String']>
}

export type ShippingCartAddress = CartAddressInterface & {
    __typename?: 'ShippingCartAddress'
    available_shipping_methods?: Maybe<Array<Maybe<AvailableShippingMethod>>>
    /** @deprecated `cart_items_v2` should be used instead */
    cart_items?: Maybe<Array<Maybe<CartItemQuantity>>>
    cart_items_v2?: Maybe<Array<Maybe<CartItemInterface>>>
    city: Scalars['String']
    company?: Maybe<Scalars['String']>
    country: CartAddressCountry
    customer_address_id?: Maybe<Scalars['Int']>
    customer_notes?: Maybe<Scalars['String']>
    firstname: Scalars['String']
    /** @deprecated This information shoud not be exposed on frontend */
    items_weight?: Maybe<Scalars['Float']>
    lastname: Scalars['String']
    pickup_location_code?: Maybe<Scalars['String']>
    postcode?: Maybe<Scalars['String']>
    region?: Maybe<CartAddressRegion>
    selected_shipping_method?: Maybe<SelectedShippingMethod>
    street: Array<Maybe<Scalars['String']>>
    telephone: Scalars['String']
}

/** Defines an individual shipping discount. This discount can be applied to shipping. */
export type ShippingDiscount = {
    __typename?: 'ShippingDiscount'
    /** The amount of the discount */
    amount: Money
}

/** The Shipping handling details */
export type ShippingHandling = {
    __typename?: 'ShippingHandling'
    /** The shipping amount, excluding tax */
    amount_excluding_tax?: Maybe<Money>
    /** The shipping amount, including tax */
    amount_including_tax?: Maybe<Money>
    /** The applied discounts to the shipping */
    discounts?: Maybe<Array<Maybe<ShippingDiscount>>>
    /** Contains details about taxes applied for shipping */
    taxes?: Maybe<Array<Maybe<TaxItem>>>
    /** The total amount for shipping */
    total_amount: Money
}

export type ShippingMethodInput = {
    carrier_code: Scalars['String']
    method_code: Scalars['String']
}

/** DotDigital newsletter configurations */
export type Signup = {
    __typename?: 'Signup'
    /** Consent label to display */
    consent_label?: Maybe<Scalars['String']>
    /** Form action to post subscription */
    form_action?: Maybe<Scalars['String']>
    /** Form Fields */
    form_fields?: Maybe<Scalars['String']>
    /** Form Id */
    form_id?: Maybe<Scalars['String']>
    /** Is consent available in form */
    is_consent_form?: Maybe<Scalars['Boolean']>
    /** Is newsletter enabled */
    is_enabled?: Maybe<Scalars['Boolean']>
    /** Sub Title */
    sub_title?: Maybe<Scalars['String']>
    /** Title */
    title?: Maybe<Scalars['String']>
    /** User Id of the Form */
    user_id?: Maybe<Scalars['String']>
}

/** Simple Cart Item */
export type SimpleCartItem = CartItemInterface & {
    __typename?: 'SimpleCartItem'
    /** The list of available gift wrapping options for the cart item */
    available_gift_wrapping: Array<Maybe<GiftWrapping>>
    customizable_options?: Maybe<Array<Maybe<SelectedCustomizableOption>>>
    /** The entered gift message for the cart item */
    gift_message?: Maybe<GiftMessage>
    /** The selected gift wrapping for the cart item */
    gift_wrapping?: Maybe<GiftWrapping>
    id: Scalars['String']
    /** A resulting stock state for a configurable product, based both on parent and child stock. */
    item_stock_status: ProductStockStatus
    itemsku: Scalars['String']
    /** A combined item-level message */
    message?: Maybe<Scalars['String']>
    prices?: Maybe<CartItemPrices>
    product: ProductInterface
    qty_validation_message: Scalars['String']
    quantity: Scalars['Float']
}

/** A simple product is tangible and are usually sold as single units or in fixed quantities. */
export type SimpleProduct = ProductInterface &
    PhysicalProductInterface &
    CustomizableProductInterface & {
        __typename?: 'SimpleProduct'
        Product_sizechart?: Maybe<Scalars['Int']>
        Product_sizechart_text?: Maybe<Scalars['String']>
        activity?: Maybe<Scalars['String']>
        /** The attribute set assigned to the product. */
        attribute_set_id?: Maybe<Scalars['Int']>
        brand?: Maybe<Scalars['Int']>
        brand_text?: Maybe<Scalars['String']>
        /**
         * Relative canonical URL. This value is returned only if the system setting 'Use
         * Canonical Link Meta Tag For Products' is enabled
         */
        canonical_url?: Maybe<Scalars['String']>
        /** The categories assigned to a product. */
        categories?: Maybe<Array<Maybe<CategoryInterface>>>
        category_gear?: Maybe<Scalars['String']>
        climate?: Maybe<Scalars['String']>
        collar?: Maybe<Scalars['String']>
        color?: Maybe<Scalars['String']>
        color_family?: Maybe<Scalars['String']>
        color_text?: Maybe<Scalars['String']>
        /** The product's country of origin. */
        country_of_manufacture?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was created. */
        created_at?: Maybe<Scalars['String']>
        /** Crosssell Products */
        crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** Detailed information about the product. The value can include simple HTML tags. */
        description?: Maybe<ComplexTextValue>
        eco_collection?: Maybe<Scalars['Int']>
        eco_collection_text?: Maybe<Scalars['String']>
        eligible_for_pick_up?: Maybe<Scalars['Int']>
        eligible_for_pick_up_text?: Maybe<Scalars['String']>
        erin_recommends?: Maybe<Scalars['Int']>
        erin_recommends_text?: Maybe<Scalars['String']>
        features_bags?: Maybe<Scalars['String']>
        format?: Maybe<Scalars['Int']>
        format_text?: Maybe<Scalars['String']>
        gender?: Maybe<Scalars['String']>
        /** Indicates whether a gift message is available. */
        gift_message_available?: Maybe<Scalars['String']>
        /** The ID number assigned to the product. */
        id?: Maybe<Scalars['Int']>
        /** The relative path to the main image on the product page. */
        image?: Maybe<ProductImage>
        /** Indicates whether the product can be returned */
        is_returnable?: Maybe<Scalars['String']>
        /** A number representing the product's manufacturer. */
        manufacturer?: Maybe<Scalars['Int']>
        manufacturer_text?: Maybe<Scalars['String']>
        material?: Maybe<Scalars['String']>
        /** An array of Media Gallery objects. */
        media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>
        /**
         * An array of MediaGalleryEntry objects.
         * @deprecated Use product's `media_gallery` instead
         */
        media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>
        /** A brief overview of the product for search results listings, maximum 255 characters. */
        meta_description?: Maybe<Scalars['String']>
        /** A comma-separated list of keywords that are visible only to search engines. */
        meta_keyword?: Maybe<Scalars['String']>
        /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
        meta_title?: Maybe<Scalars['String']>
        /** The product name. Customers use this name to identify the product. */
        name?: Maybe<Scalars['String']>
        new?: Maybe<Scalars['Int']>
        /** The beginning date for new product listings, and determines if the product is featured as a new product. */
        new_from_date?: Maybe<Scalars['String']>
        new_text?: Maybe<Scalars['String']>
        /** The end date for new product listings. */
        new_to_date?: Maybe<Scalars['String']>
        /** Product stock only x left count */
        only_x_left_in_stock?: Maybe<Scalars['Float']>
        /** An array of options for a customizable product. */
        options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>
        /** If the product has multiple options, determines where they appear on the product page. */
        options_container?: Maybe<Scalars['String']>
        pattern?: Maybe<Scalars['String']>
        performance_fabric?: Maybe<Scalars['Int']>
        performance_fabric_text?: Maybe<Scalars['String']>
        /**
         * A ProductPrices object, indicating the price of an item.
         * @deprecated Use price_range for product price information.
         */
        price?: Maybe<ProductPrices>
        /** A PriceRange object, indicating the range of prices for the product */
        price_range: PriceRange
        /** An array of TierPrice objects. */
        price_tiers?: Maybe<Array<Maybe<TierPrice>>>
        product_label?: Maybe<Scalars['Int']>
        product_label_text?: Maybe<Scalars['String']>
        /** An array of ProductLinks objects. */
        product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>
        /** Product review summary and review count data */
        product_reviews?: Maybe<ProductReviews>
        purpose?: Maybe<Scalars['Int']>
        purpose_text?: Maybe<Scalars['String']>
        /** Review/Rating related configurations */
        rating_configurations?: Maybe<RatingConfigurationData>
        /** The average of all the ratings given to the product. */
        rating_summary: Scalars['Float']
        /** Related Products */
        related_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The total count of all the reviews given to the product. */
        review_count: Scalars['Int']
        /** Product review summary and review count data */
        review_details?: Maybe<ReviewParameters>
        /** The list of products reviews. */
        reviews: ProductReviews
        sale?: Maybe<Scalars['Int']>
        sale_text?: Maybe<Scalars['String']>
        /** A short description of the product. Its use depends on the theme. */
        short_description?: Maybe<ComplexTextValue>
        size?: Maybe<Scalars['String']>
        size_text?: Maybe<Scalars['String']>
        sizechart?: Maybe<Scalars['Int']>
        sizechart_text?: Maybe<Scalars['String']>
        /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
        sku?: Maybe<Scalars['String']>
        sleeve?: Maybe<Scalars['String']>
        /** The relative path to the small image, which is used on catalog pages. */
        small_image?: Maybe<ProductImage>
        /** The beginning date that a product has a special price. */
        special_from_date?: Maybe<Scalars['String']>
        /** The discounted price of the product. */
        special_price?: Maybe<Scalars['Float']>
        /** The end date that a product has a special price. */
        special_to_date?: Maybe<Scalars['String']>
        /** Stock status of the product */
        stock_status?: Maybe<ProductStockStatus>
        strap_bags?: Maybe<Scalars['String']>
        style_bags?: Maybe<Scalars['String']>
        style_bottom?: Maybe<Scalars['String']>
        style_general?: Maybe<Scalars['String']>
        /** The file name of a swatch image */
        swatch_image?: Maybe<Scalars['String']>
        /** The relative path to the product's thumbnail image. */
        thumbnail?: Maybe<ProductImage>
        /**
         * The price when tier pricing is in effect and the items purchased threshold has been reached.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_price?: Maybe<Scalars['Float']>
        /**
         * An array of ProductTierPrices objects.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>
        /**
         * One of simple, virtual, bundle, downloadable, grouped, or configurable.
         * @deprecated Use __typename instead.
         */
        type_id?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was updated. */
        updated_at?: Maybe<Scalars['String']>
        /** Upsell Products */
        upsell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The part of the URL that identifies the product */
        url_key?: Maybe<Scalars['String']>
        /** @deprecated Use product's `canonical_url` or url rewrites instead */
        url_path?: Maybe<Scalars['String']>
        /** URL rewrites list */
        url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>
        /** The part of the product URL that is appended after the url key */
        url_suffix?: Maybe<Scalars['String']>
        /**
         * An array of websites in which the product is available.
         * @deprecated The field should not be used on the storefront.
         */
        websites?: Maybe<Array<Maybe<Website>>>
        /** The weight of the item, in units defined by the store. */
        weight?: Maybe<Scalars['Float']>
    }

/** A simple product is tangible and are usually sold as single units or in fixed quantities. */
export type SimpleProductProduct_ReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** A simple product is tangible and are usually sold as single units or in fixed quantities. */
export type SimpleProductReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type SimpleProductCartItemInput = {
    customizable_options?: Maybe<Array<Maybe<CustomizableOptionInput>>>
    data: CartItemInput
}

/** Social Sharing */
export type SocialSharing = {
    __typename?: 'SocialSharing'
    /** Is Copylink sharing enabled */
    copylink_enabled?: Maybe<Scalars['Boolean']>
    /** Is Social Sharing enabled */
    enabled?: Maybe<Scalars['Boolean']>
    /** Facebook Social Sharing */
    facebook?: Maybe<Facebook>
    /** Other Social Sharing Options */
    other_social_sharing_options?: Maybe<Scalars['String']>
    /** Twitter Social Sharing */
    twitter?: Maybe<Twitter>
    /** Whatsapp Social Sharing */
    whatsapp?: Maybe<Whatsapp>
}

export type SortField = {
    __typename?: 'SortField'
    /** Label of sort field. */
    label?: Maybe<Scalars['String']>
    /** Attribute code of sort field. */
    value?: Maybe<Scalars['String']>
}

/** SortFields contains a default value for sort fields and all available sort fields. */
export type SortFields = {
    __typename?: 'SortFields'
    /** Default value of sort fields. */
    default?: Maybe<Scalars['String']>
    /** Available sort fields. */
    options?: Maybe<Array<Maybe<SortField>>>
}

/** The type contains information about a store config. */
export type StoreConfig = {
    __typename?: 'StoreConfig'
    /** Footer Miscellaneous HTML */
    absolute_footer?: Maybe<Scalars['String']>
    /** Allow Gift Receipt */
    allow_gift_receipt?: Maybe<Scalars['String']>
    /** Allow Gift Wrapping on Order Level */
    allow_gift_wrapping_on_order?: Maybe<Scalars['String']>
    /** Allow Gift Wrapping for Order Items */
    allow_gift_wrapping_on_order_items?: Maybe<Scalars['String']>
    /** Status to check if Guest Review is allowed */
    allow_guest_review?: Maybe<Scalars['Boolean']>
    /** Indicates whether guest users can write product reviews. Possible values: 1 (Yes) and 0 (No) */
    allow_guests_to_write_product_reviews?: Maybe<Scalars['String']>
    /** The value of the Allow Gift Messages for Order Items option */
    allow_items?: Maybe<Scalars['String']>
    /** The value of the Allow Gift Messages on Order Level option */
    allow_order?: Maybe<Scalars['String']>
    /** Allow Printed Card */
    allow_printed_card?: Maybe<Scalars['String']>
    /** Amazon Pay configuration values */
    amazonpay?: Maybe<AmazonPay>
    /** Enable autocomplete on login and forgot password forms */
    autocomplete_on_storefront?: Maybe<Scalars['Boolean']>
    /** Base currency code */
    base_currency_code?: Maybe<Scalars['String']>
    /** Base link URL for the store */
    base_link_url?: Maybe<Scalars['String']>
    /** Base media URL for the store */
    base_media_url?: Maybe<Scalars['String']>
    /** Base static URL for the store */
    base_static_url?: Maybe<Scalars['String']>
    /** Base URL for the store */
    base_url?: Maybe<Scalars['String']>
    /** Display Gift Wrapping Prices */
    cart_gift_wrapping?: Maybe<Scalars['String']>
    /** Display Printed Card Prices */
    cart_printed_card?: Maybe<Scalars['String']>
    /** Default Sort By. */
    catalog_default_sort_by?: Maybe<Scalars['String']>
    /**
     * Corresponds to the 'Display Prices In Product Lists' field. It indicates how
     * FPT information is displayed on category pages
     */
    category_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>
    /** Category URL Suffix. */
    category_url_suffix?: Maybe<Scalars['String']>
    /** CMS Home Page */
    cms_home_page?: Maybe<Scalars['String']>
    /** CMS No Cookies Page */
    cms_no_cookies?: Maybe<Scalars['String']>
    /** CMS No Route Page */
    cms_no_route?: Maybe<Scalars['String']>
    /** A code assigned to the store to identify it */
    code?: Maybe<Scalars['String']>
    /** Cookie Domain */
    cookie_domain?: Maybe<Scalars['String']>
    /** Cookie Use HTTP Only. Warning: Do not set to 'No'. User security could be compromised */
    cookie_httponly?: Maybe<Scalars['Boolean']>
    /** Cookie Lifetime in seconds */
    cookie_lifetime?: Maybe<Scalars['Int']>
    /** Cookie Path */
    cookie_path?: Maybe<Scalars['String']>
    /** Copyright */
    copyright?: Maybe<Scalars['String']>
    /** Default Meta Description */
    default_description?: Maybe<Scalars['String']>
    /** Default display currency code */
    default_display_currency_code?: Maybe<Scalars['String']>
    /** Default Meta Keywords */
    default_keywords?: Maybe<Scalars['String']>
    /** Default Page Title */
    default_title?: Maybe<Scalars['String']>
    /** Display Demo Store Notice */
    demonotice?: Maybe<Scalars['Int']>
    /** DotDigital newsletter configurations */
    dotdigital?: Maybe<Dotdigital>
    /** Fly-out Wishlist is enabled flag */
    flyout_wishlist_enabled?: Maybe<Scalars['Boolean']>
    /** Default Web URL */
    front?: Maybe<Scalars['String']>
    /** Returns the Default Country */
    general_country_default?: Maybe<Scalars['String']>
    /** GTM container ID */
    google_analytics_container_id?: Maybe<Scalars['String']>
    /** GTM environment preview key (gtm_auth) */
    google_analytics_gtm_auth?: Maybe<Scalars['String']>
    /** GTM environment preview ID (gtm_preview) */
    google_analytics_gtm_preview?: Maybe<Scalars['String']>
    /** Products per Page on Grid Default Value. */
    grid_per_page?: Maybe<Scalars['Int']>
    /** Products per Page on Grid Allowed Values. */
    grid_per_page_values?: Maybe<Scalars['String']>
    /** Scripts and Style Sheets */
    head_includes?: Maybe<Scalars['String']>
    /** Favicon Icon */
    head_shortcut_icon?: Maybe<Scalars['String']>
    /** Logo Image */
    header_logo_src?: Maybe<Scalars['String']>
    /** The ID number assigned to the store */
    id?: Maybe<Scalars['Int']>
    /** Returns the Phone Number from Store Information */
    information_phone?: Maybe<Scalars['String']>
    /** Status of Instant Search */
    instant_search_enabled?: Maybe<Scalars['Boolean']>
    /** GraphQl Endpoint for the Instant Search */
    is_graphql_endpoint?: Maybe<Scalars['String']>
    /** Popular Search GraphQl Endpoint for the Instant Search */
    is_popular_search_graphql_endpoint?: Maybe<Scalars['String']>
    /** UUID of the Instant Search */
    is_uuid?: Maybe<Scalars['String']>
    /** is Recaptcha v3 enabled for registration */
    is_v3_customer_create?: Maybe<Scalars['String']>
    /** is Recaptcha v3 enabled for forgot password */
    is_v3_customer_forgot_password?: Maybe<Scalars['String']>
    /** is Recaptcha v3 enabled for login */
    is_v3_customer_login?: Maybe<Scalars['String']>
    /** Is Klarna Enabled */
    klarna_enabled?: Maybe<Scalars['String']>
    /** Is Klarna Enabled In Stores */
    klarna_enabled_in_stores?: Maybe<Scalars['String']>
    /** Maximum order total for Klarna Message in Checkout */
    klarna_message_maximum_order_total?: Maybe<Scalars['String']>
    /** Is Klarna OSM Enabled */
    klarna_osm_enabled?: Maybe<Scalars['Boolean']>
    /** Klarna Placement Client ID */
    klarna_placement_client_id?: Maybe<Scalars['String']>
    /** Klarna Placement Domain */
    klarna_placement_domain?: Maybe<Scalars['String']>
    /** Returns whether the product count display is set for layered navigation. */
    layered_navigation_display_product_count?: Maybe<Scalars['Boolean']>
    /** List Mode. */
    list_mode?: Maybe<Scalars['String']>
    /** Products per Page on List Default Value. */
    list_per_page?: Maybe<Scalars['Int']>
    /** Products per Page on List Allowed Values. */
    list_per_page_values?: Maybe<Scalars['String']>
    /** Store locale */
    locale?: Maybe<Scalars['String']>
    /** Logo Image Alt */
    logo_alt?: Maybe<Scalars['String']>
    /** Logo Attribute Height */
    logo_height?: Maybe<Scalars['Int']>
    /** Logo Attribute Width */
    logo_width?: Maybe<Scalars['Int']>
    /** Loqate Tag APi Key */
    loqate_tag_api_key?: Maybe<Scalars['String']>
    /** Status of Loqate Tag */
    loqate_tag_enabled?: Maybe<Scalars['Boolean']>
    /** Find API Endpoint for Loqate Tag */
    loqate_tag_find_endpoint?: Maybe<Scalars['String']>
    /** Retrieve API Endpoint for Loqate Tag */
    loqate_tag_retrieve_endpoint?: Maybe<Scalars['String']>
    /** Reward points functionality status: enabled/disabled */
    magento_reward_general_is_enabled?: Maybe<Scalars['String']>
    /** Reward points functionality status on the storefront: enabled/disabled */
    magento_reward_general_is_enabled_on_front?: Maybe<Scalars['String']>
    /** Reward points redemption minimum threshold */
    magento_reward_general_min_points_balance?: Maybe<Scalars['String']>
    /** Enable reward points history for the customer */
    magento_reward_general_publish_history?: Maybe<Scalars['String']>
    /** Number of points for referral, when invitee registers on the site */
    magento_reward_points_invitation_customer?: Maybe<Scalars['String']>
    /** Maximum number of registration referrals that will qualify for rewards */
    magento_reward_points_invitation_customer_limit?: Maybe<Scalars['String']>
    /** Number of points for referral, when invitee places an initial order on the site */
    magento_reward_points_invitation_order?: Maybe<Scalars['String']>
    /** Maximum number of order placements by invitees that will qualify for rewards */
    magento_reward_points_invitation_order_limit?: Maybe<Scalars['String']>
    /** Number of points for newsletter subscription */
    magento_reward_points_newsletter?: Maybe<Scalars['String']>
    /**
     * Whether customer earns points for shopping according to the reward point
     * exchange rate. In Luma this also controls whether to show a message in
     * shopping cart about the rewards points earned for the purchase, as well as the
     * customer’s current reward point balance
     */
    magento_reward_points_order?: Maybe<Scalars['String']>
    /** Number of points customer gets for registration */
    magento_reward_points_register?: Maybe<Scalars['String']>
    /** Number of points for writing a review */
    magento_reward_points_review?: Maybe<Scalars['String']>
    /** Maximum number of reviews that will qualify for the rewards */
    magento_reward_points_review_limit?: Maybe<Scalars['String']>
    /** Indicates whether wishlists are enabled (1) or disabled (0) */
    magento_wishlist_general_is_enabled?: Maybe<Scalars['String']>
    /** The minimum number of characters required for a valid password. */
    minimum_password_length?: Maybe<Scalars['String']>
    /** Default No-route URL */
    no_route?: Maybe<Scalars['String']>
    /** Payflow Pro vault status. */
    payment_payflowpro_cc_vault_active?: Maybe<Scalars['String']>
    /** PayPal Merchant Account ID */
    paypal_account_id?: Maybe<Scalars['String']>
    /** PayPal Sandbox Mode */
    paypal_account_is_sandbox_mode?: Maybe<Scalars['Boolean']>
    /** Display PayPal express active/inactive */
    paypal_express_active?: Maybe<Scalars['Boolean']>
    /** PayPal Enable In-Context Checkout Experience */
    paypal_incontext_mode?: Maybe<Scalars['Boolean']>
    /** Display PayPal express on Shopping Cart */
    paypal_visible_on_cart?: Maybe<Scalars['Boolean']>
    /** Returns Persistent lifetime value */
    persistent_life_time?: Maybe<Scalars['String']>
    /** Default Price for Printed Card */
    printed_card_price?: Maybe<Scalars['String']>
    /**
     * Corresponds to the 'Display Prices On Product View Page' field. It indicates
     * how FPT information is displayed on product pages
     */
    product_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>
    /** Indicates whether product reviews are enabled. Possible values: 1 (Yes) and 0 (No) */
    product_reviews_enabled?: Maybe<Scalars['String']>
    /** Product URL Suffix. */
    product_url_suffix?: Maybe<Scalars['String']>
    /** Recaptcha site key  */
    recaptcha_v3_public_key?: Maybe<Scalars['String']>
    /** The number of different character classes required in a password (lowercase, uppercase, digits, special characters). */
    required_character_classes_number?: Maybe<Scalars['String']>
    /** The ID of the root category */
    root_category_id?: Maybe<Scalars['Int']>
    /**
     * Corresponds to the 'Display Prices In Sales Modules' field. It indicates how
     * FPT information is displayed on cart, checkout, and order pages
     */
    sales_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>
    /** Display Gift Wrapping Prices */
    sales_gift_wrapping?: Maybe<Scalars['String']>
    /** Display Printed Card Prices */
    sales_printed_card?: Maybe<Scalars['String']>
    /** Secure base link URL for the store */
    secure_base_link_url?: Maybe<Scalars['String']>
    /** Secure base media URL for the store */
    secure_base_media_url?: Maybe<Scalars['String']>
    /** Secure base static URL for the store */
    secure_base_static_url?: Maybe<Scalars['String']>
    /** Secure base URL for the store */
    secure_base_url?: Maybe<Scalars['String']>
    /** Email to a Friend configuration. */
    send_friend?: Maybe<SendFriendConfiguration>
    /** SEO data used in OG/Twitter/LD+JSON metadata */
    seo_graphql?: Maybe<SeoMetadataOutput>
    /** Show Breadcrumbs for CMS Pages */
    show_cms_breadcrumbs?: Maybe<Scalars['Int']>
    /** Social sharing configuration values */
    social_sharing?: Maybe<SocialSharing>
    /** Status to check if Store Credit is allowed */
    store_credit_enabled?: Maybe<Scalars['Boolean']>
    /** Store name  */
    store_information_name?: Maybe<Scalars['String']>
    /** Name of the store */
    store_name?: Maybe<Scalars['String']>
    /** Timezone of the store */
    timezone?: Maybe<Scalars['String']>
    /** Page Title Prefix */
    title_prefix?: Maybe<Scalars['String']>
    /** Page Title Separator. */
    title_separator?: Maybe<Scalars['String']>
    /** Page Title Suffix */
    title_suffix?: Maybe<Scalars['String']>
    /** The ID number assigned to the website store belongs */
    website_id?: Maybe<Scalars['Int']>
    /** The unit of weight */
    weight_unit?: Maybe<Scalars['String']>
    /** Welcome Text */
    welcome?: Maybe<Scalars['String']>
    /** Status to check if Wish List is enabled */
    wishlist_general_active?: Maybe<Scalars['Boolean']>
    /** Status to check if Multiple Wish List is enabled */
    wishlist_general_multiple_enabled?: Maybe<Scalars['Boolean']>
    /** Check whether Yotpo Enabled */
    yotpo_settings_active?: Maybe<Scalars['Boolean']>
    /** Returns the Yotpo App Key */
    yotpo_settings_appkey?: Maybe<Scalars['String']>
}

export type SubscribeEmailToNewsletterOutput = {
    __typename?: 'SubscribeEmailToNewsletterOutput'
    /** Returns the status of the subscription request */
    status?: Maybe<SubscriptionStatusesEnum>
}

export enum SubscriptionStatusesEnum {
    NotActive = 'NOT_ACTIVE',
    Subscribed = 'SUBSCRIBED',
    Unsubscribed = 'UNSUBSCRIBED',
    Unconfirmed = 'UNCONFIRMED'
}

export type SuperAttribute = {
    /** Super attribute ID */
    attribute_id: Scalars['Int']
    /** Selected super attribute value ID */
    option_id: Scalars['Int']
}

export type SwatchData = {
    __typename?: 'SwatchData'
    /** Type of swatch filter item: 1 - text, 2 - image */
    type?: Maybe<Scalars['String']>
    /** Value for swatch item (text or image link) */
    value?: Maybe<Scalars['String']>
}

export type SwatchDataInterface = {
    /** Type of the swatch) */
    type?: Maybe<Scalars['String']>
    /** Value of swatch item (HEX color code, image link or textual value) */
    value?: Maybe<Scalars['String']>
}

export type SwatchLayerFilterItem = LayerFilterItemInterface &
    SwatchLayerFilterItemInterface & {
        __typename?: 'SwatchLayerFilterItem'
        /**
         * Count of items by filter.
         * @deprecated Use AggregationOption.count instead.
         */
        items_count?: Maybe<Scalars['Int']>
        /**
         * Filter label.
         * @deprecated Use AggregationOption.label instead.
         */
        label?: Maybe<Scalars['String']>
        /** Data required to render swatch filter item */
        swatch_data?: Maybe<SwatchData>
        /**
         * Value for filter request variable to be used in query.
         * @deprecated Use AggregationOption.value instead.
         */
        value_string?: Maybe<Scalars['String']>
    }

export type SwatchLayerFilterItemInterface = {
    /** Data required to render swatch filter item */
    swatch_data?: Maybe<SwatchData>
}

export type TargetRuleOutput = {
    __typename?: 'TargetRuleOutput'
    /** Maximum Number Of Product */
    MaximumNumberOfProduct?: Maybe<Scalars['Int']>
    /** Rotation Mode */
    RotationMode?: Maybe<Scalars['Int']>
    /** Show Products */
    ShowProducts?: Maybe<Scalars['Int']>
}

/** The tax item details */
export type TaxItem = {
    __typename?: 'TaxItem'
    /** The amount of tax applied to the item */
    amount: Money
    /** The rate used to calculate the tax */
    rate: Scalars['Float']
    /** A title that describes the tax */
    title: Scalars['String']
}

export type TextSwatchData = SwatchDataInterface & {
    __typename?: 'TextSwatchData'
    /** Type of the swatch) */
    type?: Maybe<Scalars['String']>
    /** Value of swatch item (HEX color code, image link or textual value) */
    value?: Maybe<Scalars['String']>
}

/** A price based on the quantity purchased. */
export type TierPrice = {
    __typename?: 'TierPrice'
    /** The price discount that this tier represents. */
    discount?: Maybe<ProductDiscount>
    final_price?: Maybe<Money>
    /** The minimum number of items that must be purchased to qualify for this price tier. */
    quantity?: Maybe<Scalars['Float']>
}

/** A stored payment account/credit card. */
export type TokenBaseCard = {
    __typename?: 'TokenBaseCard'
    /** Is card active */
    active?: Maybe<Scalars['Boolean']>
    /** Card payment data */
    additional?: Maybe<TokenBaseCardAdditional>
    /** Card billing address */
    address?: Maybe<CustomerAddress>
    /** Created-at date */
    created_at?: Maybe<Scalars['String']>
    /** Customer email */
    customer_email?: Maybe<Scalars['String']>
    /** Customer ID */
    customer_id?: Maybe<Scalars['Int']>
    /** Created-by IP */
    customer_ip?: Maybe<Scalars['String']>
    /** Expiration date */
    expires?: Maybe<Scalars['String']>
    /** Card identifier hash */
    hash?: Maybe<Scalars['String']>
    /** Card label */
    label?: Maybe<Scalars['String']>
    /** Last used date */
    last_use?: Maybe<Scalars['String']>
    /** Payment method code */
    method?: Maybe<Scalars['String']>
    /** Card gateway payment ID */
    payment_id?: Maybe<Scalars['String']>
    /** Card gateway profile ID */
    profile_id?: Maybe<Scalars['String']>
    /** Last updated date */
    updated_at?: Maybe<Scalars['String']>
}

/** Details and metadata for a stored CC/ACH. */
export type TokenBaseCardAdditional = {
    __typename?: 'TokenBaseCardAdditional'
    /** CC Bin (First-6) */
    cc_bin?: Maybe<Scalars['String']>
    /** CC Expiration Month */
    cc_exp_month?: Maybe<Scalars['String']>
    /** CC Expiration Year */
    cc_exp_year?: Maybe<Scalars['String']>
    /** CC Last-4 */
    cc_last4?: Maybe<Scalars['String']>
    /** CC Owner */
    cc_owner?: Maybe<Scalars['String']>
    /** CC Type */
    cc_type?: Maybe<Scalars['String']>
    /** ACH Account Name */
    echeck_account_name?: Maybe<Scalars['String']>
    /** ACH Account Number */
    echeck_account_no?: Maybe<Scalars['String']>
    /** ACH Account Number Last-4 */
    echeck_account_number_last4?: Maybe<Scalars['String']>
    /** ACH Account type */
    echeck_account_type?: Maybe<TokenBaseEcheckAccountType>
    /** ACH Bank Name */
    echeck_bank_name?: Maybe<Scalars['String']>
    /** ACH Routing Number */
    echeck_routing_no?: Maybe<Scalars['String']>
    /** ACH Routing Number Last-4 */
    echeck_routing_number_last4?: Maybe<Scalars['String']>
}

/** Input for creating a stored card. */
export type TokenBaseCardCreateInput = {
    /** Is card active */
    active?: Maybe<Scalars['Boolean']>
    /** Card payment data */
    additional?: Maybe<TokenBaseCardPaymentInput>
    /** Card billing address */
    address?: Maybe<CustomerAddressInput>
    /** Customer email (required) */
    customer_email: Scalars['String']
    /** Created-by IP */
    customer_ip?: Maybe<Scalars['String']>
    /** Card expiration date (YYYY-MM-DD 23:59:59) */
    expires?: Maybe<Scalars['String']>
    /** Payment method code (required) */
    method: Scalars['String']
}

/** Payment data for a stored card. Note, the specific fields that are relevant depend on the payment method. */
export type TokenBaseCardPaymentInput = {
    acceptjs_key?: Maybe<Scalars['String']>
    acceptjs_value?: Maybe<Scalars['String']>
    /** TokenBase Card Hash (used only during checkout) */
    card_id?: Maybe<Scalars['String']>
    /** CC Bin (First-6) */
    cc_bin?: Maybe<Scalars['String']>
    /** CC CVV */
    cc_cid?: Maybe<Scalars['String']>
    /** CC Expiration Month */
    cc_exp_month?: Maybe<Scalars['String']>
    /** CC Expiration Year */
    cc_exp_year?: Maybe<Scalars['String']>
    /** CC Last-4 */
    cc_last4?: Maybe<Scalars['String']>
    /** CC Number */
    cc_number?: Maybe<Scalars['String']>
    /** CC Owner */
    cc_owner?: Maybe<Scalars['String']>
    /** CC Type */
    cc_type?: Maybe<Scalars['String']>
    /** ACH Account Name */
    echeck_account_name?: Maybe<Scalars['String']>
    /** ACH Account Number */
    echeck_account_no?: Maybe<Scalars['String']>
    /** ACH Account Type */
    echeck_account_type?: Maybe<TokenBaseEcheckAccountType>
    /** ACH Bank Name */
    echeck_bank_name?: Maybe<Scalars['String']>
    /** ACH Routing Number */
    echeck_routing_no?: Maybe<Scalars['String']>
    /** Save card (used only during checkout) */
    save?: Maybe<Scalars['Boolean']>
}

/** Input for updating a stored card. */
export type TokenBaseCardUpdateInput = {
    /** Is card active */
    active?: Maybe<Scalars['Boolean']>
    /** Card payment data */
    additional?: Maybe<TokenBaseCardPaymentInput>
    /** Card billing address */
    address?: Maybe<CustomerAddressInput>
    /** Customer email */
    customer_email?: Maybe<Scalars['String']>
    /** Created-by IP */
    customer_ip?: Maybe<Scalars['String']>
    /** Card expiration date (YYYY-MM-DD 23:59:59) */
    expires?: Maybe<Scalars['String']>
    /** Card identifier hash to update (required) */
    hash: Scalars['String']
    /** Payment method code */
    method?: Maybe<Scalars['String']>
}

/** Checkout configuration for a TokenBase payment method. */
export type TokenBaseCheckoutConfig = {
    __typename?: 'TokenBaseCheckoutConfig'
    achAccountTypes?: Maybe<Array<Maybe<TokenBaseKeyValue>>>
    achImage?: Maybe<Scalars['String']>
    apiLoginId?: Maybe<Scalars['String']>
    /** Available CC types */
    availableTypes?: Maybe<Array<Maybe<TokenBaseKeyValue>>>
    /** Can cards be saved? */
    canSaveCard?: Maybe<Scalars['Boolean']>
    /** Is CC BIN (first6) storage enabled? */
    canStoreBin?: Maybe<Scalars['Boolean']>
    clientKey?: Maybe<Scalars['String']>
    /** CVV helper image URL */
    cvvImageUrl?: Maybe<Scalars['String']>
    /** Hash of the default card to select */
    defaultSaveCard?: Maybe<Scalars['Boolean']>
    /** Is card saving forced? */
    forceSaveCard?: Maybe<Scalars['Boolean']>
    /** Is CVV enabled? */
    hasVerification?: Maybe<Scalars['Boolean']>
    /** Is CC type detection enabled? */
    isCcDetectionEnabled?: Maybe<Scalars['Boolean']>
    /** Payment logo image URL (if enabled) */
    logoImage?: Maybe<Scalars['String']>
    /** Payment method code */
    method?: Maybe<Scalars['String']>
    /** Available CC Exp Months */
    months?: Maybe<Array<Maybe<TokenBaseKeyValue>>>
    /** Is CVV required for stored cards? */
    requireCcv?: Maybe<Scalars['Boolean']>
    /** Is the payment gateway in sandbox mode? */
    sandbox?: Maybe<Scalars['Boolean']>
    /** Are stored cards enabled? */
    useVault?: Maybe<Scalars['Boolean']>
    /** Available CC Exp Years */
    years?: Maybe<Array<Maybe<TokenBaseKeyValue>>>
}

export enum TokenBaseEcheckAccountType {
    Checking = 'checking',
    Savings = 'savings',
    BusinessChecking = 'businessChecking'
}

/** Container for generic key/value data. */
export type TokenBaseKeyValue = {
    __typename?: 'TokenBaseKeyValue'
    /** Generic key */
    key?: Maybe<Scalars['String']>
    /** Generic value */
    value?: Maybe<Scalars['String']>
}

/** DotDigital newsletter configurations */
export type TrackingDetails = {
    __typename?: 'TrackingDetails'
    /** Domains */
    domains?: Maybe<Scalars['String']>
    /** Is DotDigital tracking enabled */
    is_enable?: Maybe<Scalars['Boolean']>
    /** Unique Id */
    unique_id?: Maybe<Scalars['String']>
}

export type TrackItem = {
    __typename?: 'TrackItem'
    /** Carrier of the track */
    carrier_code?: Maybe<Scalars['String']>
    /** Description of the track */
    description?: Maybe<Scalars['String']>
    /** Carrier title of the track */
    title?: Maybe<Scalars['String']>
    /** Track number of the track */
    track_number?: Maybe<Scalars['String']>
    /** Tracking URL */
    tracking_url?: Maybe<Scalars['String']>
}

/** Twitter social sharing attribute values */
export type Twitter = {
    __typename?: 'Twitter'
    /** Twitter additional attributes */
    additional_attributes?: Maybe<Scalars['String']>
    /** Is Twitter sharing enabled */
    is_enabled?: Maybe<Scalars['Boolean']>
    /** Twitter sharing url */
    sharing_url?: Maybe<Scalars['String']>
    /** Twitter Title */
    title?: Maybe<Scalars['String']>
}

export type UpdateCartItemsInput = {
    cart_id: Scalars['String']
    cart_items: Array<Maybe<CartItemUpdateInput>>
}

export type UpdateCartItemsOutput = {
    __typename?: 'UpdateCartItemsOutput'
    cart: Cart
}

/** Update company hierarchy output data schema. */
export type UpdateCompanyHierarchyOutput = {
    __typename?: 'UpdateCompanyHierarchyOutput'
    /** Company details */
    company?: Maybe<Company>
    /** Message of company team operation */
    message?: Maybe<Scalars['String']>
    /** Status of company team operation: true - success; false - fail. */
    status?: Maybe<Scalars['Boolean']>
}

/** Update company output data schema. */
export type UpdateCompanyOutput = {
    __typename?: 'UpdateCompanyOutput'
    /** Message of company update operation */
    message?: Maybe<Scalars['String']>
    /** Status of update operation: true - success; false - fail. */
    status?: Maybe<Scalars['Boolean']>
}

/** Update company user output data schema. */
export type UpdateCompanyUserOutput = {
    __typename?: 'UpdateCompanyUserOutput'
    /** Updated company user instance. */
    user: Customer
}

/** Contains the customer's wish list and any errors encountered */
export type UpdateProductsInWishlistOutput = {
    __typename?: 'UpdateProductsInWishlistOutput'
    /** An array of errors encountered while updating products in a wish list */
    user_errors: Array<Maybe<WishListUserInputError>>
    /** Contains the wish list with all items that were successfully updated */
    wishlist: Wishlist
}

export type UpdateRequisitionListInput = {
    /** A list of item IDs to update */
    items?: Maybe<Array<Maybe<RequisitionListItemToUpdate>>>
    /** Wishlist ID */
    requisitionListId?: Maybe<Scalars['Int']>
}

export type UpdateRequisitionListOutput = {
    __typename?: 'UpdateRequisitionListOutput'
    /** update item in requisition list */
    messages?: Maybe<Scalars['String']>
}

export type UpdateWishlistInput = {
    /** A list of item IDs to update */
    items?: Maybe<Array<Maybe<ItemToUpdate>>>
    /** Wishlist ID */
    wishlistId?: Maybe<Scalars['Int']>
}

export type UpdateWishlistOutput = {
    __typename?: 'UpdateWishlistOutput'
    /** The number of items in the wish list */
    items_count?: Maybe<Scalars['Int']>
    /** Wishlist update response */
    messages?: Maybe<Scalars['String']>
}

/** The object contains URL rewrite details */
export type UrlRewrite = {
    __typename?: 'UrlRewrite'
    /** Request parameters */
    parameters?: Maybe<Array<Maybe<HttpQueryParameter>>>
    /** Request URL */
    url?: Maybe<Scalars['String']>
}

/** This enumeration defines the entity type. */
export enum UrlRewriteEntityTypeEnum {
    CmsPage = 'CMS_PAGE',
    Product = 'PRODUCT',
    Category = 'CATEGORY'
}

/** Required input for payment methods with Vault support. */
export type VaultTokenInput = {
    /** The public hash of the payment token */
    public_hash: Scalars['String']
}

export type VerifyRecaptchaV3Input = {
    /** recaptcha action page (eg: signup, login, forgotpassword) */
    action?: Maybe<Scalars['String']>
    /** Recaptcha V3 token */
    token?: Maybe<Scalars['String']>
}

export type VerifyRecaptchaV3Output = {
    __typename?: 'VerifyRecaptchaV3Output'
    /** Recaptcha error codes */
    error?: Maybe<Scalars['String']>
    /** Recaptcha verify message */
    messages?: Maybe<Scalars['String']>
    /** Recaptcha Score */
    score?: Maybe<Scalars['Float']>
    /** Recaptcha verify status */
    status?: Maybe<Scalars['Boolean']>
}

/** Virtual Cart Item */
export type VirtualCartItem = CartItemInterface & {
    __typename?: 'VirtualCartItem'
    customizable_options?: Maybe<Array<Maybe<SelectedCustomizableOption>>>
    id: Scalars['String']
    /** A resulting stock state for a configurable product, based both on parent and child stock. */
    item_stock_status: ProductStockStatus
    itemsku: Scalars['String']
    /** A combined item-level message */
    message?: Maybe<Scalars['String']>
    prices?: Maybe<CartItemPrices>
    product: ProductInterface
    qty_validation_message: Scalars['String']
    quantity: Scalars['Float']
}

/** A virtual product is non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProduct = ProductInterface &
    CustomizableProductInterface & {
        __typename?: 'VirtualProduct'
        Product_sizechart?: Maybe<Scalars['Int']>
        Product_sizechart_text?: Maybe<Scalars['String']>
        activity?: Maybe<Scalars['String']>
        /** The attribute set assigned to the product. */
        attribute_set_id?: Maybe<Scalars['Int']>
        brand?: Maybe<Scalars['Int']>
        brand_text?: Maybe<Scalars['String']>
        /**
         * Relative canonical URL. This value is returned only if the system setting 'Use
         * Canonical Link Meta Tag For Products' is enabled
         */
        canonical_url?: Maybe<Scalars['String']>
        /** The categories assigned to a product. */
        categories?: Maybe<Array<Maybe<CategoryInterface>>>
        category_gear?: Maybe<Scalars['String']>
        climate?: Maybe<Scalars['String']>
        collar?: Maybe<Scalars['String']>
        color?: Maybe<Scalars['String']>
        color_family?: Maybe<Scalars['String']>
        color_text?: Maybe<Scalars['String']>
        /** The product's country of origin. */
        country_of_manufacture?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was created. */
        created_at?: Maybe<Scalars['String']>
        /** Crosssell Products */
        crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** Detailed information about the product. The value can include simple HTML tags. */
        description?: Maybe<ComplexTextValue>
        eco_collection?: Maybe<Scalars['Int']>
        eco_collection_text?: Maybe<Scalars['String']>
        eligible_for_pick_up?: Maybe<Scalars['Int']>
        eligible_for_pick_up_text?: Maybe<Scalars['String']>
        erin_recommends?: Maybe<Scalars['Int']>
        erin_recommends_text?: Maybe<Scalars['String']>
        features_bags?: Maybe<Scalars['String']>
        format?: Maybe<Scalars['Int']>
        format_text?: Maybe<Scalars['String']>
        gender?: Maybe<Scalars['String']>
        /** Indicates whether a gift message is available. */
        gift_message_available?: Maybe<Scalars['String']>
        /** The ID number assigned to the product. */
        id?: Maybe<Scalars['Int']>
        /** The relative path to the main image on the product page. */
        image?: Maybe<ProductImage>
        /** Indicates whether the product can be returned */
        is_returnable?: Maybe<Scalars['String']>
        /** A number representing the product's manufacturer. */
        manufacturer?: Maybe<Scalars['Int']>
        manufacturer_text?: Maybe<Scalars['String']>
        material?: Maybe<Scalars['String']>
        /** An array of Media Gallery objects. */
        media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>
        /**
         * An array of MediaGalleryEntry objects.
         * @deprecated Use product's `media_gallery` instead
         */
        media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>
        /** A brief overview of the product for search results listings, maximum 255 characters. */
        meta_description?: Maybe<Scalars['String']>
        /** A comma-separated list of keywords that are visible only to search engines. */
        meta_keyword?: Maybe<Scalars['String']>
        /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
        meta_title?: Maybe<Scalars['String']>
        /** The product name. Customers use this name to identify the product. */
        name?: Maybe<Scalars['String']>
        new?: Maybe<Scalars['Int']>
        /** The beginning date for new product listings, and determines if the product is featured as a new product. */
        new_from_date?: Maybe<Scalars['String']>
        new_text?: Maybe<Scalars['String']>
        /** The end date for new product listings. */
        new_to_date?: Maybe<Scalars['String']>
        /** Product stock only x left count */
        only_x_left_in_stock?: Maybe<Scalars['Float']>
        /** An array of options for a customizable product. */
        options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>
        /** If the product has multiple options, determines where they appear on the product page. */
        options_container?: Maybe<Scalars['String']>
        pattern?: Maybe<Scalars['String']>
        performance_fabric?: Maybe<Scalars['Int']>
        performance_fabric_text?: Maybe<Scalars['String']>
        /**
         * A ProductPrices object, indicating the price of an item.
         * @deprecated Use price_range for product price information.
         */
        price?: Maybe<ProductPrices>
        /** A PriceRange object, indicating the range of prices for the product */
        price_range: PriceRange
        /** An array of TierPrice objects. */
        price_tiers?: Maybe<Array<Maybe<TierPrice>>>
        product_label?: Maybe<Scalars['Int']>
        product_label_text?: Maybe<Scalars['String']>
        /** An array of ProductLinks objects. */
        product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>
        /** Product review summary and review count data */
        product_reviews?: Maybe<ProductReviews>
        purpose?: Maybe<Scalars['Int']>
        purpose_text?: Maybe<Scalars['String']>
        /** Review/Rating related configurations */
        rating_configurations?: Maybe<RatingConfigurationData>
        /** The average of all the ratings given to the product. */
        rating_summary: Scalars['Float']
        /** Related Products */
        related_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The total count of all the reviews given to the product. */
        review_count: Scalars['Int']
        /** Product review summary and review count data */
        review_details?: Maybe<ReviewParameters>
        /** The list of products reviews. */
        reviews: ProductReviews
        sale?: Maybe<Scalars['Int']>
        sale_text?: Maybe<Scalars['String']>
        /** A short description of the product. Its use depends on the theme. */
        short_description?: Maybe<ComplexTextValue>
        size?: Maybe<Scalars['String']>
        size_text?: Maybe<Scalars['String']>
        sizechart?: Maybe<Scalars['Int']>
        sizechart_text?: Maybe<Scalars['String']>
        /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
        sku?: Maybe<Scalars['String']>
        sleeve?: Maybe<Scalars['String']>
        /** The relative path to the small image, which is used on catalog pages. */
        small_image?: Maybe<ProductImage>
        /** The beginning date that a product has a special price. */
        special_from_date?: Maybe<Scalars['String']>
        /** The discounted price of the product. */
        special_price?: Maybe<Scalars['Float']>
        /** The end date that a product has a special price. */
        special_to_date?: Maybe<Scalars['String']>
        /** Stock status of the product */
        stock_status?: Maybe<ProductStockStatus>
        strap_bags?: Maybe<Scalars['String']>
        style_bags?: Maybe<Scalars['String']>
        style_bottom?: Maybe<Scalars['String']>
        style_general?: Maybe<Scalars['String']>
        /** The file name of a swatch image */
        swatch_image?: Maybe<Scalars['String']>
        /** The relative path to the product's thumbnail image. */
        thumbnail?: Maybe<ProductImage>
        /**
         * The price when tier pricing is in effect and the items purchased threshold has been reached.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_price?: Maybe<Scalars['Float']>
        /**
         * An array of ProductTierPrices objects.
         * @deprecated Use price_tiers for product tier price information.
         */
        tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>
        /**
         * One of simple, virtual, bundle, downloadable, grouped, or configurable.
         * @deprecated Use __typename instead.
         */
        type_id?: Maybe<Scalars['String']>
        /** Timestamp indicating when the product was updated. */
        updated_at?: Maybe<Scalars['String']>
        /** Upsell Products */
        upsell_products?: Maybe<Array<Maybe<ProductInterface>>>
        /** The part of the URL that identifies the product */
        url_key?: Maybe<Scalars['String']>
        /** @deprecated Use product's `canonical_url` or url rewrites instead */
        url_path?: Maybe<Scalars['String']>
        /** URL rewrites list */
        url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>
        /** The part of the product URL that is appended after the url key */
        url_suffix?: Maybe<Scalars['String']>
        /**
         * An array of websites in which the product is available.
         * @deprecated The field should not be used on the storefront.
         */
        websites?: Maybe<Array<Maybe<Website>>>
    }

/** A virtual product is non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProductProduct_ReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

/** A virtual product is non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProductReviewsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type VirtualProductCartItemInput = {
    customizable_options?: Maybe<Array<Maybe<CustomizableOptionInput>>>
    data: CartItemInput
}

/** Website is deprecated because it is should not be used on storefront. The type contains information about a website */
export type Website = {
    __typename?: 'Website'
    /**
     * A code assigned to the website to identify it
     * @deprecated The field should not be used on the storefront.
     */
    code?: Maybe<Scalars['String']>
    /**
     * The default group ID that the website has
     * @deprecated The field should not be used on the storefront.
     */
    default_group_id?: Maybe<Scalars['String']>
    /**
     * The ID number assigned to the website
     * @deprecated The field should not be used on the storefront.
     */
    id?: Maybe<Scalars['Int']>
    /**
     * Specifies if this is the default website
     * @deprecated The field should not be used on the storefront.
     */
    is_default?: Maybe<Scalars['Boolean']>
    /**
     * The website name. Websites use this name to identify it easier.
     * @deprecated The field should not be used on the storefront.
     */
    name?: Maybe<Scalars['String']>
    /**
     * The attribute to use for sorting websites
     * @deprecated The field should not be used on the storefront.
     */
    sort_order?: Maybe<Scalars['Int']>
}

/** Whatsapp social sharing attribute values */
export type Whatsapp = {
    __typename?: 'Whatsapp'
    /** Whatsapp additional attributes */
    additional_attributes?: Maybe<Scalars['String']>
    /** Is Whatsapp sharing enabled */
    is_enabled?: Maybe<Scalars['Boolean']>
    /** Whatsapp sharing url */
    sharing_url?: Maybe<Scalars['String']>
    /** Whatsapp Title */
    title?: Maybe<Scalars['String']>
}

export type Wishlist = {
    __typename?: 'Wishlist'
    /** Wishlist unique identifier */
    id?: Maybe<Scalars['ID']>
    /** An array of items in the customer's wish list */
    items?: Maybe<Array<Maybe<WishlistItem>>>
    /** The number of items in the wish list */
    items_count?: Maybe<Scalars['Int']>
    /** An encrypted code that Magento uses to link to the wish list */
    sharing_code?: Maybe<Scalars['String']>
    /** The time of the last modification to the wish list */
    updated_at?: Maybe<Scalars['String']>
}

export type WishlistInfo = {
    /** Wishlist name */
    name?: Maybe<Scalars['String']>
    /** A flag that means wishlist public or not */
    visibility?: Maybe<Scalars['Boolean']>
}

export type WishlistItem = {
    __typename?: 'WishlistItem'
    /** The time when the customer added the item to the wish list */
    added_at?: Maybe<Scalars['String']>
    /** The customer's comment about this item */
    description?: Maybe<Scalars['String']>
    /** The wish list item ID */
    id?: Maybe<Scalars['Int']>
    product?: Maybe<ProductInterface>
    /** The quantity of this wish list item */
    qty?: Maybe<Scalars['Float']>
    /** Wishlist item options */
    selectedProductId?: Maybe<Scalars['String']>
    /** Selected options for configurable product */
    selected_options?: Maybe<SelectedData>
}

/** Defines the items to add to a wish list */
export type WishlistItemInput = {
    /** An array of options that the customer entered */
    entered_options?: Maybe<Array<Maybe<EnteredOptionInput>>>
    /** For complex product types, the SKU of the parent product */
    parent_sku?: Maybe<Scalars['String']>
    /** The amount or number of items to add */
    quantity: Scalars['Float']
    /** An array of strings corresponding to options the customer selected */
    selected_options?: Maybe<Array<Maybe<Scalars['ID']>>>
    /** The SKU of the product to add. For complex product types, specify the child product SKU */
    sku: Scalars['String']
}

/** Defines updates to items in a wish list */
export type WishlistItemUpdateInput = {
    /** Customer-entered comments about the item */
    description?: Maybe<Scalars['String']>
    /** An array of options that the customer entered */
    entered_options?: Maybe<Array<Maybe<EnteredOptionInput>>>
    /** The new amount or number of this item */
    quantity?: Maybe<Scalars['Float']>
    /** An array of strings corresponding to options the customer selected */
    selected_options?: Maybe<Array<Maybe<Scalars['ID']>>>
    /** The ID of the wishlist item to update */
    wishlist_item_id: Scalars['ID']
}

/** Deprecated: `Wishlist` type should be used instead */
export type WishlistOutput = {
    __typename?: 'WishlistOutput'
    /** The ID of the current wishlist */
    id?: Maybe<Scalars['Int']>
    /**
     * An array of items in the customer's wish list
     * @deprecated Use field `items` from type `Wishlist` instead
     */
    items?: Maybe<Array<Maybe<WishlistItem>>>
    /**
     * The number of items in the wish list
     * @deprecated Use field `items_count` from type `Wishlist` instead
     */
    items_count?: Maybe<Scalars['Int']>
    /**
     * When multiple wish lists are enabled, the name the customer assigns to the wishlist
     * @deprecated This field is related to Commerce functionality and is always `null` in Open Source edition
     */
    name?: Maybe<Scalars['String']>
    /** The qty of products in wishlist (not sku items, but qty) */
    qty_count?: Maybe<Scalars['Int']>
    /** Selected options for configurable product */
    selected_options?: Maybe<SelectedData>
    /**
     * An encrypted code that Magento uses to link to the wish list
     * @deprecated Use field `sharing_code` from type `Wishlist` instead
     */
    sharing_code?: Maybe<Scalars['String']>
    /**
     * The time of the last modification to the wish list
     * @deprecated Use field `updated_at` from type `Wishlist` instead
     */
    updated_at?: Maybe<Scalars['String']>
}

/** Deprecated: `Wishlist` type should be used instead */
export type WishlistOutputItemsArgs = {
    pageSize?: Maybe<Scalars['Int']>
    currentPage?: Maybe<Scalars['Int']>
}

export type WishlistProduct = {
    /** Product ID */
    product: Scalars['Int']
    /** Item quantity */
    qty: Scalars['Int']
    /** A list of super attributes for configurable products */
    super_attribute?: Maybe<Array<Maybe<SuperAttribute>>>
    /** Wishlist ID */
    wishlist_id?: Maybe<Scalars['Int']>
}

export type WishlistProductData = {
    /** Wishlist item ID */
    itemId?: Maybe<Scalars['Int']>
    /** Item quantity */
    qty: Scalars['Int']
}

export type WishlistRemoveItem = {
    /** Wishlist item ID */
    itemId?: Maybe<Scalars['Int']>
}

/** An error encountered while performing operations with WishList. */
export type WishListUserInputError = {
    __typename?: 'WishListUserInputError'
    /** Wishlist-specific error code */
    code: WishListUserInputErrorType
    /** A localized error message */
    message: Scalars['String']
}

export enum WishListUserInputErrorType {
    ProductNotFound = 'PRODUCT_NOT_FOUND',
    Undefined = 'UNDEFINED'
}

export type ZipCodeValidatorsOutput = {
    __typename?: 'ZipCodeValidatorsOutput'
    /** Country Codes, e.g. US, CA. etc */
    country_codes?: Maybe<Array<Maybe<CountryCodes>>>
}

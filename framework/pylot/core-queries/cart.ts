/** Core cart query name */
export const CART_QUERY_NAME = 'pylot_core_cart_query'

/**
 * Important things to consider:
 * 1. Make sure to include isSignedIn: Boolean! = false to the query
 *    and pass isSignedIn as true when necessary
 * 2. Position `applied_store_credit` before items `field`.
 *    This way store credit gets calculated only once and server returns the right value.
 */
export const cartFields = /* GraphQL */ `
 id
 email
 is_virtual
 checkoutUrl
 applied_store_credit @include(if: $isSignedIn) {
    enabled
    current_balance {
        __typename
        currency
        value
    }
    applied_balance {
        __typename
        currency
        value
    }
 }
 items {
     id
     uid
     __typename
     product {
         id
         uid
         name
         sku
         stock_status
         thumbnail {
             label
             url
         }
 
         categories {
             name
             url_path
             breadcrumbs {
                 category_id
                 category_name
             }
         }
         price_range {
             __typename
             minimum_price {
                 regular_price {
                     value
                     currency
                 }
                 final_price {
                     value
                     currency
                 }
                 discount {
                     amount_off
                 }
             }
             maximum_price {
                regular_price {
                    value
                    currency
                }
                final_price {
                    value
                    currency
                }
                discount {
                    amount_off
                }
            }
         }
         works_well_with {
            id
            name
            sku
         }
         special_price
         url_key
         __typename
         ... on ConfigurableProduct {
             variants {
                 attributes {
                     code
                     label
                     uid
                     value_index
                 }
                 product {
                     stock_status
                     sku
                     thumbnail {
                         url
                     }
                 }
             }
         }
     }
     ... on ConfigurableCartItem {
         configurable_options {
             configurable_product_option_uid
             configurable_product_option_value_uid
             option_label
             value_label
         }
     }
     ... on GiftCardCartItem {
         __typename
         amount {
             value
             currency
         }
         message
         recipient_email
         recipient_name
         sender_email
         sender_name
     }
     quantity
     prices {
         __typename
         price {
             value
         }
         row_total_including_tax {
             value
             currency
         }
         row_total {
             value
             currency
         }
         total_item_discount {
             value
             currency
         }
     }
 }
 
 prices {
     __typename
     grand_total {
         value
         currency
     }
     applied_taxes {
         label
         amount {
             value
             currency
         }
     }
     subtotal_including_tax {
         value
         currency
     }
     subtotal_excluding_tax {
         value
         currency
     }
     subtotal_with_discount_excluding_tax {
         value
         currency
     }
     discounts {
         amount {
             value
             currency
         }
     }
 }
 shipping_addresses {
     firstname
     lastname
     company
     street
     city
     region {
         code
         label
         region_id
     }
     postcode
     telephone
     country {
         code
         label
     }
     available_shipping_methods {
         amount {
             currency
             value
         }
         available
         carrier_code
         carrier_title
         error_message
         method_code
         method_title
         price_excl_tax {
             value
             currency
         }
         price_incl_tax {
             value
             currency
         }
     }
     selected_shipping_method {
         carrier_code
         method_code
         carrier_title
         method_title
         amount {
             value
             currency
         }
     }
 }
 billing_address {
     firstname
     lastname
     company
     street
     city
     region {
         code
         label
         region_id
     }
     postcode
     telephone
     country {
         code
         label
     }
 }
 selected_payment_method {
     code
     title
 }
 available_payment_methods {
     code
     title
 }
 applied_coupons {
     code
 }
 applied_gift_cards {
     code
     current_balance {
         currency
         value
     }
     applied_balance {
         currency
         value
     }
 }
 `

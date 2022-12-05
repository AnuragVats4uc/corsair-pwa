export const onGiftCardProductFragment = /* GraphQL */ `
    ... on GiftCardProduct {
        allow_open_amount
        open_amount_min
        open_amount_max
        giftcard_type
        is_redeemable
        lifetime
        allow_message
        message_max_length
        gift_card_options {
            ... on CustomizableFieldOption {
                title
                required
                value {
                    uid
                }
            }
        }
        giftcard_amounts {
            uid
            website_id
            website_value
            attribute_id
            value
        }
    }
`

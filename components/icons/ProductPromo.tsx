import { ReactElement, SVGProps } from 'react'

const ProductPromoIcon = ({
    ...props
}: SVGProps<SVGSVGElement>): ReactElement => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <path
            d="M13.6033 2.99454C13.9088 2.68903 14.3312 2.53009 14.7623 2.55843L19.7176 2.88412C20.4686 2.93347 21.0667 3.53161 21.116 4.28254L21.4416 9.23803C21.47 9.66915 21.311 10.0915 21.0055 10.397L10.415 20.9876C9.82922 21.5734 8.87947 21.5734 8.29368 20.9876L3.01261 15.7065C2.42682 15.1207 2.42682 14.171 3.01261 13.5852L13.6033 2.99454Z"
            stroke="black"
        />
        <circle cx="17" cy="7" r="1.5" stroke="black" />
    </svg>
)

export default ProductPromoIcon

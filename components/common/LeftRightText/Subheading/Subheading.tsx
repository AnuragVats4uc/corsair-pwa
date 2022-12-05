import s from './Subheading.module.scss'

const c = /*tw*/ {
    leftRightTextSubheading: `${s['left-right-text-subheading']} left-right-text-subheading text-white uppercase font-semibold leading-4 mb-2`
}

export interface SubheadingProps {
    subheading: string
}

export const Subheading = ({
    subheading
}: SubheadingProps): JSX.Element | null => {
    if (!subheading) return null
    return <h6 className={c.leftRightTextSubheading}>{subheading}</h6>
}

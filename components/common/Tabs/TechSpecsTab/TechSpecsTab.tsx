import React, { useMemo, VFC } from 'react'
import { ProductInterface } from '@pylot-data/pylotschema'
import TechSpecItem from './TechSpecItem'
import s from './TechSpecsTab.module.scss'

interface ITechSpecs {
    productData: ProductInterface
}

const c = {
    body: 'block w-full',
    table: `${s.table} w-full block`,
    tables: `${s.tables} lg:flex lg:justify-center bg-black`
}

/**
 * Handles the amount of rows per table
 */
let twoColumnThreshold = 18

const TechSpecs: VFC<ITechSpecs> = ({ productData }) => {
    const { tech_specs: techSpecs } = productData

    twoColumnThreshold = techSpecs!.length / 2

    /**
     * Tech specs
     * @returns JSX
     */
    const TechSpecs = useMemo(() => {
        if (!techSpecs) return null

        return techSpecs?.map((techSpec, index) => {
            if (!techSpec || index >= twoColumnThreshold) return
            return <TechSpecItem techSpec={techSpec} key={index} />
        })
    }, [productData])

    /**
     * Tech Specs Second Column
     * @description map through techSpecs to ensure two column display on desktop
     * @returns JSX
     */
    const TechSpecsSecondColumn = useMemo(() => {
        if (!techSpecs) return null

        return techSpecs?.map((techSpec, index) => {
            if (!techSpec || index < twoColumnThreshold) return
            return <TechSpecItem techSpec={techSpec} key={index} />
        })
    }, [productData])

    return (
        <div className={c.tables}>
            <table className={c.table}>
                <tbody className={c.body}>{techSpecs && TechSpecs}</tbody>
            </table>
            <table className={c.table}>
                <tbody className={c.body}>
                    {techSpecs && TechSpecsSecondColumn}
                </tbody>
            </table>
        </div>
    )
}

export default TechSpecs

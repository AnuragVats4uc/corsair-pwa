import { FC } from 'react'
import { TopCategoryContent } from './TopCategoryContent'
import CategorySlider from './CategorySlider/CategorySlider'
import { CategoryTree } from '@pylot-data/pylotschema'
import s from './TopCategorySection.module.scss'
import cn from 'classnames'

export type TopCategorySectionType = {
    category: {
        title: string
        description?: string
        contentBlocks?: any
    }
    breadcrumbs: CategoryTree
}

export const TopCategorySection: FC<TopCategorySectionType> = ({
    category,
    breadcrumbs
}) => {
    const twClasses = {
        topCategoryContainer: 'text-white block md:flex'
    }
    return (
        <div
            className={cn(
                s['top-category-container'],
                twClasses.topCategoryContainer
            )}
        >
            <TopCategoryContent
                title={category?.title}
                description={category?.description}
                breadcrumbs={breadcrumbs}
            />
            <div className={cn(s['slider-container'])}>
                <CategorySlider content={category?.contentBlocks} />
            </div>
        </div>
    )
}

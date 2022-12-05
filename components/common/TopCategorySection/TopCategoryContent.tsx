import { FC } from 'react'
import { Breadcrumbs, CategoryBreadcrumb } from '@corratech/pylot-breadcrumbs'
import { CategoryTree } from '@pylot-data/pylotschema'
import { useTranslation } from 'next-i18next'
import s from './TopCategorySection.module.scss'
import cn from 'classnames'
import Arrow from '@components/common/Carousel/Arrow/Arrow'

export type TopCategoryContentType = {
    title: string
    breadcrumbs: CategoryTree
    description?: string
}

export const TopCategoryContent: FC<TopCategoryContentType> = ({
    title,
    breadcrumbs,
    description
}) => {
    const { t } = useTranslation('common')

    return (
        <div className={cn(s['top-category-content'], 'text-white')}>
            <div className={cn(s['breadcrumb-wrapper'], 'hidden md:block')}>
                <Breadcrumbs
                    category={{
                        name: breadcrumbs.name!,
                        breadcrumbs: breadcrumbs.breadcrumbs as CategoryBreadcrumb[]
                    }}
                    rootText={t('breadcrumbs|Home')}
                    separator={<Arrow direction="right" />}
                />
            </div>
            <h1 className={cn(s['category-title'], 'uppercase font-normal')}>
                {title}
            </h1>
            {description && (
                <p
                    className={cn(
                        s['category-description'],
                        'text-base font-normal'
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    )
}

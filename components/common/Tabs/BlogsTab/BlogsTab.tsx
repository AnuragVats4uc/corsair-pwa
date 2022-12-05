import { IBlogTab } from '@components/common/types'
import React, { VFC } from 'react'
import BlogArticle from './BlogArticle'
import s from './BlogsTab.module.scss'
import orderBy from 'lodash/orderBy'

const c = /*tw*/ {
    tab: `${s['blogs-tab']} flex`
}

export type BlogsTabProps = {
    content: IBlogTab
}

const BlogsTab: VFC<BlogsTabProps> = ({ content }) => {
    return (
        <div className={c.tab}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-15 mx-auto">
                {orderBy(content.content, ['publishDate'], ['desc']).map(
                    (blog) => (
                        <BlogArticle blog={blog} key={blog.title} />
                    )
                )}
            </div>
        </div>
    )
}

export default BlogsTab

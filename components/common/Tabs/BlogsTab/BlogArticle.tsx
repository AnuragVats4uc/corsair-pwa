import React, { VFC } from 'react'
import type { IBlogArticle } from '@components/common/types'
import Image from '@corratech/corsair-image'
import s from './BlogArticle.module.scss'
import { getFormattedDate } from '@corratech/pylot-utils'

const c = /*tw*/ {
    article: `${s['blog-article']} flex flex-col md:flex-row`,
    image: `${s['blog-article-image']} relative`,
    name: `${s['blog-article-name']} font-aktivGrotesk uppercase`,
    date: `${s['blog-article-publish-date']}`,
    author: `${s['blog-article-author']}`
}

export type BlogArticleProps = {
    blog: IBlogArticle
}

const BlogArticle: VFC<BlogArticleProps> = ({ blog }) => {
    const publishDate = `Published on ${getFormattedDate(
        blog.publishDate,
        'en'
    )}`
    const author = `By ${blog.author}`
    return (
        <a
            href={blog.linkToArticle}
            className={c.article}
            target="_blank"
            rel="noreferrer"
        >
            <div className={c.image}>
                <Image src={blog.featuredImage.image.file.url} layout="fill" />
            </div>
            <div>
                <p className={c.name}>{blog.articleName}</p>
                <p className={c.date}>{publishDate}</p>
                <p className={c.author}>{author}</p>
            </div>
        </a>
    )
}

export default BlogArticle

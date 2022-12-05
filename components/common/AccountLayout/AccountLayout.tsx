import React, { FC } from 'react'
import Layout from '@components/common/Layout'
import { AccountSidebar } from '@components/common/AccountSidebar'
import s from '@pagestyles/Account.module.scss'
import formStyles from '@commonStyles/Forms.module.scss'
import tableStyles from '@commonStyles/Table.module.scss'
import cn from 'classnames'

interface Props {
    authRequired: boolean
    pageProps: any
}

const AccountLayout: FC<Props> = ({ children, pageProps, authRequired }) => {
    return (
        <Layout pageProps={pageProps} authRequired={authRequired}>
            <div className={s['account-page']}>
                <nav className={s['myaccount-sidebar']}>
                    <AccountSidebar />
                </nav>
                <div
                    className={cn(
                        s['myaccount-content'],
                        formStyles.root,
                        tableStyles.root
                    )}
                >
                    {children}
                </div>
            </div>
        </Layout>
    )
}

export default AccountLayout

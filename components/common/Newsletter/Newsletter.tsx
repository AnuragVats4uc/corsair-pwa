import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowRight } from '@components/icons'
import { useTranslation } from 'next-i18next'
import { ToastType, useUI } from '@corratech/pylot-ui/context'
import { LoadingDots } from '@corratech/pylot-ui'
import {
    useSubscribeEmailToNewsletter,
    SubscribeInputVariables
} from '@corratech/pylot-footer-newsletter/src/hooks/use-subscribe-email-to-newsletter'
import { getIsValidEmailAddress } from '@corratech/pylot-utils'
import { SubscriptionStatusesEnum } from '@pylot-data/fwrdschema.d'
import cn from 'classnames'
import s from '@commonStyles/footer/Footer.module.scss'

const Newsletter: FC = () => {
    const { t } = useTranslation(['common'])
    const {
        isLoading,
        subscribeEmailNewsletter
    } = useSubscribeEmailToNewsletter()
    const { openToast } = useUI()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<SubscribeInputVariables>({ mode: 'onChange' })

    const onSubmit = async (inputs: SubscribeInputVariables) => {
        try {
            const response = await subscribeEmailNewsletter(inputs)

            //handle errors
            if (response?.errors?.length) {
                openToast(t(response?.errors[0]?.message), ToastType.Danger)
            }

            if (response?.data?.subscribeEmailToNewsletter) {
                const status = response?.data?.subscribeEmailToNewsletter
                    ?.status!
                let message = ''

                if (status === SubscriptionStatusesEnum.Subscribed) {
                    message = t('footer|Thank you for your subscription!')
                }

                if (status === SubscriptionStatusesEnum.NotActive) {
                    message = t(
                        'footer|The subscription requires a confirmation. A confirmation email has been sent to specified email address to confirm the subscription.'
                    )
                }

                openToast(
                    t('{{ statusText }}', {
                        statusText: message || status
                    }),
                    ToastType.Success
                )
                //reset form if success
                reset()
            }
        } catch (e) {
            if (e) {
                openToast(
                    t('footer|Something went wrong. Please try again'),
                    ToastType.Danger
                )
            }
        }
    }

    return (
        <div className={s['newsletter-form']}>
            <h2 className={s['newsletter-form-heading']}>
                {t('footer|JOIN OUR NEWSLETTER')}
            </h2>
            <p>
                {t(
                    'footer|Be the first to know about new arrivals, look books, sales & promos!'
                )}
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div
                    className={cn(
                        s.main,
                        errors?.email && 'border-alert-danger'
                    )}
                >
                    <label
                        htmlFor="newsletter"
                        className={s['newsletter-label']}
                    >
                        {t('newsletter')}
                    </label>
                    <input
                        className={cn(s.newsletter)}
                        type="email"
                        id="newsletter"
                        placeholder={t('footer|email address')}
                        {...register('email', {
                            required: 'This field is required',
                            validate: getIsValidEmailAddress
                        })}
                    />
                    <button
                        type="submit"
                        // eslint-disable-next-line i18next/no-literal-string
                        aria-label="submit"
                        className={s.submit}
                        disabled={isLoading}
                    >
                        {isLoading ? <LoadingDots /> : <ArrowRight />}
                    </button>
                </div>
                {errors?.email && (
                    <span className={cn(s.error, 'error')}>
                        {t('{{ errorMessage }}', {
                            errorMessage: errors?.email?.message
                        })}
                    </span>
                )}
            </form>
        </div>
    )
}

export default Newsletter

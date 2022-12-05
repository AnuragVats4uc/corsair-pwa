/* eslint-disable i18next/no-literal-string */
import { useUI } from '@corratech/pylot-ui/context'
import { Button, Tooltip } from '@corratech/pylot-ui'
import Link from 'next/link'
import { Cross, Success, Warning, Error } from '@components/icons'

export default function Geg(): JSX.Element {
    const { LoadingIndicator } = useUI()

    return (
        <div className="global-element-guide container mx-auto px-5">
            <section className="my-5">
                <h3 className="py-5 underline">Web Fonts</h3>
                <p className="text-2xl py-2 font-bebasNeue">
                    Bebas Neue Pro (Semi Expanded Bold)
                </p>
                <p className="text-2xl py-2 font-aktivGroteskBold">
                    Aktiv Grotesk (Bold)
                </p>
                <p className="text-2xl py-2 font-aktivGrotesk">
                    Aktiv Grotesk (Regular)
                </p>
                <p className="text-2xl py-2 font-verveineRegular">
                    Verveine (Regular)
                </p>
                <br />
            </section>

            <section className="my-5">
                <h3 className="py-5 underline">Headings</h3>
                <h1>H1 Heading</h1>
                <h2>H2 Heading</h2>
                <h3>H3 Heading</h3>
                <h4>H4 Heading</h4>
                <h5>H5 Heading</h5>
                <h6>H6 Heading</h6>
                <br />
            </section>
            <section className="my-5">
                <strong className="underline">Body font</strong>
                <br />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. Sed ut perspiciatis
                    unde omnis iste natus error sit voluptatem accusantium
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                    illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                    voluptas sit aspernatur aut odit aut fugit, sed quia
                    consequuntur magni dolores eos qui ratione voluptatem sequi
                    nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                    dolor sit amet, consectetur, adipisci velit, sed quia non
                    numquam eius modi tempora incidunt ut labore et dolore
                    magnam aliquam quaerat voluptatem.
                </p>
            </section>
            <section className="global-section">
                <h3 className="py-5 underline">List Style</h3>
                <h3>Un-ordered List (ul)</h3>
                <ul className="list-disc py-5 list-inside sm:list-outside md:list-inside lg:list-outside xl:list-inside">
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </li>
                    <li>
                        Assumenda, quia temporibus eveniet a libero incidunt
                        suscipit
                    </li>
                    <li>
                        Quidem, ipsam illum quis sed voluptatum quae eum fugit
                        earum
                    </li>
                </ul>
                <h3>Ordered List (ol)</h3>
                <div>
                    <ol className="list-decimal py-5 list-inside sm:list-outside md:list-inside lg:list-outside xl:list-inside">
                        <li>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit
                        </li>
                        <li>
                            Assumenda, quia temporibus eveniet a libero incidunt
                            suscipit
                        </li>
                        <li>
                            Quidem, ipsam illum quis sed voluptatum quae eum
                            fugit earum
                        </li>
                    </ol>
                </div>
            </section>
            <section className="global-section">
                <h3 className="py-5 underline">Buttons & Links</h3>
                <h3>Buttons:</h3>
                <div className="global-container">
                    <div>
                        <div className="my-1 space-x-2 space-y-2">
                            <h3 className="py-5">Primary</h3>
                            <Button variant="primary">Create Account</Button>
                            <Button variant="primary" disabled>
                                Create Account
                            </Button>
                        </div>
                        <div className="my-1 space-x-2 space-y-2">
                            <h3 className="py-5">Secondary</h3>
                            <Button variant="secondary">Create Account</Button>
                            <Button variant="secondary" disabled>
                                Create Account
                            </Button>
                        </div>
                        <div className="my-1 space-x-2 space-y-2">
                            <h3 className="py-5">Button Links</h3>
                            <Button variant="link-secondary">
                                Create Account
                            </Button>
                            <Button variant="link-secondary" disabled>
                                Create Account
                            </Button>
                        </div>
                        <h3 className="py-5 underline">Links:</h3>
                        <div className="my-1">
                            <div>
                                <Link href="/geg">
                                    <a href="javascript;" className="link">
                                        Default Link
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/">
                                    <a
                                        href="javascript;"
                                        className="link disabled"
                                    >
                                        Disabled Link
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="global-section">
                <h3 className="py-5 underline">Tooltips</h3>
                <div className="md:space-x-5 space-y-2 text-center md:text-left">
                    <div className="block md:inline-block">
                        <Tooltip heading="Tooltip Left" direction="left">
                            <div className="font-bold">
                                Lorem ipsum dolor sit amet
                            </div>
                        </Tooltip>
                    </div>
                    <div className="block md:inline-block">
                        <Tooltip heading="Tooltip Top" direction="top">
                            <div className="font-bold">
                                Lorem ipsum dolor sit amet
                            </div>
                        </Tooltip>
                    </div>
                    <div className="block md:inline-block">
                        <Tooltip heading="Tooltip Bottom" direction="bottom">
                            <div className="font-bold">
                                Lorem ipsum dolor sit amet
                            </div>
                        </Tooltip>
                    </div>
                    <div className="block md:inline-block">
                        <Tooltip heading="Tooltip Right" direction="right">
                            <div className="font-bold">
                                Lorem ipsum dolor sit amet
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </section>

            <section className="global-section">
                <h3 className="py-10 underline">Collapsible Container</h3>
                <div className="overflow-hidden max-w-xl">
                    <div className="tabs">
                        <div className="tab-container">
                            <div className="tab-container-inner">
                                <input
                                    id="chck1"
                                    className="tab-radio"
                                    type="checkbox"
                                />
                                <header className="tab-header">
                                    <span className="tab-title">
                                        FIT AND MATERIAL
                                    </span>
                                    <i className="arrow" />
                                </header>
                                <div className="tab-content">
                                    <div className="tab-content-inner">
                                        <p>
                                            Lorem ipsum, or lipsum as it is
                                            sometimes known, is dummy text used
                                            in laying out print, graphic or web
                                            designs. The passage is attributed
                                            to an unknown typesetter in the 15th
                                            century who is thought to have
                                            scrambled parts of Cicero De Finibus
                                            Bonorum et Malorum for use in a type
                                            specimen book.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-container">
                            <div className="tab-container-inner">
                                <input
                                    id="chck2"
                                    className="tab-radio"
                                    type="checkbox"
                                />
                                <header className="tab-header">
                                    <span className="tab-title">
                                        Specifications
                                    </span>
                                    <i className="arrow" />
                                </header>
                                <div className="tab-content">
                                    <div className="tab-content-inner">
                                        <ul>
                                            <li>Poly/cotton</li>
                                            <li>
                                                Wrinkle and soil-resistant
                                                fabric
                                            </li>
                                            <li>Cross-over shawl collar</li>
                                            <li>
                                                Secure Velcro chest pocket
                                                (phone), two-section sleeve
                                                pocket
                                            </li>
                                            <li>3/4 length sleeves</li>
                                            <li>Feminine fit</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-container">
                            <div className="tab-container-inner">
                                <input
                                    id="chck3"
                                    className="tab-radio"
                                    type="checkbox"
                                />
                                <header className="tab-header">
                                    <span className="tab-title">
                                        Care Instructions
                                    </span>
                                    <i className="arrow" />
                                </header>
                                <div className="tab-content">
                                    <div className="tab-content-inner">
                                        <ul>
                                            <li>Poly/cotton</li>
                                            <li>
                                                Wrinkle and soil-resistant
                                                fabric
                                            </li>
                                            <li>Cross-over shawl collar</li>
                                            <li>
                                                Secure Velcro chest pocket
                                                (phone), two-section sleeve
                                                pocket
                                            </li>
                                            <li>3/4 length sleeves</li>
                                            <li>Feminine fit</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="my-5 max-w-xl">
                <h3 className="py-5 underline">Loading Indicator</h3>
                <LoadingIndicator />
                <br />
            </section>

            <section className="my-5">
                <h3 className="py-5 underline">Forms</h3>
                <div className="global-container">
                    <div className="pt-6 pb-8 mb-4 flex flex-col my-2 max-w-xl">
                        <div className="-mx-3 mb-6">
                            <div className="px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase text-xs font-semibold mb-2"
                                    htmlFor="grid-first-name"
                                >
                                    INPUT FIELDS
                                </label>
                                <input
                                    className="form-input appearance-none w-full border-2 border-accents-2 rounded py-3 pb-2 px-4 mb-2 focus:shadow-none focus:border-accents-2"
                                    type="text"
                                    placeholder="INPUT FIELDS"
                                />
                            </div>
                            <div className="px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase text-xs font-semibold mb-2"
                                    htmlFor="grid-first-name"
                                >
                                    INPUT FIELDS
                                    <span className="text-alert-danger mx-1 text-lg">
                                        *
                                    </span>
                                </label>
                                <input
                                    className="form-input appearance-none w-full border border-alert-danger rounded py-3 pb-2 px-4 mb-2 focus:shadow-none focus:border-accents-2"
                                    type="text"
                                    placeholder="INPUT FIELDS"
                                />
                                <p className="text-alert-danger text-xs italic">
                                    Please fill out this field.
                                </p>
                            </div>
                        </div>
                        <div className="-mx-3 mb-6">
                            <div className="md:w-full px-3">
                                <label
                                    className="block uppercase text-xs font-semibold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Password
                                </label>
                                <input
                                    className="form-input appearance-none w-full border-2 border-accents-2 rounded py-3 pb-2 px-4 mb-2 focus:shadow-none focus:border-accents-2"
                                    id="grid-password"
                                    type="password"
                                    placeholder="******************"
                                />
                                <p className="text-grey-dark text-xs italic">
                                    Make it as long and as crazy as you would
                                    like
                                </p>
                            </div>
                        </div>
                        <div className="-mx-3 mb-4">
                            <div className="px-3">
                                <div className="mb-6 md:mb-0">
                                    <label
                                        className="block uppercase text-xs font-semibold mb-2"
                                        htmlFor="grid-state"
                                    >
                                        Select Box
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="form-select block appearance-none w-full bg-grey-lighter border-2 border-grey-lighter text-p-1 pb-2 py-3 px-4 pr-8 rounded focus:shadow-none focus:border-accents-2"
                                            id="grid-state"
                                        >
                                            <option>United State</option>
                                            <option>New Mexico</option>
                                            <option>India</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="-mx-3 mb-4">
                            <div className="px-3">
                                <div className="mb-6 md:mb-0">
                                    <label
                                        className="block uppercase text-xs font-semibold mb-2"
                                        htmlFor="grid-state"
                                    >
                                        RADIO BUTTONS
                                    </label>
                                    <div className="relative">
                                        <label className="mt-3">
                                            <input
                                                type="radio"
                                                className="form-radio h-6 w-6 text-p-2"
                                                name="radio"
                                            />
                                            <span className="ml-2 text-p-2">
                                                Label
                                            </span>
                                        </label>
                                        <label className="mt-3 mx-5">
                                            <input
                                                type="radio"
                                                className="form-radio h-6 w-6 text-p-2"
                                                checked
                                                name="radio"
                                            />
                                            <span className="ml-2 text-p-2">
                                                Label
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="-mx-3 mb-4">
                            <div className="px-3">
                                <div className="mb-6 md:mb-0">
                                    <label
                                        className="block uppercase text-xs font-semibold mb-2"
                                        htmlFor="grid-state"
                                    >
                                        Checkbox
                                    </label>
                                    <div className="relative">
                                        <label className="mt-3">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-6 w-6 text-p-2"
                                            />
                                            <span className="ml-2 text-p-2">
                                                Label
                                            </span>
                                        </label>
                                        <label className="mt-3 mx-5">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-6 w-6 text-p-2"
                                                checked
                                            />
                                            <span className="ml-2 text-p-2">
                                                Label
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="global-section">
                <h3 className="py-5 underline">Messaging</h3>
                <h3>Alerts</h3>
                <p className="text-red font-bold">
                    NOTE:- Alert messages can be used with
                    <code> &lt;Toast /&gt; </code>
                    component
                </p>
                <div className="global-container">
                    <div className="bg-alert-success p-4 w-full rounded my-2 text-t-1">
                        <div className="flex justify-between">
                            <div className="flex space-x-3">
                                <Success />
                                <div className="flex-1 text-xl leading-snug text-t-1 font-medium">
                                    Success
                                </div>
                            </div>
                            <Cross className="w-8 m-0 cursor-pointer text-t-1" />
                        </div>
                    </div>
                    <div className="bg-alert-danger p-4 w-full rounded my-2 text-t-1">
                        <div className="flex justify-between">
                            <div className="flex space-x-3">
                                <Error />
                                <div className="flex-1 text-xl leading-snug text-t-1 font-medium">
                                    Error
                                </div>
                            </div>
                            <Cross className="text-t-1" />
                        </div>
                    </div>
                    <div className="bg-alert-warning p-4 w-full rounded my-2 text-t-1">
                        <div className="flex justify-between">
                            <div className="flex space-x-3">
                                <Warning />
                                <div className="flex-1 text-xl leading-snug text-t-1 font-medium">
                                    Warning
                                </div>
                            </div>
                            <Cross className="text-t-1" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

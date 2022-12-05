export default function isInDom(obj: HTMLElement | null): boolean {
    return Boolean(obj?.closest('body'))
}

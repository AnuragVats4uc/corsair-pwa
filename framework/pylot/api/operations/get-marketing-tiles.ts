async function getMarketingTiles({
    category_uid
}: {
    category_uid: string
}): Promise<any[] | undefined | null> {
    // TODO: fix RETURN type

    return [
        {
            start: { col: 1, row: 1 },
            size: { height: 1, width: 2 },
            class: 'marketing-tile-3',
            content:
                '<div data-content-type="row" data-appearance="contained" data-element="main"><div class="" data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-background-type="image" data-video-loop="true" data-video-play-only-visible="true" data-video-lazy-load="true" data-video-fallback-src="" data-element="inner" style="justify-content: flex-start; display: flex; flex-direction: column; background-position: left top; background-size: cover; background-repeat: no-repeat; background-attachment: scroll; border-style: none;"><figure data-content-type="image" data-appearance="full-width" data-element="main" style="margin: 0px; padding: 0px; border-style: none;"><img class="pagebuilder-mobile-hidden" src="https://fwrd.corrademo.com/media/wysiwyg/Banner_2x.jpg?quality=75&auto=webp&format=pjpg" alt="" title="" width="" height="" data-element="desktop_image" style="border-style: none; border-width: 1px; border-radius: 0px;"><img class="pagebuilder-mobile-only" src="https://fwrd.corrademo.com/media/wysiwyg/Banner_2x.jpg?quality=75&auto=webp&format=pjpg" alt="" title="" width="" height="" data-element="mobile_image" style="border-style: none; border-width: 1px; border-radius: 0px;"></figure><div data-content-type="text" data-appearance="default" data-element="main" style="border-style: none; border-width: 1px; border-radius: 0px; margin: 0px; padding: 0px;"><p><strong>SHOP THE LOOK:&nbsp;</strong><a tabindex="0" title="FLEECE PULLOVER" href="#">FLEECE PULLOVER</a>, <a id="KW3QQ99" tabindex="0" title="STRAPPY LONG TANKTOP" href="#">STRAPPY LONG TANKTOP</a></p></div></div></div>'
        },
        {
            start: { col: 1, row: 4 },
            size: { height: 2, width: 2 },
            class: 'marketing-tile-2',
            content:
                '<div data-content-type="row" data-appearance="contained" data-element="main"><div class="pagebuilder-row" data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-element="inner" style="justify-content: flex-start; display: flex; flex-direction: column; background-position: left top; background-size: cover; background-repeat: no-repeat; background-attachment: scroll; border-style: none; border-width: 1px; border-radius: 0px; margin: 0px; padding: 0px;"><figure class="banner lazyload" data-content-type="image" data-appearance="full-width" data-element="main" style="margin: 0px; padding: 0px; border-style: none;"><img class="pagebuilder-mobile-hidden" src="https://fwrd.corrademo.com/media/wysiwyg/promo2.jpg?quality=75&auto=webp&format=pjpg" alt="Promotion banner" title="Promotion banner" data-element="desktop_image" style="border-style: none; border-width: 1px; border-radius: 0px; max-width: 100%; height: auto;"><img class="pagebuilder-mobile-only" src="https://fwrd.corrademo.com/media/wysiwyg/promo2.jpg?quality=75&auto=webp&format=pjpg" alt="Promotion banner" title="Promotion banner" data-element="mobile_image" style="border-style: none; border-width: 1px; border-radius: 0px; max-width: 100%; height: auto;"></figure><div data-content-type="text" data-appearance="default" data-element="main" style="text-align: center; border-style: none; border-width: 1px; border-radius: 0px; margin: 0px; padding: 0px;"><h2 class="promo2-heading"> Step into Spring</h2></div><div data-content-type="text" data-appearance="default" data-element="main" style="text-align: center; border-style: none; border-width: 1px; border-radius: 0px; margin: 0px; padding: 0px;"><h3 class="promo-link"><a title="Shop Collection" href="#">Shop Collection</a></h3></div></div></div>'
        }
    ]
}

export default getMarketingTiles

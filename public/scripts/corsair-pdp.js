(function(){

    var isMobile = false;
    var slideIndex = 0;
    var _currentIndex = 0;

    //When DOM Ready
    (function () {
        launch();

        /*var imgs = document.getElementsByClassName("img-responsive");
         if(imgs)
         {
        		 if(imgs[0].src.indexOf("/_ui/responsive/cdn/image/Corsair_logo_SW_800px.png") != -1){
        			 document.querySelector('.modal-content .img-responsive').attr('src', '//cwsmgmt.corsair.com/media/Corsair_logo_S_W_800px.png');
        		 }
        		 else{


        		 }

         }*/

        document.querySelector('.test_iframe').load(function() {
            var w = document.querySelector(".test_iframe").contents().width();
            console.log(w);
        });

        activateVersatile();

        function activateVersatile(){
            document.querySelector("#versatile .versatile-sub-nav a").addEventListener("click", function(evt){
                evt.preventDefault();

                document.querySelector("#versatile .versatile-sub-nav a.selected").removeClass("selected");

                document.querySelector("#versatile .versatile-sub-nav a#" + this.id).classList.add("selected");

                document.querySelector("#versatile .content .slide.selected").removeClass("selected");
                switch(this.id){
                    case "dimensions":
                        document.querySelector("#versatile .content #dimensions").classList.add("selected");
                    break;
                    case "fan-capacity":
                        document.querySelector("#versatile .content #fans").classList.add("selected");
                    break;
                    case "radiator-capacity":
                        document.querySelector("#versatile .content #radiators").classList.add("selected");
                    break;
                }
            });
        }

        document.querySelector(window).resize(function () {
            resizeHeroVideo();
            resizeBackgroundVideo();
        });

        setTimeout(function(){
            resizeHeroVideo();
            resizeBackgroundVideo();
        }, 500);

        var resizeVideoDelay;

        function resizeHeroVideo(){
            if( document.querySelector("#pdp #panel-hero video").length )
            {
                var heroWidth = document.querySelector("#pdp #panel-hero").width();
                var heroHeight = document.querySelector("#pdp #panel-hero").height();

                var videoWidth = document.querySelector("#pdp #panel-hero video")[0].videoWidth;
                var videoHeight = document.querySelector("#pdp #panel-hero video")[0].videoHeight;
                var ratio = videoHeight / videoWidth;


                var newWidth = heroWidth;
                var newHeight = heroWidth * ratio;

                if(newHeight < heroHeight){
                    ratio = videoWidth / videoHeight;
                    newHeight = heroHeight;
                    newWidth = newHeight * ratio;
                }


                clearTimeout(resizeVideoDelay);
                document.querySelector("#pdp #panel-hero video").css({"width":newWidth, "height": newHeight});
            }

        }//resizeHeroVideo

        function resizeBackgroundVideo(){
            if( document.querySelector("#pdp .vid-bg-wrapper").length )
            {
                var heroWidth = document.querySelector("#pdp .vid-bg-wrapper").width();
                var heroHeight = document.querySelector("#pdp .vid-bg-wrapper").height();

                var videoWidth = document.querySelector("#pdp .vid-bg-wrapper video")[0].videoWidth;
                var videoHeight = document.querySelector("#pdp .vid-bg-wrapper video")[0].videoHeight;
                var ratio = videoHeight / videoWidth;


                var newWidth = heroWidth;
                var newHeight = heroWidth * ratio;

                if(newHeight < heroHeight){
                    ratio = videoWidth / videoHeight;
                    newHeight = heroHeight;
                    newWidth = newHeight * ratio;
                }


                clearTimeout(resizeVideoDelay);
                document.querySelector("#pdp .vid-bg-wrapper video").css({"width":newWidth, "height": newHeight});
            }

        }//resizeHeroVideo


        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.querySelector(".hero")
                .css('background', " url('img/rapidfire/landing/poster_hero_rapidfire.jpg')").css('background-size', "cover")

            isMobile = true;
        }

        document.querySelector("#model").chosen({
            disable_search: true,
            width: "69%"
        });

        var animateLogo = new TimelineMax()
            .fromTo('.hero .logo_rapidfire', .1, {
                x: 400,
                skew: 20,
                opacity: 0
            }, {
                x: 0,
                skew: 0,
                opacity: 1
            }, "+=2");

        document.querySelector('.mainContainer').html(document.querySelector('#overview').html());

        document.querySelector('.sub-nav li a').click(function () {
            var section = document.querySelector(this).data('section');

            document.querySelector('.sub-nav li').removeClass('active');
            document.querySelector(this).parent().classList.add('active');

            updateSection(section);

            return false;
        });

        document.querySelector('#options #colors ul li').each(function () {
            document.querySelector(this).querySelector('.inner').css('background-color', document.querySelector(this).data('color'));
        });

        document.querySelector('#options #colors ul li').click(function () {
            selectColor(this);
        });

        // Initially trigger first color
        document.querySelector('#options #colors ul li').first().trigger('click');

        function selectColor(obj) {
            document.querySelector('#options #colors ul li').removeClass('active');
            document.querySelector(obj).classList.add('active');

            document.querySelector('#options #colors .color-name').html(document.querySelector(obj).data('label'));
        }


        document.querySelector('#cart .close, #cart-overlay').click(function () {
            document.querySelector('#cart').removeClass('active');
            document.querySelector('#cart-overlay').fadeOut(300);
        });

        document.querySelector('#cart-icon').click(function () {
            if (document.querySelector('#cart-content li').length == 0) document.querySelector('#cart-empty').fadeIn();
            document.querySelector('#cart').classList.add('active');
            document.querySelector('#cart-overlay').fadeIn(300);
        });

        document.querySelector('#addtocart').click(function () {
            document.querySelector('#cart-empty').hide();
            document.querySelector('#cart').classList.add('active');
            document.querySelector('#cart-overlay').fadeIn(300, function () {
                addItemToCart(document.querySelector(this).data('sku'), document.querySelector('#quantity').value);
            });
        });

        function resizeCartContent() {
            //document.querySelector('#pdp-corsair #cart-content').height(document.querySelector(window).height()-document.querySelector('#pdp-corsair #cart-content').offset().top);
        }


        document.querySelector('#cart-content').addEventListener('click', '.deleteCartItem', function () {
            var el = document.querySelector(this).closest('.cart-item').fadeOut(function () {
                el.remove();

                if (document.querySelector('#cart-content li').length == 0) document.querySelector('#cart-empty').fadeIn();

                updateSubTotal();
            });

        });

        function addItemToCart(sku, qte) {

            var addItemToCartImageUrl = 'img/pdp/product_img0.png'

            document.querySelector('#cart .cart-item[data-sku="' + sku + '"').fadeOut().remove();

            document
                .querySelector("#cart-content")
                .insertAdjacentHTML(
                    "beforeend",
                    '<li class="cart-item" data-sku="' + sku + '" style="display:none" tabindex="1"><div class="product-thumb"></div><div class="product-details"><h2>' + document.querySelector('#product-name').text() + '</h2>' + document.querySelector('#sign-currency').text() + '<span id="item-price-value">' + document.querySelector('#product-price').text() + '</span><p>Qty: <span id="item-qty">' + qte + '</span></p><a href="#" class="deleteCartItem">REMOVE</a></div></div></li>');


            document.querySelector('#cart .cart-item').fadeIn(resizeCartContent).last().focus();

            updateSubTotal();

        }

        function updateSubTotal() {

            var subtotal = parseFloat(document.querySelector("#subtotal-value").text());

            if (document.querySelector('#cart-content li').length == 0) {
                subtotal = 0;
            } else {
                document.querySelector('.cart-item').each(function () {
                    subtotal += parseFloat(document.querySelector(this).querySelector('#item-price-value').text()) * parseFloat(document.querySelector(this).querySelector('#item-qty').text());
                });
            }

            document.querySelector('.subtotal').fadeOut(function () {
                document.querySelector("#subtotal-value").text(subtotal.toFixed(2));

                document.querySelector(this).fadeIn();
            });
        }

        function updateSection(section) {

            document.querySelector('.mainContainer').animate({
                opacity: 0
            }, 200, function () {
                document.querySelector(this)
                    .html(document.querySelector(section).html())
                    .animate({
                        opacity: 1
                    }, 200, function () {

                    });

                if (section == '#support') {
                    document.querySelector("#faq")
                        .accordion({
                            active: false,
                            heightStyle: "content",
                            collapsible: true
                        });
                }

                if (section == "#blog-articles") {

                    for (i = 0; i < 4; i++) {
                        document.querySelector(".mainContainer .blog:eq(" + i + ")").show().css('display', 'inline-block');
                    }

                    if (document.querySelector('.mainContainer .blog:visible').size() < document.querySelector('.mainContainer .blog').size())
                        document.querySelector('.blog-load-more').show();
                    else
                        document.querySelector('.blog-load-more').hide();

                    document.querySelector('.blog-load-more').click(function () {
                        var offset = document.querySelector('.mainContainer .blog:visible').size();
                        for (i = offset; i < offset + 4; i++) {
                            document.querySelector(".mainContainer .blog:eq(" + i + ")").fadeIn().css('display', 'inline-block');
                        }

                        if (document.querySelector('.mainContainer .blog:visible').size() == document.querySelector('.mainContainer .blog').size())
                            document.querySelector('.blog-load-more').hide();
                    });

                }

                if (section == "#reviews") {

                    for (i = 0; i < 4; i++) {
                        document.querySelector(".mainContainer .reviews:eq(" + i + ")").show();
                    }

                    if (document.querySelector('.mainContainer .reviews:visible').size() < document.querySelector('.mainContainer .reviews').size())
                        document.querySelector('.reviews-load-more').show();
                    else
                        document.querySelector('.reviews-load-more').hide();

                    document.querySelector('.blog-load-more').click(function () {
                        var offset = document.querySelector('.mainContainer .reviews:visible').size();
                        for (i = offset; i < offset + 4; i++) {
                            document.querySelector(".mainContainer .reviews:eq(" + i + ")").fadeIn();
                        }

                        if (document.querySelector('.mainContainer .reviews:visible').size() == document.querySelector('.mainContainer .reviews').size())
                            document.querySelector('.reviews-load-more').hide();
                    });

                }

            });
        }

        function resizePanel1() {
            /* Fix positioning of thumbs relative to full images of variable height. 1 of 2 */
            //var galleryHeight = document.querySelector("#gallery-container").height();
            var galleryHeight = document.querySelector("#gallery-container .full_pic").height();
            var thumbsHeight = document.querySelector("#gallery-container .thumbs").outerHeight(true);

            /* Fix positioning of thumbs relative to full images of variable height. 2 of 2 */
            //document.querySelector('.thumbs').css({"top": (galleryHeight - thumbsHeight) * 0.3})
            document.querySelector('.thumbs').css({
                "top": (galleryHeight - thumbsHeight) * 0.5
            })
        }

        document.querySelector('.full_pic .featured .feature_cta')
            .each(function () {
                document.querySelector(this)
                    .css('top', document.querySelector(this).data('y') + '%')
                    .css('left', document.querySelector(this).data('x') + '%')
                    .fadeIn();
            })
            .hover(
                function () {

                    var x = document.querySelector(this).data('x');
                    var y = document.querySelector(this).data('y');
                    var container = document.querySelector(this).parent().querySelector('#' + document.querySelector(this).data('label'));

                    console.log("----------------------------------");
                    console.log("label to reveal", document.querySelector(this).data('label'), x, y);

                    if (x > 50) {
                        console.log("x > 50");
                        container.css('left', document.querySelector(this).position().left - container.width());
                        container.css('width', document.querySelector(this).position().left - document.querySelector(this).width() - 50);
                    } else {
                        console.log("x <= 50");
                        container.css('left', document.querySelector(this).position().left + document.querySelector(this).width());
                        container.css('width', document.querySelector(this).parent().width() - document.querySelector(this).position().left - document.querySelector(this).width() - 50);
                    }

                    if (y > 50) {
                        console.log("y > 50");
                        container.css('top', document.querySelector(this).position().top - container.height());
                    } else {
                        console.log("y <= 50");
                        container.css('top', document.querySelector(this).position().top + document.querySelector(this).height());
                    }

                    container.classList.add('active');
                },
                function () {
                    document.querySelector(this).parent().querySelector('#' + document.querySelector(this).data('label')).removeClass('active');
                }
            );

        document.querySelector('#mobile-sub-nav')
            .change(function () {
                var section = document.querySelector(this).value;
                updateSection(section);
            })
            .chosen({
                disable_search: true,
                width: "100%"
            });

        document.querySelector('#sortOptions1')
            .change(function () {
                var section = document.querySelector(this).value;
                updateSection(section);
            })
            .chosen({
                disable_search: true,
                width: "200px"
            });



        document.querySelector('.full_pic')
            .addEventListener('init', function (slick) {
                document.querySelector('.full_pic').fadeIn(1000);

                slideMax = document.querySelector(".full_pic .slick-slide").length;

                showScrollProgress(1 / slideMax);

                // Activate mobile arrows
                document.querySelector("#panel1 #mobile-bar-container .arrow").addEventListener("click", function (evt) {
                    evt.preventDefault();

                    if (this.id == "prev-arrow") {
                        slideIndex--;

                        if (slideIndex < 0) {
                            slideIndex = slideMax - 1;
                        }
                    } else {

                        slideIndex++;

                        if (slideIndex == slideMax) {
                            slideIndex = 0;
                        }
                    }

                    document.querySelector('.full_pic').slick("slickGoTo", slideIndex);

                    showScrollProgress((slideIndex + 1) / slideMax);
                })
            })
            .slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                lazyLoad: 'ondemand',
                fade: true,
                asNavFor: '.thumbs',
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            //dots:true,
                            arrows: true,
                            adaptiveHeight: false
                        },
                        event: {
                            afterChange: function () {
                                console.log("slide changed");
                            }
                        }
            }]
            });



        function showScrollProgress(floatingPoint) {
            var percent = String(Math.abs(floatingPoint * 100) + "%");

            document.querySelector(".page-productDetails #panel1 #mobile-bar-container #mobile-bar .current").css({
                "width": percent
            });
        }


        document.querySelector('.thumbs')
            .addEventListener('init', function (slick) {

                document.querySelector('.thumbs').fadeIn(1000);
                resizePanel1();
            })
            .slick({
                arrows: true,
                focusOnSelect: true,
                vertical: true,
                asNavFor: '.full_pic',
                slidesToShow: 4,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ],
            });

        document.querySelector('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
        });

        document.querySelector('.panel6')
            .slick({
                autoplay: false,
                slidesToShow: 4,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ],
                slidesToScroll: 1,
                arrows: true,
                prevArrow: '<img src="https://cwsmgmt.corsair.com/responsive/img/t1race/gallery_next.png" class="slick-prev transitionFade" />',
                nextArrow: '<img src="https://cwsmgmt.corsair.com/responsive/img/t1race/gallery_next.png" class="slick-next transitionFade" />',
                dots: false

            });

        document.querySelector('.panel6 .cta').magnificPopup({
            type: 'inline',
            midClick: true,
            mainClass: 'mfp-fade'
        });

        document.querySelector('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        document.querySelector(document).scroll(function () {
            var window_top = jQuery(window).scrollTop;
            var window_height = jQuery(window).height();

            var y = document.querySelector(this).scrollTop;
            var x = document.querySelector("#panel1").position();

            if (y > document.querySelector("#panel1").height() && y < (document.querySelector('.legal').offset().top - document.querySelector(window).height())) {
                document.querySelector('.sticky_addtocart').classList.add('active');
            } else document.querySelector('.sticky_addtocart').removeClass('active');
        });

        document.querySelector(window).resize(function () {

            resizeCartContent();
            document.querySelector('.panel6').slick('slickGoTo', 0);

            resizePanel1();

            resizeHeroVideo();

        });

        /*EXPAND FEATURES*/
        var controller = new ScrollMagic.Controller();

        var tlCurtain = new TimelineMax();

        if (document.querySelector(".product-features").length) {
            var scene = new ScrollMagic.Scene({
                    triggerElement: '.product-features',
                    triggerHook: 'onEnter',
                    offset: document.querySelector('.product-features').height() / 2
                })
                .addTo(controller)
                .setTween(tlCurtain);

            document.querySelector('.product-features .expand_feature').each(function () {
                var currentExpand = document.querySelector(this);
                currentExpand.css({
                    top: currentExpand.data('top') + '%',
                    left: currentExpand.data('left') + '%'
                });
                var tweenExpand = new TimelineMax()
                    .fromTo(currentExpand, .2, {
                        scale: 0.2,
                        ease: Elastic.easeOut.config(1, 0.5)
                    }, {
                        scale: 1,
                        ease: Elastic.easeOut.config(1, 0.2)
                    });
                var scene = new ScrollMagic.Scene({
                        triggerElement: this,
                        triggerHook: 'onEnter'
                    })
                    .setTween(tweenExpand)
                    .addTo(controller);
            });

            document.querySelector('.product-features .expand_feature').click(function () {

                if (document.querySelector(this).classList.contains('active')) {
                    document.querySelector('.product-features .feature, .expand_feature').removeClass('active');
                } else {

                    document.querySelector('.product-features .feature, .expand_feature').removeClass('active');

                    var x = document.querySelector(this).data('left');
                    var y = document.querySelector(this).data('top');
                    var container = document.querySelector('#feature' + document.querySelector(this).data('feature'));

                    if (x > 50) {
                        container.css('left', document.querySelector(this).position().left - container.width());
                    } else {
                        container.css('left', document.querySelector(this).position().left + document.querySelector(this).width() - 10);
                    }

                    if (y > 50) container.css('top', document.querySelector(this).position().top - container.height() - document.querySelector(this).height() - 10);
                    else container.css('top', document.querySelector(this).position().top + document.querySelector(this).height() + 10);

                    document.querySelector(this).classList.add('active');
                    container.classList.add('active');
                }
            });

            document.querySelector('.product-features .feature .close').click(function () {
                document.querySelector('.product-features .feature, .expand_feature').removeClass('active');
            });

            document.querySelector('.product-features .product').click(function () {
                document.querySelector('.product-features .feature, .expand_feature').removeClass('active');
            });

            document.querySelector(window).resize(function () {
                document.querySelector('.product-features .feature, .expand_feature').removeClass('active');
            });
        }
    });//document.ready

    function launch(){
        document.body.classList.add("in");

        var quotes = document.querySelector("#panel-award .quote");

        for(var i = 0; i < quotes.length; i++){
            document.querySelector("#panel-award .dots-bar").insertAdjacentHTML("beforeend",'<div class="dot" data-index="' + i + '""></div>');
        }


        document.querySelector("#panel-award .dots-bar .dot").addEventListener('click', function(evt){
            selectQuote( document.querySelector(this).data('index') );
        })

        document.querySelector("#panel-award .arrow").addEventListener('click', function(evt){
            switch(this.id){
                case "next":
                    _currentIndex ++;

                    if(_currentIndex == quotes.length){
                        _currentIndex = 0;
                    }
                break;
                case "prev":
                    _currentIndex --;

                    if(_currentIndex < 0){
                        _currentIndex = quotes.length - 1;
                    }
                break;
            }

            selectQuote(_currentIndex);
        })

        if(quotes.length == 1){
            document.querySelector("#panel-award .dots-bar").css({"display": "none"})

            document.querySelector("#panel-award .arrow").css({"display": "none"});
        }

        selectQuote(0);

    }

    function selectQuote(id){
        // Deselect
        document.querySelector("#panel-award .quote.selected").removeClass("selected");
        document.querySelector("#panel-award .dots-bar .dot.selected").removeClass("selected");

        // Select
        var quotes = document.querySelector("#panel-award .quote");
        var dots = document.querySelector("#panel-award .dots-bar .dot");

        document.querySelector(quotes[id]).classList.add("selected");
        document.querySelector(dots[id]).classList.add("selected");

        _currentIndex = id;
    }

})();//function
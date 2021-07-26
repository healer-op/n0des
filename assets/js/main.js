(function($) {
    'use strict';

    var albireoApp = {
        /* ---------------------------------------------
        	## Content Loading
        --------------------------------------------- */

        contentLoading: function() {
            $('body').imagesLoaded(function() {
                $('.loader-wrapper').fadeOut(500);
                setTimeout(function() {
                    //After 2s, the no-scroll class of the body will be removed
                    $('body').removeClass('no-scroll');
                    $('body').addClass('loading-done');
                }, 1000); //Here you can change preloader time
            });
        },

        /* ---------------------------------------------
        	## Scroll top
        --------------------------------------------- */
        scroll_top: function() {
            $('body').append(
                "<a href='#top' id='scroll-top' class='topbutton btn-hide'><img src='assets/icons/64px/chevron.png' width='30px'></span></a>"
            );
            var $scrolltop = $('#scroll-top');
            $(window).on('scroll', function() {
                if ($(this).scrollTop() > $(this).height()) {
                    $scrolltop.addClass('btn-show').removeClass('btn-hide');
                } else {
                    $scrolltop.addClass('btn-hide').removeClass('btn-show');
                }
            });
            $("a[href='#top']").on('click', function() {
                $('html, body').animate({
                        scrollTop: 0,
                    },
                    'normal'
                );
                return false;
            });
        },

        /* ---------------------------------------------
        	## Menu Script
        --------------------------------------------- */
        menu_script: function() {
            var w = $(window).width();
            if ($('.mobile-sidebar-menu').length && w < 1200) {
                var mobileMenu = $('.site-navigation .navigation').clone().appendTo('.mobile-sidebar-menu');
            }
            if ($('.site-header.header-style-one').length || $('.site-header.header-style-three').length || $('.site-header.header-style-four').length) {
                var mobileMenu = $('.site-navigation .navigation').clone().appendTo('.mobile-sidebar-menu');
            }

            if ($('.site-navigation .mainmenu').find('li > a').siblings('.sub-menu')) {
                $('.mainmenu li > .sub-menu').siblings('a').append("<img class='gg' src='assets/icons/64px/007-expand-arrows.png' width='10px' style='margin-left: 2%;'></span>");
            }

            // Accordion Menu
            var $AccordianMenu = $('.sidebar-menu .navigation a');
            var $mobileSubMenuOpen = $('.hamburger-menus');
            var $overlayClose = $('.overlaybg');

            $overlayClose.on('click', function(e) {
                e.preventDefault();
                $(this).parent().removeClass('sidemenu-active');
                $mobileSubMenuOpen.removeClass("click-menu");
                $('#sticky-header').addClass("active");
            });

            $mobileSubMenuOpen.on('click', function() {
                $(this).toggleClass("click-menu");
                $('.mobile-sidebar-menu').toggleClass("sidemenu-active");
                $('#sticky-header').toggleClass("active");
            });

            $AccordianMenu.on('click', function() {
                var link = $(this);
                var closestUl = link.closest("ul");
                var parallelActiveLinks = closestUl.find(".active")
                var closestLi = link.closest("li");
                var linkStatus = closestLi.hasClass("active");
                var count = 0;

                closestUl.find("ul").slideUp(function() {
                    if (++count == closestUl.find("ul").length)
                        parallelActiveLinks.removeClass("active");
                });

                if (!linkStatus) {
                    closestLi.children("ul").slideDown();
                    closestLi.addClass("active");
                }
            });
        },

        /*-------------------------------------------
        	## Sticky Header
        --------------------------------------------- */
        sticky_header: function() {
            if ($('#sticky-header.active').length) {
                var stickyMenu = $('.site-header').clone().appendTo('#sticky-header');
                $(window).on('scroll', function() {
                    var w = $(window).width();
                    if (w > 1200) {
                        if ($(this).scrollTop() > 350) {
                            $('#sticky-header').slideDown(500);
                        } else {
                            $('#sticky-header').slideUp(500);
                        }
                    }
                });
            }
        },

        /* ---------------------------------------------
        	## One Page Menu Script
        --------------------------------------------- */
        onePageMenu: function() {
            if ($('.site-header.header-style-one').length || $('.site-header.header-style-two').length || $('.site-header.header-style-three').length || $('.site-header.header-style-four').length || $('.site-header.header-style-five').length) {
                $('.mainmenu > li > a').on('click', function(e) {
                    var anchor = $(this);
                    $('html, body').stop().animate({
                        scrollTop: $(anchor.attr('href')).offset().top - 75
                    }, 1200);
                    e.preventDefault();
                });
            }
        },

        /* ---------------------------------------------
		   ## Search
	   --------------------------------------------- */
        search: function() {
            $('.search-wrap .search-btn').on('click', function() {
                if ($(this).siblings('.search-form').hasClass('active')) {

                    $(this).siblings('.search-form').removeClass('active').slideUp();
                    $(this).removeClass('active');
                } else {
                    $(this).siblings('.search-form').removeClass('active').slideUp();
                    $(this).siblings('.search-form').removeClass('active');
                    $(this).addClass('active');
                    $(this).siblings('.search-form').addClass('active').slideDown();
                }
            });
        },

        /*-------------------------------------------
        	## Initialize Plugin
        --------------------------------------------- */
        initialize_plugin: function() {
            // Page Animation Script
            $('[data-animate]').scrolla({
                mobile: true,
                once: true,
            });
        },

        /* ---------------------------------------------
        	## Promo Numbers
         --------------------------------------------- */
        promo_numbers: function() {
            $('.fanfact-promo-numbers').each(function() {
                $(this).isInViewport(function(status) {
                    if (status === 'entered') {
                        for (
                            var i = 0; i < document.querySelectorAll('.odometer').length; i++
                        ) {
                            var el = document.querySelectorAll('.odometer')[i];
                            el.innerHTML = el.getAttribute('data-odometer-final');
                        }
                    }
                });
            });
        },

        /* ---------------------------------------------
        	## Isotope Activation
        --------------------------------------------- */
        isotope_activation: function() {
            var IsoGriddoload = $('.portfolio-grid');
            IsoGriddoload.isotope({
                itemSelector: '.item',
                percentPosition: true,
                layoutMode: 'packery',
            });

            var ProjMli = $('.portfolio-filter li a');
            var ProjGrid = $('.portfolio-grid');
            ProjMli.on('click', function(e) {
                e.preventDefault();
                ProjMli.removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                ProjGrid.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    },
                });
            });
        },

        /* ---------------------------------------------
        	## Hero Slider
        --------------------------------------------- */
        hero_slider: function() {
            var $heroSlider = jQuery('.hero-slider-one');
            if ($heroSlider.length) {
                var swiper = new Swiper('.hero-slider-one', {
                    spaceBetween: 0,
                    slidesPerView: 1,
                    freeMode: false,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                });
            }
        },
        /* ---------------------------------------------
        	## Team Carousel
        --------------------------------------------- */
        team_carousel: function() {
            if ($('.team-carousel').length) {
                var items = 3;
                $('.team-carousel').owlCarousel({
                    center: false,
                    items: items,
                    autoplay: false,
                    autoplayTimeout: 5000,
                    smartSpeed: 700,
                    margin: 30,
                    singleItem: false,
                    loop: true,
                    nav: false,
                    dots: true,
                    responsive: {
                        280: {
                            items: 1,
                        },
                        576: {
                            items: 1,
                        },
                        768: {
                            items: 2,
                        },
                        992: {
                            items: 3,
                        },
                        1200: {
                            items: items,
                        },
                    },
                });
            }
        },

        /* ---------------------------------------------
        	## Testimonial Carousel
         --------------------------------------------- */
        testimonial_carousel: function() {
            var $testimonialSlider = jQuery('.testimonial-slider');
            if ($testimonialSlider.length) {
                var swiper = new Swiper('.testimonial-slider', {
                    spaceBetween: 0,
                    freeMode: false,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        576: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 3,
                        },
                    }
                });
            }
            var $testimonialSliderTwo = jQuery('.testimonial-slider-two');
            if ($testimonialSliderTwo.length) {
                var swiper = new Swiper('.testimonial-slider-two', {
                    spaceBetween: 0,
                    freeMode: false,
                    loop: true,
                });
            }
        },

        /* ---------------------------------------------
        	## Work Flow Carousel
         --------------------------------------------- */
        workflow_carousel: function() {
            var $workflowSlider = jQuery('.workflow-slider');
            if ($workflowSlider.length) {
                var swiper = new Swiper('.workflow-slider', {
                    spaceBetween: 0,
                    freeMode: false,
                    loop: true,
                    navigation: {
                        nextEl: '.button-next',
                        prevEl: '.button-prev',
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 1,
                        },
                        992: {
                            slidesPerView: 2,
                        },
                    }
                });
            }
        },

        /* ---------------------------------------------
        	## Pop Up Scripts
         --------------------------------------------- */
        popupscript: function() {
            function getScrollBarWidth() {
                var $outer = $('<div>').css({
                        visibility: 'hidden',
                        width: 100,
                        overflow: 'scroll'
                    }).appendTo('body'),
                    widthWithScroll = $('<div>').css({
                        width: '100%'
                    }).appendTo($outer).outerWidth();
                $outer.remove();
                return 100 - widthWithScroll;
            }

            // Image Pop up
            var $popupImage = $(".popup-image");
            if ($popupImage.length > 0) {
                $popupImage.magnificPopup({
                    type: 'image',
                    fixedContentPos: false,
                    gallery: {
                        enabled: true
                    },
                    removalDelay: 300,
                    mainClass: 'mfp-fade',
                    callbacks: {
                        // This prevenpt pushing the entire page to the right after opening Magnific popup image
                        open: function() {
                            $(".page-wrapper, .navbar-nav").css("margin-right", getScrollBarWidth());
                        },
                        close: function() {
                            $(".page-wrapper, .navbar-nav").css("margin-right", 0);
                        }
                    }
                });
            }

            //Video Popup
            var $videoPopup = $(".video-popup");
            if ($videoPopup.length > 0) {
                $videoPopup.magnificPopup({
                    type: "iframe",
                    removalDelay: 300,
                    mainClass: "mfp-fade",
                    overflowY: "hidden",
                    iframe: {
                        markup: '<div class="mfp-iframe-scaler">' +
                            '<div class="mfp-close"></div>' +
                            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                            '</div>',
                        patterns: {
                            youtube: {
                                index: 'youtube.com/',
                                id: 'v=',
                                src: '//www.youtube.com/embed/%id%?autoplay=1'
                            },
                            vimeo: {
                                index: 'vimeo.com/',
                                id: '/',
                                src: '//player.vimeo.com/video/%id%?autoplay=1'
                            },
                            gmaps: {
                                index: '//maps.google.',
                                src: '%id%&output=embed'
                            }
                        },
                        srcAction: 'iframe_src'
                    }
                });
            }
        },

        /* ---------------------------------------------
        	## Brands Slider
         --------------------------------------------- */
        brands_slider: function() {
            var $brandSlider = jQuery('.brands-carousel-one');
            if ($brandSlider.length) {
                var swiper = new Swiper('.brands-carousel-one', {
                    slidesPerView: 6,
                    spaceBetween: 0,
                    freeMode: false,
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        360: {
                            slidesPerView: 2,
                        },
                        576: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        992: {
                            slidesPerView: 5,
                        },
                        1200: {
                            slidesPerView: 6,
                        },
                    }
                });
            }
            var $brandSlider2 = jQuery('.brands-carousel-two');
            if ($brandSlider2.length) {
                var swiper = new Swiper('.brands-carousel-two', {
                    slidesPerView: 5,
                    spaceBetween: 0,
                    freeMode: false,
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        992: {
                            slidesPerView: 4,
                        },
                        1200: {
                            slidesPerView: 5,
                        },
                    }
                });
            }
            var $brandSlider3 = jQuery('.brands-carousel-three');
            if ($brandSlider3.length) {
                var swiper = new Swiper('.brands-carousel-three', {
                    slidesPerView: 5,
                    spaceBetween: 0,
                    freeMode: false,
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        421: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        992: {
                            slidesPerView: 4,
                        },
                        1200: {
                            slidesPerView: 5,
                        },
                    }
                });
            }
        },
        /* ---------------------------------------------
        	## Portfolio Slider
         --------------------------------------------- */
        portfolio_slider: function() {
            var $portfolio_slider = jQuery('.portfolio-scroll-slider');
            if ($portfolio_slider.length) {
                var swiper = new Swiper('.portfolio-scroll-slider', {
                    spaceBetween: 30,
                    freeMode: false,
                    loop: true,
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        hide: false,
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        576: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 3,
                        },
                    }
                });
            }
        },
        /* ---------------------------------------------
        	## Portfolio Mouseleve Title
        --------------------------------------------- */
        portfolio_mouseleve_title: function() {
            jQuery('.portfolio_animation_wrap').each(function() {
                jQuery(this).on('mouseenter', function() {
                    if (jQuery(this).data('title')) {
                        jQuery('.portfolio_mouseleve_title').html('<h2 class="work__title">' + jQuery(this).data('title') + '</h2><span class="work__cat">' + jQuery(this).data('category') + '</span>');
                        jQuery('.portfolio_mouseleve_title').addClass('visible');
                    }

                    jQuery(document).on('mousemove', function(e) {
                        jQuery('.portfolio_mouseleve_title').css({
                            left: e.clientX - 10,
                            top: e.clientY + 25
                        });
                    });
                }).on('mouseleave', function() {
                    jQuery('.portfolio_mouseleve_title').removeClass('visible');
                });
            });
        },
        /* ---------------------------------------------
        	## Sidebar Script
        --------------------------------------------- */
        sidebarScript: function() {
            var w = $(window).width();
            var MarginTop = w > 1199 ? 85 : 0;
            if ($('.sidebar-items').length) {
                $('.sidebar-items').theiaStickySidebar({
                    containerSelector: '.blog-page-block',
                    additionalMarginTop: MarginTop,
                    minWidth: 992,
                });
            }
            if ($('.sidebar-services').length) {
                $('.sidebar-services').theiaStickySidebar({
                    containerSelector: '.service-details-block',
                    additionalMarginTop: MarginTop,
                    minWidth: 992,
                });
            }
        },
        /* ---------------------------------------------
         function initializ
         --------------------------------------------- */
        initializ: function() {
            albireoApp.scroll_top();
            albireoApp.menu_script();
            albireoApp.sticky_header();
            albireoApp.onePageMenu();
            albireoApp.search();
            albireoApp.initialize_plugin();
            albireoApp.promo_numbers();
            albireoApp.hero_slider();
            albireoApp.team_carousel();
            albireoApp.testimonial_carousel();
            albireoApp.workflow_carousel();
            albireoApp.popupscript();
            albireoApp.brands_slider();
            albireoApp.portfolio_slider();
            albireoApp.portfolio_mouseleve_title();
            albireoApp.sidebarScript();
        },
    };
    /* ---------------------------------------------
     Document ready function
     --------------------------------------------- */
    $(function() {
        albireoApp.initializ();
    });

    $(window).on('load', function() {
        albireoApp.contentLoading();
        albireoApp.isotope_activation();
    });
})(jQuery);
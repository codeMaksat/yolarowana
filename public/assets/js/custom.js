/* =====================================
    Template Name: Syndicate Business Advisory
    Author Name: WebbyCrown
    Description: Syndicate Business Advisory - HTML5 Template.
    Version:1.0
========================================*/

/*======================================
[ JS Table of contents ]
01. General Open JS
    + Mobile menu
    + Mobile menu dropdown
    + AOS
    + Page scroll to Header sticky

02. Slider Open JS
    + What we do slider
    + Testimonial slider
    + Customer Reviews slider
    + Photos Gallery slider
    + Trending Attractions slider
    + Popular Tours slider
    + Testimonial full slider

03. Popup Open JS
    + Cookie popup js
    + Newsletter Popup JS
    + Our Teachers popup
    + Enquiry form Popup JS
04. Preloader JS
05. Isotope JS



========================================*/

(function ($) {
  journea_travel_agency = {
    init: function() {
      // Home one js
      this.general_open();
      this.slider_open();
      this.popup_open();
      this.Isotope_js();
      this.Preloader_js();

    },

    /*======================================
     01. General Open JS
    ========================================*/
    general_open: function() {

      /* Mobile menu */
      $(document).on("click", ".toggle-menu-button a, .mobile-menu .menu-close a", function(){
        $('.mobile-menu').toggleClass("open");
        //$(this).toggleClass("active");
      });

      /* Mobile menu dropdown*/
      if( $(window).width() <= 991 ) {
      $(".main-menu ul > li").each(function (i) {
        if ($(this).has(".mega-menu").length)
        {
          $(this).find('.mega-menu').addClass("sub-menu");
          $(this).find('> a').after('<span class="caret-arrow"></span>');
          $(this).find('> .sub-menu').css('display', 'none');
        }
      });
      $('.main-menu ul li .caret-arrow').click(function () {
        var catSubUl = $(this).next('.sub-menu');
        var catSubli = $(this).closest('li');
        if (catSubUl.is(':hidden'))
        {
            //$("#window > ul > li .sub-menu").slideUp();
          catSubUl.slideDown();
            //$('.caret').removeClass('active');
          $(this).addClass('sub-active');
          catSubli.addClass('sub-active');
        }
        else
        {
          catSubUl.slideUp();
          $(this).removeClass('sub-active');
          catSubli.removeClass('sub-active');
        }
      });
    }

      /* Search Popup */
      $(document).on("click", ".search-icon a, .close-search", function(){
        $('body').toggleClass("search-active");
      });


      /* Page scroll to Header sticky */
      $(window).scroll(function() {
        if ($(this).scrollTop() > 0){  
          $('.header').addClass("sticky-header");
        }
        else{
          $('.header').removeClass("sticky-header");
        }
      });


      $(".scroll-menu").on('click', 'a', function(event) {
            $('.scroll-menu a').removeClass("bg-primary-900 text-white");
            event.preventDefault();
            var full_url = this.href;
            var parts = full_url.split("#");
            var trgt = parts[1];
            var target_offset = $("#" + trgt).offset();
            var target_top = target_offset.top;
            $('html, body').animate({scrollTop: target_top - 100 }, 0);
            $(this).addClass("bg-primary-900 text-white");
        });

if( $('#container').length > 0 ){
      $('#container').imagesLoaded({
        background: true
      });
}

        /*https://codepen.io/digvijayad/pen/RegBxg*/
      if ($('.repeater').length>0){
        $('.repeater').repeater({
            initEmpty: false,
            defaultValues: {
                'text-input': 'foo'
            },
            show: function () {
                $(this).slideDown();
            },
            hide: function (deleteElement) {
                if(confirm('Are you sure you want to delete this element?')) {
                    $(this).slideUp(deleteElement);
                }
            },
            ready: function (setIndexes) {
            },
            isFirstItemUndeletable: true
        });
      }
 
      


    },

    /*======================================
     02. Slider Open JS
    ========================================*/
    slider_open: function() {

      /* What we do slider */
      var swiper = new Swiper(".customers-purchased-section .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: ".customers-purchased-section .swiper-button-next",
          prevEl: ".customers-purchased-section .swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });

      /* Testimonial slider */
      var swiper = new Swiper(".testimonial-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".testimonial-slider .swiper-button-next",
          prevEl: ".testimonial-slider .swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
      });

      /* Special offers & Discounts slider */
      var swiper = new Swiper(".special-offers-discounts .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
          nextEl: ".special-offers-discounts .swiper-button-next",
          prevEl: ".special-offers-discounts .swiper-button-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        },
      });

      /* Customer Reviews slider */
      var swiper = new Swiper(".customer-reviews-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: ".customer-reviews-slider .swiper-pagination",
          clickable: true,
        },
      });

      /* Photos Gallery slider */

      var swiper = new Swiper(".photos-gallery-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        navigation: {
          nextEl: ".photos-gallery-slider .swiper-button-next",
          prevEl: ".photos-gallery-slider .swiper-button-prev",
        },
      });

      /* Trending Attractions slider */
      var swiper = new Swiper(".trending-attractions-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
          el: ".trending-attractions-slider .swiper-pagination",
          type: "progressbar",
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        },
      });

      /*Popular Tours slider*/
      var swiper = new Swiper(".popular-tours-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: ".popular-tours-slider .swiper-button-next",
          prevEl: ".popular-tours-slider .swiper-button-prev",
        },
        pagination: {
          el: ".popular-tours-slider .swiper-pagination",
          clickable: true,
        },
        pagination: {
          el: ".popular-tours-slider .swiper-pagination1",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
        },
      });


      /* Testimonial full slider */
      var swiper = new Swiper(".testimonial-full-slider .mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: ".testimonial-full-slider .swiper-button-next",
          prevEl: ".testimonial-full-slider .swiper-button-prev",
        },
        pagination: {
          el: ".testimonial-full-slider .swiper-pagination",
          clickable: true,
        },
      });

      /*Home 3 hero slider*/
      var swiper = new Swiper(".hero-slider-section .mySwiper", {
        effect: "fade",
        pagination: {
          el: ".hero-slider-section .swiper-pagination",
          type: "fraction",
          clickable: true,
        },
        navigation: {
          nextEl: ".hero-slider-section .swiper-button-next",
          prevEl: ".hero-slider-section .swiper-button-prev",
        },
      });

    },

    /*======================================
     03. Popup Open JS
    ========================================*/
    popup_open: function() {
      /* Cookei popup JS */
        setTimeout(function() {
          $('body').find('.cookei-popup-link').trigger('click');
        }, 4000);

      // Cookei popup
      $('.cookei-popup-link').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',
      });

      /* Newsletter Popup JS */
        setTimeout(function() {
          $('body').find('.newsletter-popup-link').trigger('click');
        }, 2000);

      // Newsletter Popup
      $('.newsletter-popup-link').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',
      });

      // Team Popup
      $('.team-popup-link').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',
      });

      // Tour Popup
      $('.tour-popup-link').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',
      });

      // Hotel Popup
      $('.hotel-popup-link').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',
      });

      $('.popup-youtube').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
      });
    },

    /*======================================
     04. Preloader JS
    ========================================*/
    Preloader_js: function() {
      //After 2s preloader is fadeOut
      $('.preloader').delay(2000).fadeOut('slow');
      setTimeout(function() {
      //After 2s, the no-scroll class of the body will be removed
        $('body').removeClass('no-scroll');
      }, 2000); //Here you can change preloader time
    },

    /*======================================
     05. Isotope JS
    ========================================*/
    Isotope_js: function() {
      // init Isotope

      var $grid_masonary = $('.grid-masonary').isotope({
        itemSelector: '.grid-item',
        masonry: {
          horizontalOrder: false,
        }
      });

if( $('.grid-masonary').length > 0 ){
      $grid_masonary.imagesLoaded().progress( function() {
        $grid_masonary.isotope('layout');
      });
}

        // bind filter button click
      $('#filters').on( 'click', 'li', function() {
        var filterValue = $( this ).attr('data-filter');
          // use filterFn if matches value
          //filterValue = filterFns[ filterValue ] || filterValue;
        if($('.grid-masonary').length>0){
          $grid_masonary.isotope({ filter: filterValue });
        }else{
          $grid.isotope({ filter: filterValue });
        }
      });

       // change is-checked class on buttons
      $('.portfolio-list').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'li', function() {
          $buttonGroup.find('.current').removeClass('current');
          $( this ).addClass('current');
        });
      });
    },

    


  };
  journea_travel_agency.init();

})(jQuery);

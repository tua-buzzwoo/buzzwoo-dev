$(document).ready(function () {
    // Play video
    $(".wrapper .play-btn").on("click", function (e) {
        e.preventDefault();
        var $thisWarpper = $(this).closest(".wrapper");
        $thisWarpper.find(".player")[0].src += "?autoplay=1";
        $thisWarpper.find(".player").show();
        $thisWarpper.find(".video-cover").hide();
        $thisWarpper.find(".play-btn").hide();
    });

    // Slider
    initSlider();

    document.addEventListener("shopify:section:load", function (event) {
        initSlider();
    });

    // Sticky menu
    function contentHubStickyMenu() {
        if ($(".container-content-hub").length < 2 && $(".sticky-end").length) {
            return;
        }

        var $sticky = $(".content-hub-menu");
        var $stickyrStopper = $(".sticky-end");
        if (!!$sticky.offset()) {
            // make sure ".sticky" element exists

            var generalSidebarHeight = $sticky.innerHeight();
            var stickyTop = $sticky.offset().top;
            var stickOffset =
                6 +
                $("#shopify-section-header").outerHeight() +
                $("#shopify-section-announcement").outerHeight();
            var contentPadding = parseInt(
                $(".container-content-hub").css("padding-top")
            );

            $(window).scroll(function () {
                // scroll event
                var windowTop = $(window).scrollTop(); // returns number

                var stickyStopperPosition =
                    $stickyrStopper.offset().top - contentPadding * 2;
                var stopPoint =
                    stickyStopperPosition - generalSidebarHeight - stickOffset;
                var diff = stopPoint + stickOffset;

                if (stopPoint < windowTop) {
                    $sticky.css({ position: "absolute", top: diff });
                } else if (stickyTop < windowTop + stickOffset) {
                    $sticky.css({ position: "fixed", top: stickOffset });
                } else {
                    $sticky.css({ position: "absolute", top: "initial" });
                }
            });
        }
    }

    $(window).on("load", function () {
        if ($(window).width() > 991) {
            contentHubStickyMenu();
        }
    });

    $(window).on("resize", function () {
        if ($(window).width() > 991) {
            contentHubStickyMenu();
        }
    });

    // Scroll spy
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $("a").each(function () {
            $(this).removeClass("active");
        });
        $(this).addClass("active");

        var target = this.hash,
            menu = target;
        $target = $(target);
        $("html, body")
            .stop()
            .animate(
                {
                    scrollTop: $target.offset().top + 2,
                },
                500,
                "swing",
                function () {
                    window.location.hash = target;
                    $(document).on("scroll", onScroll);
                }
            );
    });
});

function initSlider() {
    $(".image-items").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    arrows: false,
                },
            },
        ],
    });

    $(".article-items").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                },
            },
        ],
    });
}

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".content-hub-menu a").each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (
            refElement.position().top <= scrollPos &&
            refElement.position().top + refElement.height() > scrollPos
        ) {
            $(".content-hub-menu ul li a").removeClass("active");
            currLink.addClass("active");
        } else {
            currLink.removeClass("active");
        }
    });
}

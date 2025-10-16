
    
    
    
    
    var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    spaceBetween: 30,
    centeredSlides: false,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    loop: true,
    breakpoints: {
    1400: { slidesPerView: 5 },
    1240: { slidesPerView: 4 },
    1040: { slidesPerView: 3 },
    800: { slidesPerView: 3 },
    600: { slidesPerView: 3 },
    300: { slidesPerView: 2 },


    },
    pagination: {
        el: ".con2_box .swiper-pagination",
    },
    });



    
$('.d-masonry').isotope({
	layoutMode: 'packery',
	itemSelector: '.d-masonry__container'
});

$('.d-project-slider').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	fade: false,
	asNavFor: '.d-project-slider-small',
	focusOnSelect: false
});

$('.d-project-slider-small').slick({
	slidesToShow: 6,
	slidesToScroll: 1,
	asNavFor: '.d-project-slider',
	dots: false,
	arrows: true,
	focusOnSelect: false
});

function openNav() {
	$('#d-mobile-nav').fadeIn(300);
}

function closeNav() {
	$('#d-mobile-nav').fadeOut(300);
}

//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
const wrapWidth = document.querySelector('.wrap').offsetWidth
const bodyElem = document.querySelector('body')

function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}

function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}

function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if (pMax > wrapWidth) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}

for (i = 0; i < togglePopupButtons.length; i++) {
	togglePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < closePopupButtons.length; i++) {
	closePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function (event) {
	if (!event.target.closest('.js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.innerHTML = ''
			popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0; i < popupElementSelectItem.length; i++) {
			popupElementSelectItem[i].addEventListener('click', function (e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				if (!this.closest('.js-tabs-nav')) {
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			})
		}
	}
})

//gallery
const buttonGalleryToggle = document.querySelectorAll('.js-gallery')
if (buttonGalleryToggle) {
	for (i = 0;i < buttonGalleryToggle.length;i++) {
		buttonGalleryToggle[i].addEventListener('click', function(e) {
			this.nextElementSibling.classList.toggle('active')
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
}
const buttonGalleryOpen = document.querySelectorAll('.item-tile-gallery')
if (buttonGalleryOpen) {
	for (i = 0;i < buttonGalleryOpen.length;i++) {
		buttonGalleryOpen[i].addEventListener('click', function(e) {
			this.classList.toggle('active')
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
}

//filter toggle
const buttonFilterToggle = document.querySelector('.js-filter-toggle')
if (buttonFilterToggle) {
	buttonFilterToggle.addEventListener('click', function(e) {
		document.body.classList.toggle('filter-open')
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}

//features popup
const buttonFeaturesToggle = document.querySelectorAll('.js-features-toggle')
if (buttonFeaturesToggle) {
	for (i = 0;i < buttonFeaturesToggle.length;i++) {
		buttonFeaturesToggle[i].addEventListener('click', function(e) {
			document.body.classList.toggle('features-open')
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
}

$(document).ready(function () {
	
	
	
	//faq
	$('.item-tile-faq .btn-popup').on('click', function() {
		if ($(this).hasClass('open')) {
			$(this).removeClass('open').next('.popup-content-block').slideUp(200);
		} else {
			$(this).addClass('open').next('.popup-content-block').slideDown(200);
		}
		return false;
	})

	//popups
	let popupCurrent;
	$('.js-popup-open').on('click', function () {
		$('.popup-outer-box').removeClass('active');
		$('body').addClass('popup-open');
		popupCurrent = $(this).attr('data-popup');
		$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
		return false;
	})
	$('.js-popup-close').on('click', function () {
		$('body').removeClass('popup-open');
		$('.popup-outer-box').removeClass('active');
		return false;
	})
	$('.popup-outer-box').on('click', function (event) {
		if (!event.target.closest('.popup-box')) {
			$('body').removeClass('popup-open');
			$('body').removeClass('popup-open-scroll');
			$('.popup-outer-box').removeClass('active');
			return false;
		}
	})
	
	
	//catalog-slider-box
	if (!!$('.catalog-slider-box').offset()) {
		if ($(window).innerWidth() > 1023) {
			$('.catalog-slider-box .slider').slick({
				dots: true,
				slidesToShow: 3,
				variableWidth: false,
				infinite: true,
				adaptiveHeight: false,
				rows: 1,
				swipeToSlide: true,
				prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
				responsive: [
					{
						breakpoint: 1400,
						settings: {
							slidesToShow: 3,
							prevArrow: false,
							nextArrow: false,
						}
					},
				]
			});
		}
	}
});
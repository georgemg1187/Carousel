var config = {
    carousel: document.getElementById("carousel"),
    arrows: {
        next: document.getElementById("next"),
        prev: document.getElementById("prev")
    }
}

var c = new Carousel(config);
c.init();
/****************************************
 * ===> Carousel Constructor
 ***************************************/
function Carousel(config) {
    this.carousel = config.carousel;
    this.arrows = config.arrows;
    this.index = 0;

    this.init = function () {
        this.getSlides();

        this.animationEnd = this.getAnimationEvent();
        this.onAnimationEnd();

        this.arrows.next.addEventListener("click", this.nextSlide.bind(this))
        this.arrows.prev.addEventListener("click", this.prevslide.bind(this))
    }

    this.getSlides = function () {
        this.slides = Array.prototype.slice.call(this.carousel.children);
        this.slides.forEach(function (slide) {
            slide.classList.add("slide")
        })
    }

    this.nextSlide = function (evt) {
        evt.stopPropagation();
        if (this.clicked) return;
        this.clicked = true;

        this.slides[this.index].classList.add('toLeft');
        this.index = ++this.index % this.slides.length;
        this.slides[this.index].classList.add('fromRight', 'show')

        this.activeIndex = this.index;
    }

    this.prevslide = function (evg) {
        evt.stopPropagation();
        if (this.clicked) return;
        this.clicked = true;

        this.slides[this.index].classList.add('toRight');
        this.index = --this.index < 0 ? this.slides.length - 1 : this.index;
        this.slides[this.index].classList.add('fromLeft', 'show');

        this.activeIndex = this.index;
    }

    this.show = function(index) {
        this.slides[index].classList.add('show');
        this.index = index;
    }

    this.hide = function() {this.slides[this.index].className = 'slide';}

    this.getAnimationEvent = function () {
        var animations = {
            'animation': 'animationend',
            'oAnimation': 'oAnimationEnd',
            'WebkitAnimation': 'webkitAnimationEnd',
            'MSAnimation': "MSAnimationEnd"
        }

        for (a in animations) {
            if (document.body.style[a] !== undefined) {
                return animations[a];
            }
        }
    }

    this.onAnimationEnd = function () {
        this.slides.forEach(function (slide, index) {
            slide.addEventListener(this.animationEnd, function () {
                this.clicked = false;
                if (this.activeIndex === index) return slide.className = 'slide show'
                slide.className = 'slide'
            }.bind(this))
        }.bind(this))
    }
}
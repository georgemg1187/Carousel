/*****************************************
 * ==>  SlideShow
 ****************************************/
function SlideShow(root) {
    this.root = root;
    this.index = 0;
    animationEnd = getAnimationEvent();

    this.init = function() {
        this.slides = Array.prototype.slice.call(root.children);
        this.onAnimationEnd();
    }

    this.nextSlide = function(evt) {
        evt.stopPropagation();
        if (this.clicked) return;
        this.clicked = true;

        this.toHide = this.slides[this.index];
        this.toHide.classList.add('toLeft');

        this.index = ++this.index % this.slides.length;

        this.toShow = this.slides[this.index]
        this.toShow.classList.add('visible', 'fromRight');
    }

    this.previousSlide = function(evt) {
        evt.stopPropagation();
        if (this.clicked) return;
        this.clicked = true;
        
        this.toHide = this.slides[this.index];
        this.toHide.classList.add('toRight');

        this.index = --this.index < 0 ? this.slides.length - 1 : this.index;

        this.toShow = this.slides[this.index];
        this.toShow.classList.add('visible', 'fromLeft');
    }

    this.show = function(index) {
        if (index === undefined) index = this.index;
        this.slides[index].classList.add('visible')
        this.clicked = false;
    }
    
    this.hide = function(index) {
        if (index === undefined) index = this.index;
        this.slides[index].classList.remove('visible')
    }

    this.onAnimationEnd = function() {
        this.slides.forEach(function(slide) {
            slide.addEventListener(animationEnd, function() {
                if (slide === this.toHide) slide.className = '';
                if (slide === this.toShow) slide.className = 'visible';
                this.clicked = false;
            }.bind(this))
        }.bind(this))
    }
}

/*****************************************
 * ==> Animation Events
 ****************************************/
 function getAnimationEvent () {
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

/*****************************************
 * ==> Slide Show Init
 ****************************************/
var ss = new SlideShow(document.querySelector('#carousel'))
ss.init();
ss.show();

var nextArrow = document.getElementById('next');
nextArrow.addEventListener('click', ss.nextSlide.bind(ss));

var previousArrow = document.getElementById('prev');
previousArrow.addEventListener('click', ss.previousSlide.bind(ss));

var container = document.getElementById('carousel-container');
var touch = {
    minDistance: 20,
}
container.addEventListener('touchstart', function(evt) { touch.start = evt.touches[0].pageX; })
container.addEventListener('touchend', function(evt) { 
    touch.end = evt.changedTouches[0].pageX;

    if (touch.end > touch.start + touch.minDistance) ss.previousSlide(evt);
    if (touch.end < touch.start - touch.minDistance) ss.nextSlide(evt);
})




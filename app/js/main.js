/**
 * portfolio-website
 * http://www.lukeshinn.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2019, Luke Shinn
 * http://www.lukeshinn.com
 */


{
    const introTextLine1 = document.body.querySelector(".loader__text-line--1 > div")
    const introTextLine2 = document.body.querySelector(".loader__text-line--2 > div")
    const introBackground = document.body.querySelector(".loader")
    const box3 = document.body.querySelector("div.box3")


  const init = () => {
    introductionTextController()
  };

  // Introduction Text
  // #####################################
  // this controller is responsible for the animations
  // of the first view the user sees which is a black screen
  // and some hidden text
    const introductionTextController = () => {

      // keyframes
      var keyframes__intro_bg = [
        { transform: 'translateX(0)' },
        { transform: 'translateY(-100%)' }
      ];

      var keyframes__intro_words = [
        { transform: 'matrix(1.00,0.07,-0.07,1.00,0,75)' },
        { transform: 'matrix(1,0,0,1,0,0)' },
        { transform: 'matrix(1,0,0,1,0,0)' },
        { transform: 'matrix(1.00,-0.03,0.03,1.00,0,-75)' }
      ];

      // duration
      var timimg__intro_bg = {
        duration: 1000,
        iterations: 1,
        fill: 'forwards'
      }

      var timimg__intro_word = {
        duration: 2000,
        iterations: 1,
        fill: 'forwards'
      }

      // animation variables
      var introBg = introBackground.animate(
        keyframes__intro_bg,
        timimg__intro_bg
      )

      var introLine1 = introTextLine1.animate(
        keyframes__intro_words,
        timimg__intro_word
      )

      var introLine2 = introTextLine2.animate(
        keyframes__intro_words,
        timimg__intro_word
      )

      introLine1.play()
      introLine2.pause()
      introBg.pause()
      introLine1.onfinish = function() {
        setTimeout(function(){ introLine2.play() }, 0)
      }
      introLine2.onfinish = function() {
        setTimeout(function(){ introBg.play() }, 0)
      }
    }


  init();
}


// =========================================================
///  Vue
// =========================================================
// scroll indicator component
Vue.component('indicator', {
  template:'<div id="indicator"></div>',
  mounted:function(){
    var vm = this
    window.addEventListener('scroll', function(e){
      var scrollPos = window.scrollY
      var winHeight = window.innerHeight
      var docHeight = document.documentElement.scrollHeight // instead document.body.clientHeight
      var perc = 100 * scrollPos / (docHeight - winHeight)
      vm.$el.style.width = perc + '%'
    })

    var currentPos = 0;
    const calculate  = (e) => {
      currentPos += e.deltaY;
      vm.$el.style.width = currentPos + '%'
      console.log(currentPos);
    };

    window.addEventListener("wheel", (e) => {
      calculate(e);
    })

  }
})

// Vue bootstrap
new Vue({
  el:'#app'
})

Vue.config.devtools = true;

//  Old
// #####################################

/*{*/
//const DOM = {};
//DOM.intro = document.querySelector('.content--intro');
//DOM.shape = DOM.intro.querySelector('svg.shape');
//DOM.path = DOM.shape.querySelector('path');
//DOM.enter = document.querySelector('.enter');
//DOM.main= document.getElementById('main');
//charming(DOM.enter);
//DOM.enterLetters = Array.from(DOM.enter.querySelectorAll('span'));
//// Set the SVG transform origin.
//DOM.shape.style.transformOrigin = '50% 0%';

//const init = () => {
//imagesLoaded(document.body, {background: true} , () => document.body.classList.remove('loading'));
//DOM.enter.addEventListener('click', navigate);
//DOM.enter.addEventListener('touchenter', navigate);
//DOM.enter.addEventListener('mouseenter', enterHoverInFn);
//DOM.enter.addEventListener('mouseleave', enterHoverOutFn);
//};

//let loaded;
//const navigate = () => {
//if ( loaded ) return;
//loaded = true;

//anime({
//targets: DOM.intro,
//duration: 1100,
//easing: 'easeInOutSine',
//translateY: '-200vh'
//});

//anime({
//targets: DOM.shape,
//scaleY: [
//{value:[0.8,1.8],duration: 550,easing: 'easeInQuad'},
//{value:1,duration: 550,easing: 'easeOutQuad'}
//]
//});

//anime({
//targets: DOM.path,
//duration: 1100,
//easing: 'easeOutQuad',
//d: DOM.path.getAttribute('pathdata:id')
//});
//main.classList.add("auto-height");
//};

//let isActive;
//let enterTimeout;

//const enterHoverInFn = () => enterTimeout = setTimeout(() => {
//isActive = true;
//anime.remove(DOM.enterLetters);
//anime({
//targets: DOM.enterLetters,
//delay: (t,i) => i*15,
//translateY: [
//{value: 10, duration: 150, easing: 'easeInQuad'},
//{value: [-10,0], duration: 150, easing: 'easeOutQuad'}
//],
//opacity: [
//{value: 0, duration: 150, easing: 'linear'},
//{value: 1, duration: 150, easing: 'linear'}
//],
//color: {
//value: '#ff963b',
//duration: 1,
//delay: (t,i,l) => i*15+150
//}
//});
//}, 50);

//const enterHoverOutFn = () => {
//clearTimeout(enterTimeout);
//if( !isActive ) return;
//isActive = false;

//anime.remove(DOM.enterLetters);
//anime({
//targets: DOM.enterLetters,
//delay: (t,i,l) => (l-i-1)*15,
//translateY: [
//{value: 10, duration: 150, easing: 'easeInQuad'},
//{value: [-10,0], duration: 150, easing: 'easeOutQuad'}
//],
//opacity: [
//{value: 0, duration: 150, easing: 'linear'},
//{value: 1, duration: 150, easing: 'linear'}
//],
//color: {
//value: '#ffffff',
//duration: 1,
//delay: (t,i,l) => (l-i-1)*15+150
//}
//});
//};

//init();
/*}*/

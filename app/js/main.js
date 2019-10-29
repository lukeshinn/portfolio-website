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
  const DOM = {};
  const introTextLine1 = document.body.querySelector(".loader__text-line--1 > div")
  const introTextLine2 = document.body.querySelector(".loader__text-line--2 > div")
  const introBackground = document.body.querySelector(".loader")
  const body = document.getElementsByTagName("BODY")[0];
  DOM.showAbout = document.querySelector('li.showAbout');
  DOM.about = document.querySelector('.about');
  DOM.revealer = document.querySelector('.revealer');


  const init = () => {
    //introductionTextController()
    DOM.showAbout.addEventListener('click', () => {setRevealer(), toggleRevealClass()});
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
      duration: 300,
      iterations: 1,
      fill: 'forwards',
      easing: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)'
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

    // stop animations otherwise they will
    // play on page load
    introLine1.pause()
    introLine2.pause()
    introBg.pause()


    animateIntro(introLine1, introLine2, introBg)

  }// end introductionTextController

  // Set Revealer
  // #####################################
  //
  var winsize = { width : window.innerWidth, height : window.innerHeight }
  const setRevealer = () => {
    var pageDiagonal = Math.sqrt(Math.pow(winsize.width, 2) + Math.pow(winsize.height, 2));
    widthVal = heightVal = pageDiagonal + 'px';
    var transform = transform = 'translate3d(-50%, -50%, 0px) rotate3d(0, 0, 1, -135deg) translate3d(0px,' + widthVal +', 0px)';
    DOM.revealer.style.width = widthVal;
    DOM.revealer.style.height = heightVal;
    DOM.revealer.style.WebkitTransform = DOM.revealer.style.transform = transform;

  }


  // Toggle Reveal Class
  // #####################################
  // toggles classes for revealer and about animations
  var revealerOpenClass = 'revealer-open';
  var revealerCloseClass = 'revealer-close';
  var aboutOpenClass = 'reveal-about';
  var aboutCloseClass = 'hide-about';

  const toggleRevealClass = () => {
    if(DOM.revealer.classList.contains(revealerOpenClass) === false) {
      DOM.revealer.classList.add(revealerOpenClass);
      DOM.revealer.classList.remove(revealerCloseClass);
    }
    else {
      DOM.revealer.classList.remove(revealerOpenClass);
      DOM.revealer.classList.add(revealerCloseClass);
    }
    if(DOM.about.classList.contains(aboutOpenClass) === false) {
      DOM.about.classList.add(aboutOpenClass);
      DOM.about.classList.remove(aboutCloseClass);
    }
    else {
      DOM.about.classList.remove(aboutOpenClass);
      DOM.about.classList.add(aboutCloseClass);
    }
  }

  //  AnimateIntro
  // #####################################
  // animates and removes the intro screen
  const animateIntro = (ln1, ln2, bg) => {
    setTimeout(function() {ln1.play()},0)
    setTimeout(function() {ln2.play()},1900)
    setTimeout(function() {bg.play()},3900)
    setTimeout(function() {introBackground.remove()},4300)
  }



  init();
}


// =========================================================
///  Vue
// =========================================================
Vue.component('slide', {
  template:'<article class="slide"></article>',
  mounted:function(){
    var vm = this
  }
})

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

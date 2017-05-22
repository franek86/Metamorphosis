(function(){

    var headerHome              = $('.header-home'),
          headerMenu            = $('.header_menu_icon')
          headerMenuIcon        = $('.menu_icon'),
          headerDivider         = $('.header_center_devider'),
          centerBigHeader       = $('.header_center_big'),
          centerContentHeader   = $('.header_center_content'),
          chapeterIcon          = $('.header_chapters_icon'),
          scrollIconHeader      = $('.header_bottom_scroll'),
          shareIcon             = $('.share_icon'),
          menuWrapper           = $('.menu_wrapper'),
          menu                  = $('.menu'),
          menuItems             = $('.menu_items li'),
          menuBottomTitle       = $('.menu_bottom_title'),
          menuIcons             = $('.menu_icons'),
          menuBottomText        = $('.menu_bottom_text'),
          popUp                 = $('.popup'),
          aboutSlide            = $('.about_slide'),
          animateSlide          =$('.animate_slide'),
          tl                    = new TimelineLite(),
          controllerMagicScroll = new ScrollMagic.Controller();


  /*
    animacije u headeru startaju sa y-pozicije, opacity je na nuli, dok zavrsava sa y-pozicijom i opacity po default u css-u
  */
  tl.from(headerHome, 0.4, {y: 1000,  ease:Sine.easeOut})
    .from(headerMenu, 0.55, {y: 200, autoAlpha:0, ease:Sine.easeOut})
    .from(headerDivider, 0.55, {y: 200, autoAlpha:0, ease:Sine.easeOut})
    .from(centerBigHeader, 0.55, {y: 200, autoAlpha:0, ease:Sine.easeOut})
    .from(centerContentHeader, 0.55, {y: 500, autoAlpha:0, ease:Sine.easeOut})
    .from(chapeterIcon, 0.55, {y: 500, autoAlpha:0, ease:Sine.easeOut})
    .from(scrollIconHeader, 0.55, {y: 200, autoAlpha:0, ease:Sine.easeOut})
    .from(shareIcon, 0.55, {y: 200, autoAlpha:0, ease:Sine.easeOut});



  // klikanjem na menu icon otvora se menu prozor s animacijom
  function openMenu(){

    //animacije startaju sa pozicije x -400px, s odgodom od svakih 100ms, dok zavrsava sa X-pozicijom po default u css-u
    tl.from(menuBottomTitle, 0.3, {autoAlpha: 0, x: -1000, ease:Expo.easeOut})
      .from(menuIcons, 0.3, {autoAlpha: 0, x: -1000, ease:Expo.easeOut})
      .from(menuBottomText, 0.3, {autoAlpha: 0, x: -1000, ease:Expo.easeOut})
      .staggerFromTo(menuItems, 0.8, {autoAlpha: 0, x: -1000}, {autoAlpha: 1, x:0, ease:Expo.easeOut}, 0.2);

    var target = headerMenuIcon.hasClass('open'); // target varijabla pohranjuje klasu .menu_icon koja ima klasu .open
    if(target){// ako je target == true
      $('.menu_icon, .menu_wrapper').removeClass('open');//ukloni klasu .open
      $('.menu_icon_text').text('Menu');//dodaj text "Menu"
    } else {
      $('.menu_icon, .menu_wrapper').addClass('open');//dodaju klasu .open
      $('.menu_icon_text').text('Close');// dodaj text "Close"
    }

  }

  headerMenuIcon.on('click', function(){
    openMenu();
  });

  //Hoverom preko Share ikone prikazi ostale icone s animacijom
  shareIcon.click(function(){ //prolaskom misa preko .share_icon
    $(this).css({
      'transform': 'rotate(180deg)', //rotiraj ikonu za 180
      'transition': '0.5s ease-in-out'
    });
    $('.hidden_icon').css({// .hidden_icon dodaj css
      'transform': 'translateX(-5px)',
      'opacity': '1',
      'transition': '0.7s ease'
    });
  }).mouseleave(function(){ // napustanje misa .share_icon
    $(this).css({
      'transform': 'rotate(0deg)', //rotiraj ikonu za 0
      'transition': '0.2s ease-in-out'
    });
    $('.hidden_icon').css({// .hidden_icon dodaj u css
      'transform': 'translateX(50px)',
      'opacity': '0',
      'transition': '0.25s cubic-bezier(.77,.55,.69,.42)'
    });
  });

  //Otvaranje popup prozora klikanjem na chapter ikonu
  chapeterIcon.on('click', function(e){ //kilk na .chapter_icon
    e.preventDefault();
    popUp.show();//prikazi popup prozor
    TweenMax.from(popUp, 0.5, {opacity:0, y: -100, x: 100, ease:Back.easeIn});//animiraj popup
  });
  //Zatvaranje popup prozora klikanjem na close iconu
  $('.popup_close').on('click', function(e){// klik na .popup_close
    e.preventDefault();
    popUp.hide()//sakrij popup prozor
  });


  //Prikazi about slider
  $('.about_btn').on('click', function(e){
    e.preventDefault();
    TweenMax.to(aboutSlide, 2, {x:"0%", ease:Power4.easeOut});
    TweenMax.fromTo(animateSlide, 2, {x: '100%', ease:Power4.easeOut, delay: 0.5}, {x: '0%', ease:Power4.easeOut, delay: 0.5});
  });
  //sakrijavnje about slidera
  $('.about_slide_close').on('click', function(e){
    e.preventDefault();
    TweenMax.to(aboutSlide, 2, {x: '100%', ease:Power4.easeInOut});
  });


  // funkcija koja sprema podatke iz kontakt forme u local storage
  function saveForm(){
      var values = [];
      $('#conatact_form .inputForm').each(function(i, obj){ //selekt svaki input u conatact_form
        values.push(obj.value);// povuci values niz
      });
    localStorage.setItem('save_data', JSON.stringify(values));// posalju niz u localstorage
  }

  // kilkanje aktivira se funkcija i sprema podatke
  $('#submitForm').on('click', function(){
    saveForm();
  });


  function clickExploreMore(){
    $('html, body').animate({
        scrollTop: $(".about").offset().top
    }, 2000);

    $(window).scroll(function(){
      $(".header_home").css("opacity", 1 - $(window).scrollTop() / 1000);
    });
  }
  $(".header_bottom_scroll").click(function() {
    clickExploreMore();
  });

//scroll magic
  var scene = new ScrollMagic.Scene({
    triggerElement: '.about',
    duration: '100%',
    triggerHook: 0.5
  })
  .setTween(TweenMax.from('.about_box', 1, {y: '50%', autoAlpha: 0, ease:Expo.easeOut}))
  .addTo(controllerMagicScroll);


  /*Jednostavni Traversy slider*/
  // Set Options
	var speed = 500;			// Fade speed
	var autoswitch = true;		// Auto slider options
	var autoswitch_speed = 4000	// Auto slider speed

	// Add initial active class
	$('.slide').first().addClass('active');
	// Hide all slides
	$('.slide').hide();
	// Show first slide
	$('.active').show();
	// Next Handler
	$('.next_slide').on('click', nextSlide);
	// Prev Handler
	$('.prev').on('click', prevSlide);


	// Switch to next slide
	function nextSlide(){
		$('.active').removeClass('active').addClass('oldActive');
		if($('.oldActive').is(':last-child')){
			$('.slide').first().addClass('active');
		} else {
			$('.oldActive').next().addClass('active');
		}
		$('.oldActive').removeClass('oldActive');
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
	}

	// Switch to prev slide
	function prevSlide(){
		$('.active').removeClass('active').addClass('oldActive');
		if($('.oldActive').is(':first-child')){
			$('.slide').last().addClass('active');
		} else {
			$('.oldActive').prev().addClass('active');
		}
		$('.oldActive').removeClass('oldActive');
		$('.slide').fadeOut(speed);
		$('.active').fadeIn(speed);
	}


})();

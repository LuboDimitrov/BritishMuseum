
$(document).ready(function () {
  "use strict";

  var datos;
  var fotosEgipte;
  var fotosGrecia;

  var window_width = $(window).width(),
    window_height = window.innerHeight,
    header_height = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen = window_height - header_height;

  $(".fullscreen").css("height", window_height)
  $(".fitscreen").css("height", fitscreen);

  if (document.getElementById("default-select")) {
    $('select').niceSelect();
  };

  $('.img-pop-up').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  $('.single-gallery').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  $('.recent-project').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });


  $('.play-btn').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });


  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });


  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="lnr lnr-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('lnr-times lnr-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });


  $(document).ready(function () {

    $('html, body').hide();

    if (window.location.hash) {

      setTimeout(function () {

        $('html, body').scrollTop(0).show();

        $('html, body').animate({

          scrollTop: $(window.location.hash).offset().top - 100

        }, 1000)

      }, 0);

    }

    else {

      $('html, body').show();

    }

  });


  // Header scroll class
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  })

  //  Gallery 
  $(document).ready(function () {
    $('#mc_embed_signup').find('form').ajaxChimp();
  });


  function loadJSON(path, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        datos = JSON.parse(xhttp.responseText);
        if (callback) callback(datos);
      }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
  }

  function funcionsJSON() {
    loadJSON("https://britishmuseum.info/data/british.json", function (datos) {
      fotosEgipte = datos.datosExtra[0].galleryEgypt;
      fotosGrecia = datos.datosExtra[0].galleryGreece;
      carregarGalleryEgipte(fotosEgipte);
      carregarGalleryGrecia(fotosGrecia);
      createJSONLD(datos);
    });
  }
  
  function JSONextern(){
    loadJSON("https://museosdemallorca.netlify.app/museos.json", function (datos) {
      console.log(datos);
      carregarMuseusMallorca(datos);
    });
  }

  function createJSONLD(data) {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    let s = {
      "@context": "https://schema.org",
      "@type": "Museum",
      "categories": [
        {
            "name": data.categories[0].name,
            "description":data.categories[0].description,
            "image":data.categories[0].image,
            "MediaObject":{
                "@type":"VideoObject",
                "contentUrl":data.categories[0].MediaObject.contentUrl
            }
        },
        {
            "name": data.categories[1].name,
            "description": data.categories[1].name,
            "image": data.categories[1].image,
            "MediaObject":{
                "@type":"VideoObject",
                "contentUrl": data.categories[1].MediaObject.ccontentUrl
            }
        }
    ],
    }
    script.textContent += JSON.stringify(s);
    document.head.appendChild(script);
  }


  /***********************************
  * Generar galeria de les categories
  * 
  ***********************************/

  function carregarGalleryEgipte(fotosEgipte) {
    for (var i = 0; i < fotosEgipte.length; i++) {
      var div_egipte = document.getElementById("egypt" + (i + 1));
      var a_egipte = document.createElement("a");
      var img_egipte = document.createElement("img");
      var source_egipte = fotosEgipte[i];
      img_egipte.classList.add("img-fluid");
      img_egipte.src = source_egipte;
      img_egipte.setAttribute("alt", "foto_egipte");
      a_egipte.classList.add("recent-project");
      a_egipte.href = source_egipte;
      a_egipte.appendChild(img_egipte);
      div_egipte.appendChild(a_egipte);
    }

  }

  function carregarGalleryGrecia(fotosGrecia){
    for (var i = 0; i < fotosGrecia.length; i++) {
      var div_grecia = document.getElementById("greece" + (i + 1));
      var a_grecia = document.createElement("a");
      var img_grecia = document.createElement("img");
      var source_grecia = fotosGrecia[i];
      img_grecia.classList.add("img-fluid");
      img_grecia.src = source_grecia;
      img_grecia.setAttribute("alt", "foto_grecia");
      a_grecia.classList.add("recent-project");
      a_grecia.href = source_grecia;
      a_grecia.appendChild(img_grecia);
      div_grecia.appendChild(a_grecia);
    }
  }
  
    funcionsJSON();
    
    
    function carregarMuseusMallorca(datos){
      var titolMuseu1 = document.getElementById("titolMuseu1");
      var descripcioMuseu1 = document.getElementById("descripcioMuseu1");
      var fotoMuseu1 = document.getElementById("imatgeMuseu1");

      var titolMuseu2 = document.getElementById("titolMuseu2");
      var descripcioMuseu2 = document.getElementById("descripcioMuseu2");
      var fotoMuseu2 = document.getElementById("imatgeMuseu2");

      titolMuseu1.innerHTML = datos[0].name;
      descripcioMuseu1.innerHTML = datos[0].description;
      fotoMuseu1.src = "https://museosdemallorca.netlify.app/" + datos[0].image;
      
      titolMuseu2.innerHTML = datos[3].name;
      descripcioMuseu2.innerHTML = datos[3].description;
      fotoMuseu2.src = "https://museosdemallorca.netlify.app/" + datos[3].image;
    }

    JSONextern();
  
  /********************** 
      * TTS EGIPTE *
  **********************/

  var TTS_state_egipte = 1;

  function textToAudioEgipte() {
    if(TTS_state_egipte == 1){
      
    let msg = document.getElementById("wikipediaEgipte").textContent;
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    window.speechSynthesis.cancel();
    
    speech.text = msg;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    
    window.speechSynthesis.speak(speech);
    }
    else if (TTS_state_egipte == 2) window.speechSynthesis.pause();
    else if (TTS_state_egipte == 3) window.speechSynthesis.resume();
  }

  var ttsegipte = document.getElementById("TTSEgipte");
  ttsegipte.addEventListener('click', textToAudioEgipte);
  ttsegipte.onclick = function () {
    switch (TTS_state_egipte){
      case 1: TTS_state_egipte++;ttsegipte.innerHTML="Pause";break;
      case 2: TTS_state_egipte++;ttsegipte.innerHTML="Play";break;
      case 3: TTS_state_egipte--;ttsegipte.innerHTML="Pause";break;
    }
  }


  /********************** 
      * TTS GRECIA *
  **********************/

  var TTS_state_grecia = 1;

  function textToAudioGrecia() {
    if(TTS_state_grecia == 1){
      
    let msg = document.getElementById("wikipediaGrecia").textContent;
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    window.speechSynthesis.cancel();
    
    speech.text = msg;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    
    window.speechSynthesis.speak(speech);
    }
    else if (TTS_state_grecia == 2) window.speechSynthesis.pause();
    else if (TTS_state_grecia == 3) window.speechSynthesis.resume();
  }

  var ttsgrecia = document.getElementById("TTSGrecia");
  ttsgrecia.addEventListener('click', textToAudioGrecia);
  ttsgrecia.onclick = function () {
    switch (TTS_state_grecia){
      case 1: TTS_state_grecia++;ttsgrecia.innerHTML="Pause";break;
      case 2: TTS_state_grecia++;ttsgrecia.innerHTML="Play";break;
      case 3: TTS_state_grecia--;ttsgrecia.innerHTML="Pause";break;
    }
  }

  // WIKIPEDIA API
  function fetchAncientEgypt() {
    var xhr = new XMLHttpRequest();
    var paragrafEgipte = document.getElementById("wikipediaEgipte");
    var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exsentences=10&exlimit=1&titles=Ancient_Egypt&explaintext=1&formatversion=2&format=json"; //https://en.wikipedia.org/w/api.php?action=parse&page=Ancient_Egypt&prop=wikitext&formatversion=2&format=json";

    // Provide 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);

    // Once request has loaded...
    xhr.onload = function () {
      // Parse the request into JSON
      var data = JSON.parse(this.response);
      paragrafEgipte.innerHTML = data.query.pages[0].extract;
      
    }
    // Send request to the server asynchronously
    xhr.send();
    
  }

  function fetchAncientGreece() {
    var xhr = new XMLHttpRequest();
    var paragrafGrecia = document.getElementById("wikipediaGrecia");
    var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exsentences=10&exlimit=1&titles=Ancient_Greece&explaintext=1&formatversion=2&format=json"; //https://en.wikipedia.org/w/api.php?action=parse&page=Ancient_Egypt&prop=wikitext&formatversion=2&format=json";

    // Provide 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);

    // Once request has loaded...
    xhr.onload = function () {
      // Parse the request into JSON
      var data = JSON.parse(this.response);
      paragrafGrecia.innerHTML = data.query.pages[0].extract;
    }
    // Send request to the server asynchronously
    xhr.send();
  }

  fetchAncientEgypt();
  fetchAncientGreece();

  // video egipte

  var videoEgypt = document.createElement("video");
  videoEgypt.setAttribute("class", "videoNostre");

  if (videoEgypt.canPlayType("video/mp4")) {
    videoEgypt.src = "http://britishmuseum.info/videos/egypt.mp4";
  }
  if (videoEgypt.canPlayType("video/webm")) {
    videoEgypt.src = "http://britishmuseum.info/videos/egypt.webm";
  }

  videoEgypt.autoplay = true;
  videoEgypt.muted = true;
  videoEgypt.loop = true;

  var divVideoEgypt = document.getElementById("videoEgipte");
  divVideoEgypt.appendChild(videoEgypt);


  // video grecia
  var videoGreece = document.createElement("video");
  videoGreece.setAttribute("class", "videoNostre");

  if (videoGreece.canPlayType("video/mp4")) {
    videoGreece.src = "http://britishmuseum.info/videos/videoGreece.mp4";
  }
  if (videoEgypt.canPlayType("video/webm")) {
    videoGreece.src = "http://britishmuseum.info/videos/videoGreece.webm";
  }

  videoGreece.autoplay = true;
  videoGreece.muted = true;
  videoGreece.loop = true;

  var divVideoGreece = document.getElementById("videoGrecia");
  divVideoGreece.appendChild(videoGreece);


});


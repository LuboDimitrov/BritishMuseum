
$(document).ready(function () {
  "use strict";

  var window_width = $(window).width(),
    window_height = window.innerHeight,
    header_height = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen = window_height - header_height;

  var datos; //raw json
  var my_events;
  var latitude;
  var longitude;
  var picturesGallery;

  /* LOCAL STORAGE */

  // $("#login-nav").submit(function () {
  //   var enteredEmail = $("#userEmail").val();
  //   var enteredPass = $("#userPassword").val();

  //   localStorage.setItem("n1", enteredEmail);
  //   localStorage.setItem("p1", enteredPass);

  //   document.getElementById("loginMenu").remove();

  //   var nounom = document.getElementById("loginName");
  //   nounom.text = enteredEmail;

  // });

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


  $('.active-about-carusel').owlCarousel({
    items: 1,
    loop: true,
    margin: 30,
    dots: true
  });

  $('.active-exibition-carusel').owlCarousel({
    items: 3,
    margin: 30,
    autoplay: true,
    loop: true,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1,
      },
      768: {
        items: 2,
      },
      900: {
        items: 3,
      }

    }
  });






  //  Start Google map 

  // When the window has finished loading create our google map below

  if (document.getElementById("map")) {

    google.maps.event.addDomListener(window, 'load', init);

    function init() {
      // Basic options for a simple Google Map
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
      var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 13,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(51.5195, -0.1269),

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
          { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#62A9DD" }, { "lightness": 39 }] },
          { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] },
          { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#F1C900" }, { "lightness": 17 }] },
          { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] },
          { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#EBF3DC" }, { "lightness": 18 }] },
          { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] },
          { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] },
          { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#65B85E" }, { "lightness": 30 }] },
          { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] },
          { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] },
          { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
          { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] },
          { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] },
          { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
      };

      // Get the HTML DOM element that will contain your map 
      // We are using a div with id="map" seen below in the <body>
      var mapElement = document.getElementById('map');

      // Create the Google Map using our element and options defined above
      var map = new google.maps.Map(mapElement, mapOptions);

      // Let's also add a marker while we're at it
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(51.5195, -0.1269),
        map: map,
        title: 'Snazzy!'
      });
    }
  }


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
      //console.log(datos);
      my_events = datos.events;
      picturesGallery = datos.gallery;
      carregarEvents(my_events);
      createJSONLD(datos);
      //carregarGallery(picturesGallery);
    });
  }

  function carregarEvents(my_events) {
    for (var i = 0; i < my_events.length; i++) {
      var image_ = my_events[i].image;
      var event_name = my_events[i].name;
      var event_description = my_events[i].description;
      var start_date = my_events[i].startDate;
      var end_date = my_events[i].endDate;
      var tag_1 = my_events[i].keywords[0];
      var tag_2 = my_events[i].keywords[1];

      var my_div = document.getElementById("event" + i);
      var imatge = document.createElement("img");
      var list = document.createElement("ul"); list.classList.add("tags");
      var tag1 = document.createElement("li");
      var tag2 = document.createElement("li");
      var titol = document.createElement("h4");
      var descripcio = document.createElement("p");
      var dataInici = document.createElement("h6"); dataInici.classList.add("date");
      var dataFi = document.createElement("h6"); dataFi.classList.add("date");

      titol.innerText = event_name;
      tag1.innerText = tag_1;
      tag2.innerText = tag_2;
      imatge.src = image_;
      descripcio.innerHTML = event_description;
      dataInici.innerHTML = start_date;
      dataFi.innerHTML = end_date;

      my_div.appendChild(imatge);
      list.appendChild(tag1);
      list.appendChild(tag2);
      my_div.appendChild(list);
      my_div.appendChild(titol);
      my_div.appendChild(descripcio);
      my_div.appendChild(dataInici);
      my_div.appendChild(dataFi);
    }
  }

  function createJSONLD(data) {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    let s = {
      "@context": "https://schema.org",
      "@type": "Museum",
      "name": data.british.name,
      "photo": data.british.photo,
      "description": data.british.description,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": data.british.address.addressCountry,
        "addressLocality": data.british.address.addressLocality,
        "addressRegion": data.british.address.addressRegion,
        "postalCode": data.british.address.postalCode,
        "streetAddress": data.british.address.streetAddress
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": data.british.geo.latitude,
        "longitude": data.british.geo.longitude
      },
      "openingHours": data.british.openingHours
    }
    script.textContent += JSON.stringify(s);
    document.head.appendChild(script);
  }

  funcionsJSON();

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
  }


  //  Gallery 


  var parameters = {
    gridContainer: '#grid-container',
    gridItems: '.grid-item',
    gutter: 15,
    enableImagesLoaded: true
  };
  var grid = new justifiedGrid(parameters);
  $('body').imagesLoaded(function () {
    grid.initGrid();
  });





  function weatherAPI() {
    loadJSON("https://britishmuseum.info/data/british.json", function (datos) {
      latitude = datos.british.geo.latitude;
      longitude = datos.british.geo.longitude;

      var endpoint = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&lang=en&units=metric&appid=2b2b3127d7ec6a4e00db491c290ea173";
      console.log(endpoint);

      fetch(endpoint)
        .then(function (response) {
          if (response.status != 200) {
            console.log("Fetch problem. Code:" + response.status);
            return;
          }
          response.json().then(function (data) {
            var our_date = new Date(data.dt * 1000);
            var hours = our_date.getHours();
            var minutes = "0" + our_date.getMinutes();
            var formattedTime = hours + ':' + minutes.substr(-2);
            $("#weekDay").append("Last check: " + formattedTime);
            var integer_temp_current = Math.floor(data.main.temp);
            $("#currentTemp").append(integer_temp_current + " ºC");
            $("#imgWeather").attr("src", "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/" + data.weather[0].icon + ".png");
            $("#cityName").append(data.name);
            $("#extDescription").append(data.weather[0].description);
            var integer_temp_feel = Math.floor(data.main.feels_like);
            $("#feeling").append(integer_temp_feel + " ºC");
            $("#wind").append(data.wind.speed + " m/s");
            $("#humidity").append(data.main.humidity + " %");
            $("#pressure").append(data.main.pressure + " hPa");
          });
        })

    });
  }

  /* WEATHER API*/
  weatherAPI();


  /* TWEETS */

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      //console.log(this.responseText);
      var tweets = JSON.parse(this.responseText);
      for (var i = 0; i < 3; i++) {
        twttr.widgets.createTweet(tweets.data[i].id, document.getElementById("TweetsSection"), { theme: 'white' });
      }
    }
  });

  xhr.open("GET", "https://api.twitter.com/2/users/19066345/tweets?max_results=5");
  xhr.setRequestHeader("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAACCobAEAAAAAS32wY0JoLoadMBo9IBB69Fw9I9U%3DPWzgN0TTwgxvdsYqwzTOzbPsLWe17sZuayLJP4Z4FWFNGk1gWJ\n");
  xhr.send(); 

});


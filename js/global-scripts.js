  // check for resize events + setTimeout to economize use ------------
function resizeId(){

  $(window).on('resize', function(e) {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 350);
  });

}

// check screen width
function doneResizing(){

  if (window.innerWidth < '992'){

    $('.global-header-container').removeClass('navbar-fixed');

  } else {



    if (!$('.global-header-container').hasClass("navbar-fixed")) {
      $('.global-header-container').addClass('navbar-fixed');
    }

    checkDropdown();

  };

}

function checkDropdown(){

  if ($(window).innerWidth() < $('ul.site-nav-content > li.dropdown:last > ul').offset().left + 495){

    var windowWidth = $(window).innerWidth();

    $('ul.site-nav-content > li.dropdown > ul').each(function(){

      $(this).removeAttr('style');//Remove inline style if the script ran. Start fresh each time.

      var navDropdown = $(this).offset().left + 495;
      var sum = windowWidth - navDropdown; //Gets how much of the dropdown is off the screen.

      if (navDropdown > windowWidth){
        $(this).css('left', sum);
      }

      if (sum < -184){
        $(this).removeAttr('style'); //Remove inline-style to readjust to opening to the left instead of the right.
        $(this).parent('.dropdown').addClass('noflex-dropdown');
      }

    });
  }

}

function clearForm() 
{
    $(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    $(':checkbox, :radio').prop('checked', false);
}

function onOpenMobile()
{
  $('.top-menu-container, .bottom-menu-container').addClass('on-open-mobile-position');

    /*  var date = new Date();
      this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
      */

}

function onCloseMobile()
{
  $('.top-menu-container, .bottom-menu-container').removeClass('on-open-mobile-position');
}


$(document).ready(function() {


if($('.calendar-start').length) {

 $('.calendar-start').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    onOpen: onOpenMobile,
    onClose: onCloseMobile,
    closeOnSelect: true // Close upon selecting a date,
  })

}

if($('.calendar-start').length) {

 $('.calendar-end').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    onOpen: onOpenMobile,
    onClose: onCloseMobile,
    closeOnSelect: true // Close upon selecting a date,
  });

}

  $('.calendar-title-container').next().hide().prev().on('click', function () {
    $(this).next().slideToggle();
    $(this).toggleClass('active');

    //For ADA Compliance
    var expanded = $(this).next().attr('aria-expanded')

    if(expanded == 'true') {
      expanded = 'false'
    } else {
      expanded  = 'true'
    };

    $(this).next().attr('aria-expanded', expanded);

  });

  $('.mobile-fixed button').on('click', function (e) {
    $('.mobile-filters').addClass('active');
    e.preventDefault();
  });

  $('#mobile-close, #see-results').on('click', function (e){

    var inputChecked = $('.mobile-filters input:checked').length;
    var inputText = $('.mobile-filters input[type="text"]').filter(function(){
                      return $(this).val();
                    }).length;

    var inputCombined = inputChecked + inputText;

    if(inputCombined < 1) {
      $('.filter-applied').hide();
    } else {
      $('.filter-applied').show();
      $('.filter-applied').text(inputCombined);
    }

    $('.mobile-filters').removeClass('active');

    e.preventDefault();
  })

  $('#reset-filters').on('click', function (e){
    clearForm();
    e.preventDefault();
  })


  

  // capture click on search icon - check width again in case of screen size change
  $('#global-icon-search a').on('click',function(e){

    $('#main-container').removeClass('profile-sub-active');

    $('#main-container').toggleClass('search-sub-active');

    // handle focus of search input
    if ($('#main-container').hasClass('search-sub-active')) {
      // set timeout doesn't seem to be working on mobile !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      setTimeout(function(){searchFocus()},600);
    } else {
      $('#search-query, #search-query-mobile').blur();
    };

    e.preventDefault();
  });


  $('body').on('click', '.dropdown > a, .sub-dropdown-container > li > a', function(e) { 

    e.preventDefault();
    $(this).next().slideToggle();

  });

    var mobileMenu = $('#mobile-menu').unbind();

    mobileMenu.on('click', function(e) {
      e.preventDefault();

      $(this).next().slideToggle();
      $(this).toggleClass('open');
    });


  function searchFocus(){
    $('#search-query, #search-query-mobile').focus()
  }

  // search functionality
  $("#search-query, #search-query-mobile").keypress(function(e){
    if(e.which == 13 && e.target.value != ""){
      window.location = 'http://www.miamidade.gov/search/home.asp#gsc.tab=0&gsc.q=' + escape(e.target.value);
    }
  });

  $("#search-button").on('click', function(e){
    var value = $("#search-query, #search-query-mobile").val();
    if(value)
      window.location = 'http://www.miamidade.gov/search/home.asp#gsc.tab=0&gsc.q=' + escape(value);
  });

  // Initialization of mobile menu
  $(".button-collapse").sideNav();

  //for dropdown
  //$('select').material_select('destroy');


  // mobile search
  $('input#search-query-mobile').focus(function() { $(this).parent().addClass('focused'); });
  $('input#search-query-mobile').blur(function() {
    if (!$(this).val()) {
      $(this).parent().removeClass('focused');
    }
  });

  // check width and order global nav ------------
  doneResizing();
  // listen for resize event then fire doneResizing() ------------
  resizeId();

  //initialization of modals
  $('.modal-trigger').leanModal();

  $('.toggle-filter').on('click',function(e){

    $('.service-results-section').toggleClass('pull-search-results');
    $('.search-filters').toggleClass('pull-filters');

    e.preventDefault();
  });

});
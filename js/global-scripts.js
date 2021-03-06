  // check for resize events + setTimeout to economize use ------------
function resizeId(){

  $(window).on('resize', function(e) {
    clearTimeout(resizeId);
    resizeId = setTimeout(function(){
      doneResizing()
      adaMobileShowHide()
    }, 350);
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

function adaMobileShowHide() {

  //For ADA Compliance
  if (window.innerWidth < '992'){

    $('.mobile-global-nav').attr('aria-hidden', false);

  } else {
    $('.mobile-global-nav').attr('aria-hidden', true);

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

  $('#startDate').datepicker({
    next: '#endDate'
  });

  $('#endDate').datepicker({
    previous: '#startDate'
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


    //mobile jquery ------------

    var mobileMenu = $('#mobile-menu').unbind();

    mobileMenu.on('click', function(e) {
      e.preventDefault();

      $('.mobile-global-nav').addClass('active');

    });

    $('#mobile-global-close').on ('click', function(e){
      e.preventDefault();
      $('.mobile-global-nav').removeClass('active');
    });


    //mobile tabs ------------
    $('ul.mobile-top-menu__tabs li').on('click', function(e){
      e.preventDefault;

        var tab_id = $(this).attr('data-tab');

        $('ul.mobile-top-menu__tabs li').removeClass('mobile-top-menu__tab--active');
        $('.mobile-content-tab').removeClass('mobile-content-tab--active');

        $(this).addClass('mobile-top-menu__tab--active');
        $("#"+tab_id).addClass('mobile-content-tab--active');
    });

  //Uncomment below to include the sub dropdown on mobile ------------
  //$('body').on('click', '.section-nav--mobile .dropdown > a, .section-nav--mobile .sub-dropdown-container > li > a', function(e) { 
  $('body').on('click', '.section-nav--mobile .dropdown > a', function(e) { 
    e.preventDefault();
    $(this).next().slideToggle();

    $(this).parent().toggleClass('active');

  });


  //open search form
  $('.cd-search-trigger').on('click', function(event){
    event.preventDefault();
    toggleSearch();
  });

  $('.cd-overlay').on('click', function(){
    toggleSearch('close');
    $('.cd-overlay').removeClass('is-visible');
  });

  function toggleSearch(type) {
    if(type=="close") {
      //close serach 
      $('.cd-search').removeClass('is-visible');
      $('.cd-search-trigger').removeClass('search-is-visible');
      $('.cd-overlay').removeClass('search-is-visible');
    } else {
      //toggle search visibility
      $('.cd-search').toggleClass('is-visible');
      $('.cd-search-trigger').toggleClass('search-is-visible');
      $('.cd-overlay').toggleClass('search-is-visible');
      //$('.cd-search').find('input[type="search"]').focus();
      ($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible') : $('.cd-overlay').removeClass('is-visible');
    }
  }



});
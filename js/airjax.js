$(document).ready(function(){

  var ajaxURL = 'airjax.php';



  // MOUSE EVENTS
  //Responsible for handling click Events

  $('[adClick]').click(function(){
    dt = airThod($(this).attr('adClick'));
    // console.log(dt);
    request(ajaxURL, dt);
  });


  // $('[adDoubleClick]').doubleClick(function(){
  //   $dt = airThod($(this).attr('adDoubleClick'));
  //   request(ajaxURL, dt);
  // });



  $('[adHover]').hover(function(){
    $dt = airThod($(this).attr('adHover'));
    request(ajaxURL, dt);
  });


  // INPUT EVENTS
  $('[adBlur]').blur(function(){
    $dt = airThod($(this).attr('adBlur'));
    request(ajaxURL, dt);
  });


  //on submit for forms
  $('body').on('submit','form[adSubmit]',function(event){
    // stop post to refresh page
    event.preventDefault();
    var data = $(this).serialize();
    dt = airThod($(this).attr('adSubmit'));
    // console.log(dt);
    request(ajaxURL,dt);
  });



  // This function takes the attrubute value and convert them
  // to method and parameters fo the php file
  function airThod(airValue){
    //slipt string into mehtod and parameters
    split = airValue.split('(');

    method = split[0];
    params = split[1].trim().replace(')',''); //trim the side ) off
    // console.log(params.length);
    if(params.length != 0 ){

      params = params.split(','); //make it object for multiple parameters for the method

      count = params.length;

      // console.log(count);
      for(i=0; i < count; i++){
        // console.log(params[i]);
        if(params[i][0]=='$'){
          // console.log('yes');
          params[i] = $('#'+params[i].trim().replace('$','')).val();
        }
      }
      return {'method':method,'params':params};
    }

    // var airthod =
    // console.log(airthod);
    return {'method':method};

  }

  function request($url, $params, $type = 'POST'){
    // console.log($params);
    var request = $.ajax({
      url:$url,
      dataType:'html',
      type:$type,
      data:$params
    });

    request.done(function(data){
      console.log(data);
    });


  }

//Responsible for loading modals

$('[adModal]').click(function(){

  $('ad-modal').after('<div class="ad-overlay ad-close-modal"></div>').addClass('ad-show');
  $('ad-modal').load($(this).attr('adModal'));

});



// paging

$('body').on('click','[routerLink]',function(){
  // get <ad-router>
  var currentPage;
  var nextPage;
  var currentPageRouter = window.location.href;
  var nextPageRouter = $(this).attr('routerLink');
  var animate = $('router-outlet').attr('animate');

  console.log(currentPageRouter);
  if(currentPageRouter == nextPageRouter){
    animate = false;
  }

  //play loading animation

  //getNextPage//
    // if page not found, display error
    // routerOutlet.load(nextPageRouter);
    if(animate){
      $('router-outlet').before('<ad-loading/>');
    }

    $.ajax({
      url:nextPageRouter,
      type:'GET'
    }).done(function(html){
      // console.log(currentPage);
        loadPage(html, animate);
        history.pushState(null,null,nextPageRouter); //Set Browser History to the url
    })

    // routerOutlet.html(nextPage);
    // if(nextPage){
    //   console.log(routerOutlet,nextPage);
    // }else{
    //   console.log('empty');
    // }

  //stop loading animation

  //play currentPage off animation to disappear,

  //remove currentPage from DOM, <ad-router>

  //replace the html of <ad-router> with nextPage

  //play incoming animation for the nextPage to show the page,

  // compare current url to the router url.

  // console.log(nextPageRouter);

});

function loadPage(page,aimate){
  var routerOutlet = $('router-outlet');

  if(aimate){

    routerOutlet.addClass('ad-disappear');

    setTimeout(function(){
      routerOutlet.html(page);
    }, 1000);

    setTimeout(function(){
      routerOutlet.removeClass('ad-disappear');
      $('ad-loading').fadeOut();
      $('ad-loading').remove();
    }, 1500);

  }else{
    routerOutlet.html(page);
  }


  // routerOutlet.slideUp();

  // routerOutlet.setTimeOut(function(){routerOutlet.removeClass('ad-disappear')}, 6000);
  // routerOutlet.removeClass('ad-disappear');
}


});




// air-design
// -----------------------------
// [adModal] will be used to load component or url into <ad-modal></ad-modal>
// <ad-dropdow> will take the [adDropDown] click to load url or component into the
// dropdown content which will be created upon laod.


// <ad-router>

// <ad-header>
// <ad-nav>
// <ad-footer>

// <ad-accordian>
// <ad-tab>
// <ad-head>
// <ad-content>

// <ad-section>
// <ad-card>

// <ad-avatar>
// <ad-thumbnail>

// <ad-list>
// <ad-item>
// <ad-input>




  // JAVASCRIPT EVETS
// ----------------------------
// [adClick]
// [adBlur]
// [adMouseEnter]
// [adMouseLeave]
// [adMouseOn]
// [adMouseHover]



// will be used for events handling in conjunction with the function assigned to it.
// eg adClick='playMusic(id)';
// will get the $component->playMusic($id)
// for frontEnd manipulations, simply use the jquery selector to play the music.

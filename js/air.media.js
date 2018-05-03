$(document).ready(function () {

    var wrapper = $('body');
    // first scan DOM for .ad-slider or .ad-slide-group


    // windowsResize
    $(window).resize(function () {
        // make responsive slider take new height
        $('.ad-slide-group[responsive]').each(function () {
            // console.log('responsive slide found');
            let height = $(this).find('.ad-slide:first').height();
            $(this).css('height', height);
        });

        $('.ad-carousel').each(function () {
            resizeCarousel($(this));
        });

    });

    // Auto Play if set to true

    class AutoSlide {
        // google = 'ama';

        start(duration, slideId, effect, slidesLength) {
            let timmer = setInterval(function () {
                //check to see if the slider exists in the current page
                // For the sack of ajax calls

                if ($('#' + slideId).length == 0) {
                    console.log('interval cleared. no slider found');
                    clearInterval(timmer);
                } else {



                    // check if its paused

                    if (!$('#' + slideId)[0].hasAttribute('pause')) {

                        let currentSlide = $('#' + slideId).attr('currentslide');
                        // console.log('With current slide of', currentSlide, slidesLength);
                        // console.log('update Slide');
                        for (let i = 0; i < slidesLength; i++) {
                            if (i == currentSlide) {
                                // console.log('found a match');
                                $('#' + slideId).find('.ad-slide')[i].classList.add('exit');
                                // wait to remove it
                                setTimeout(function () {
                                    $('#' + slideId).find('.ad-slide')[i].classList.remove('active');
                                    $('#' + slideId).find('.ad-slide')[i].classList.remove('exit');
                                }, 1050)

                                $('#' + slideId).find('.ad-slide-bullet span')[i].classList.remove('active');

                                // console.log('current found');

                                if (effect == "slideLeft" || effect == "slideRight") {
                                    setTimeout(function () {

                                        if ($('#' + slideId).attr('currentslide') == (slidesLength - 1)) {
                                            // console.log('on the last slide');
                                            $('#' + slideId).find('.ad-slide')[0].classList.add('active');
                                            $('#' + slideId).find('.ad-slide-bullet span')[0].classList.add('active');
                                            $('#' + slideId).attr('currentslide', 0);
                                        } else {
                                            // console.log('any slide');
                                            $('#' + slideId).attr('currentslide', i + 1);
                                            $('#' + slideId).find('.ad-slide')[i + 1].classList.add('active');
                                            $('#' + slideId).find('.ad-slide-bullet span')[i + 1].classList.add('active');
                                        }

                                        // console.log('current slide attr is:', $('#' + slideId).attr('currentslide'));
                                    }, 100);

                                } else {

                                    // setTimeout(function () {

                                    if ($('#' + slideId).attr('currentslide') == (slidesLength - 1)) {
                                        // console.log('on the last slide');
                                        $('#' + slideId).find('.ad-slide')[0].classList.add('active');
                                        $('#' + slideId).find('.ad-slide-bullet span')[0].classList.add('active');
                                        $('#' + slideId).attr('currentslide', 0);
                                    } else {
                                        // console.log('any slide');
                                        $('#' + slideId).attr('currentslide', i + 1);
                                        $('#' + slideId).find('.ad-slide')[i + 1].classList.add('active');
                                        $('#' + slideId).find('.ad-slide-bullet span')[i + 1].classList.add('active');
                                    }

                                    // console.log('current slide attr is:', $('#' + slideId).attr('currentslide'));
                                    // }, 300)
                                }


                                // console.log('end loop');
                                // end the loop
                                return true;
                            }
                        }

                    } else {
                        // console.log('slider on pause');
                    }
                }

            }, duration);
        }
        slide(slideId, effect, slidesLength) {

            // autoplay = new AutoPlay;
            // console.log('autoplay meDat method called',autoplay.meDat());

            // console.log('function autopplay called', $('#' + slideId).attr('currentslide'));

            let currentSlide = $('#' + slideId).attr('currentslide');
            // console.log('update Slide');
            for (let i = 0; i < slidesLength; i++) {
                if (i == currentSlide) {
                    console.log($('#' + slideId).find('.ad-slide'));
                    $('#' + slideId).find('.ad-slide')[i].classList.add('exit');
                    // wait to remove it
                    setTimeout(function () {
                        $('#' + slideId).find('.ad-slide')[i].classList.remove('active');
                        $('#' + slideId).find('.ad-slide')[i].classList.remove('exit');
                    }, 1050)

                    $('#' + slideId).find('.ad-slide-bullet span')[i].classList.remove('active');

                    // console.log('current found');
                    // setTimeout(function () {

                    if ($this.attr('currentslide') == (slidesLength - 1)) {
                        $('#' + slideId).find('.ad-slide')[0].addClass('active');
                        $('#' + slideId).find('.ad-slide-bullet span')[0].classList.add('active');
                        $('#' + slideId).attr('currentslide', 0);
                    } else {
                        $('#' + slideId).attr('currentslide', i + 1);
                        $('#' + slideId).find('.ad-slide')[i + 1].classList.add('active');
                        $('#' + slideId).find('.ad-slide-bullet span')[i + 1].classList.add('active');
                    }

                    console.log('current slide attr is:', $('#' + slideId).attr('currentslide'));
                    // }, 300)


                    // console.log('end loop');
                    // end the loop
                    return true;
                }
            }

        }
    }










    // MEDIA PLAYER CLASS


    class mediaPlayerUpdate {

        // Function to Update the video timmer and the seekbar
        updateVideoTimer(vid, timer, seekbar, divSeekbar) {


            vid.onloadedmetadata = function () {
                seekbar.max = vid.duration;
                // console.log('video duration',vid.duration);
                // timer.find('span.duration').html(((vid.duration * 0.0036)).toFixed(2).toString().replace('.', ':'));

                var minutes = parseInt(vid.duration / 60, 10);
                var seconds = ("0" + parseInt(vid.duration % 60)).slice(-2);
                timer.find('span.duration').html(minutes + ':' + seconds);
                // console.log('show minutes and secs', minutes, seconds);
                // (Put the minutes and seconds in the display)

                // clearInterval(i);

                // console.log('duratoin is', videoPlayer[0].duration, seekbar.max);
            };


            vid.ontimeupdate = function () {
                // Display the current position of the video in a <p> element with id="demo"
                seekbar.value = vid.currentTime;
                divSeekbar.css('width', (vid.currentTime / vid.duration) * 100 + '%');
                // console.log('vid.currentTime', (vid.currentTime / vid.duration) * 100);
                var currentMin = parseInt(vid.currentTime / 60, 10);
                var currentSec = ("0" + parseInt(vid.currentTime % 60)).slice(-2);
                timer.find('span.currentTime').html(currentMin + ':' + currentSec);

                // timer.find('span.currentTime').html(((vid.currentTime * 0.0036)).toFixed(2).toString().replace('.', ':'));
                if (vid.currentTime >= vid.duration) {
                    // console.log('done');
                    let parent = timer.parents('.ad-video');
                    let playBtnb = parent.find('button.play');
                    playBtnb.find('i.fa').attr('class', '').addClass('fa fa-play');
                    parent.attr('isplaying', 'false');
                }

            }
        }

        // Function to Update the audio timmer and the seekbar
        updateAudioTimer(audio, timer, seekbar, divSeekbar) {


            audio.onloadedmetadata = function () {
                seekbar.max = audio.duration;
                // console.log('duration', audio.duration);
                // for the sake of firefox browser
                // seekbar.attr('max', audio.duration);

                // see time
                // console.log('audio durationssssss',audio.duration);

                // timer.find('span.duration').html(((audio.duration * 0.0036)).toFixed(2).toString().replace('.', ':'));

                var minutes = parseInt(audio.duration / 60, 10);
                var seconds = ("0" + parseInt(audio.duration % 60)).slice(-2);
                timer.find('span.duration').html(minutes + ':' + seconds);
                // console.log('show minutes and secs', minutes, seconds);
                // (Put the minutes and seconds in the display)

                // clearInterval(i);

                // console.log('duratoin is', videoPlayer[0].duration, seekbar.max);
            };


            audio.ontimeupdate = function () {
                // Display the current position of the video in a <p> element with id="demo"
                seekbar.value = audio.currentTime;
                divSeekbar.css('width', (audio.currentTime / audio.duration) * 100 + '%');
                // console.log('audio.currentTime', (audio.currentTime / audio.duration) * 100);
                var currentMin = parseInt(audio.currentTime / 60, 10);
                var currentSec = ("0" + parseInt(audio.currentTime % 60)).slice(-2);
                timer.find('span.currentTime').html(currentMin + ':' + currentSec);

                // timer.find('span.currentTime').html(((vid.currentTime * 0.0036)).toFixed(2).toString().replace('.', ':'));
                if (audio.currentTime >= audio.duration) {
                    // console.log('done');
                    let parent = timer.parents('.ad-audio');
                    let playBtnb = parent.find('button.play');
                    playBtnb.find('i.fa').attr('class', '').addClass('fa fa-play');
                    parent.attr('isplaying', 'false');
                }

            }
        }

    }






    // console.log($('.ad-slide-group').not('[ad_constructed]'));
    function scanDOM4media() {

        // scan for ad-slide-group
        if (wrapper.find('.ad-slide-group').not('[ad_constructed]').length !== 0) {
            // console.log('slider found', $('.ad-slide-group').not('[ad_constructed]').length);
            constructSlider();
        }

        if (wrapper.find('.ad-carousel').not('[ad_constructed]').length !== 0) {
            // console.log('carousel foound', $('.ad-carousel').not('[ad_constructed]').length);
            constructCarousel();
        }

        if (wrapper.find('.ad-video').not('[ad_constructed]').length !== 0) {
            // console.log('video foound', $('.ad-video').not('[ad_constructed]').length);
            constructVideo();
        }

        if (wrapper.find('.ad-audio').not('[ad_constructed]').length !== 0) {
            // console.log('audio foound', $('.ad-audio').not('[ad_constructed]').length);
            constructAudio();
        }


    }

    scanDOM4media();

    // Scan DOM Every 1s for unconstructed videos
    setInterval(function () {
        // console.log('scannning for media');
        scanDOM4media();

    }, 3000);



    // Make Construct

    function constructSlider() {
        $('.ad-slide-group').not('[ad_constructed]').each(function (id) {
            $this = $(this);

            // fix height if responsive

            if ($this[0].hasAttribute('responsive')) {
                // console.log('responsive');
                let height = $this.find('.ad-slide:first').height();

                // console.log('height is',height);
                $this.css('height', height);
            }
            // setIds  for them
            slideId = "slide_" + id + Math.floor(Math.random() * (100 - 10) + 10);
            console.log('slide id of:', slideId);
            $this.attr('id', slideId);

            // Set Effect
            effect = $this[0].hasAttribute('effect') ? $this.attr('effect') : 'fade';

            //Set autoplay or manual
            autoplay = $this[0].hasAttribute('manual') ? false : true;

            // Set Duration
            if ($this[0].hasAttribute('duration')) {
                duration = $this.attr('duration') * 1000;
            } else {
                duration = 5000;
            }


            // Set Effect


            // Create Bullets
            if ($this[0].hasAttribute('showBullets')) {
                showBullets = $this.attr('showBullets') == 'false' ? false : true;
            } else {
                showBullets = true;
            }


            // bullet building/construct needs the slidesLength for indexing
            var slides = $this.find('.ad-slide');
            var slidesLength = slides.length;

            if (showBullets && $this.find('.ad-slide-bullet').length == 0) {
                // console.log('construct bullet');
                openBullet = '<div class="ad-slide-bullet">';
                closeBullet = '</div>';
                bullets = '';
                // console.log(slidesLength);
                for (let i = 0; i < slidesLength; i++) {
                    bullets = bullets + '<span index="' + i + '"></span>';
                    // console.log('yo');
                }
                // console.log(bullets);
                $this.append(openBullet + bullets + closeBullet);
            }


            // Create Nav
            if ($this[0].hasAttribute('showNav')) {

                showNav = $this.attr('showNav') == 'false' ? false : true;
            } else {
                showNav = true;
            }

            if (showNav && $this.find('.ad-slide-previous').length == 0) {

                prevNav = '<div  class="ad-slide-previous "><button class="ad-btn ad-md ad-flat ad-round ad-icon no-margin"><i class="fa fa-angle-left "></i></button></div>';
                nextNav = '<div  class="ad-slide-next "><button class="ad-btn ad-md ad-flat ad-round ad-icon no-margin" style="margin-left:-8px;"><i class="fa fa-angle-right "></i></button></div>';
                $this.append(prevNav + nextNav);

            }



            var slideBullets = $this.find('.ad-slide-bullet span');

            var slide1 = $this.find('.ad-slide:first');

            // clear any active class predefined by user
            slides.removeClass('active');
            slideBullets.removeClass('active');

            slide1.addClass('active');
            slideBullets[0].classList.add('active');
            currentSlide = 0;
            $this.attr('currentslide', 0);

            //Check for spinner
            let spinner = $this.find('.ad-spinner');

            let spinnerDuration = duration < 5000 ? 1300 : duration / 2;
            // remove loader in 3ms
            if (spinner.length !== 0) {
                console.log('spinner found', spinner);
                setTimeout(function () {
                    console.log('fade spinner');
                    spinner.fadeOut('slow');
                }, spinnerDuration);
            }

            // Check  for is-loading class
            if ($this.hasClass('is-loading')) {
                console.log('is-loading found', spinner);
                setTimeout(function () {
                    $this.removeClass('is-loading');
                }, spinnerDuration);
            }


            if (autoplay) {
                autoSlide = new AutoSlide;
                autoSlide.start(duration, slideId, effect, slidesLength);
            }

            // Mark element as constructed',true);
            $this.attr('ad_constructed', true);
        });
    }


    // then Listen for Event

    // When bullet is clicked
    wrapper.on('click', '.ad-slide-bullet span', function (e) {
        var parent = $(this).parents('.ad-slide-group');
        var slideIndex = $(this).attr('index');
        // console.log('index is', slideIndex);
        var slides = parent.find('.ad-slide');
        // console.log(parent);
        currentSlide = parent.attr('currentslide');

        // play exit animation
        slides[currentSlide].classList.add('exit');
        // wait to remove them
        setTimeout(function () {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].classList.remove('exit');
        }, 1050)


        slides[slideIndex].classList.add('active');
        parent.find('.ad-slide-bullet span').removeClass('active');
        $(this).addClass('active');

        parent.attr('currentslide', slideIndex);
    });




    // When previous BTN is clicked
    wrapper.on('click', '.ad-slide-previous', function (e) {
        var parent = $(this).parents('.ad-slide-group');
        currentSlide = parent.attr('currentslide');
        var slides = parent.find('.ad-slide');

        // play the exit animation
        slides[currentSlide].classList.add('exit');
        // wait to remove it
        setTimeout(function () {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].classList.remove('exit');
        }, 1050)


        var slideBullets = parent.find('.ad-slide-bullet span');
        slideBullets.removeClass('active');

        if (currentSlide == 0) {
            slides[slides.length - 1].classList.add('active');
            slideBullets[slides.length - 1].classList.add('active');

            parent.attr('currentslide', slides.length - 1);

        } else {

            slides[currentSlide - 1].classList.add('active');
            slideBullets[currentSlide - 1].classList.add('active');
            parent.attr('currentslide', currentSlide - 1);
        }



        // Set and Remove pause attr
        if (!parent[0].hasAttribute('pause')) {
            parent.attr('pause', true);

            // Set Duration
            if (parent[0].hasAttribute('duration')) {
                duration = parent.attr('duration') * 1000;
            } else {
                duration = 5000;
            }

            // console.log('pause added');
            setTimeout(function () {
                parent.removeAttr('pause');
                // console.log('pause removed');
            }, duration)
        }
    });


    // When next BTN is clicked
    wrapper.on('click', '.ad-slide-next', function (e) {
        var parent = $(this).parents('.ad-slide-group');
        currentSlide = parent.attr('currentslide');
        var slides = parent.find('.ad-slide');
        // play exit animation
        slides[currentSlide].classList.add('exit');
        // wait to remove them
        setTimeout(function () {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].classList.remove('exit');
        }, 1050)


        var slideBullets = parent.find('.ad-slide-bullet span');
        slideBullets.removeClass('active');

        // console.log('last is', slides.length - 1);
        if (currentSlide == (slides.length - 1)) {
            slides[0].classList.add('active');
            slideBullets[0].classList.add('active');

            parent.attr('currentslide', 0);

        } else {
            let $next = (1 * currentSlide) + 1;
            slides[$next].classList.add('active');
            slideBullets[$next].classList.add('active');
            parent.attr('currentslide', $next);
        }


        // Set and Remove pause attr
        if (!parent[0].hasAttribute('pause')) {
            parent.attr('pause', true);

            // Set Duration
            if (parent[0].hasAttribute('duration')) {
                duration = parent.attr('duration') * 1000;
            } else {
                duration = 5000;
            }

            // console.log('pause added');
            setTimeout(function () {
                parent.removeAttr('pause');
                // console.log('pause removed');
            }, duration)
        }

    });





    function constructCarousel() {
        openConstruct = ' <div class="carousel-container"><div class="carousel-overflow">';
        closeConstruct = '</div></div>';

        prevNav = '<div  class="ad-carousel-previous hidden"><button class="ad-btn ad-md ad-flat ad-round ad-icon"><i class="fa fa-angle-left "></i></button></div>';
        nextNav = '<div  class="ad-carousel-next "><button class="ad-btn ad-md ad-flat ad-round ad-icon"><i class="fa fa-angle-right"></i></button></div>';

        $('.ad-carousel').not('[ad_constructed]').each(function () {

            // $(this).addClass('is-loading');
            let content = $(this).html();
            $(this).html(openConstruct + content + closeConstruct);
            if ($(this).find('.ad-carousel-previous').length == 0) {
                // console.log('show navBTNS');
                $(this).append(prevNav + nextNav);
            }
            resizeCarousel($(this));


            let spinner = $(this).find('.ad-spinner');

            // let spinnerDuration = duration < 5000 ? 1300 : duration / 2;
            // remove loader in 3ms
            if (spinner.length !== 0) {
                // console.log('spinner found', spinner);
                setTimeout(function () {
                    // console.log('fade spinner');
                    spinner.fadeOut('slow');
                }, 500);
            }


            // $(this).removeClass('is-loading');

            // Mark as constructed
            $(this).attr('ad_constructed', true);


        });
    }


    function resizeCarousel(carousel) {

        $this = carousel.find('.carousel-container');
        if (carousel[0].hasAttribute('items')) {

            item = $this.find('.' + carousel.attr('items') + '');
        } else {
            item = $this.find('.ad-carousel-item');
        }
        $this.height(item.height() + 5);
        // console.log('items is sanakjcbndjcscd', carousel.attr('items'));
        container = $this.find('.carousel-overflow');


        // Calculate the number of items to show
        numberOfItemstoShow = $this.width() / item.width();
        visibleItems = Math.round(numberOfItemstoShow) * item.width() > $this.width() ? Math.round(numberOfItemstoShow) - 1 : Math.round(numberOfItemstoShow);
        // console.log('number to shopwwwwwwwwwwwww', visibleItems);

        // Calculate the marign-right of the items, base on the items to show and the ad-carousel width
        leftSpace = $this.width() - (visibleItems * item.width());
        margin = leftSpace / visibleItems
        // console.log('space, margin isssssssss', leftSpace, margin, 2.5.toFixed());

        item.css('margin', '0 ' + (margin / 2) + 'px');
        // console.log((margin) + 'px');

        containerWidth = (item.width() * item.length) + item.width() * margin;
        container.css('width', containerWidth);
        // console.log('container withggggggggggggg', containerWidth, $this.width());


        // create emoveby
        moveBy = item.width() + margin;
        consolidate = (margin * item.length) / 100 + ($this.width() * .002);
        carousel.attr('moveby', Math.round(moveBy + consolidate));


        // create hidden carousel for navigation
        if (carousel[0].hasAttribute('caurosel_hidden-items')) {
            lHiddenItems = carousel.attr('caurosel_hidden-items');
        } else {
            lHiddenItems = 0
        }

        carousel.attr('caurosel_hidden-items', lHiddenItems);
        carousel.attr('caurosel_shown-items', visibleItems);
        carousel.attr('caurosel_total-items', item.length);
        //Check if is-loaging is on, then remove it,


    }


    // When CAROUSEL previous BTN is clicked
    wrapper.on('click', '.ad-carousel-previous', function () {
        carouselNav($(this), 1);

    });


    // for touch event, lets wait for hammer.js

    wrapper.on('click', '.ad-carousel-next', function () {
        carouselNav($(this), -1);

    });

    function carouselNav(clicked, factor) {
        var parent = clicked.parents('.ad-carousel');
        // if (parent[0].hasAttribute('items')) {

        //     item = parent.find('.' + carousel.attr('items') + ':first');
        // } else {
        //     item = parent.find('.ad-carousel-item:first');
        // }
        // margin = 2 * item.attr('style').split(' ')[2].replace('px;', '');
        // moveBy = item.width() + margin;
        // console.log(parent.attr('moveby'));
        // math them out. get hidden, then see if the visible items plus hidden is total

        var lHiddenItems = parseInt(parent.attr('caurosel_hidden-items'));
        var visibleItems = parseInt(parent.attr('caurosel_shown-items'));
        var totalItems = parseInt(parent.attr('caurosel_total-items'));

        var moveFactor = -1;
        var moveby = parseInt(parent.attr('moveby')) * moveFactor;


        caltems = lHiddenItems + visibleItems;


        if ((factor == -1) && (caltems == totalItems)) {
            // console.log('maximum reached, so dont move again, or hide it. Hidden, Visible, Total', lHiddenItems, visibleItems, totalItems);
        } else {

            if (factor === -1) {

                calMove = (lHiddenItems + 1) * moveby;
                updateHidden = lHiddenItems + 1;
            } else {
                //check if it not zero zero
                if (lHiddenItems) {
                    calMove = (lHiddenItems - 1) * moveby;
                    updateHidden = lHiddenItems - 1;
                } else {
                    //check if its zero
                    // console.log('nothing to move previous to');
                    calMove = 0;
                    updateHidden = lHiddenItems;
                }
            }

            parent.find('.carousel-overflow').animate({
                'margin-left': calMove
            }, 300, 'linear');

            // console.log('Hidden, Visible, Plus, Total', lHiddenItems, visibleItems, caltems, totalItems);
            //update the hiddenItemsI
            parent.attr('caurosel_hidden-items', updateHidden);

            // now hide the prev. btn if its full
            if (updateHidden + visibleItems == totalItems) {
                parent.find('.ad-carousel-next').addClass('hidden');
                parent.find('.ad-carousel-previous').removeClass('hidden');

            } else {
                parent.find('.ad-carousel-next').removeClass('hidden');
                parent.find('.ad-carousel-previous').removeClass('hidden');


            }

            if (updateHidden == 0) {

                parent.find('.ad-carousel-next').removeClass('hidden');
                parent.find('.ad-carousel-previous').addClass('hidden');

            }
        }

    }





    // VIDEO PLAYER CONTROLS

    function constructVideo() {
        $('.ad-video').not('[ad_constructed]').each(function () {

            // check for video title: create the video title div
            if ($(this)[0].hasAttribute('videoTitle')) {
                let videoTitleDIV = `<div class="ad-heading text-center">
                ` + $(this).attr('videoTitle') + `
                    </div>`;
                $(this).append(videoTitleDIV);

            }

            videoPlayerId = $(this)[0].hasAttribute('videoId') ? '#' + $(this).attr('videoId') : '#video';
            let videoPlayer = $(this).find(videoPlayerId);
            videoPlayer.removeAttr('controls');

            //Create the Video Controls

            let videoControlHTML = `
            
                          <span class="ad-message-display">
                            Volume: 95%
                          </span>
                          <span class="screen-button">
                            <i class="fa fa-play fa-5x fa-stack"></i>
                          </span>
                          <div class="ad-controls" locked>
                            <input type="range" name="" min="0" value="0" class="" id="seeker-control">
                            <div class="range-seeker"></div>
                            <div>
                              <button class="ad-btn ad-icon clear ad-round play ad-flat">
                                <i class="fa fa-play"></i>
                              </button>
                              <span class="ad-timer">
                                <span class="currentTime">0:00</span>
                                /
                                <span class="duration">1:06</span>
                              </span>
                              <span class="rFloat">
                                <span class="volume-control">
            
                                  <button class="ad-btn ad-round clear ad-icon ad-flat">
                                    <i class="fa fa-volume-up"></i>
                                  </button>
                                  <div class="volume-range">
                                    <input type="range" step="0.05" min="0" max="1" value=".95" name="" id="volume-control">
                                  </div>
                                </span>
                                <button class="ad-btn ad-round clear ad-icon ad-flat minimode">
                                    <i class="fa fa-square-o"></i>
                                </button>

                                <button class="ad-btn ad-round clear ad-icon ad-flat fullscreen">
                                  <i class="fa fa-clone"></i>
                                </button>


                                <button class="ad-btn ad-round clear ad-icon ad-flat">
                                  <i class="fa fa-sun-o"></i>
                                </button>
                              </span>
                            </div>
                          </div>
            `;
            $(this).append(videoControlHTML);
            //check if video is at autoplay
            if (videoPlayer[0].hasAttribute('autoplay')) {

                $(this).attr('isplaying', 'true');
            } else {
                $(this).attr('isplaying', 'false');

            }

            // Set The Timmer currentTime / Duration
            timer = $(this).find('span.ad-timer');

            $(this).find('span.ad-message-display').fadeOut('slow');
            // console.log($(videoPlayerId));
            // seekbar = $(this).find('input#seeker-control-' + videoPlayerId.replace('#', '') + '')[0];
            seekbar = $(this).find('input#seeker-control')[0];
            divSeekbar = $(this).find('div.range-seeker');
            // console.log('create video player instance');
            let videoNuu = new mediaPlayerUpdate();
            videoNuu.updateVideoTimer(videoPlayer[0], timer, seekbar, divSeekbar);

            // Mark as constructed
            $(this).attr('ad_constructed', true);
        });
    }


    // Change the mode to remain when its clicked
    wrapper.on('click', '.ad-video', function (e) {
        // console.log('video parent clicked');
        $(this).find('span.screen-button').fadeIn('slow');

        let videoPlayerId = $(this)[0].hasAttribute('videoId') ? '#' + $(this).attr('videoId') : '#video';
        let icon = $(this).find('button.play>i.fa');
        let screenBTN = $(this).find('span.screen-button > i.fa');
        // console.log(parent.attr('isplaying'));
        if ($(this).attr('isplaying') == 'true') {
            $(videoPlayerId)[0].pause();
            $(this).attr('isplaying', 'false');
            icon.removeClass('fa-pause');
            icon.addClass('fa-play');

            screenBTN.removeClass('fa-pause');
            screenBTN.addClass('fa-play');
            // console.log('video paused');
        } else {
            $(videoPlayerId)[0].play();
            $(this).attr('isplaying', 'true');
            icon.removeClass('fa-play');
            icon.addClass('fa-pause');

            screenBTN.removeClass('fa-play');
            screenBTN.addClass('fa-pause');
            // console.log('video played');

            // fade out the screen button
            $(this).find('span.screen-button').fadeOut('slow');
        }

        // remove the locked controls
        if ($(this).find('div.ad-controls')[0].hasAttribute('locked')) {
            // console.log('hhas locked attribute');
            $(this).find('div.ad-controls').removeAttr('locked');
        } else {
            // console.log('doest have locked attribute');
        }



    });


    // Toggle play and pause when video is clicked
    wrapper.on('click', '.ad-video .ad-controls', function (e) {
        e.stopPropagation();

        // console.log('controls clicked');
        let parent = $(this).parents('.ad-video'); // get your parent i.e .ad-video
        $(this).toggleClass('fixedmode');

        if ($(this).hasClass('fixedmode')) {

            var displayMessage = parent.find('span.ad-message-display');
            displayMessage.fadeIn('slow');
            displayMessage.text('Controls Mode: Fixed');
            setTimeout(function () {
                displayMessage.fadeOut('slow');
            }, 1500);

        } else {
            var displayMessage = parent.find('span.ad-message-display');
            displayMessage.fadeIn('slow');
            displayMessage.text('Controls Mode: Default');
            setTimeout(function () {
                displayMessage.fadeOut('slow');
            }, 1500);

        }

    });









    wrapper.on('click', '.ad-video button.play', function (e) {
        e.stopPropagation();


        let parent = $(this).parents('.ad-video');

        // fade IN the screen button
        parent.find('span.screen-button').fadeIn('slow');

        let videoPlayerId = parent[0].hasAttribute('videoId') ? '#' + parent.attr('videoId') : '#video';
        let screenBTN = parent.find('span.screen-button > i.fa');
        let icon = $(this).find('i.fa');
        // console.log(parent.attr('isplaying'));
        if (parent.attr('isplaying') == 'true') {
            $(videoPlayerId)[0].pause();
            parent.attr('isplaying', 'false');
            icon.removeClass('fa-pause');
            icon.addClass('fa-play');


            screenBTN.removeClass('fa-pause');
            screenBTN.addClass('fa-play');
            // console.log('video paused');
        } else {
            $(videoPlayerId)[0].play();
            parent.attr('isplaying', 'true');
            icon.removeClass('fa-play');
            icon.addClass('fa-pause');

            screenBTN.removeClass('fa-play');
            screenBTN.addClass('fa-pause');
            // console.log('video played');

            // fade out the screen button
            parent.find('span.screen-button').fadeOut('slow');
        }

    });










    wrapper.on('change', '.ad-video input#volume-control', function (e) {

        e.stopPropagation();

        var parent = $(this).parents('.ad-video'); // get your video
        let videoPlayerId = parent[0].hasAttribute('videoId') ? '#' + parent.attr('videoId') : '#video';
        let vid = parent.find(videoPlayerId)[0];
        vid.volume = $(this).val(); //update its volume

        volumeIcon = $(this).parents('.volume-control').find('button.ad-icon>i.fa');
        // console.log(volumeIcon);

        volumeIcon.attr('class', '');
        // console.log('volume is ', $(this).val());
        if ($(this).val() >= 0.6) {
            icon = 'fa fa-volume-up';

            // console.log('volume up');
        } else if ($(this).val() <= 0.4 && $(this).val() > 0) {
            icon = 'fa fa-volume-down';
            // console.log('volume down');
        } else if ($(this).val() == 0) {
            icon = 'fa fa-volume-off';
            // console.log('volume mute');
        } else {
            icon = 'fa fa-volume-up';
            // console.log('volume normal');
        }

        volumeIcon.addClass(icon);
        var displayMessage = parent.find('span.ad-message-display');
        displayMessage.fadeIn('slow');
        displayMessage.text('Volume: ' + Math.round($(this).val() * 100) + '%');
        setTimeout(function () {
            displayMessage.fadeOut('slow');
        }, 1500)
    });








    //get scrolling event to manipulate the video;
    wrapper.on('mousewheel', '.ad-video .volume-control', function (e) {
        e.preventDefault();
        e.stopPropagation();

        let parent = $(this).parents('.ad-video'); // get your video
        let volumeRange = parent.find('input#volume-control')[0];

        let videoPlayerId = parent[0].hasAttribute('videoId') ? '#' + parent.attr('videoId') : '#video';
        let vid = parent.find(videoPlayerId)[0];
        let volumeIcon = parent.find('.volume-control button > i.fa');
        volumeIcon.attr('class', '');
        // get the scroll value
        // console.log('mouse scroll value',e.scrollHeight());
        // only move the volumeRange and the effect will propagate
        if (e.originalEvent.wheelDelta / 120 > 0) {
            // console.log('scrolling up !', e.originalEvent.wheelDelta);
            if (volumeRange.value !== 1) {
                volumeRange.value = volumeRange.value + 0.1;
                // console.log('increased  volllllll', volumeRange.value);
            }

        } else {
            // console.log('scrolling down !', e.originalEvent.wheelDelta);
            if (volumeRange.value !== 0) {

                volumeRange.value = volumeRange.value - 0.1;

                // console.log('decrease  volllllll', volumeRange.value);
            }
        }

        vid.volume = volumeRange.value;

        let displayMessage = parent.find('span.ad-message-display');

        // console.log(volumeRange.value);



        if (vid.volume >= 0.6) {
            icon = 'fa fa-volume-up';

            // console.log('volume up');
        } else if (vid.volume <= 0.4 && vid.volume > 0) {
            icon = 'fa fa-volume-down';
            // console.log('volume down');
        } else if (vid.volume == 0) {
            icon = 'fa fa-volume-off';
            // console.log('volume mute');
        } else {
            icon = 'fa fa-volume-up';
            // console.log('volume normal');
        }

        volumeIcon.addClass(icon);

        displayMessage.fadeIn('slow');
        displayMessage.text('Volume: ' + Math.round(vid.volume * 100) + '%');
        setTimeout(function () {
            displayMessage.fadeOut('slow');
        }, 1500);



    });













    // Set volume to zero/mute when volume btn is clcked
    wrapper.on('click', '.ad-video .volume-control button', function (e) {
        e.stopPropagation();

        var parent = $(this).parents('.ad-video'); // get your video
        let videoPlayerId = parent[0].hasAttribute('videoId') ? '#' + parent.attr('videoId') : '#video';
        let vid = parent.find(videoPlayerId)[0];
        let volumeIcon = $(this).find('i.fa');
        // console.log(volumeIcon);
        volumeIcon.attr('class', '');

        let volumeRange = parent.find('input#volume-control')[0];
        let displayMessage = parent.find('span.ad-message-display');

        // console.log(volumeRange.value);

        if (vid.volume !== 0) {
            // store current volume for unmute volume
            $(this).attr('volume', vid.volume);

            vid.volume = 0; //update its volume
            volumeRange.value = 0;
            icon = 'fa fa-volume-off';


        } else {
            // get the previous volume stored

            vid.volume = parseFloat($(this).attr('volume')); //update its volume
            volumeRange.value = parseFloat($(this).attr('volume'));
            icon = 'fa fa-volume-up';
        }


        volumeIcon.addClass(icon);

        displayMessage.fadeIn('slow');
        displayMessage.text('Volume: ' + Math.round(vid.volume * 100) + '%');
        setTimeout(function () {
            displayMessage.fadeOut('slow');
        }, 1500);
    });












    //get seeking the video.
    wrapper.on('click', '.ad-video input#seeker-control', function (e) {
        e.stopPropagation();
    });

    wrapper.on('change', '.ad-video input#seeker-control', function (e) {
        e.stopPropagation();

        var parent = $(this).parents('.ad-video'); // get your video
        let videoPlayerId = parent[0].hasAttribute('videoId') ? '#' + parent.attr('videoId') : '#video';
        let vid = parent.find(videoPlayerId)[0];
        vid.currentTime = $(this).val(); //update its volume;
        parent.find('span.currentTime').html(vid.currentTime);
        // console.log('seeking');
    });



    // Get Fullscreen
    wrapper.on('click', '.ad-video button.fullscreen', function (e) {
        e.stopPropagation();

        let parent = $(this).parents('.ad-video');

        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        ) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

            //exit fullscreen
            // parent.removeClass('full-mode');
            parent.find('button.minimode').removeClass('hidden');
        } else {
            element = parent.get(0);
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }

            // enter fullscreen
            // parent.addClass('full-mode');
            parent.find('button.minimode').addClass('hidden');
        }


    });

    // catch esc btn clicked

    $('.ad-video').keydown(function (e) {
        if (e.keyCode == 27) {
            if ($('.ad-video .fullscreen').length != 0) {
                $('.ad-video .fullscreen').find('button.minimode').removeClass('hidden');
                // $('.ad-video .fullscreen').removeClass('fullscreen');
            }

            // console.log('esc clicked');
        }
    });


    //mini mode
    wrapper.on('click', '.ad-video .minimode', function (e) {
        e.stopPropagation();
        let parent = $(this).parents('.ad-video');
        parent.toggleClass('mini-mode');
        parent.find('button.fullscreen').toggleClass('hidden');
    });


    // AUDIO PLAYER CONTROLS

    function constructAudio() {
        $('.ad-audio').not('[ad_constructed]').each(function () {

            // check for audio title: create the video title div
            if ($(this)[0].hasAttribute('audioTitle')) {
                audioTitle = $(this).attr('audioTitle');
            } else {
                audioTitle = 'Audio Title';
            }

            if ($(this)[0].hasAttribute('artist')) {
                artist = $(this).attr('artist');
                // $(this).append(videoTitleDIV);

            } else {
                artist = 'Artist';
            }

            if ($(this)[0].hasAttribute('poster')) {
                let src = $(this).attr('poster');
                poster = '<img src="' + src + '" alt="">';

            } else {
                poster = '<i class="fa fa-music "></i>';
            }

            audioPlayerId = $(this)[0].hasAttribute('audioId') ? '#' + $(this).attr('audioId') : '#audio';
            let audioPlayer = $(this).find(audioPlayerId);
            audioPlayer.removeAttr('controls');

            //Create the Audio Controls

            let audioControlHTML = `
        
        <input type="range" id="seeker-control">
        <div class="range-seeker"></div>
        <div class="audio-grid">
          <div class="art">
            <div class="ad-avatar ad-flat">
            <div class="ad-img bg-dark">
                ` + poster + `
            </div>
              <h2>` + audioTitle + `</h2>
              <p>` + artist + `</p>
            </div>
          </div>

          <div class="">
            <div class="ad-controls">


              <span class="controls">
                <button class="ad-btn btn-default ad-sm ad-icon ad-round  play">
                  <i class="fa fa-play"></i>
                </button>
                <span class="fixedSpan">
                    <span class=" ad-timer">
                    <!-- <p> -->
                    <span class="currentTime">0:00</span>
                    /
                    <span class="duration">1:06</span>

                    </span>
                </span>
                &nbsp;&nbsp;&nbsp;

                <button class="ad-btn btn-default ad-sm  ad-icon ad-round loop">
                  <i class="fa fa-refresh"></i>
                </button>
                
              </span>
            </div>
          </div>
        </div>
        `;
            $(this).append(audioControlHTML);
            //check if video is at autoplay
            if (audioPlayer[0].hasAttribute('autoplay')) {

                $(this).attr('isplaying', 'true');
            } else {
                $(this).attr('isplaying', 'false');

            }

            // Set The Timmer currentTime / Duration
            timer = $(this).find('span.ad-timer');


            // console.log($(videoPlayerId));
            // seekbar = $(this).find('input#seeker-control-' + videoPlayerId.replace('#', '') + '')[0];
            seekbar = $(this).find('input#seeker-control')[0];
            divSeekbar = $(this).find('div.range-seeker');
            // console.log('create video player instance');
            let audioNuu = new mediaPlayerUpdate();
            audioNuu.updateAudioTimer(audioPlayer[0], timer, seekbar, divSeekbar);

            // Mark as constructed
            $(this).attr('ad_constructed', true);
        });
    }



    // Audio PLAY BTN
    wrapper.on('click', '.ad-audio button.play', function (e) {
        e.stopPropagation();


        let parent = $(this).parents('.ad-audio');


        let audioPlayerId = parent[0].hasAttribute('audioId') ? '#' + parent.attr('audioId') : '#audio';
        let icon = $(this).find('i.fa');
        // console.log(parent.attr('isplaying'));
        if (parent.attr('isplaying') == 'true') {
            $(audioPlayerId)[0].pause();
            parent.attr('isplaying', 'false');
            icon.removeClass('fa-pause');
            icon.addClass('fa-play');

            // console.log('video paused');
        } else {
            $(audioPlayerId)[0].play();
            parent.attr('isplaying', 'true');
            icon.removeClass('fa-play');
            icon.addClass('fa-pause');

        }

    });

    // Audio LOOP BTN
    wrapper.on('click', '.ad-audio button.loop', function (e) {
        e.stopPropagation();


        let parent = $(this).parents('.ad-audio');


        let audioPlayerId = parent[0].hasAttribute('audioId') ? '#' + parent.attr('audioId') : '#audio';
        let icon = $(this).find('i.fa');
        // console.log(parent.attr('isplaying'));
        if (!$(audioPlayerId)[0].hasAttribute('loop')) {
            $(audioPlayerId).attr('loop', 'true');

        } else {
            $(audioPlayerId).attr('loop', 'false');

        }

        // $(this).toggleClass('outline');
        $(this).toggleClass('btn-dark');

    });





    //get seeking the AUDIO.
    wrapper.on('change', '.ad-audio input#seeker-control', function (e) {
        e.stopPropagation();

        var parent = $(this).parents('.ad-audio'); // get your audio
        let audioPlayerId = parent[0].hasAttribute('audioId') ? '#' + parent.attr('audioId') : '#audio';
        let audio = parent.find(audioPlayerId)[0];
        audio.currentTime = $(this).val(); //update its time;
        parent.find('span.currentTime').html(audio.currentTime);
        // console.log('seeking');
    });



});
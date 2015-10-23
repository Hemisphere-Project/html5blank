(function( root, $, undefined ) {
	"use strict";
	var currentProject = {
		numbering:0,
		date:"",
		title:"",
		commanditaire:"",
		lieu:""
	};



	$(window).load(function () {

		/*$('.projects').masonry({
			// options...
			itemSelector: '.project-item',
			columnWidth: 0
		});*/

		// <init>
		var menuDefaultOffset = {top:24,left:24};
		var legendDefaultOffset = {top:60,left:24};
		//var vh = $( window ).height();hideIntroAnim()
		var vh = $('#introSection').height();
		var introStep = true;

		$(".header-pack").offset({top:menuDefaultOffset.top+vh,left:menuDefaultOffset.left});
		$(".legend").offset({top:legendDefaultOffset.top+vh,left:legendDefaultOffset.left});
		$("body").removeClass("hidden");



		// typed things
			console.log(vh);
		/*$(".intro").typed({
			strings: ['<div class="intro-block1"><div class="intro-block1-l1">Hémisphère,</div></div>','<div class="intro-block1"><div class="intro-block1-l1">Hémisphère,</div><div class="intro-block1-l2">Atelier de dispositifs numériques</div><div class="intro-block1-l3">234 avenue Felix Faure 69003 Lyon</div></div><div class="intro-block2"><div>&lt;m.&gt; bonjour@hemisphere-project.com</div><div>&lt;m.&gt; [0033] 682 984 800</div></div>'],
			// typing speed
			typeSpeed: -50,
			// time before typing starts
			startDelay: 500,
			// backspacing speed
			backSpeed: -200,
			// time before backspacing
			backDelay: 500,
			// loop
			loop: false,
			// false = infinite
			loopCount: false,
			// show cursor
			showCursor: false,
			// character for cursor
			cursorChar: "|",
			// attribute to type (null == text)
			attr: null,
			// either html or text
			contentType: 'html',
			// call when done callback function
			callback: function() {},
			// starting callback function before each string
			preStringTyped: function() {},
			//callback for every typed string
			onStringTyped: function() {},
			// callback for reset
			resetCallback: function() {}
		});*/


		ajustNoiseSizes();
		adjustBorderSizes();

		// DOM ready, take it away
		/*** script for realisations page ***/
		$(".container").on("mouseover",function(event){
			currentProject.numbering = $(event.currentTarget.parentElement).find(".numbering").text()+' — ';
			currentProject.date = $(event.currentTarget.parentElement).find(".date").text();
			currentProject.title = $(event.currentTarget.parentElement).find(".title").text();
			currentProject.commanditaire = $(event.currentTarget.parentElement).find(".commanditaire").text();
			currentProject.lieu = $(event.currentTarget.parentElement).find(".lieu").text()+', ';
hideIntroAnim()
			updateCurrentProject();
			$('.lgd-dash').hide();
		});

		$(".container").on("mouseleave",function(event){
			currentProject.numbering = "";
			currentProject.date = "";
			currentProject.title = "";
			currentProject.commanditaire = "";
			currentProject.lieu = "";
			updateCurrentProject();
			$('.lgd-dash').show();
		});




		function updateCurrentProject(){
			$(".legend .lgd-numbering").text(currentProject.numbering);
			$(".legend .lgd-annee").text(currentProject.date);
			$(".legend .lgd-title").text(currentProject.title);
			$(".legend .lgd-commanditaire").text(currentProject.commanditaire);
			$(".legend .lgd-lieu").text(currentProject.lieu);
		}

		function cursorAnimation() {
		    $('.lgd-dash').animate({
		        opacity: 0
		    }, 'fast', 'linear').animate({
		        opacity: 1
		    }, 'fast', 'linear');
		}

		setInterval (cursorAnimation, 600);

		window.addEventListener("optimizedScroll", ajustHeader);
		$( window ).resize(function() { ajustHeader(); });
		$('.intro').on('click', hideIntroAnim);


		// $('.intro-block1').css('font-family', 'btp_modify1');
		// $('.intro-block1').css('font-family', 'btpnormal');
		// HOVER TITLE
		$('.intro-block1').on('mouseover', function(){
			$(this).css('font-family', 'btp_modify1');
		});
		$('.intro-block1').on('mouseleave', function(){
			$(this).css('font-family', 'btpnormal');
		});
		// CLICK TITLE
		$('.intro-block1').on('mousedown', function(){
			$(this).css('font-family', 'btp_modify2');
		});



		function hideIntroAnim(){
			if (introStep){
				introStep = false;
				$(this).css('font-family', 'btp_modify2');
				window.onscroll = function () { window.scrollTo(0, 0); };
				$("#introSpacer").animate( {height: '0px'}, 500, "linear", function() {
					window.onscroll = function () { };
					$(".intro").hide();
				});
				$(".intro").fadeTo(500, 0.2);
				$(".header-pack").animate({top:menuDefaultOffset.top, left:menuDefaultOffset.left}, 500, "linear");
				$(".legend").animate({top:legendDefaultOffset.top, left:legendDefaultOffset.left}, 500, "linear");
			}
		}


		function ajustHeader(){
			//vh = $( window ).height();
			vh = $('#introSpacer').height();
			var currentScrollTop = $(document).scrollTop();

			if (currentScrollTop > 0 && vh > 0 && introStep) hideIntroAnim();
			else  if(currentScrollTop < vh ){
				$(".header-pack").offset({top:menuDefaultOffset.top+vh,left:menuDefaultOffset.left});
				$(".legend").offset({top:legendDefaultOffset.top+vh,left:legendDefaultOffset.left});
			}
			// else{
			// 	$(".header-pack").offset({top:currentScrollTop + menuDefaultOffset.top,left:menuDefaultOffset.left});
			// 	$(".legend").offset({top:currentScrollTop + legendDefaultOffset.top,left:legendDefaultOffset.left});
			// }
		}

		function ajustNoiseSizes(){
			$( ".cover-image a" ).each(function( index ) {
				var imgHeight = $(this).children("img").height();
				$(this).children(".noise").height(imgHeight-4);
			});
		}

		function adjustBorderSizes(){
			$( ".cover-image a" ).each(function( index ) {
				var imgHeight = $(this).children("img").height();
				var imgWidth = $(this).children("img").width();
				$(this).parent().parent().css({
						'height': imgHeight+2,
						'width': imgWidth
				});
			});
		}


	});

} ( this, jQuery ));


;(function() {
    var throttle = function(type, name, obj) {
        var obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle ("scroll", "optimizedScroll");
})();

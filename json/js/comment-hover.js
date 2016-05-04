var hideFrame = true;
var frameVisible = false;

var hoverTimeout;

function hide_frame(){
	window.setTimeout(function(){
		if(hideFrame && frameVisible){
			$('#hoverframe').attr('src',"about:blank");

			$('#hoverdiv').hide();
			frameVisible = false;
		}
	},300);
	hideFrame = true;
}

function show_frame(obj){
	window.setTimeout(function(){
		hideFrame=false;
	},100);

	if(!frameVisible){
		var popupWidth = 0;
		var popupLeft = 0;
		if(obj.position().left > $('body').width()/2){
			//show to the left instead
			popupLeft = 0;
			popupWidth = obj.position().left;
		} else {
			//show to the right
			popupWidth = $('body').width()-(obj.position().left+obj.width())-5;
			popupLeft = obj.position().left+obj.width();
		}
		frameVisible=true;
		var commentURL = obj.attr('href'); 
		$('#hoverframe').attr('src',commentURL);
		$('#hoverdiv').css({
			width:popupWidth,
			left:popupLeft,
			top:70,
			height:$(window.top).height()-140
		});
		$('#hoverdiv').show();
	}
}

var commentClasses='.comments, .redditFullComments, .reddit-comment-link'

function add_hover_listener(){
	$(commentClasses+', #hoverdiv, #hoverframe').hover(function(){
		var obj = $(this);
		if(!frameVisible){
			hoverTimeout = setTimeout(function(){
				show_frame(obj);
			},500);
		} else {
			show_frame($(this));
		}
	},function(){
		if(!frameVisible){
			clearTimeout(hoverTimeout);
		} else {
			hide_frame();
		}
	});
}

$(document).ready(function(){
	$('body').append('<div id="hoverdiv"><iframe id="hoverframe" src=""></iframe></div>');
	add_hover_listener();
	$(window).scroll(function(){
		add_hover_listener();
	});
});


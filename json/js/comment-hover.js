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
		frameVisible=true;
		var commentURL = obj.attr('href'); 
		$('#hoverframe').attr('src',commentURL);
		$('#hoverdiv').css({
			width:$('body').width()-(obj.position().left+obj.width())-5,
			left:obj.position().left+obj.width(),
			top:70,
			height:$(window.top).height()-140
		});
		$('#hoverdiv').show();
	}
}

function add_hover_listener(){
	$('.comments, #hoverdiv, #hoverframe').hover(function(){
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


$(document).ready(function(){
	$('body').add('<div id="hoverdiv"><iframe id="hoverframe" src=""></iframe></div>');

	$('.comments').hover(function(){
		var commentURL = 'https://www.reddit.com/r/Windows10/comments/4hl0x3/im_making_an_hover_zoom_like_extension_on_edge/';
		$('#hoverframe').src=commentURL;
		$('#hoverdiv').show();
	},function(){
		$('#hoverdiv').hide();
	});
});


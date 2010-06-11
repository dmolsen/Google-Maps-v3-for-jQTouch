// when loading a map detail page muck w/ some classes so the map will scroll & intialize the map
// .live is used so that the bindings always fires even if these IDs aren't part of the DOM yet

var map_loaded = false; // hack for google maps v3
var map_moved = false;

$(function(){

  // detect the orientation of the device when a map loads to it fills out the space correctly
  $('#map-detail').live('pageAnimationStart', function(event, info){	
	if (info.direction == 'in') {
		var map = map_initialize(); // map_initialize() is in each of the place.html files
		$('body').bind('turn', function(event, info){
			if (info.orientation == "landscape") {
				var width = 520; var height = 285;
				$('#map_canvas').css("width",width+"px");
				$('#map_canvas').css("height",height+"px");
				$('#map-overflow').css("width",(width-40)+"px");
				$('#map-overflow').css("height",(height-10)+"px");
				if (map_moved == false) { map.panBy(-80,40); }
			} else {
				var width = 360; var height = 435;
				$('#map_canvas').css("width",width+"px");
				$('#map_canvas').css("height",height+"px");
				$('#map-overflow').css("width",(width-40)+"px");
				$('#map-overflow').css("height",(height-10)+"px");
				if (map_moved == false) { map.panBy(80,-40); }
			}
		});
	}
  });

  // when unloading the map delete the div holding the old detail map so it won't flash & new maps will load					
  $('.clear-map-detail').live('pageAnimationStart', function(event, info){	
		if (info.direction == 'in') {
			$('#map-detail').remove();
			$('#map-detail').unbind(); // completely remove it from the DOM
			$('body').unbind('turn');
			map_moved = false;
		}
  });

});
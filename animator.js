$(function() {

	var timer = 0;
	
	$('#animate').click(function(event) {
		event.preventDefault();

		var x = y = count = startFrame = endFrame = 0,
			framesX = $('#frames-X').val(), 
			framesY = $('#frames-Y').val(),
			frameWidth = $('#dropbox').width() / framesX,
			frameHeight = $('#dropbox').height() / framesY;
			frames = JSON.parse('{"frames":[' + $('#frames').val() +']}').frames;

		clearInterval(timer);
		
		$('#animation-area').css('width', frameWidth + 'px');
		$('#animation-area').css('height', frameHeight + 'px');
		$('#animation-area').css('background-image', 'url(' + $('#dropbox').attr('src') + ')');
		
		if( frames.length > 2 ) {
			endFrame = frames.length;

		        var nextFrame = function() {
		                x = -(frames[count] % framesX) * frameWidth;
		                y = -((frames[count] / framesX)|0) * frameHeight;	        	
		        }
		} else {

			x = -(count % framesX) * frameWidth;
			y = -((count / framesX)|0) * frameHeight;	

			if( frames.length == 2 ) {
				count = startFrame = frames[0];
				endFrame = frames[1];
			} else {
				endFrame = framesX * framesY - 1;
			} 

			var nextFrame = function() {
				x = -(count % framesX) * frameWidth;
				y = -((count / framesX)|0) * frameHeight;				
			}

		}

		(animate = function(){			
			if( count++ >= endFrame ) {
				count = startFrame;
			};
			
			$('#animation-area').css('background-position', x + 'px ' + y + 'px' );
			nextFrame();
		})();
		
		timer = setInterval(animate, $('#interval').val());
		
	});

});

(function() {

	var animating = 0;
	
	$('#animate').click(function(e) {
		e.preventDefault();
		clearInterval(animating);
		framesX = $('#frames-X').val();
		framesY = $('#frames-Y').val();
		frameWidth = $('#dropbox').width() / framesX;
		frameHeight = $('#dropbox').height() / framesY;
		
		$('#animation-area').css('width', frameWidth + 'px');
		$('#animation-area').css('height', frameHeight + 'px');
		$('#animation-area').css('background-image', 'url(' + $('#dropbox').attr('src') + ')');
		
		bpx = 0;
		bpy = 0;
		
		frames = JSON.parse('{"frames":[' + $('#frames').val() +']}').frames;
		
		if( frames.length > 2 ) {

			count = 0;
		
			animating = setInterval(function(){
				
				if( count++ >= frames.length ) count = 0;
				
				bpx = -(frames[count] % framesX) * frameWidth;
				bpy = -((frames[count] / framesX)|0) * frameHeight;

				$('#animation-area').css('background-position', bpx + 'px ' + bpy + 'px' );
			},$('#interval').val());
		} else {
		
			if( frames.length == 2 ) {
				bpx = startX = -(frames[0] % framesX) * frameWidth;
				bpy = startY = -((frames[0] / framesX)|0) * frameHeight;
				maxX = framesX * frameWidth;
				maxY = ((frames[1] / framesX)|0) * frameHeight;	
				$('#animation-area').css('background-position', bpx + 'px ' + bpy + 'px' );			
			} else if( frames.length < 2 ) {
				startX = 0;
				startY = 0;
				maxX = framesX * frameWidth;
				maxY = framesY * frameHeight;
			} 
			
			animating = setInterval(function(){
				
				bpx = bpx - frameWidth;
				
				if( bpx < -maxX ) {
					bpx = startX;
					bpy = bpy - frameHeight;
				}
				
				if( bpy < -maxY ) {
					bpy = startY;
				}

				$('#animation-area').css('background-position', bpx + 'px ' + bpy + 'px' );
			},$('#interval').val());

		} 
		
	});

})();
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
		
		count = 0;
		
		if( frames.length > 2 ) {
		
			animating = setInterval(function(){
				
				if( count++ >= frames.length ) count = 0;
				
				bpx = -(frames[count] % framesX) * frameWidth;
				bpy = -((frames[count] / framesX)|0) * frameHeight;

				$('#animation-area').css('background-position', bpx + 'px ' + bpy + 'px' );
			},$('#interval').val());
		} else {
		
			if( frames.length == 2 ) {
				startFrame = frames[0];
				endFrame = frames[1];
			} else if( frames.length < 2 ) {
				startFrame = 0;
				endFrame = framesX * framesY - 1;
			} 

			count = startFrame;
			bpx = -(count % framesX) * frameWidth;
			bpy = -((count / framesX)|0) * frameHeight;	
			
			$('#animation-area').css('background-position', bpx + 'px ' + bpy + 'px' );
			
			animating = setInterval(function(){
				
				if( count++ >= endFrame ) {
					count = startFrame;
				};
				
				bpx = -(count % framesX) * frameWidth;
				bpy = -((count / framesX)|0) * frameHeight;				

				$('#animation-area').css('background-position', bpx + 'px ' + bpy + 'px' );
			},$('#interval').val());

		} 
		
	});

})();
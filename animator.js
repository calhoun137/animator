(function() {
	$('#character-parameters').hide();
	var populatedCharacterButtons = false;
	
	var animating = 0;
	
	function setFrames(frames) {
		clearInterval(animating);
		$('#frames').val(frames);
		$('#animate').click();
	}
	//converts frames from hawkthorne format to calhoun's format
	//e.g. "1-3,1" -> "0,1,2"
	//non-functional stub
	function convertToSingleValues(hawkFrames){
		var result = "";
		if (typeof(hawkFrames)=="object"){
			hawkFrames = hawkFrames[0];
		}
		var n = hawkFrames.split(",");
		var row = parseInt(n[1])-1;
		var frames = n[0].split("-");
		var width = 12;
		if(frames.length>1){
			for(var i=parseInt(frames[0]);i<=parseInt(frames[1]);i++){
				result += (width*row+i-1);
				if(i<frames[1]){
					result+=",";
				}
			}
		}else{
			result = (width*row+parseInt(n[0])-1);
		}
		return result;
	}
	function condenseFrames(actionFrames){
		var result = "";
		if (actionFrames.length > 1){
			for (var i=0;i<actionFrames.length;i++){
				result+=convertToSingleValues(actionFrames[i]);
				if(i<actionFrames.length-1){
					result+=",";
				}
			}
		}else{
			result = convertToSingleValues(actionFrames);
		}
		return result;
	}
	var buttonFunc = function(e){
		var btn = $(this);
		$.getJSON("character_map.json",function(result){
			var action = result[btn.val().toLowerCase()];
			var actionRight = action["right"];
			var actionFrames = actionRight[1];
			actionFrames = condenseFrames(actionFrames);
			setFrames(actionFrames);
	    });
	};
	
	$('#clear').click(function(e){setFrames("");});
	$('#walk').click(buttonFunc);
	$('#acquire').click(buttonFunc);
	$('.dynamic-button').click(function(e){
		setFrames($(this).attr("frames_right"));
		$.getJSON("character_map.json",function(result){
			var t = result;
			setFrames($(this).attr(result[$(this).val()]));
	    });
	});

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
		
		
			animating = setInterval(function(){
				
				if( count++ >= frames.length ) count = 0;
				
				bpx = -(frames[count] % framesX) * frameWidth;
				bpy = -((frames[count] / framesX)|0) * frameHeight;

				$('#animation-area').css('background-position', bpx + 'px ' + bpy + 'px' );
			},$('#interval').val());
				
	});

$('#character-preset').click(function(e) {
		e.preventDefault();
		clearInterval(animating);

		sheetWidth = $('#dropbox').width();
		sheetHeight = $('#dropbox').height();
		if (sheetWidth!=576 || sheetHeight!=768) {
			alert("Character spreadsheets must be 576x768 pictures:\n("+sheetWidth+"x"+sheetHeight+") found");
			return;
	    }

		disabled = $("#frames-X").attr("disabled");
	    $("#frames-X").attr("disabled", !disabled);
	    $("#frames-Y").attr("disabled", !disabled);
	    
		if (disabled) {
		    $(this).val("Enable Character Mode");
		    $('#character-parameters').hide();
		}else {
		    $(this).val("Disable Character Mode");
		    $("#frames-X").val(12);
		    $("#frames-Y").val(16);
		    $('#character-parameters').show();
		    if (true){
			    populatedCharacterButtons = true;
		    }
	    }
});

})();
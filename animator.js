(function() {
	$('#character-parameters').hide();
	var populatedCharacterButtons = false;
	var characterMap = null;
	
	var animating = 0;
	
	function setFrames(frames) {
		clearInterval(animating);
		$('#frames').val(frames);
		$('#animate').click();
	}
	//converts frames from hawkthorne format to calhoun137's format
	//e.g. "1-3,1" -> "0,1,2"
	function convertToSingleValues(hawkFrames){
		var result = "";
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
			result += (width*row+parseInt(n[0])-1);
		}
		return result;
	}
	
	//takes an array of frames and conflates it into a string of comma
	// separated integers as per calhoun137's format
	function condenseFrames(actionFrames){
		var result = "";
		for (var i=0;i<actionFrames.length;i++){
			result+=convertToSingleValues(actionFrames[i]);
			if(i<actionFrames.length-1){
				result+=",";
			}
		}
		return result;
	}

	//function that is called when either the direction or
	// state dropdown is changed
	var newActionSelection = function(e){
		var actionObj = $("#character-states")[0].options;
		var action = actionObj[actionObj.selectedIndex];
		action = characterMap[action.value];

		var dirObj = $("#direction")[0].options;
		var dir = dirObj[dirObj.selectedIndex];
		dir = dir.value;
		
		var actionRight = action[dir];
		
		var actionFrames;
		if(typeof actionRight === 'undefined'){
			//implements support for 'warp' and 'flyin' which are undirected
			actionRight = action[1];
			actionFrames = actionRight;
		}else{
			actionFrames = actionRight[1];
		}
		actionFrames = condenseFrames(actionFrames);
		setFrames(actionFrames);
	};
	
	$('#clear').click(function(e){setFrames("");});

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
		    if (!populatedCharacterButtons){
			    populatedCharacterButtons = true;
			    $("#character-states").change(newActionSelection);
			    $("#direction").change(newActionSelection);

				//for some reason https://raw.github.com/hawkthorne/hawkthorne-journey/master/src/character_map.json
				// doesn't work in chrome, so I use a dropbox version
			    $.getJSON("https://dl.dropboxusercontent.com/u/13978314/hawkthorne/character_map.json",function(result){
			    	characterMap = result;
			    	$.each(result, function(action, obj) {
			    		var actionLowerCase = action.toLowerCase();
						
						var op=document.createElement("option");
						op.value=actionLowerCase;
						op.text=actionLowerCase;
						op.id='cs-'+actionLowerCase;
						var cs = $("#character-states")[0];
						cs.appendChild(op);
			    	});
			    });
		    }
	    }
});

})();
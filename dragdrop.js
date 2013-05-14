(function() {
	var dropbox = document.getElementById('drop-area'); 

	dropbox.addEventListener('dragenter', stopDefault, false); 
	dropbox.addEventListener('dragover', stopDefault, false); 
	dropbox.addEventListener('dragleave', stopDefault, false); 
	dropbox.addEventListener('drop', onDrop, false); 
	
	function stopDefault(e) { 
	  e.stopPropagation(); 
	  e.preventDefault(); 
	} 


	function onDrop(e) { 
		stopDefault(e);

		var readFileSize = 0; 
		var files = e.dataTransfer.files; 
		
		dropbox.style.width = "inherit";
		dropbox.style.height = "inherit";

		file = files[0]; 
		readFileSize += file.fileSize; 
		
		var imageType = /image.*/; 

		if (!file.type.match(imageType)) { 
			return; 
		} 


		var reader = new FileReader(); 


		reader.onerror = function(e) { 
			alert('Error code: ' + e.target.error); 
		}; 


		reader.onload = (function(aFile) { 
			return function(evt) { 
				document.getElementById('dropbox').src = evt.target.result; 
			};
		})(file); 

		reader.readAsDataURL(file); 
	} 
	
})();
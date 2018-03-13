
/*
Plugin Upload Image
Required : bootstrap4.bundle
		   jquery v3

--- created by : Agus Setiadi ---
--------------2018---------------
*/

(function(){
	$.fn.imageUpload = function(objParam){
		var setting = $.extend({
			url : 'unset',
			form : 'unset',
			method : 'POST',
			file : 'unset',
			imgOrigin : 'unset',
			resultTo : 'unset',
			path : 'unset'
		}, objParam)

		var selectorId = $(this)[0].id;
		var selectorClass = $(this)[0].class;
		var selectorName = $(this)[0].name;



		/*
		* Initial Selector 
		* Detect Selector apakah class atau id atau name
		* selectorFile adalah nama selector asli, ex : 'fileinput'
		* selector adalah nama selector disertai dengan initialnya, e: '#fileinput', '.fileinput'

		*/

		if (typeof selectorId !== 'undefined') {
			var selectorFile = selectorId;
			var selector = "#"+selectorFile;
		}
		else if(typeof selectorClass !== 'undefined'){
			var selectorFile = selectorClass;
			var selector = "."+selectorFile;
		}
		else if (typeof selectorName !== 'undefined') {
			var selectorFile = selectorName;
			var selector = selectorFile;
		}
		

		/*
		* Define HTML Selector
		* wrapSelectorFile : Wrapper untuk menempatkan 
							 seluruh elemen yang sudah di render plugin

		* wrapSelector : initial wrapSelectorFile disertai dengan initialnya

		* progressBar : wrapper untuk menempatkan progress-bar class

		* wrapImgResult : berupa element html '<img>' fungsinya untuk menempatkan
						  hasil upload

		* resultSelectorOld : berupa input 'text hidden' gunanya untuk menempatkan 
							  nama file gambar asli/yang lama

		* resultTo : untuk menempatkan nama hasil dari upload gambar

		* path : directory tempat dimana gambar diupload
		*/

		var wrapSelectorFile = selectorFile+'-wrap';
		var wrapSelector = "#"+wrapSelectorFile;
		var progressBar = selectorFile+'-progress';
		var progressBarSelector = "#"+progressBar;
		var wrapImgResult = selectorFile+'-result';
		var resultSelectorOld = selectorFile+'-resultSelectorOld';
		var resultTo = setting.resultTo;
		var path = setting.path;
		var btnDelete = selectorFile+'-btnDelete';

		return this.each(function(){

			
			$(selector).before('<div style="width:200px; position:relative" id="'+wrapSelectorFile+'"></div>');
			$(wrapSelector).html($(this));


			$(wrapSelector).append('<div class="progress" id="'+progressBar+'"><div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">0%</div></div>')
			$(wrapSelector).append('<input type="hidden" id="'+resultSelectorOld+'"></div>');

			if (setting.imgOrigin == 'unset') {
				$(wrapSelector).prepend('<img class="img-thumbnail img-responsive '+wrapImgResult+'">');
				$("."+wrapImgResult).hide();
			}
			else{
				$(wrapSelector).prepend($(setting.imgOrigin));
				$(setting.imgOrigin).addClass(wrapImgResult);
			}
			

			if (resultTo !== 'unset') {
				$("#"+resultSelectorOld).val($(resultTo).val());
			}

			$(progressBarSelector).hide();
			
			
			$(document).on('change', this, function(){
				ajaxSend({
					url : setting.url,
					method : setting.method,
					form : setting.form,
					progressBar : progressBarSelector
				}, function(data){
					
					var image = data.data.image;
					$(selector).val('');
					$(resultTo).val(image)

					if (setting.imgOrigin == 'unset') {
						$("."+wrapImgResult).show();
					}

					$("."+wrapImgResult).attr('src', path+image);

					if ($("#"+btnDelete).length == 0) {
						$(wrapSelector).prepend('<button type="button" style="position:absolute; right: 0; top; 0" class="btn btn-danger btn-sm" id="'+btnDelete+'">Delete</button>');
					}
				})
			})

			/*
			Event Whene image deleted
			*/
			$(document).on('click','#'+btnDelete, function(){
				var valimgOld = $("#"+resultSelectorOld).val();
				$(selector).val('');
				$("#"+btnDelete).remove();
				$("."+wrapImgResult).attr('src',path+valimgOld);
				$(resultTo).val(valimgOld);

				if (setting.imgOrigin == 'unset') {
					$("."+wrapImgResult).hide();
				}


			})

		})
	}

	function ajaxSend(paramObj, callback){
		/*paramObj = {
			url 	: url,
			method 	: method, 
			data 	: form, 
			progressBar : progressBar
			
		}*/
		$(paramObj.progressBar).show();
		$.ajax({
			url : paramObj.url,
			method : paramObj.method,
			data : new FormData($(paramObj.form)[0]),
			contentType : false,
			processData : false,
			xhr:function(){
		        var xhr = new XMLHttpRequest();
		        xhr.upload.onprogress = function(progress){
		          var percentage = Math.floor(100 / (progress.total / progress.loaded));
		          console.log(progress.total+","+progress.loaded);
		          console.log(percentage);

		          /*Progress Bar*/
		          $(paramObj.progressBar).find('.progress-bar').css("width", percentage+"%");
		          $(paramObj.progressBar).find('.progress-bar').html(percentage+"%");

		        }
		        return xhr;
		      },
			success : function(jsonData){
				var dataObj = JSON.parse(jsonData);
				$(paramObj.progressBar).hide();
				console.log(dataObj);
				if (callback) {
					callback(dataObj);
				}
			}
		})
	}


})(jQuery)
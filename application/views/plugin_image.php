<!DOCTYPE html>
<html>
<head>
	<title>Plguin Image</title>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url()."assets/bootstrap.css" ?>">

</head>
<body>
<script type="text/javascript" src="<?php echo base_url()."assets/jquery.js" ?>"></script>
<script type="text/javascript" src="<?php echo base_url()."assets/bootstrap.bundle.js" ?>"></script>
<script type="text/javascript" src="<?php echo base_url()."assets/imageUpload.js" ?>"></script>

<div class="container">
	<div class="col-md-12">
		
		<form action="" id="formSendFile" method="POST" enctype="multipart/form-data">
			<h2>Upload Image Example</h2>
			<img class="img-responsive img-thumbnail" id="imgOrigin" src="">
			<input type="file" name="IsName" class="isClass" id="fileData">
			<input type="text" name="" id="wrapResult" value="">
			<button class="btn btn-info">Kirim</button>
		</form>

	</div>
</div>
<script type="text/javascript">
	

	/*PLUGIN UPLOAD IMAGE
	required : bootstrap4, jquery

	OPTION SETTING
	* url : url server utnuk upload (required)
	* method : POST/GET (optional), 
			   Secara default adl POST jika tidak di set

	* form : Form di dimana selector file upload ditempatkan (required)

	* imgOrigin : Menempatkan image yang lama (option)

	* resultTo : - Selector untuk menempatkan nama file yang lama (required)
				 - otomatis akan diganti dengan nama file baru ketika sudah berhasil di upload (required)

	* path : Directory dimana lokasi file telah di upload di server

	*/
	var dataUpload = $("#fileData").imageUpload({
		url : '<?php echo base_url() ?>'+'plugin_image/upload',
		method : 'POST',
		form : "#formSendFile",
		imgOrigin : "#imgOrigin",
		resultTo : "#wrapResult",
		path : '<?php echo base_url() ?>' + 'assets/img/'
	})

</script>
</body>
</html>
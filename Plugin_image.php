<?php

/**
* 
*/
class Plugin_image extends CI_Controller
{
	
	function __construct()
	{
		parent::__construct();

	}

	public function index(){
		$this->load->view('plugin_image');
	}

	public function upload(){
		$file = 'IsName';
		$path = "./assets/img/";
		$result = $this->upload_image($path,$file,time());
		$status = $result['status'];

		$img = $result['data']['image'];
		echo json_encode(['status' => 'ok',
						  'data' => ['image' => $img, 'thumb' => $result['data']['thumb'] ]]);
		
	}
	public function upload_image($path,$file,$newImage){
		
		if ($_FILES[$file]) {

			$config['upload_path'] = $path;
           	$config['allowed_types'] = 'jpg|png|jpeg';
	        $config['max_size'] = '3072'; //maksimum besar file 3M
	        $config['max_width']  = '5000'; //lebar maksimum 5000 px
	        $config['max_height']  = '5000'; //tinggi maksimu 5000 px
	        $config['file_name']  = $newImage;
            //$this->upload->initialize($config);
            $this->load->library('upload',$config);
            if ($this->upload->do_upload($file)) {
	            $data_upload = $this->upload->data();
	            $image_size = $data_upload['file_size'];

						$config2['image_library'] = 'gd2';
						$config2['source_image'] = $path.$data_upload['file_name'];
						//$config2['create_thumb'] = TRUE;
						//$config2['new_image'] = $path.$data_upload['file_name'];
						$config2['maintain_ratio'] = TRUE;
						$config2['width']         = 250;
						$config2['height']       = 250;

			            $this->load->library('image_lib',$config2);
			            $this->image_lib->resize();
			            $thumb = str_replace(".", '_thumb.', $data_upload['file_name']);
		        		$status = array('status' => 'ok', 'data' => ['image'=>$data_upload['file_name'],'thumb' => $thumb]);
            }
            else{
            	$status = array('status' =>'failed');
            }

            return $status;
		}
	}

}
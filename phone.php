<?php
	//error_reporting(E_ALL);
	//ini_set('display_errors', 1);
	if($_SERVER['HTTP_HOST'] == "192.168.1.50"){
		$json = file_get_contents("settings.js");
		$settings = json_decode($json, true);
		if($_POST['command']=='sleep'){
			$settings['sleep'] = (!$settings['sleep'] ? 1 : 0);
			if($settings['sleep']==1){
				print("Sleep Mode Enabled");
			}
			else{
				print("Sleep Mode Disabled");
			}
		}
		if($_POST['command']=='sleepoff'){
			$settings['sleep'] = 0;
			print("Sleep Mode Disabled");
		}
		if($_POST['command']=='lightover'){
			$settings['lightover'] = (!$settings['lightover'] ? 1 : 0);
			if($settings['lightover']==1){
				print("Light Override Enabled");
			}
			else{
				print("Light Override Disabled");
			}
		}
		if($_POST['command']=='fanover'){
			$settings['fanover'] = (!$settings['fanover'] ? 1 : 0);
			if($settings['fanover']==1){
				print("Fan Override Enabled");
			}
			else{
				print("Fan Override Disabled");
			}
		}
		if($_POST['command']=='fanset'){
			$settings['fanset'] = (!$settings['fanset'] ? 1 : 0);
			if($settings['fanset']==1){
				print("Fan Enabled");
			}
			else{
				print("Fan Disabled");
			}
		}
		if($_POST['command']=='lightset'){
			$settings['lightset'] = (!$settings['lightset'] ? 1 : 0);
			if($settings['lightset']==1){
				print("Light Enabled");
			}
			else{
				print("Light Disabled");
			}
		}
	}
	$fp = fopen('settings.js', 'w');
	fwrite($fp, json_encode($settings));
	fclose($fp);
?> 
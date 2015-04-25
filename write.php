<?php
	if(array_key_exists('login', $_COOKIE) || $_SERVER['SERVER_NAME']=="192.168.1.50"){
		$jsonFile = fopen('settings.js','w+');
		fwrite($jsonFile,$_POST['json']);
		fclose($jsonFile);
	}
?>
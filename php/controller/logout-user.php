<?php
	require_once(__DIR__ . "/../model/config.php");
	
	unset($_SESSION["authenticated"]);
	//ends session
	session_destroy();
	//redirects to index.php
	header("Location: " . $path . "index.php");
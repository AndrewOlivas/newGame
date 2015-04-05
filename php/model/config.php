<?php
	require_once(__DIR__ . "/database.php");

	session_start();
	// no hacking for you :)
	session_regenerate_id(true);

	$path = "/newGame/php/";

	$host = "localhost";
	$username = "root";
	$password = "root";
	$database = "awesomenauts_db";

	if(!isset($_SESSION{"connection"})){	

		$connection = new Database($host, $username, $password, $database);
		$_SESSION{"connection"} = $connection;
	}
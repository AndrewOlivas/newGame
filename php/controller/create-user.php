<?php
	// require_once is like a directory to other files
	require_once(__DIR__ . "/../model/config.php");

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
	// saltly is what the hackers will be after they find out they cant hack my shit
	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";
	// makes the passord garbled and almost impossible to hack
	$hashedPassword = crypt($password, $salt);

	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
		. "email = '', "
		. "username = '$username', "
		. "password = '$hashedPassword', "
		. "salt = '$salt', "
		. "exp = 0, "
		. "exp1 = 0, "
		. "exp2 = 0, "
		. "exp3 = 0, "
		. "exp4 = 0");

	$_SESSION["name"] = $username;

	if($query){
		echo "true";
	}

	else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}
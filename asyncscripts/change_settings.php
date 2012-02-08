<?
$pol_int = trim($_POST["pi"]);
$log = trim($_POST["l"]);

include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();

if ($connection != false)
	pg_query("UPDATE settings SET polling_interval = '$pol_int', keep_log = '$log' WHERE key = '1'");
?>
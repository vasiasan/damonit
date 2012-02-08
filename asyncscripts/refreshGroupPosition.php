<?
$key = trim($_POST["key"]);
$x = trim($_POST["x"]);
$y = trim($_POST["y"]);

include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();

if ($connection != false)
	pg_query("UPDATE groups SET posx = '$x', posy = '$y' WHERE key = '$key'");
?>
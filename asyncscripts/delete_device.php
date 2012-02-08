<?
$key = trim($_POST["k"]);
include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();
if ($connection != false) {
	pg_query("DELETE FROM devices WHERE key = '$key'");
}
?>
<?
$com = trim($_POST["com"]);
include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();
if ($connection != false)
	pg_query("INSERT INTO communities (community) VALUES ('$com')");
?>
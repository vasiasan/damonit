<?
$c = trim($_POST["c"]);
$f = trim($_POST["f"]);
$s = trim($_POST["s"]);
include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();
if ($connection != false) {
	$temp;
	if ($f > $s) {$temp = $f; $f = $s; $s = $temp;}
	pg_query("INSERT INTO port_connection (first_device, second_device, color) VALUES ('$f', '$s' , '$c')");
	}
?>
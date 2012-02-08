<?
$nm = trim($_POST["name"]);
$ip = trim($_POST["ip"]);
$cm = trim($_POST["community"]);
$pl = trim($_POST["polling"]);
$t = $_POST["type"];
$d = $_POST["dev"];

if ($pl == "tcp" || $pl == "udp") $pt = trim($_POST["port"]);

include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();

if ($connection != false) {
	if ($pl)
		if ($pt)
			pg_query("UPDATE devices SET name = '$nm', ip = '$ip', community = '$cm', type = '$t', polling_flag = 'true', polling_protocol = '$pl', polling_port = '$pt' WHERE key = '$d'");
		else
			pg_query("UPDATE devices SET name = '$nm', ip = '$ip', community = '$cm', type = '$t', polling_flag = 'true', polling_protocol = '$pl' WHERE key = '$d'");
	else
		pg_query("UPDATE devices SET name = '$nm', ip = '$ip', community = '$cm', type = '$t', polling_flag = 'true' WHERE key = '$d'");
}
?>
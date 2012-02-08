<?
$nm = trim($_POST["name"]);
$ip = trim($_POST["ip"]);
$cm = trim($_POST["community"]);
$pl = trim($_POST["polling"]);
$t = $_POST["type"];
$group = trim($_POST["g"]);
$x = trim($_POST["x"]);
$y = trim($_POST["y"]);

if ($pl == "tcp" || $pl == "udp") $pt = trim($_POST["port"]);

include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();

if ($connection != false) {
	if ($pl)
		if ($pt)
			pg_query("INSERT INTO devices (name, ip, community, type, polling_flag, polling_protocol, polling_port) VALUES ('$nm', '$ip', '$cm', '$t', 'true', '$pl', '$pt')");
		else
			pg_query("INSERT INTO devices (name, ip, community, type, polling_flag, polling_protocol) VALUES ('$nm', '$ip', '$cm', '$t', 'true', '$pl')");
	else
		pg_query("INSERT INTO devices (name, ip, community, type) VALUES ('$nm', '$ip', '$cm', '$t')");
	$result = pg_query("SELECT key FROM devices WHERE ip = '$ip'");
	$row = pg_fetch_assoc($result);
	$device = $row["key"];
	pg_query("INSERT INTO group_divice_link (device, posx, posy, \"group\") VALUES ('$device', '$x' , '$y', '$group')");
	}
?>
<?
$device = $_GET["d"];
include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();
$data = Array();
if ($device == -1) {
	$result = pg_query("SELECT devices.name, events.date_time, events.event
						FROM events, devices
						WHERE devices.key = events.device");
}
else {
	$result = pg_query("SELECT devices.name, events.date_time, events.event
						FROM events, devices
						WHERE device = '$device' and devices.key = events.device");
}
while ($row = pg_fetch_assoc($result)) {
	$data[] = $row["name"];
	$data[] = $row["date_time"];
	$data[] = $row["event"];
}
echo json_encode($data);
?>
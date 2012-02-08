<?
include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();
$result = pg_query("SELECT polling_interval, keep_log FROM settings");
$data = Array();
if ($result) {
	$row = pg_fetch_assoc($result);
	$data[] = $row["polling_interval"];
	$data[] = $row["keep_log"];
}
echo json_encode($data);
?>
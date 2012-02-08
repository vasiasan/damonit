<?
$key = $_GET["k"];
include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();
$result = pg_query("SELECT * FROM devices WHERE key = '$key'");
$data = Array();
if ($result){
	$row = pg_fetch_assoc($result);
	$data[] = $row["name"];
	$data[] = $row["ip"];
	$data[] = $row["type"];
	$data[] = $row["community"];
	$data[] = $row["polling_flag"];
	$data[] = $row["polling_protocol"];
	$data[] = $row["polling_port"];
	}
echo json_encode($data);
?>
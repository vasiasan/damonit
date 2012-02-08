<?
$g = $_GET["g"];
include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();
$data = Array();
while ($g != 1) {
	$result = pg_query("SELECT name, key, parent_group FROM groups WHERE key = '$g'");
	if ($result) {
		$row = pg_fetch_assoc($result);
		$data[] = $row["name"];
		$data[] = $row["key"];
		$g = $row["parent_group"];
	}
}
echo json_encode($data);
?>
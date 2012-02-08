<?
$g = $_GET["g"];
include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();
$result = pg_query("SELECT name, key, posx, posy FROM groups WHERE parent_group = '$g'");
$data = Array();
if ($result)
	while ($row = pg_fetch_assoc($result)) {
		$data[] = $row["name"];
		$data[] = $row["key"];
		$data[] = $row["posx"];
		$data[] = $row["posy"];
	}
echo json_encode($data);
?>
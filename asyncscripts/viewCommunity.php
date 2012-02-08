<?
include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();
$data = Array();
if ($connection){
	$result = pg_query("SELECT community FROM communities");
	if ($result)
		while ($row = pg_fetch_assoc($result))
			$data[] = $row["community"];
}
echo json_encode ($data);
?>
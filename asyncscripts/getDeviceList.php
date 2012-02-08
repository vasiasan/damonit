<?
$g = $_GET["g"];
include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();
$result = pg_query("SELECT devices.name, devices.polling_flag, devices.ip, devices.type, devices.key,
					group_divice_link.posx, group_divice_link.posy
					FROM devices, group_divice_link
					WHERE group_divice_link.group = '$g' and group_divice_link.device = devices.key
					ORDER BY devices.key ASC");
$data = Array();
if ($result)
	while ($row = pg_fetch_assoc($result)) {
		$data[] = $row["name"];
		$data[] = $row["key"];
		$data[] = $row["posx"];
		$data[] = $row["posy"];
		$data[] = $row["type"];
		$data[] = 0.6;
	}
echo json_encode($data);
?>
<?
$g = $_GET["g"];
include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();
$res1 = pg_query("SELECT posx, posy
				  FROM group_divice_link, port_connection
				  WHERE group_divice_link.group = '$g' and group_divice_link.device = port_connection.first_device
				  ORDER BY port_connection.first_device ASC");
$res2 = pg_query("SELECT posx, posy, color
				  FROM group_divice_link, port_connection
				  WHERE group_divice_link.group = '$g' and group_divice_link.device = port_connection.second_device
				  ORDER BY port_connection.first_device ASC");
$data = Array();
if ($res1 && $res2)
	while ($row1 = pg_fetch_assoc($res1)) {
		$row2 = pg_fetch_assoc($res2);
		$data[] = $row1["posx"];
		$data[] = $row1["posy"];
		$data[] = $row2["posx"];
		$data[] = $row2["posy"];
		$data[] = $row2["color"];
	}
echo json_encode($data);
?>
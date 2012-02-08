<?
$nm = trim($_POST["name"]);
if (strlen($nm) > 20) $nm = substr($nm, 0, 20);
$group = trim($_POST["g"]);
$x = trim($_POST["x"]);
$y = trim($_POST["y"]);

include ('wuwuzii.php');
$connection = pg_connect ("host=$host dbname=$db user=$user password=$password") or die();

if ($connection != false) {
	pg_query("INSERT INTO groups (name, parent_group, posx, posy) VALUES ('$nm', '$group' , '$x', '$y')");
	}
?>
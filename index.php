<!DOCTYPE html>
<html lang="ru">
<head>
	<title>Сетевой менеджер</title>
	<meta charset="utf-8" />
	
	<script src="js/jquery-1.6.2.min.js"></script>
	<script src="js/jquery-ui-1.8.16.custom.min.js"></script>
	<script src="js/main.js">// Contains basic functions</script>
	<script src="js/draw.js">// Contains drawing functions, and listeners of canvas</script>
	<script src="js/blocks_showers.js">// Show blocks, and fill them content</script>
	<script src="js/document_ready.js">// Contains document_ready function</script>
	<script src="js/visual_effects.js"></script>
	<script src="js/listeners_and_intervals.js"></script>
	<script src="js/html.js">// Contains html text for blocks from block_showers.js</script>
	<link rel="stylesheet" type="text/css" href="css/main.css" />
	<link rel="stylesheet" type="text/css" href="css/ui-lightness/jquery-ui-1.8.16.custom.css" />
	<link rel="icon" type="image/png" href="img/favicon.png" id="icon" />
</head>
<body>
	
<div class="header">
	<h2 style="margin-left: 10px; padding-top: 1em;" id="header">
		<a href="#" onclick="groupClick(1)">Сетевой менеджер</a>
	</h2>
</div>

<div class="accordion">
	<div id="accordion">
		<h3><a href="#">Список устройств</a></h3>
		<div class="panel" id="device_list_panel">
			<div class="device_panel" id="d">
				<img src="img/root.png" class="icon" onclick="groupClick(1)" />
				<img src="img/log.png" class="icon" onclick="showDeviceLog(-1)" />
				<img src="img/hand.png" class="icon" onclick="unreachable()"/>
				<img src="img/arrow.png" class="icon" onclick="location.href = 'text.html';" />
				<div id="group_list"></div>
			</div>
			<span id="pos"></span>
		</div>
		<h3><a href="#">Настройки</a></h3>
		<div class="panel" id="panel">
			<label>Время опроса (сек):</label><input type="text" id="polling_interval" /><br/>
			<label>Вести лог?&nbsp;<input type="checkbox" id="log" /></label><br/>
			<input type="button" id="apply_settings_change" value="Применить" disabled="disabled" onclick="apply_settings_change()" />
		</div>
	</div>
</div>

<div class="constrictor" onclick="constrict(event)"></div>

<canvas id="map" class="canvas" oncontextmenu="return map_context_menu_show(event)"></canvas>

<div id="add_device_block" class="add_blocks"></div>
<div id="add_group_block" class="add_blocks"></div>
<div id="add_community_block" class="add_blocks"></div>
<div id="add_group_link" class="add_blocks"></div>
<div id="add_device_link" class="add_blocks"></div>
<div id="device_properties" class="add_blocks"></div>
<div id="device_delete_block" class="add_blocks"></div>
<div id="device_log_block" class="add_block"></div>

<div id="context_menu_hider" class="context_menu_hider" oncontextmenu="return false" onmousedown="return map_context_menu_hide(event)"></div>
<div id="context_menu" class="context_menu">
</div>

</body>
</html>
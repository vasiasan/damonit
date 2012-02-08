// Глобальные переменные окружения
// Высота канваса
ch = Math.round(document.height * 0.92);		// Так-как заголовок имеет высоту 8%
// Ширина канваса в состоянии когда левая панель открыта (21%) и закрыта (1%)
canvas_width_panel_open = Math.round(document.width * 0.79);
canvas_width_panel_close = Math.round(document.width * 0.99);
cw = canvas_width_panel_open;
// Параметры
polling_interval = null;
keep_log = null;
// Переменные необходимые для отрисовки карт
cur_x = 0;
cur_y = 0;
group = 1;
// Массивы, содержащие текущую информацию об устройствах и группах
group_pos = [];
device_pos = [];
links = [];

scale = 1;
drag = false;
drag_index = -1;
drag_line = [];
// -1 - таскать карту; 0 - таскать группы; 1 - устройства; 2 - ничего не таскать
dgm_drag = 2;
x = 0;
y = 0;
r = 25;

un_interval = null;
gp_interval = null;
alert_interval = null;

polling_flag = false;

// Функция асинхронного добавления SNMP-сообщества
function addCommunity() {
	var community = $('#add_community').val();
	// Если значение сообщества введено - добавляем его
	if (community != ""){
		$.ajaxSetup({cache: false});
		// Попробовать переписать на Perl
		// Асинхронно добавляем данные спомощью скрипта, после чего запрашиваем измененную таблицу
		$.post(
			'asyncscripts/addCommunity.php',
			{com: community},
			function(){
				$('#add_device_community').append("<option value=\"" + community + "\">" + community + 	"</option>");
				$('#add_device_community :last').attr("selected", "selected");
			}
		);
	}
	else
		error('add_community_block', 'SNMP-community не добавлено - поле оказалось путым.', 40);
}

// Функция асинхронного добавления устройства в БД
function addDevice(){
	var device_name = $('#add_device_name').val();
	var device_ip = $('#add_device_ip').val();
	var device_prot = $('#add_device_prot').val();
	var device_port = $("#add_device_port").val();
	// Если значение сообщества введено - добавляем его
	if (device_name == "" || device_ip == "" || (device_prot == "tcp" && device_port == ""))
		error ('add_device_block', 'Устройство не добавлено - не все поля заполнены.', 25);
	else {
		$.ajaxSetup({cache: false});
		$.post(
			'asyncscripts/addDevice.php',
			{name: device_name,
			 ip: device_ip,
			 community: $('#add_device_community').val(),
			 polling: device_prot,
			 port: device_port,
			 type: $('#add_device_type').val(),
			 g: group,
			 x: cur_x,
			 y: cur_y},
			function(){ }
		);
		$.post('asyncscripts/restart.pl');
		$("#add_device_block").dialog('close');
	}
	groupClick(group);
}

// Функция асинхронного добавления группу в БД
function addGroup(){
	var group_name = $('#add_group_name').val();
	if (group_name == "")
		error ('add_group_block', 'Группа не добавлена - не задано имя.', 25);
	else {
		$.ajaxSetup({cache: false});
		$.post(
			'asyncscripts/addGroup.php',
			{name: group_name,
			 g: group,
			 x: cur_x,
			 y: cur_y},
			function(){ }
		);
		$("#add_group_block").dialog('close');
	}
	groupClick(group);
}

// Функция заполняет блок с указанным id таблицей со всеми существующими SNMP-сообществами
function viewCommunity(id){
$.getJSON(
	'asyncscripts/viewCommunity.php',
	{mode: 0},
	function(data){
		var html = "<table><tr><td colspan=\"2\">Список существующик SNMP-community</td></tr>";
		var l = data.length;
		for(var i=0; i<l; i++)
			html += "<tr><td><input type=\"checkbox\" name=\"com\" /></td><td>" + data[i] + "</td></tr>";
		html += "</table>";
		$('#' + id).html(html);
	}
);
}

function showGroupList (wanted_group) {
	group = wanted_group;
	var list = $('#group_list');
	list.html("");
	$.getJSON(
	   	'asyncscripts/getGroupList.php',
	   	{g: wanted_group},
	   	function (groups) {
	   		group_pos = [];
	   		var l = groups.length;
	   		for (var i = 0; i < l; i += 4) {
	   			list.append('<img src="img/plus.png" width="16px" height="16px" />&nbsp;<span onclick="groupClick(\'' + groups[i + 1] + '\')">' + groups[i] + '</span><br />');
	   			group_pos[i] = groups[i];		// Имя группы
	   			group_pos[i+1] = groups[i+1];	// Ключ
	   			group_pos[i+2] = groups[i+2];	// Х
	   			group_pos[i+3] = groups[i+3];	// Y
			}
			redraw_all();
	   	}
	);
}

function getDevices (wanted_group) {
	$.getJSON(
		'asyncscripts/getDeviceList.php',
		{g: wanted_group},
		function (devices) {
			var l = devices.length;
			if (l < device_pos.length) device_pos = [];
			for (var i = 0; i < l; i += 6 ) {
				device_pos[i] = devices[i];		// Name
				device_pos[i+1] = devices[i+1];	// Key
				device_pos[i+2] = devices[i+2];	// PosX
				device_pos[i+3] = devices[i+3];	// PosY
				device_pos[i+4] = devices[i+4];	// Type
				if (!device_pos[i+5]) device_pos[i+5] = devices[i+5]; // State
			}
			redraw_all();
		}
	);
}

function getLinks (wanted_group) {
	$.getJSON(
		'asyncscripts/getLinks.php',
		{g: wanted_group},
		function (data) {
			var l = data.length;
			if (l < links.length) links = [];
			for (var i = 0; i < l; i += 5 ) {
				links[i] = data[i];		// x1
				links[i+1] = data[i+1];	// y1
				links[i+2] = data[i+2];	// x2
				links[i+3] = data[i+3];	// y2
				links[i+4] = data[i+4];	// color
			}
			redraw_all();
		}
	);
}

function showAdressString (wanted_group) {
	var string = $('#header');
	string.html('<a href="#" onclick="groupClick(1)">Сетевой менеджер</a>');
	{
		$.getJSON(
		   	'asyncscripts/getGroupString.php',
		   	{g: wanted_group},
		   	function (groups) {
		   		var l = groups.length;
		   		for (var i = l-1; i >= 0; i -= 2) {
		   			string.append(' / <a href="#" onclick="groupClick(' + groups[i] + ')">' + groups[i - 1] + '</a>');
				}
		   	}
		);
	}
}

function groupClick (wanted_group) {
	showGroupList (wanted_group);
	showAdressString (wanted_group);
	getDevices(wanted_group);
	getLinks(wanted_group);
	state();
}

function showColor() {
	$('#color_span').css('background-color', '#' + $('#s_group_link_color').val() );
}

function send_new_coordinates (group_or_device, index) {
	if (group_or_device == 0)
		$.post(
			'asyncscripts/refreshGroupPosition.php',
			{key: group_pos[index + 1],
			x: group_pos[index + 2],
			y: group_pos[index + 3]}
		);
	else if(group_or_device == 1)
		$.post(
			'asyncscripts/refreshDevicePosition.php',
			{key: device_pos[index + 1],
			x: device_pos[index + 2],
			y: device_pos[index + 3]}
		);
}

function closeDialog (id) {
	$('#' + id).dialog('close');
}

function deleteDevice (key) {
	$.post('asyncscripts/restart.pl');
	$.post('asyncscripts/delete_device.php',
		{k: device_pos[key+1]},
		function () {
			groupClick(group);
		});
	closeDialog('device_delete_block');
}

function applyPropertiesChange () {
	var device_name = $('#add_device_name').val();
	var device_ip = $('#add_device_ip').val();
	var device_prot = $('#add_device_prot').val();
	var device_port = $("#add_device_port").val();
	if (device_name == "" || device_ip == "" || (device_prot == "tcp" && device_port == ""))
		error ('add_device_block', 'Устройство не добавлено - не все поля заполнены.', 25);
	else {
		$.ajaxSetup({cache: false});
		$.post('asyncscripts/changeDeviceProperties.php',
			{name: device_name,
			ip: device_ip,
			community: $('#add_device_community').val(),
			polling: device_prot,
			port: device_port,
			type: $('#add_device_type').val(),
			dev: device_pos[drag_index + 1]},
			function(){ }
		);
		$.post('asyncscripts/restart.pl');
		$("#add_device_block").dialog('close');
	}
	groupClick(group);
}

function apply_settings_change() {
	var log = false;
	if ($('#log').attr('checked') == 'checked')
		log = true;
	$.post('asyncscripts/change_settings.php',
		{pi: $('#polling_interval').val(),
		l: log},
		function() {
			$.post('asyncscripts/restart.pl');
			$('#apply_settings_change').attr('disabled', 'disabled');
		}
	);
}

function get_settings() {
	$.getJSON('asyncscripts/get_settings.php',
		function (data) {
			polling_interval = data[0];
			$('#polling_interval').val(polling_interval);
			if (data[1] == 't'){
				keep_log = data[1];
				$('#log').attr('checked', 'checked');
			}
			$('#panel > *').change(function (){
				$('#apply_settings_change').removeAttr('disabled');
			});
		}
	);
}

function add_link () {
	$.post('asyncscripts/addLink.php',
		{c: $('#s_group_link_color').val(),
		f: device_pos[drag_index+1],
		s: $('#second_device').val()},
		function () {
			redraw_all();
			closeDialog('add_device_link');
		}
	);
}

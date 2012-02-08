// Оображает блок контекстного меню при нажатии на канвас
function map_context_menu_show (event) {
	drag = false;
	var can = document.getElementById('map');
	// Определяем, на куда мы кликнули
	var win_posx = event.clientX, win_posy = event.clientY;
	// Определяем, на что мы кликнули (от этого зависит содержание меню)
	var what = who_was_clicked(win_posx - can.offsetLeft, win_posy - can.offsetTop);
	if (what == 0 ) { // Если кликнули на группу
		$('#context_menu').html(html_group);
	}
	else if (what == 1) { // Если кликнули на устройство
		$('#context_menu').html(html_device);
	}
	else { // Если кликнули в молоко
		$('#context_menu').html(html_milk);
	}
	// Вычисление позиции возниконовения диалогового окна
	var doc_h = $(document).height(), doc_w = $(document).width();
	var win_h = menu.outerHeight(), win_w = menu.outerWidth();
	if (doc_h - win_posy <= win_h) win_posy -= win_h;
	if (doc_w - win_posx <= win_w) win_posx -= win_w;
	// Отображение окна до задания позиции, для корректной работы
	if (menu.css('display') != 'block') {
		hider.toggle();
		menu.toggle('fast');
	}
	// Задание позиции окна
	menu.offset({ left: win_posx, top: win_posy });
	return false;
}

// Скрывает контекстное меню и див под ним
function map_context_menu_hide () {
	if(menu.css('display') == 'block'){ 
		hider.toggle();
		menu.toggle();
		return false;
	}
}
	
// Генерирует заполнение для блока добавления нового устройства
function showAddDeviceBlock(){
	map_context_menu_hide();
	var device = $("#add_device_block");		// Отображаем блок добавления
	device.dialog({
		height: 260,
		width: 510,
		modal: true,
		resizable: false,
		draggable: true,
		close: function () { polling_flag = false; },
		title: 'Добавить устройство'
	});
	device.html(html_add_device);				// Заполняем его
	device.append(html_add_device_button);
	// Генерация элементов Селекта SNMP-community
	$.getJSON(
		'asyncscripts/viewCommunity.php',
		function(data){
			var community = $('#add_device_community'); 
			l = data.length;
			for (i = 0; i < l; i++)
				if (data[i] != 'public')
					community.append('<option value="' + data[i] + '">' + data[i] + '</option>');
				else
					community.append('<option value="' + data[i] + '" selected>' + data[i] + '</option>');
		}
	);
}

// Генерирует заполнение для блока добавления нового SNMP-сообщества
function showAddCommunityBlock(){
	var community = $("#add_community_block");
	community.dialog({
		height: 140,
		width: 400,
		resizable: false,
		draggable: true,
		title: '<a href="http://bektop.net">Добавить community</a>'
	});
	community.html(html_add_community);
}

// Отображает поле ввода для порта, если выбран тип опроса не ICMP
function showDevicePort() {
	if ($("#add_device_prot :selected").val() != "icmp")
		$('#add_device_port_block').html('<input type="text" id="add_device_port" size="6" value="Port" />');
	else
		$('#add_device_port_block').html("");
}

// Функция удлинняет окно с id на px пикселей, добавляя вниз блок с сообщением message, если сообщение не было добавлено ранее
function error (id, message, px) {
	// Если сообщение об ошибке не выводилось
	if ($("#error_" + id).text() == "") {
		// 
		$('#' + id).dialog('option', 'height', $('#' + id).dialog('option', 'height') + px);
		$('#' + id).append('<div id="error_' + id + '"></div>');
		$('#error_' + id).html('<span class="error_message">' + message + '</span>');
	}
}

// Функция скрывает аккордеон с панелями и раздвигает канвас при клике на разделитель
function constrict(){
	var accord = $('.accordion'), constr = $('.constrictor'), map = $('#map');
	if (accord.is(':visible')) {
		accord.toggle();
		constr.css('margin-left', '0');
		cw = canvas_width_panel_close;
		map.attr('width', cw);
		redraw_all();
	}
	else {
		accord.toggle();
		constr.css('margin-left', '20%');
		cw = canvas_width_panel_open;
		map.attr('width', cw);
		redraw_all();
	}
}

// Функция отображает секцию элементов потребных для поллинга
function add_device_polling_flag_click() {
	var chk = $('#add_device_polling_flag').attr('checked');
	if (chk == 'checked' && polling_flag == false) {
		polling_flag = true;
		var device = $('#add_device_block');
		device.dialog('option', 'height', device.dialog('option', 'height') + 33);
		$('#add_device_labels').append('<div class="label"><label>Протокол опроса (polling):</label></div>');
		$('#add_device_inputs').append(
		'<select id="add_device_prot" onchange="showDevicePort()">' +
			'<option value="icmp" selected>ICMP</option>' +
			'<option value="udp">UDP</option>' +
			'<option value="tcp">TCP</option>' +
		'</select>' +
		'<span id="add_device_port_block"></span>');
	}
}

// Генерирует заполнение для блока добавления новогй группы
function showAddGroupBlock() {
	map_context_menu_hide();
	var device = $("#add_group_block");
	device.dialog({
		height: 135,
		width: 500,
		modal: true,
		resizable: false,
		draggable: true,
		title: 'Добавить группу'
	});
	device.html(html_add_group);
}

function showPicture() {
	$('#pic').attr("src", $('#add_device_type').val());
}

function gand_click() {
	dgm_drag = -1;
}

function showAddGroupLinkBlock() {
	
}

function showDeleteGroupBlock() {
	
}

function showGroupPropertiesBlock() {
	
}

function showDeviceLog(what) {
	if (what != -1) what = device_pos[drag_index+1];
	$.getJSON('asyncscripts/show_log.php',
		{d: what},
		function (data) {
			map_context_menu_hide();
			var log = $("#device_log_block");
			log.dialog({
				height: 700,
				width: 750,
				modal: true,
				position: ['center', 'top'],
				resizable: false,
				draggable: true,
				title: 'События устройства'
			});
			log.html("");
			log.append('<span class="tl">Устройство</span>' +
				'<span class="tc">Время</span>' +
				'<span class="tr">Событие</span><br />');
			var l = data.length;
			for (i = 0; i < l ; i += 3) {
				var eve;
				if (data[i+2] == 1) eve = 'Устройство стало достижимо';
				else eve = 'Устройство стало не достижимо';
				var temp_time = data[i+1].split(' ');
				var time = temp_time[0] + ' ' + (temp_time[1].split('.'))[0];
				log.append('<span class="tl">' + data[i] + '</span>' +
					'<span class="tc">' + time + '</span>' +
					'<span class="tr">' + eve + '</span><br />');
			}
			if (what != -1) {
				log.dialog('option', 'height', 87 + l * 10);
			}
		}
	);	
}

function showAddLinkBlock() {
	map_context_menu_hide();
	var link = $("#add_device_link");
	link.dialog({
		height: 205,
		width: 430,
		modal: true,
		resizable: false,
		draggable: true,
		title: 'Связать устройства'
	});
	link.html(html_add_device_link);
	$('#first_linked_device_name').html(device_pos[drag_index]);
	for (var i = 0; i < device_pos.length; i += 6)
		if (i != drag_index)
			$('#second_device').append('<option value="' + device_pos[i+1] + '">' + device_pos[i] + '</option>');
}

function showDeleteDeviceBlock() {
	map_context_menu_hide();
	var del = $("#device_delete_block");
	del.dialog({
		height: 130,
		width: 270,
		modal: true,
		resizable: false,
		draggable: true,
		title: 'Удаление устройства'
	});
	del.html(html_delete_device);
}

function showDevicePropertiesBlock() {
	map_context_menu_hide();
	var dev_prop = $("#add_device_block");
	dev_prop.dialog({
		height: 260,
		width: 510,
		modal: true,
		resizable: false,
		draggable: true,
		close: function () { polling_flag = false; },
		title: 'Изменить устройство'
	});
	dev_prop.html(html_add_device);
	dev_prop.append(html_device_properties_button);
	
	$.getJSON('asyncscripts/viewCommunity.php',
		function(data){
			var community = $('#add_device_community'); 
			l = data.length;
			for (i = 0; i < l; i++)
				community.append('<option value="' + data[i] + '">' + data[i] + '</option>');
		}
	);
	
	$.getJSON('asyncscripts/getDeviceProperties.php',
		{k: device_pos[drag_index + 1]},
		function (data) {
			$('#add_device_name').val(data[0]);
			$('#add_device_ip').val(data[1]);
			$('#add_device_type').val(data[2]);	showPicture();
			$('#add_device_community').val(data[3]);
			if (data[4] == 't') {
				$('#add_device_polling_flag').click();
				add_device_polling_flag_click();
				$('#add_device_prot').val(data[5]);
				showDevicePort();
				if (data[6]) $('#add_device_port').val(data[6]);
			}
		}
	);
}
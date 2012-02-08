html_delete_device = 
'<div class="label"><label>Удалить устройство?</label></div>' +
'<center><div style="width: 90%; margin-bottom: 8px;">' +
	'<input type="button" value="Да" onclick="deleteDevice(drag_index)" />' +
	'<input type="button" value="Не" onclick="closeDialog(\'device_delete_block\')" />' +
'</div></center>';
// Варианты содеражания контекстного меню
html_milk = '<span>' +
	'<span class="context_square"></span>' +
	'<span onclick="showAddDeviceBlock()">Добавить устройство</span>' +
'</span>' +
'<span>' +
	'<span class="context_square"></span>' +
	'<span onclick="showAddGroupBlock()">Добавить группу</span>' +
'</span>';

html_group = '<span>' +
	'<span class="context_square"></span>' +
	'<span onclick="showAddGroupLinkBlock()">Связать с группой</span>' +
'</span>' +
'<span>' +
	'<span class="context_square"></span>' +
	'<span onclick="showDeleteGroupBlock()">Удалить группу</span>' +
'</span>' +
'<span>' +
	'<span class="context_square"></span>' +
	'<span onclick="showGroupPropertiesBlock()">Свойства</span>' +
'</span>';

html_device = '<span>' +
	'<span class="context_square"></span>' +
	'<span onclick="showAddLinkBlock()">Связать с устройством</span>' +
'</span>' +
'<span>' +
	'<span class="context_square"></span>' +
	'<span onclick="showMoveDeviceBlock()">Переместить в др. группу</span>' +
'</span>' +
'<span>' +
	'<span class="context_square"></span>' +
	'<span onclick="showDeleteDeviceBlock()">Удалить устройство</span>' +
'</span>' +
'<span>' +
	'<span class="context_square"></span>' +
	'<span onclick="showDevicePropertiesBlock()">Изменить</span>' +
'</span>' +
'<span>' +
	'<span class="context_square"></span>' +
	'<span onclick="showDeviceLog()">Посмотреть лог</span>' +
'</span>';

/*html_add_device_link = 
// Первый блок див с подписями к полям
'<div style="float: left;" id="add_device_labels">' +
	'<div style="height: 4px"></div>' +
	'<div class="label"><label id="first_linked_group_name"></label></div>' +
	'<div class="label">' +
		'<label>Порт:</label>' +
		'<input type="text" id="first_linked_group_port" size="6"/>' +
	'</div>' +
	'<div class="label">' +
		'<label><input type="radio" name="color_select" checked/>&nbsp;Выбрать цвет</label>' +
	'</div>' +
	'<div class="label">' +
		'<select id="s_group_link_color" style="width: 6em;" onchange="showColor()">' +
			'<option value="000000">Черт</option>' +
			'<option value="ff0000">Каждый</option>' +
			'<option value="ff9900">Охотник</option>' +
			'<option value="ffff00">Желает</option>' +
			'<option value="009900">Знать</option>' +
			'<option value="0099ff">Где</option>' +
			'<option value="0000ff">Сидит</option>' +
			'<option value="660099">Фазан</option>' +
		'</select>' +
		'<span id="color_span"></span>' +
	'</div>' +
'</div>' +
'<div style="float: right; margin-right: 15px;" id="add_device_inputs">' +
	'<div class="label"><label id="second_linked_group_name"></label></div>' +
	'<div class="label">' +
		'<label>Порт:</label>' +
		'<input type="text" id="first_linked_group_port" size="6" />' +
	'</div>' +
	'<div class="label">' +
		'<label><input type="radio" name="color_select"/>&nbsp;Вписать цвет</label>' +
	'</div>' +
	'<label disabled>#&nbsp;</label>' +
	'<input type="text" id="t_group_link_color" disabled /><br />' +
'</div>' +
'<div style="width: 30%; margin-bottom: 8px;">' +
	'<input type="button" value="Добавить" onclick="addDevice()" />' +
'</div>';*/

html_add_device_link = 
// Первый блок див с подписями к полям
'<div style="float: left;" id="add_device_labels">' +
	'<div style="height: 4px"></div>' +
	'<div class="label"><label id="first_linked_device_name"></label></div>' +
	'<div class="label">' +
		'<label>Выбрать цвет</label>' +
	'</div>' +
	'<div class="label">' +
		'<select id="s_group_link_color" style="width: 6em;" onchange="showColor()">' +
			'<option value="000000">Черт</option>' +
			'<option value="ff0000">Каждый</option>' +
			'<option value="ff9900">Охотник</option>' +
			'<option value="ffff00">Желает</option>' +
			'<option value="009900">Знать</option>' +
			'<option value="0099ff">Где</option>' +
			'<option value="0000ff">Сидит</option>' +
			'<option value="660099">Фазан</option>' +
		'</select>' +
		'<span id="color_span"></span>' +
	'</div>' +
'</div>' +
'<div style="float: right; margin-right: 15px;" id="add_device_inputs">' +
	'<div class="label">' +
		'<label>Выбрать устройство</label><br />' +
		'<select stile="width: 6em;" id="second_device"></select>' +
	'</div>' +
	//'<div class="label"><label id="second_linked_group_name"></label></div>' +
'</div>' +
'<div style="width: 30%; margin-bottom: 8px;">' +
	'<input type="button" value="Связать" onclick="add_link()" />' +
'</div>'

// Текст блока добавления устройства
html_add_device =
// Первый блок див с подписями к полям
'<div style="float: left;" id="add_device_labels">' +
	'<div style="height: 4px"></div>' +
	'<div class="label"><label>* Название устройства:</label></div>' +
	'<div class="label"><label>* IP-адрес:</label></div>' +
	'<div class="label"><label>SNMP-community:</label></div>' +
	'<div class="label"><label>Тип устройства:</label></div>' +
	'<div class="label"><label>Опрашивать устройство:</label></div>' +
'</div>' +
// Второй блок див с полями (тэг form не нужен - данные формы отправляются асинхронным скриптом)
'<div style="float: right; margin-right: 15px;" id="add_device_inputs">' +
	'<input type="text" id="add_device_name"/><br />' +
	'<input type="text" id="add_device_ip" /><br />' +
	'<select id="add_device_community" style="width: 10em margin: 2;"></select>' +
	'<input type="button" value="+" style="margin-left:-2px; height: 28spx; width: 28px;" onclick="showAddCommunityBlock()"><br />' +
	'<select id="add_device_type" onchange="showPicture()">' +
		'<option value="img/router.png">Маршрутизатор</option>' +
		'<option value="img/mikrotik.png">Микротик</option>' +
		'<option value="img/commutator.png">Коммутатор</option>' +
		'<option value="img/dslam.png">DSLAM</option>' +
		'<option value="img/server.png">Сервер</option>' +
		'<option value="img/polycom.png">Поликом</option>' +
	'</select><img id="pic" src="img/router.png" height="20px"/><br/>' +
	'<input type="checkbox" id="add_device_polling_flag" onclick="add_device_polling_flag_click()"><br />' +
'</div>';

html_add_device_button =
'<div style="width: 30%; margin-bottom: 8px;">' +
	'<input type="button" value="Добавить" onclick="addDevice()" />' +
'</div>';

html_device_properties_button = 
'<div style="width: 60%; margin-bottom: 8px;">' +
	'<input type="button" value="Применить" onclick="applyPropertiesChange()" />' +
	'<input type="button" value="Отмена" onclick="closeDialog(\'add_device_block\')" />' +
'</div>'; 
// Текст блока добавления сообщества
html_add_community =
'<div style="float: left;"><div class="label"><label>SNMP-community:</label></div></div>' +
'<div style="float: right; margin-right: 10px;"><input type="text" id="add_community" /></div>' +
'<div style="width: 30%; margin-bottom: 8px;"><input type="button" value="Добавить" onclick="addCommunity()" /></div>';
	
// Текст блока добавленя группы
html_add_group =
// Первый блок див с подписями к полям
'<div style="float: left;">' +
	'<div style="height: 4px"></div>' +
	'<div class="label"><label>* Название группы:</label></div>' +
'</div>' +
// Второй блок див с полями (тэг form не нужен - данные формы отправляются асинхронным скриптом)
'<div style="float: right; margin-right: 15px;">' +
	'<input type="text" maxlength="20" id="add_group_name"/><br />' +
'</div>' +
'<div style="width: 30%; margin-bottom: 8px;">' +
	'<input type="button" value="Добавить" onclick="addGroup()" />' +
'</div>';

	
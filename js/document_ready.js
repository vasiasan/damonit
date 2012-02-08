$(document).ready(function() {
	// Запускаем интервалы проверки состояния устройств
	un_interval = setInterval( function () { unreachable(); }, 10000);
	gp_interval = setInterval( function () { state(); }, 10000);
	// Пригодятся
	hider = $('#context_menu_hider');
	menu = $("#context_menu");
	// Задаем параметры аккордиона
	$("#accordion").accordion({fillSpace: true});
	// Задаем начальное разрешение канвасу карты устройств и ставим прослушку событий на канвас
	var map = $('#map');
    map.attr('width', cw);
    map.attr('height', ch);
    map.mousedown(function (e) { canvas_listener_mousedown(e); });
    map.mousemove(function (e) { canvas_listener_mousemove(e); });
	map.mouseup(function (e) { canvas_listener_mouseup(e); });
	map.dblclick(function (e) { canvas_listener_dblclick(e); });
	// Собираем настройки с БД и применяем их
	get_settings();
	// Отображаем группу root и опрашиваем устройства, если они в ней есть
	groupClick(1);
	state();
});
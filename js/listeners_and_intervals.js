function canvas_listener_mousedown(e) {
	// Получаем карту и координаты клика
	var can = document.getElementById('map');
	cur_x = e.pageX - can.offsetLeft;
	cur_y = e.pageY - can.offsetTop;
	// Если нужно перетягивать карту
	if (dgm_drag == -1) {
		// Здесь код, описывающих поведение перетаскиваемой карты
	}
	else {
		dgm_drag = who_was_clicked (cur_x, cur_y);
		if (dgm_drag != 2) drag = true;
	}
}

function canvas_listener_mouseup (e) {
	drag = false;
	send_new_coordinates (dgm_drag, drag_index);
	dgm_drag = 2;
	drag_index = -1;
	drag_line = [];
}

function canvas_listener_mousemove (e) {
	var can = $('#map');
	var offset = can.offset();
	x = e.pageX - offset.left;
	y = e.pageY - offset.top;
	if (drag){
	    if (dgm_drag == 0) 	{
	    	group_pos[drag_index + 2] = x;
	    	group_pos[drag_index + 3] = y;
	    }
	    else {
	    	device_pos[drag_index + 2] = x;
	    	device_pos[drag_index + 3] = y;
	    	for (var i = 0; i < drag_line.lenght; i++){
	    		links[drag_line[i]] = x;
	    		links[drag_line[i] + 1] = y;
	    	}
	    }
	    redraw_all();
	}
	else if ( pointer_on_gd( x, y ) ) can.css('cursor', 'pointer');
		else can.css('cursor', 'default');
}

function canvas_listener_dblclick (e) {
	var offset = $('#map').offset();
	var who = who_was_clicked (e.pageX - offset.left, e.pageY - offset.top);
	if (who == 0) {
		groupClick(group_pos[drag_index + 1]);
	}
	else if (who == 1) {
		$.getJSON('asyncscripts/getDeviceProperties.php',
			{k: device_pos[drag_index + 1]},
			function (data) {
				window.open("http://" + data[1], '_blank');
			});
	}
}

function unreachable () {
	$.post('asyncscripts/unreachable.pl', 
		function (data) {
			data = data.split(' ');
			var l = data.length;
			if (l == 1) {
				clearInterval(alert_interval)
			}
			else if (!alert_interval) {
				var title_text = "Сетевой менеджер";
				var alert_title = "Устройство отвалилось";
				var title = $('title');
				var icon = $('#icon');
				alert_interval = setInterval(function () {
					if (title.html() == title_text) {
						title.html(alert_title);
						icon.attr('href', 'img/favicon.png');
					}
					else {
						title.html(title_text);
						icon.attr('href', 'img/fav_red.png');
					}
				}, 1000);
			}
		}
	);
}

function state () {
	$.get('asyncscripts/gp_dev_state.pl',
		{g: group},
		function (data) {
			data = data.split(' ');
			var l = data.length;
			for (var i = 0; i < l; i += 2) {
				for (var j = 0; j < device_pos.length; j += 6)
					if (device_pos[j+1] == data[i]){
						device_pos[j+5] = data[i+1];
						break;
					}
			}
			redraw_all();
	});
}

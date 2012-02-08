// Рисует сеточку на карте
function drawGrid ( w, h ) {
	var drawingCanvas = document.getElementById('map');
    	if (drawingCanvas && drawingCanvas.getContext) {
	     map = drawingCanvas.getContext('2d');
	     map.clearRect(0, 0, cw, ch);
	     map.beginPath();
	     for (i = 0.5; i < w; i += 10) {
	     	map.moveTo( i, 0 );
	     	map.lineTo( i, h );
	     }
	     for (i = 0.5; i < h; i += 10) {
	     	map.moveTo( 0, i );
	     	map.lineTo( w, i );
	     }
	     map.strokeStyle = '#b9b9b9';
	     map.stroke();
	}
}

// Рисует картинку
function draw_image ( sourse, x_pos, y_pos, state, need_text, text) {
	var drawingCanvas = document.getElementById('map');
	var map = drawingCanvas.getContext('2d');
	var img = new Image();
	// Цвет лампочки состояний
	var color;
	if ( state >= 0.8 ) color = 'green';
	else if ( state < 0.8 && state >= 0.6 ) color = 'yellow';
	else if ( state < 0.6 && state >= 0.4 ) color = 'orange';
	else if ( state < 0.4) color = 'red';
	img.src = sourse;
	img.onload = function () { map.drawImage( img, x_pos - 25, y_pos - 25, 50, 50 ) };
	// Если нужен текст, пишем ео с выравниванием посередине
	if ( need_text ) {
		map.textAlign = 'center';
		map.textBaseline = 'top';
		map.font = 'normal 15px Garamond';
		map.fillText ( text, x_pos, y_pos - (-30) );
	}
	// Если это не группа рисуем лампочку состояния
	if (sourse != "img/group.png") {
		map.beginPath();
		//map.arc(x_pos - (-25), y_pos - 25, 5, 0, Math.PI * 2, false);
		map.arc(x_pos, y_pos, 50, 0, Math.PI * 2, false);
		map.closePath();
		map.fillStyle = color;
		map.stroke();
		map.fill();
		map.fillStyle = 'black';
	}
}

// Рисуем линию
function line (x1, y1, x2, y2, c) {
	var drawingCanvas = document.getElementById('map');
	map = drawingCanvas.getContext('2d');
	map.beginPath();
	map.moveTo(x1 - 0.5, y1 - 0.5);
	map.lineTo(x2 - 0.5, y2 - 0.5);
	map.moveTo(x1, y1);
	map.lineTo(x2, y2);
	map.moveTo(x1 + 0.5, y1 + 0.5);
	map.lineTo(x2 + 0.5, y2 + 0.5);
	map.strokeStyle = '#' + c;
	map.stroke();
}

// Проверяя все массивы возвращает 1, если кликнули на устройство, 0 на группу и 2 в молоко
function who_was_clicked (x1, y1) {
	var l = device_pos.length;
	var ll = links.length;
	for (var i = l - 6; i >= 0; i -= 6 )
		if ( ( Math.pow( (device_pos[i+2] - x1), 2 ) + Math.pow( (device_pos[i+3] - y1), 2 ) ) <= Math.pow( r, 2 ) ) {
			drag_index = i;
			for (var j = 0, k = 0; j < ll; j+=2) {
				if ((j+1) % 5 == 0) {
					j++;
				}
				if(links[j] == device_pos[i+2] && links[j+1] == device_pos[i+3]) {
					drag_line[k] = j;
					k++;
				}
			}
			return 1;
		}
	var l = group_pos.length;
	for (var i = l - 4; i >= 0; i -= 4 )
		if ( ( Math.pow( (group_pos[i+2] - x1), 2 ) + Math.pow( (group_pos[i+3] - y1), 2 ) ) <= Math.pow( r, 2 ) ) {
			drag_index = i;
			return 0;
		}
	return 2;
}

// Перерисовывает карту сначала рисуя сетку, затем линии, затем группы, затем устройства
function redraw_all () {
	drawGrid(cw, ch);
	var l = links.length;
	for (var i = 0; i < l; i += 5) {
		line(links[i], links[i+1], links[i+2], links[i+3], links[i+4]);
	}
	l = group_pos.length;
	for (var i = 0; i < l; i += 4) {
		draw_image('img/group.png', group_pos[i+2], group_pos[i+3], device_pos[i+5], 1, group_pos[i]);
	}
	l = device_pos.length;
	for (var i = 0; i < l; i += 6) {
		draw_image( device_pos[i+4], device_pos[i+2], device_pos[i+3], device_pos[i+5], 1, device_pos[i]);
	}
}

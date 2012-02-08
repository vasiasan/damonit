// Если указатель находится над группой или устройством, меняем его значек на указатель
function pointer_on_gd (x1, y1) {
	var l = device_pos.length;
	for (var i = l - 6; i >= 0; i -= 6 )
		if ( ( Math.pow( (device_pos[i+2] - x1), 2 ) + Math.pow( (device_pos[i+3] - y1), 2 ) ) <= Math.pow( r, 2 ) ) return 1;
	var l = group_pos.length;
	for (var i = l - 4; i >= 0; i -= 4 )
		if ( ( Math.pow( (group_pos[i+2] - x1), 2 ) + Math.pow( (group_pos[i+3] - y1), 2 ) ) <= Math.pow( r, 2 ) ) return 1;
	return 0;
}
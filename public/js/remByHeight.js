function fontAuto(){
	var h = document.documentElement.clientHeight;
	document.documentElement.style.fontSize = h / 104.1 + 'px';
}
fontAuto();
window.onresize=function(){
	fontAuto();
} 
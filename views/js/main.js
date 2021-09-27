var ip = location.host;
var src="http://" + ip + "/kartor/karta_hd.png";
document.addEventListener("DOMContentLoaded", function(){
    var img = document.getElementById('karta').src = src;
    

    jQuery.get('location',function(data){
	globalData = data;
	data.personer.forEach(element => {
	    console.log(element['bilder'][0])
	    var karta = document.getElementById('karta')
	    var body = document.getElementById('mainbody')
	    var kartWidth = karta.clientWidth
	    var kartHeight = karta.clientHeight
	    var bodyWidth = body.clientWidth
	    var bodyHeight = body.clientHeight
	    var width = kartWidth/bodyWidth
	    var height = kartHeight/bodyHeight
	    console.log(kartWidth,kartHeight)

	    $("#image").prepend('<div class="person-bilder" id="' + element['namn'] + '" style="top:' + (element['position'][0]*kartHeight) + 'px; left:' + (element['position'][1]*kartWidth) + 'px;"> <img src="' + element['bilder'][0] + '"/></div>')
	    var offset = [0,0];
	    var divOverlay = document.getElementById(element['namn']);
	    var kartapos = document.getElementById('karta').getBoundingClientRect();
	    
	    console.log("karta: " + kartapos.left);
	    var isDown = false;
	    divOverlay.addEventListener('mousedown', function(e) {
		isDown = true;
		offset = [
		    divOverlay.offsetLeft - e.clientX,
		    divOverlay.offsetTop - e.clientY
		];
	    }, true);
	    document.addEventListener('mouseup', function() {
		isDown = false;
	    }, true);

	    document.addEventListener('mousemove', function(e) {
		event.preventDefault();
		if (isDown) {
		    divOverlay.style.left = (e.clientX + offset[0]) + 'px';
		    divOverlay.style.top  = (e.clientY + offset[1]) + 'px';
		    console.log(divOverlay.offsetLeft);
		    element['position'][0] = (divOverlay.offsetTop / kartHeight);
		    element['position'][1] = (divOverlay.offsetLeft / kartWidth);
		}
	    }, true);

	    divOverlay.addEventListener('touchstart', function(e) {
		console.log("touch");
		isDown = true;
		offset = [
		    divOverlay.offsetLeft - e.touches[0].clientX,
		    divOverlay.offsetTop - e.touches[0].clientY
		];
	    }, true);
	    document.addEventListener('touchend', function() {
		isDown = false;
	    }, true);

	    document.addEventListener('touchmove', function(e) {
		if (isDown) {
		    divOverlay.style.left = (e.changedTouches[0].clientX + offset[0]) + 'px';
		    divOverlay.style.top  = (e.changedTouches[0].clientY + offset[1]) + 'px';
		    element['position'][0] = (divOverlay.offsetTop / kartHeight);
		    element['position'][1] = (divOverlay.offsetLeft / kartWidth);
		}
	    }, true);

	});
	
    })
});
function doneClick(){
    console.log(globalData);
    $.post("/request",globalData,
	   function (data, status) {
	       console.log(data);
	   });
}

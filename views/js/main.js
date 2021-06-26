jQuery.get('location',function(data){
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
    console.log(bodyWidth, bodyHeight)

    $("#image").prepend('<img class="person-bilder" src="' + element['bilder'][0] + '" style="top:' + ((element['position'][0]*kartHeight)/(1920)) + 'px; right:' + ((element['position'][1]*kartWidth)/(1080)) + 'px "/>')
});
//  
})
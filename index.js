
window.onload = function(){
	//alert(base.getId("box").innerHTML);
	
	//alert(base.getName("sex")[0].value);
	
	//alert(base.getTagName("p")[0].innerHTML);
	$().getId("box").css("color","red").html("ppp").click(function(){
		alert("ppp");
	});
	$().getTagName("p").eq(0).css("color","blue");
}

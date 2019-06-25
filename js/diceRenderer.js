
$(document).ready(function(e){
	$(".contentDiv").click(function(e){
		if($(".contentDivLayout >.child").hasClass("transform1")){
			$(".contentDivLayout").removeClass("transform1");
		}else{
			$(".contentDivLayout").addClass("transform1");
		}
	});
});
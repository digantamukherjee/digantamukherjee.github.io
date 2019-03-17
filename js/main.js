
$(document).ready(function(e){
	
	/*compensate for the height of fixed positioned navbar to start mainflow after its height*/
	$(".clearHeader").height($(".navbar").outerHeight());
	$(".contentDiv").click(function(e){
		if($(".contentDivLayout >.child").hasClass("transform1")){
			$(".contentDivLayout").removeClass("transform1");
		}else{
			$(".contentDivLayout").addClass("transform1");
		}
	});
});

$(window).on("load", function(){
	
});

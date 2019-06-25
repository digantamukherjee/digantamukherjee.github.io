
$(document).ready(function(e){
	/*compensate for the height of fixed positioned navbar to start mainflow after its height*/
	$(".clearHeader").height($(".navbar").outerHeight());
});

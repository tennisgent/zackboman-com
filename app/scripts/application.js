$(document).ready(function() {
	
	//Sidebar Accordion Menu
	$('.add_menu').accordion();

    $("#sidebar_toggle a").click(function(e){
        if($(this).attr("data-href")){
            $("#sidebar_toggle a").removeClass("active");
            $(this).addClass("active");
            window.location.href = $(this).attr("data-href");
        }
    });
	
	//Placeholder Support For Legacy Browsers
	$('input[placeholder], textarea[placeholder]').placeholder();
	
});
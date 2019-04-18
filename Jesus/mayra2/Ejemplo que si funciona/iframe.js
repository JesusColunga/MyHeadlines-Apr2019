$(document).ready(function () {
    $('a.access').on('click', function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        console.log("URL: " + url);
        $(".modal-body").html('<iframe width="100%" height="100%" frameborder="0" scrolling="yes" allowtransparency="true" src="'+url+'"></iframe>');
    });
	
}); // document.ready

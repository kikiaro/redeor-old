/*
  Jquery Validation using jqBootstrapValidation
  Example is taken from jqBootstrapValidation docs
*/

$(function() {
   $("input,textarea").jqBootstrapValidation(
      {
       preventSubmit: true,
       submitError: function($form, event, errors) {
        // Something to have when submit produces an error ?
        // Not decided if I need it yet
       },
       submitSuccess: function($form, event) {
        event.preventDefault(); // Prevent default submit behavior
         // get values from FORM
         var name = $("input#name").val();
         var email = $("input#email").val();
         var message = $("textarea#message").val();
          var firstName = name; // For Success/Failure Message
             // Check for white space in name for Success/Fail message
          if (firstName.indexOf(' ') >= 0) {
  	   firstName = name.split(' ').slice(0, -1).join(' ');
           }
  	 $.ajax({
                  url: "includes/contact-form/contact_me.php",
              	type: "POST",
              	data: {name: name, email: email, message: message},
              	cache: false,
              	success: function() {
              	// Success message
              	   $('#success').html("<div class='alert alert-success'>");
              	   $('#success > .alert-success').html("")
              		.append( "</button>");
              	  $('#success > .alert-success')
              		.append("<strong>Thanks! Your message has been sent.</strong>");
   		  $('#success > .alert-success')
   			.append('</div>');

   		  // Clear all fields
   		  $('#contactForm').trigger("reset");
   	      },
   	   error: function() {
   		// Fail message
   		 $('#success').html("<div class='alert alert-danger'>");
              	$('#success > .alert-danger').html("")
              	 .append( "</button>");
              	$('#success > .alert-danger').append("WHOA! <strong>Sorry "+firstName+", it seems my email system is having a moment...</strong> Please email us directly at <a href='mailto:kiki@redeor.com'>info@redeor.com</a>.");
   	        $('#success > .alert-danger').append('</div>');
   		// Clear all fields
   		$('#contactForm').trigger("reset");
   	    },
             })
           },
           filter: function() {
                     return $(this).is(":visible");
           },
         });

        $("a[data-toggle=\"tab\"]").click(function(e) {
                      e.preventDefault();
                      $(this).tab("show");
       });
    });


  /* When clicking on full hide fail/success boxes */
  $('#name').focus(function() {
       $('#success').html('');
});

jQuery(document).ready(function ($) {
    $('body').on('blur', '.woocommerce-checkout input.required, .woocommerce-checkout select.required, .woocommerce-checkout textarea.required', function() {
        var $formRow = $(this).closest('.form-row');
        
        // Check if the input is empty
        if ($(this).val().trim() === '') {
            // Add has-error class to form-row if field is empty
            $formRow.addClass('has-error');
        } else {
            // Remove has-error class if field has a value
            $formRow.removeClass('has-error');
        }
    });
     $(".checkout-form .proceed-btn").click(function (e) {
        e.preventDefault(); // Prevent default action
          $("#place_order").click();

    });
});

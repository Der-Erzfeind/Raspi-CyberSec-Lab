jQuery(document).ready(function($) {
    // Function to check if input/select has value and add/remove active class
    function checkValue() {
        $('.form-row input, .form-row select').each(function() {
            if ($(this).val()) {
                $(this).closest('.form-row').addClass('active');
            } else {
                $(this).closest('.form-row').removeClass('active');
            }
        });
    }

    // Run the check on page load
    checkValue();

    // Handle focusin/focusout and input/select change
    $('.form-row input, .form-row select').on('focusin focusout input change', function() {
        if ($(this).val() || $(this).is(':focus')) {
            $(this).closest('.form-row').addClass('active');
        } else {
            $(this).closest('.form-row').removeClass('active');
        }
    });
});


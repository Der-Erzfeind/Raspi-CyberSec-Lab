jQuery(document).ready(function($) {
    // Translating the placeholder attribute of the email input
    $('.mc4wp-form-fields input[name="EMAIL"]').attr('placeholder', mc4wp_translations.email_placeholder);

    // Translating the value of the submit button
    $('.mc4wp-form-fields input[type="submit"]').val(mc4wp_translations.subscribe_button_value);
});

// SEARCH SUGGESTIONS

// Function to decode HTML-encoded characters
function decodeHtmlEntities(text) {
  var tempElement = document.createElement("div");
  tempElement.innerHTML = text;
  return tempElement.textContent || tempElement.innerText;
}

jQuery(document).ready(function ($) {

  $("html").on("click", ".popup-action", function (e) {
    var d = new Date();
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
      soldered_scripts.lang_popup_cookie +
      "=" +
      "true" +
      ";" +
      expires +
      ";path=/";

    closeLanguagePopup();
  });
});

function solderedDebounce(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

// LANGUAGE POPUP
function closeLanguagePopup() {
  jQuery(".popup-overlay").remove();
  jQuery(".popup-content").remove();
  jQuery("html").removeClass("popup-open");
}

(function ($, Drupal, drupalSettings) {
  var cookie = getCookie('cookieflag');
  if (cookie != undefined) {
    checkExistingFlags(cookie, drupalSettings);
  }


  function getCookie(cookieName) {
    // Split the cookie string into an array of individual cookies
    var cookies = document.cookie.split(';');

    // Loop through the cookies to find the one with the specified name
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        // Check if the cookie starts with the specified name
        if (cookie.startsWith(cookieName + '=')) {
            // Extract and return the cookie value
            return cookie.substring(cookieName.length + 1);
        }
    }

    // If the cookie is not found, return null or an appropriate default value
    return null;
  }

  function setCookie(cookieName, cookieValue, expirationDays) {
    var expires = '';

    if (expirationDays) {
        var date = new Date();
        date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }

    document.cookie = cookieName + '=' + cookieValue + expires + '; path=/';
  }


  Drupal.behaviors.cookieFlag = {
    attach: function(context, settings, cookies) {

      $(document).ready( function() {
        var counter = 0;
        var cookie = getCookie("cookieflag");

        $('.cookieflag').once('cookieFlag').bind('click tap', function () {
          $(this).toggleClass('active');

          var nodeId = $(this).attr('data-cookieflag-id');
          if ($(this).hasClass('active')) {
            $(this).html(settings['cookieflag']['cookieflag_flagged_label']);

            // Trigger custom event
            $( document ).trigger( "cookieflagAdded", nodeId );
          }
          else {
            $(this).html(settings['cookieflag']['cookieflag_flag_label']);
            // Trigger custom event
            $( document ).trigger( "cookieflagRemoved", nodeId );
          }
          var cookie = getCookie("cookieflag");
          if (cookie != undefined) {
            if (cookie == '') {
              // Cookie set but empty.
              var newFlags = nodeId;
              counter = 1;
            }
            else {
              var flagged = cookie.split(',');
              var index = flagged.indexOf(nodeId);
              if (index > -1) {
                flagged.splice(index, 1);
              }
              else {
                flagged.push(nodeId);
              }
              counter = flagged.length;
              var newFlags = flagged.join(',');
            }
          }
          // New cookie
          else {
            var newFlags = nodeId;
            counter = 1;
          }

          // Set cookie with new values.
          setCookie('cookieflag', newFlags, 31);
          updateFlagCounter(counter);
        });
      });
    }
  }

  function checkExistingFlags(cookie) {
    var flagged = cookie.split(',');
    $('.cookieflag').once().each(function() {
      var nodeId = $(this).attr('data-cookieflag-id');
      var index = flagged.indexOf(nodeId);
      if (index > -1) {
        $(this).addClass('active');
        $(this).html(drupalSettings['cookieflag']['cookieflag_flagged_label']);
      }
    });
    if (flagged != '' && flagged != undefined) {
      var counter = flagged.length;
      updateFlagCounter(counter);
    }
  }

  function updateFlagCounter(counter) {
    $('.cookieflag-counter .items').text(counter);
    if (counter > 0) {
      $('.cookieflag-counter').addClass('filled');
    }
    else {
      $('.cookieflag-counter').removeClass('filled');
    }
  }

})(jQuery, Drupal, drupalSettings)

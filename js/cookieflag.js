(function ($, Drupal, drupalSettings) {
  var cookie = getCookie('cookieflag');
  if (cookie != undefined) {
    checkExistingFlags(cookie, drupalSettings);
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  Drupal.behaviors.cookieFlag = {
    attach: function(context, settings) {
      var counter = 0;
      var cookie = $.cookie("cookieflag");

      $('.cookieflag').once('cookieFlag').bind('click tap', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
          $(this).text(settings['cookieflag']['cookieflag_flagged_label']);
        }
        else {
          $(this).text(settings['cookieflag']['cookieflag_flag_label']);
        }
        var nodeId = $(this).attr('data-cookieflag-id');
        var cookie = $.cookie("cookieflag");
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
        $.cookie("cookieflag", newFlags, { expires: 31 });
        updateFlagCounter(counter);
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
        $(this).text(drupalSettings['cookieflag']['cookieflag_flagged_label']);
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

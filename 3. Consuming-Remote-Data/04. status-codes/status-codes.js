// Generated by CoffeeScript 1.7.1
(function() {
  var buildRequest, errorBox, fadeError, fadeSuccess, getHttpRequest, resourceUrl, showError, showSuccess, successBox;

  resourceUrl = 'http://localhost:3000/students';

  getHttpRequest = (function() {
    var xmlHttpFactories;
    xmlHttpFactories = [
      function() {
        return new XMLHttpRequest();
      }, function() {
        return new ActiveXObject("Msxml3.XMLHTTP");
      }, function() {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
      }, function() {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
      }, function() {
        return new ActiveXObject("Msxml2.XMLHTTP");
      }, function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }
    ];
    return function() {
      var xmlFactory, _i, _len;
      for (_i = 0, _len = xmlHttpFactories.length; _i < _len; _i++) {
        xmlFactory = xmlHttpFactories[_i];
        try {
          return xmlFactory();
        } catch (_error) {

        }
      }
      return null;
    };
  })();

  successBox = document.getElementById('success-box');

  errorBox = document.getElementById('error-box');

  successBox.style.display = 'none';

  errorBox.style.display = 'none';

  fadeSuccess = function() {
    var opacity;
    opacity = successBox.style.opacity;
    opacity -= 0.07;
    if (opacity <= 0) {
      return successBox.style.display = 'none';
    } else {
      successBox.style.opacity = opacity;
      return setTimeout(fadeSuccess, 100);
    }
  };

  showSuccess = function(message) {
    successBox.innerHTML = message;
    successBox.style.display = '';
    successBox.style.opacity = 1;
    return fadeSuccess();
  };

  fadeError = function() {
    var opacity;
    opacity = errorBox.style.opacity;
    opacity -= 0.07;
    if (opacity <= 0) {
      return errorBox.style.display = 'none';
    } else {
      errorBox.style.opacity = opacity;
      return setTimeout(fadeError, 100);
    }
  };

  showError = function(message) {
    errorBox.innerHTML = message;
    errorBox.style.display = '';
    errorBox.style.opacity = 1;
    return fadeError();
  };

  buildRequest = function(url) {
    var httpRequest;
    httpRequest = getHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
        switch (Math.floor(httpRequest.status / 100)) {
          case 2:
            return showSuccess('Response finished with Success!');
          case 4:
            return showError('Something is wrong with the request');
          case 5:
            return showError('Something is wrong with the server');
          default:
            return showError('Generic error');
        }
      }
    };
    httpRequest.open('GET', url, true);
    return httpRequest;
  };

  document.getElementById('btn-send-success-request').addEventListener('click', function() {
    var httpRequest;
    httpRequest = buildRequest(resourceUrl);
    return httpRequest.send(null);
  });

  document.getElementById('btn-send-error-request').addEventListener('click', function() {
    var httpRequest;
    httpRequest = buildRequest(resourceUrl + 'INVALID_URL');
    return httpRequest.send(null);
  });

}).call(this);

//# sourceMappingURL=status-codes.map

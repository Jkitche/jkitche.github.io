var session = null;

$(function () {
    var loadCastInterval = setInterval(function () {
        if (chrome.cast.isAvailable) {
            console.log('Cast has loaded.');
            clearInterval(loadCastInterval);
            initializeCastApi();
        } else {
            console.log('Unavailable');
        }
    }, 1000);

    $('#castme').click(function () {
        launchApp();
    });
});

$("#submitPlayerInfo").click(function (e) {
            console.log(session.session.sendMessage("urn:x-cast:sendPlayerInfo", JSON.stringify($("#playerInfoForm").serializeObject()), function () {
                    console.log("success")
                }, function () {
                    console.log("fail")
                });
                return false;
            });

        $.fn.serializeObject = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };

        function initializeCastApi() {
            var applicationID = "C2F13B8B";
            var sessionRequest = new chrome.cast.SessionRequest(applicationID);
            var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
            chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
        };

        function sessionListener(e) {
            session = e;
            console.log('New session');
            if (session.media.length != 0) {
                console.log('Found ' + session.media.length + ' sessions.');
            }
        }

        function onInitSuccess() {
            console.log("Initialization succeeded");
        }

        function onInitError() {
            console.log("Initialization failed");
        }

        function receiverListener(e) {
            if (e === 'available') {
                console.log("Chromecast was found on the network.");
            } else {
                console.log("There are no Chromecasts available.");
            }
        }


        function launchApp() {
            console.log("Launching the Chromecast App...");
            chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
        }

        function onRequestSessionSuccess(e) {
            console.log("Successfully created session: " + e.sessionId);
            session = e;
        }

        function onLaunchError() {
            console.log("Error connecting to the Chromecast.");
        }
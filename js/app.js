window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

window.castReceiverManager.onSenderConnected = onChannelOpened;
window.castReceiverManager.onSenderDisconnected = onChannelClosed;

window.customMessageBus = window.castReceiverManager.getCastMessageBus(namespace);
window.customMessageBus.onMessage = onMessage;
window.castReceiverManager.start();

function onMessage(event) {
    var message = event.data;
    var senderId = event.senderId;
    log("message from: " + senderId + " message: " + message);
}

function broadcast(message) {
    window.customMessageBus.broadcast(message);
}
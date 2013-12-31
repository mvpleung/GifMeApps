cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.verso.cordova.clipboard/www/clipboard.js",
        "id": "com.verso.cordova.clipboard.Clipboard",
        "clobbers": [
            "cordova.plugins.clipboard"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/InAppBrowser.js",
        "id": "org.apache.cordova.inappbrowser.InAppBrowser",
        "clobbers": [
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.verso.cordova.clipboard": "0.1.0",
    "org.apache.cordova.console": "0.2.5",
    "org.apache.cordova.inappbrowser": "0.2.5"
}
// BOTTOM OF METADATA
});
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

window._gifme = new Application();
var templates = ['thumb', 'signup_signin', 'tag_page', 'settings', 'info', 'upload'],
    gaPlugin;

var app = {
    // Application Constructor
    initialize: function() {
        // localStorage.clear();
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        if (navigator.userAgent.toLowerCase().match(/iphone/i)) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        } else {
            app.onDeviceReady();
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        if (localStorage.getItem('uuid')) {
            _gifme.user = localStorage.getItem('uuid')
        }
        _gifme.init()

    }
};

_.each(templates, function(template) {
    $.ajax({
        url: 'js/templates/' + template + '.jst',
        dataType: 'HTML',
        type: 'GET',
        async: false,
        success: function(data) {
            _gifme.templates[template] = _.template(data);
        }
    });
});
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

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        //app.receivedEvent('deviceready');
        displayAjaxWaitingIcon();
        getGamesInBackground();
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var displayAjaxWaitingIcon = function () {
    $.mobile.loading('show', {
        text: '',
        textVisible: false,
        theme: 'a',
        html: ''
    });
};

function hideAjaxWaitingIcon () {
    $.mobile.loading('hide');
};

var displayTodaysGames = function (todaysGames) {
    console.log("displaying todays games")
    games = $("#games");
    games.append('<div class="game">');
    games.append(todaysGames.message)
    games.append('</div>');
    hideAjaxWaitingIcon();
};

var getGamesInBackground = function () {
    //navigator.notification.alert("Hello alert!");
    console.log('fetching games in background');
    $.ajax({
        url: "http://192.168.11.2/test",
        dataType: 'jsonp',
        jsonp: "callback",
        crossDomain: true,
        success: function(result) { console.log(result); displayTodaysGames(result); },
        error: function(xhr, status, error) { console.log(status + ' ' + error); }
    });
};

var getDate  = function () {
    // return year, month and day of the month
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    return {year: yyyy, month: m, day: d};
}

var showAlert2 = function () {
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql",
        dataType: 'jsonp',
        jsonp: "callback",
        crossDomain: true,
        data: {
            q: "select * from xml where url = 'https://api.sportsdatallc.org/nhl-t3/games/2014/3/25/schedule.xml'",
            format: 'json'
        },
        success: function (result) { console.log(result); window.alert(result); },
        error: function (xhr, status, error) { window.alert(status + ' ' + error); }
    });
}

var navigateTo = function () {
    window.open('other_page.html');
};

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

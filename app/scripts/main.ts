/// <reference path="./../../typings/knockout/knockout.d.ts" />
/// <reference path="./../../typings/jquery/jquery.d.ts" />

import ko = require("knockout");
import $ = require("jquery");

class AppModel {
    time: KnockoutObservable<string>;
    interval: number;

    constructor() {
        this.time = ko.observable('');
        this.interval = setInterval(() => { this.time(new Date().toTimeString()); }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }
}

ko.applyBindings(new AppModel());
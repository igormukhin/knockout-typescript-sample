/// <reference path="./../../typings/knockout/knockout.d.ts" />
/// <reference path="./../../typings/jquery/jquery.d.ts" />

import ko = require("knockout");
import $ = require("jquery");

class AppModel {
    time: KnockoutObservable<string>;
    interval: number;
    upperTime: KnockoutComputed<string>;

    constructor() {
        this.time = ko.observable('');
        this.interval = setInterval(() => { this.time(new Date().toTimeString()); }, 1000);
        this.upperTime = ko.computed(() => this.time().toUpperCase());
    }

    stop() {
        clearInterval(this.interval);
    }
}

ko.applyBindings(new AppModel());
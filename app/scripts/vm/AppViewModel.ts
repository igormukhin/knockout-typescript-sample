/// <reference path="./../globals.d.ts" />

"use strict";

class AppViewModel {
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

export = AppViewModel;

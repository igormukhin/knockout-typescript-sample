/// <reference path="./references.d.ts" />

import ko = require('knockout');

//import $ = require("jquery");
//window['jQuery'] = window['$'] = $;

import AppViewModel = require('./vm/AppViewModel');

ko.applyBindings(new AppViewModel());

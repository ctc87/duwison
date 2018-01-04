"use strict";
var selectize_configs_1 = require('./selectize.configs');
exports.SINGLE_SELECT_PRESET_VALUE_CONFIG = Object.assign({}, selectize_configs_1.DEFAULT_DROPDOWN_CONFIG, {
    labelField: 'clientes',
    valueField: 'codcli',
    searchField: ['clientes']
});

exports.SINGLE_SELECT_PRESET_VALUE_CONFIG_2 = Object.assign({}, selectize_configs_1.DEFAULT_DROPDOWN_CONFIG, {
    labelField: 'codenv',
    valueField: 'codenv',
    searchField: ['codenv']
});
exports.MULTI_SELECT_PRESET_VALUE_CONFIG = Object.assign({}, selectize_configs_1.DEFAULT_DROPDOWN_CONFIG, {
    labelField: 'label',
    valueField: 'value',
    searchField: ['label'],
    maxItems: 4
});

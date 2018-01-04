import {DEFAULT_DROPDOWN_CONFIG} from './selectize.configs';

export const SINGLE_SELECT_PRESET_VALUE_CONFIG = Object.assign({}, DEFAULT_DROPDOWN_CONFIG, {
	labelField: 'clientes',
	valueField: 'codcli',
	searchField: ['clientes']
});

export const SINGLE_SELECT_PRESET_VALUE_CONFIG_2 = Object.assign({}, DEFAULT_DROPDOWN_CONFIG, {
	 labelField: 'codenv',
    valueField: 'codenv',
    searchField: ['codenv']
});

export const MULTI_SELECT_PRESET_VALUE_CONFIG = Object.assign({}, DEFAULT_DROPDOWN_CONFIG, {
	labelField: 'label',
	valueField: 'value',
	searchField: ['label'],
	maxItems: 4
});
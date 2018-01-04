// import {ExampleSelectizeOption, ExampleGroupableOption, ExampleGroup} from './app.types';
// /**
//  * Created by nicho on 12/17/2016.
//  */
"use strict";
exports.Example_Placeholder = 'Placeholder...';
exports.Example_Placeholder_HasOptions = 'Click to select options';
exports.Example_Placeholder_NoOptions = 'No options available...';
exports.DEFAULT_DROPDOWN_CONFIG = {
    highlight: false,
    create: false,
    persist: true,
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down'
};
exports.SingleSelectConfig = Object.assign({}, exports.DEFAULT_DROPDOWN_CONFIG, {
    labelField: 'label',
    valueField: 'value',
    plugins: ['remove_button'],
    maxItems: 1
});
exports.ExampleValues_Frameworks = [
    {
        label: 'Angular',
        value: 'angular',
        code: 'NG'
    }, {
        label: 'ReactJS',
        value: 'reactjs',
        code: 'RJS'
    }, {
        label: 'Ember JS',
        value: 'emberjs',
        code: 'emjs'
    }, {
        label: 'Ruby on Rails',
        value: 'ruby_on_rails',
        code: 'ROR'
    }
];
exports.ExampleValues_Lanugages = [
    {
        label: 'JavaScript',
        value: 'javascript',
        code: 'js'
    }, {
        label: 'C++',
        value: 'c++',
        code: 'cpp'
    }, {
        label: 'Java',
        value: 'java',
        code: 'j'
    }, {
        label: 'Cascading Style Sheets',
        value: 'css',
        code: 'css'
    }, {
        label: 'Oracle SQL',
        value: 'oracle_sql',
        code: 'osql'
    }
];
exports.ExampleValues_Colors = [
    {
        label: 'Red',
        value: 'red',
        group: 'colors'
    }, {
        label: 'Blue',
        value: 'blue',
        group: 'colors'
    }, {
        label: 'Green',
        value: 'green',
        group: 'colors'
    }, {
        label: 'Dog',
        value: 'dog',
        group: 'animals'
    }
];
exports.ExampleGroups_Colors = [
    {
        group: 'colors',
        label: 'The colors'
    }, {
        group: 'animals',
        label: 'The Animals'
    }
];

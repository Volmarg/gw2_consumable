var levels_attribute = {
    init: function () {
        let selector_prefix = 'level';
        CommonAttributesSelectFilter.fillSelectOptionsWithAttributes('food', selector_prefix);
        CommonAttributesSelectFilter.attachOptionsReinitializationOnChange(selector_prefix);
    },
    reInitialize: function (can_reinit_all = true) {
        CommonAttributesSelectFilter.reInitialize('level',false, can_reinit_all);
    },
};
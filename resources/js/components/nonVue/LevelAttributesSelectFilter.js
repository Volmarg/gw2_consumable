var levels_attribute = {
    init: function () {
        let selector_prefix = 'level';
        CommonAttributesSelectFilter.fillSelectOptionsWithAttributes('food', selector_prefix);
        CommonAttributesSelectFilter.attachOptionsReinitializationOnChange(selector_prefix);
    },
};
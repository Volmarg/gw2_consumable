var rarity_attribute = { //TODO: move it to separate file and bundle
    init: function () {
        let selector_prefix = 'rarity';
        CommonAttributesSelectFilter.fillSelectOptionsWithAttributes('food', selector_prefix);
        CommonAttributesSelectFilter.attachOptionsReinitializationOnChange(selector_prefix);
    },
};

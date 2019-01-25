var rarity_attribute = {
    init: function () {
        let selector_prefix = 'rarity';
        common_utils.manage_selects.fillWithAttributes(selector_prefix);
        common_utils.manage_selects.reinitializeOnChange(selector_prefix, false);
    },
};

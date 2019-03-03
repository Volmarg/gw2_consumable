var rarity_attribute = {
    init: function () {
        let selector_prefix = 'rarity';
        config.init(selector_prefix);
        common_utils.manage_selects.fillWithAttributes(selector_prefix);
        common_utils.manage_selects.reinitializeOnChange(selector_prefix, false);
    },
};

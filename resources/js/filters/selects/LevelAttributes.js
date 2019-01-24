var levels_attribute = {
    init: function () {
        let selector_prefix = 'level';
        common_utils.manage_selects.fillWithAttributes('food', selector_prefix);
        common_utils.manage_selects.reinitializeOnChange(selector_prefix);
    },
};
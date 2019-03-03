var levels_attribute = {
    //start - volmarg

    init: function () {
        let selector_prefix = 'level';
        config.init(selector_prefix);
        common_utils.manage_selects.fillWithAttributes(selector_prefix);
        common_utils.manage_selects.reinitializeOnChange(selector_prefix, false);
    },
    //end - volmarg
};
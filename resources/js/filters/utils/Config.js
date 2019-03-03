var config = {
    options: {
        matching_option_check_method: null,
    },
    init: function (selector_prefix = null) {
        if (selector_prefix === 'level') {
            this.setRangeConfig();
        } else {
            this.setContainOptionConfig();
        }
        this.setCommonDefaultConfig();
        this.setDataConfigAttribute(selector_prefix);
    },
    setDataConfigAttribute: function (selector_prefix) {
        let selector = attribute_selectors.generate_selector.forAttributesSelects(selector_prefix, true);
        let elements = $("[class^='" + selector + "']");

        $(elements).each((index, element) => {
            if ($(element).attr('data-config') === undefined) {
                $(element).attr({'data-config': JSON.stringify(this.options)})
            }
        });

    },
    setCommonDefaultConfig: function () {

    },
    setRangeConfig: function () {
        this.options.matching_option_check_method = 'is_between_range';
    },
    setContainOptionConfig: function () {
        this.options.matching_option_check_method = 'contains_option';

    }
};
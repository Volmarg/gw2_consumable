CommonAttributesSelectFilter = {
    getAttributeValues: function (item_type, searched_attribute_selector) {
        let all_items_of_type = $('#all-' + item_type + '-items-wrapper');
        let all_levels = $(all_items_of_type).find(searched_attribute_selector);
        let array_of_attribute_values = [''];

        $(all_levels).each((index, item) => {
            array_of_attribute_values.push($(item).text());
        });


        return array_of_attribute_values.filter(Utils.onlyUniqueArrayValues).sort((a, b) => {
            return b - a
        });
    },
    fillSelectOptionsWithAttributes: function (item_type, searched_attribute_selector, selector_prefix) {
        let all_attribute_values = CommonAttributesSelectFilter.getAttributeValues(item_type, searched_attribute_selector);
        let selector = CommonAttributesSelectFilter.build_selector.forAttribute(selector_prefix);
        new Vue({
            el: selector,
            data: {
                allAttributeValues: all_attribute_values,
            },
        });
    },
    build_selector: {
        forAttribute: function (selector_prefix, no_prefix = false) {
            if (no_prefix === true) {
                return selector_prefix + '-attribute-select';
            } else {
                return '#' + selector_prefix + '-attribute-select';
            }
        }
    },
    levels_attribute: {
        init: function () {
            CommonAttributesSelectFilter.fillSelectOptionsWithAttributes('food', '.itemLevel', 'level');
        },
    },
    rarity_attribute: {
        init: function () {
            CommonAttributesSelectFilter.fillSelectOptionsWithAttributes('food', '.itemRarity', 'rarity');
        },
    },
    select_2: {
        init: function () {
            let selector = CommonAttributesSelectFilter.build_selector;
            $(selector.forAttribute('level')).select2();
            $(selector.forAttribute('rarity')).select2();
        },
        reInitialize: function (attributes, attribute_type) {
            let selects = $('[id^="' + CommonAttributesSelectFilter.build_selector.forAttribute(attribute_type, true) + '"]');
            let text_holder_class = '.select2-selection__rendered';

            selects.each(function (index, item) {
                let selected_option = '';
                if ($(item).val() !== '' && $(item).val() !== null) {
                    selected_option = $(item).val();
                }
                $(item).html('').select2({data: [{id: '', text: ''}]});
                $(item).html('').select2({data: attributes});
                $(item).val(selected_option);
                $(item).parent().find(text_holder_class).html(selected_option.trim());
            });

        },
    }
};
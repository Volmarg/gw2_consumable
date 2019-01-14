CommonAttributesSelectFilter = {
    getAttributeValues: function (item_type, searched_attribute_selector) { //BUG: getAttributesAsArray - duplicate
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
        let selector = CommonAttributesSelectFilter.build_selector.forAttributesSelects(selector_prefix);
        new Vue({
            el: selector,
            data: {
                allAttributeValues: all_attribute_values,
            },
        });
    },
    attachOptionsReinitializationOnChange: function (selector_prefix) {
        let that = this;
        let selects = $(that.build_selector.forAttributesSelects(selector_prefix));
        selects.on("change", function () {
            let attributes = [1, 2, 3]; //TODO: make that generic someway
            attributes = that.getAttributesAsArray('.itemLevel', false);   //todo - use prefix here
            let all_selects = $(that.build_selector.forWrappers(selector_prefix) + ' .select2-hidden-accessible');
            let all_selected_options = all_selects.find('option:selected');
            //that.filterFoodItems(refs.$refs.oneFoodItem, all_selected_options); // TODO: rewrite filteringItems for Common use
            that.select_2.reInitialize(attributes, selector_prefix); //TODO: test reinit function
        });
    },
    removeValuesFromItemAttributes: function (item_attribute) {
        return item_attribute.replace(/([+-])?([0-9])*([%])?/g, '');
    },
    ifItemContainsSelectedOption: function (selected_options_dom, jq_food_elem) { //TODO: refractor with common if possible
        let status = true;

        selected_options_dom.each(function (index, selected_option_dom) {
            let pattern2 = /([+-])?([0-9])*([%])?/g;
            let selected_option_string = Utils.escapeRegExp($(selected_option_dom).text().trim());
            let reg = new RegExp(selected_option_string, "i");

            if (!reg.exec($(jq_food_elem).text().trim().replace(pattern2, ''))) {
                status = false;
                return false;
            }
        });

        return status;
    },
    changeItemVisibility: function (jq_food_elem, item_has_option) {
        if (!item_has_option) {
            jq_food_elem.css({display: 'none'});
            jq_food_elem.find('li').attr('data-attrs-available', 'false');
        } else {
            jq_food_elem.css({display: 'block'});
            jq_food_elem.find('li').attr('data-attrs-available', 'true');
        }
    },
    getAttributesAsArray: function (selector = false, clear = false) {
        let array_of_attributes = [''];
        let all_dom_list_elements = $('.oneItem'); //this selector should by added as param?

        all_dom_list_elements.each(function (index, item) {
            let item_ = item; //unnecessary?
            if (selector !== false) {
                item = $(item).find(selector);
            }

            if ($(item).attr('data-attrs-available').toString() === "true") {
                let item_attribute = $(item).html();
                if (clear === true) {
                    item_attribute = CommonAttributesSelectFilter.removeValuesFromItemAttributes(item_attribute);
                }

                array_of_attributes.push(item_attribute.trim());
            }
        });
        return array_of_attributes.filter(Utils.onlyUniqueArrayValues).sort((a, b) => {
            return b - a
        });
    },
    build_selector: {
        forAttributesSelects: function (selector_prefix, no_prefix = false) {
            if (no_prefix === true) {
                return selector_prefix + '-attribute-select';
            } else {
                return '#' + selector_prefix + '-attribute-select';
            }
        },
        forWrappers: function (selector_prefix, no_prefix = false) {
            if (no_prefix === true) {
                return selector_prefix + 'AttributesWrapper';
            } else {
                return '.' + selector_prefix + 'AttributesWrapper';
            }
        },
    },
    levels_attribute: {
        init: function () {
            CommonAttributesSelectFilter.fillSelectOptionsWithAttributes('food', '.itemLevel', 'level'); //TODO: remove 2nd param and use same class for level
            CommonAttributesSelectFilter.attachOptionsReinitializationOnChange('level');
        },
        reInitialize: function () {
            let new_food_attributes = FoodAttributesSelectFilter.foodAttributes.foodAttributesIntoArray();
            CommonAttributesSelectFilter.select_2.reInitialize(new_food_attributes, 'food');
        },

    },
    rarity_attribute: {
        init: function () {
            CommonAttributesSelectFilter.fillSelectOptionsWithAttributes('food', '.itemRarity', 'rarity'); //TODO: as above, use just rarity
        },
    },
    select_2: {
        init: function () {
            let selector = CommonAttributesSelectFilter.build_selector;
            $(selector.forAttributesSelects('level')).select2();
            $(selector.forAttributesSelects('rarity')).select2();
        },
        reInitialize: function (attributes, attribute_type) {
            let selects = $('[id^="' + CommonAttributesSelectFilter.build_selector.forAttributesSelects(attribute_type, true) + '"]');
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
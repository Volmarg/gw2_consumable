CommonAttributesSelectFilter = {
    filterItems: function (selected_options_dom, selector_prefix = true) { //TODO: use it in foodFilter as well
        let items = $('.oneItem'); //as param?
        let commons = CommonAttributesSelectFilter;

        $(items).each(function (index, elements) {
            if (selector_prefix) {
                elements = $(elements).find('.' + selector_prefix);
            }
            elements.each(function () {
                let item_has_option = commons.ifItemContainsSelectedOption(selected_options_dom, $(elements), false);
                commons.changeItemVisibility($(elements), item_has_option);
            });
        });
    },
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
    fillSelectOptionsWithAttributes: function (item_type, selector_prefix) {
        let all_attribute_values = CommonAttributesSelectFilter.getAttributeValues(item_type, '.' + selector_prefix);
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
            let attributes = that.getAttributesAsArray('.' + selector_prefix, false);
            let all_selects = $(that.build_selector.forWrappers(selector_prefix) + ' .select2-hidden-accessible');

            all_selects.each((index, item) => {
                console.log($(item));
                let all_selected_options = $(item).find('option:selected');
                that.filterItems(all_selected_options, selector_prefix); // TODO: rewrite filteringItems for Common use
                that.select_2.reInitialize(attributes, selector_prefix); //TODO: test reinit function
            });

            that.select_2.reinitializeAllSelects();
        });
    },
    removeValuesFromItemAttributes: function (item_attribute) {
        return item_attribute.replace(/([+-])?([0-9])*([%])?/g, '');
    },
    ifItemContainsSelectedOption: function (selected_option, element, escape_numbers = true) { //TODO: refractor with common if possible
        let status = true;

        selected_option.each(function (index, selected_option_dom) {
            let pattern2 = (escape_numbers ? /([+-])?([0-9])*([%])?/g : /([+-])?([%])?/g);
            let selected_option_string = Utils.escapeRegExp($(selected_option_dom).text().trim());
            let reg = new RegExp(selected_option_string, "i");

            if (!reg.exec($(element).text().trim().replace(pattern2, ''))) {
                status = false;
                return false;
            }
        });

        return status;
    },
    changeItemVisibility: function (item, has_selected_option) {
        if (!item.hasClass('oneItem')) {
            item = item.closest('.oneItem');
        }

        if (!has_selected_option) {
            item.css({display: 'none'});
            item.find('li').attr('data-attrs-available', 'false');
        } else {
            item.css({display: 'block'});
            item.find('li').attr('data-attrs-available', 'true');
        }
    },
    getAttributesAsArray: function (additional_selector = false, clear_values = false) {
        let array_of_attributes = [''];
        let all_dom_list_elements = $('.oneItem'); //this selector should by added as param?

        all_dom_list_elements.each(function (index, item) {
            let item_ = item; //unnecessary?
            if (additional_selector !== false) {
                item = $(item).find(additional_selector);
            }

            $(item).each((index, item) => {
                if ($(item).attr('data-attrs-available').toString() === "true") {
                    let item_attribute = $(item).html();
                    if (clear_values === true) {
                        item_attribute = CommonAttributesSelectFilter.removeValuesFromItemAttributes(item_attribute);
                    }

                    array_of_attributes.push(item_attribute.trim());
                }
            });
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
            let selector_prefix = 'level';
            CommonAttributesSelectFilter.fillSelectOptionsWithAttributes('food', selector_prefix);
            CommonAttributesSelectFilter.attachOptionsReinitializationOnChange(selector_prefix);
        },
        reInitialize: function () {
            let new_food_attributes = FoodAttributesSelectFilter.foodAttributes.foodAttributesIntoArray();
            CommonAttributesSelectFilter.select_2.reInitialize(new_food_attributes, 'food');
        },

    }, //TODO: move it to separate file and bundle
    rarity_attribute: { //TODO: move it to separate file and bundle
        init: function () {
            let selector_prefix = 'rarity';
            CommonAttributesSelectFilter.fillSelectOptionsWithAttributes('food', selector_prefix);
            CommonAttributesSelectFilter.attachOptionsReinitializationOnChange(selector_prefix);
        },
    },
    select_2: { //TODO: think about doing separate file from it
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
        reinitializeAllSelects:function () {
            //TODO: add array of methods so this way I might be able to skip reinit from method from which I make call
            //TODO: other option is removing reinit per Attribute and just make one big reinit for all
            CommonAttributesSelectFilter.levels_attribute.reInitialize();
            FoodAttributesSelectFilter.select_2.reInitialize();
        },
    },
};
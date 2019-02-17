var common_utils = {
    get_attributes: {
        getAsArray: function (additional_selector = false, clear_values = false) {
            let array_of_attributes = [''];
            let all_dom_list_elements = $(attribute_selectors.selectors.item); //this selector should by added as param?

            all_dom_list_elements.each(function (index, item) {
                let item_ = item; // original oneItem
                item = (additional_selector !== false ? $(item).find(additional_selector) : item); //attribute wrapper

                $(item).each((index, item) => {
                    if ($(item).attr('data-attrs-available').toString() === "true" && !items_visibility.isItemHiddenByFilter(item_)) {
                        let item_attribute = (clear_values ? common_utils.change_item_attributes.remove_values($(item).html()) : $(item).html());
                        array_of_attributes.push(item_attribute.trim());
                    }
                });
            });
            return array_of_attributes.filter(Utils.onlyUniqueArrayValues).sort((a, b) => {
                return b - a
            });
        },
    },
    change_item_attributes: {
        remove_values: function (item_attribute) {
            return item_attribute.replace(/([+-])?([0-9])*([%])?/g, '');
        },
    },
    manage_selects: {
        fillWithAttributes: function (selector_prefix) {
            let all_attribute_values = common_utils.get_attributes.getAsArray('.' + selector_prefix);
            let selector = attribute_selectors.generate_selector.forAttributesSelects(selector_prefix);
            new Vue({
                el: selector,
                data: {
                    allAttributeValues: all_attribute_values,
                },
            });
        },
        reinitializeOnChange: function (selector_prefix, reinitialize_self) {
            let that = this;
            let selects = $(attribute_selectors.generate_selector.forAttributesSelects(selector_prefix));
            selects.on("change", function () {
                common_utils.manage_selects.reinitialize(selector_prefix, that, reinitialize_self);
            });
        },
        reinitialize: function (selector_prefix, that = false, reinitialize_self = true) {
            let attributes = common_utils.get_attributes.getAsArray('.' + selector_prefix, false);
            let all_selects = $(attribute_selectors.generate_selector.forWrappers(selector_prefix) + ' .select2-hidden-accessible');

            all_selects.each((index, item) => {
                let all_selected_options = $(item).find('option:selected');
                items_visibility.filterItems(all_selected_options, selector_prefix); // TODO: rewrite filteringItems for Common use
                if (reinitialize_self) {
                    select_2.reInitialize(attributes, selector_prefix);
                }
                //FoodAttributesSelectFilter.select_2.reInitialize();
            });
        },
        clearSelection: function (button) {
            let select=$(button).closest('section').find('select');
            $(button).click(function () { $(select).select2("val", false); });
        }
    },


};
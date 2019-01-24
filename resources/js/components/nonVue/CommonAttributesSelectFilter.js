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
    getAttributesAsArray: function (additional_selector = false, clear_values = false) {
        let array_of_attributes = [''];
        let all_dom_list_elements = $('.oneItem'); //this selector should by added as param?
        let that=this;

        all_dom_list_elements.each(function (index, item) {
            let item_=item; // original oneItem
            item = (additional_selector !== false ? $(item).find(additional_selector) : item); //attribute wrapper

            $(item).each((index, item) => {
                if ($(item).attr('data-attrs-available').toString() === "true" && that.isItemHiddenByFilter(item_)) {
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
            that.reInitialize(selector_prefix, that);
        });
    },
    reInitialize: function (selector_prefix, that = false, can_reinit_all = true) {
        that = (that === false ? this : that);
        let attributes = that.getAttributesAsArray('.' + selector_prefix, false);
        let all_selects = $(that.build_selector.forWrappers(selector_prefix) + ' .select2-hidden-accessible');

        all_selects.each((index, item) => {
            console.log($(item));
            let all_selected_options = $(item).find('option:selected');
            that.filterItems(all_selected_options, selector_prefix); // TODO: rewrite filteringItems for Common use
            //BUG: when I select Exotic items and the the level is reinitilized this function causes all items to reapear
            //BUG 2: like above. If i set lvl 40, then filter by Exotics, it changes visibility to 40 instead of refilling options
            select_2.reInitialize(attributes, selector_prefix); //TODO: test reinit function
        });

    },
    removeValuesFromItemAttributes: function (item_attribute) {
        return item_attribute.replace(/([+-])?([0-9])*([%])?/g, '');
    },
    //filtering
    filterItems: function (selected_options_dom, selector_prefix = true) { //TODO: use it in foodFilter as well
        let items = $('.oneItem');
        let commons = CommonAttributesSelectFilter;

        $(items).each(function (index, elements) {
            if (selector_prefix) {
                elements = $(elements).find('.' + selector_prefix);
            }
            elements.each(function () {
                let item_has_option = commons.doesItemContainsSelectedOption(selected_options_dom, $(elements), false);

                let item = $(elements);
                if (!item.hasClass('oneItem')) {
                    item = item.closest('.oneItem');
                }

                let hidden_by = commons.changeStatusHiddenByFilter(item, selector_prefix, item_has_option);
                commons.changeItemVisibility(item, hidden_by);
            });
        });
    },
    doesItemContainsSelectedOption: function (selected_option, element, escape_numbers = true) { //TODO: refractor with common if possible
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
    changeItemVisibility: function (item, hidden_by) {
        if (hidden_by.length !== 0) {
            item.css({display: 'none'});
            item.find('li').attr('data-attrs-available', 'false');
        } else {
            item.css({display: 'block'});
            item.find('li').attr('data-attrs-available', 'true');
        }
    },
    //hidden by filter section
    changeStatusHiddenByFilter: function (item, selector_prefix, has_selected_option) {
        let attr = 'data-hidden-by-filter-types';
        let hidden_by = JSON.parse($(item).attr(attr));

        if (!has_selected_option) {
            if (hidden_by.indexOf(selector_prefix) === -1) {
                hidden_by.push(selector_prefix);
            }
        } else {
            hidden_by = hidden_by.filter(function (value) {
                return value !== selector_prefix;
            });
        }

        $(item).attr(attr, JSON.stringify(hidden_by));
        return hidden_by;
    },
    isItemHiddenByFilter: function (item) {
        return JSON.parse($(item).attr('data-hidden-by-filter-types')).length !== 0;
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
    selectors: {
        item: '.oneItem',
    },
};
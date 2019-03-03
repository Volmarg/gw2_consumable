FoodAttributesSelectFilter = {
    food_attributes: {
        allFoodItemsWrapper: new Vue({
            el: '#all-food-items-wrapper',
            data: {
                vue_loop_repeats: 1
            }
        }),
        foodAttributesIntoArray: function () {
            let array_of_attributes = [''];
            let all_dom_list_elements = $('li[data-ref^="oneAttributeOfFood"]');

            all_dom_list_elements.each(function (index, item) {
                if ($(item).attr('data-attrs-available').toString() === "true") {
                    let item_attribute = common_utils.change_item_attributes.remove_values($(item).html());
                    array_of_attributes.push(item_attribute.trim());
                }
            });
            return array_of_attributes.filter(Utils.onlyUniqueArrayValues);
        },
        fillSelectOptionsWithAttributes: function () {
            let all_filter_selects = document.querySelectorAll('#food-attribute-filters');
            let vue_selects = [];
            let new_food_attributes = this.foodAttributesIntoArray();

            all_filter_selects.forEach(function (item) {
                let vue_select = new Vue({
                    el: item,
                    data: {
                        food_attributes: new_food_attributes, //BUG 1: vue messes up select2 list, by adding some extra spaces
                    },
                });
                vue_selects.push(vue_select);
            });

        },
        getRefs() {
            return this.allFoodItemsWrapper;
        },
        setVueSelects: function (vue_selects) {
            window.selects = vue_selects;
        },
        getVueSelects: function () {
            return window.selects;
        },
    },
    select_2: {
        init: function () {
            let selects = $('[class^="food-attribute-select"]');
            let that = this;
            config.init('food');

            selects.select2();
            that.reInitialize(); //BUG 1 - FIX: jq based reinit is working fine, shouldn't de done that way but that's fastest way

            selects.on("change", function () { //TODO Use OnChange from Common
                let all_selects = $('.foodAttributesWrapper .select2-hidden-accessible');
                let all_selected_options = all_selects.find('option:selected');
                items_visibility.filterItems(all_selected_options, 'food');
                that.reInitialize();
            });
        },
        reInitialize: function () {
            let new_food_attributes = FoodAttributesSelectFilter.food_attributes.foodAttributesIntoArray();
            select_2.reInitialize(new_food_attributes, 'food');
        },
    },
};//TODO: this still should be refractored at one point
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
var rarity_attribute = {
    init: function () {
        let selector_prefix = 'rarity';
        config.init(selector_prefix);
        common_utils.manage_selects.fillWithAttributes(selector_prefix);
        common_utils.manage_selects.reinitializeOnChange(selector_prefix, false);
    },
};

var attribute_selectors = {
    generate_selector: {
        forAttributesSelects: function (selector_prefix, no_prefix = false) {
            if (no_prefix === true) {
                return selector_prefix + '-attribute-select';
            } else {
                return '.' + selector_prefix + '-attribute-select';
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
var items_visibility = {
        changeItemVisibility: function (item, hidden_by) {
            if (hidden_by.length !== 0) {
                item.css({display: 'none'});
                item.find('li').attr('data-attrs-available', 'false');
            } else {
                item.css({display: 'flex'});
                item.find('li').attr('data-attrs-available', 'true');
            }
        },
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
        //changes - volmarg start
        filterItems: function (selected_options, selector_prefix = true) { //TODO: use it in foodFilter as well
            let items = $(attribute_selectors.selectors.item);
            let attributes_with_numbers = ['level'];
            let escape_numbers = (attributes_with_numbers.indexOf(selector_prefix) === -1);

            $(items).each(function (index, elements) {

                elements = (selector_prefix ? $(elements).find('.' + selector_prefix) : elements);
                elements.each(function () {
                    let item_matches_selection = items_visibility.doesItemMatchSelectedOption(selected_options, $(elements), escape_numbers);
                    let item = (!$(elements).hasClass('oneItem') ? $(elements).closest(attribute_selectors.selectors.item) : $(elements));
                    let hidden_by = items_visibility.changeStatusHiddenByFilter(item, selector_prefix, item_matches_selection);

                    items_visibility.changeItemVisibility(item, hidden_by);
                });
            });
        },
        doesItemContainsSelectedOption: function (selected_options, element, escape_numbers = true) { //TODO: refractor with common if possible
            let status = '';
            selected_options.each(function (index, selected_option) {
                let pattern = (escape_numbers ? /([+-])?([0-9])*([%])?/g : /([+-])?([%])?/g);
                let selected_option_string = Utils.escapeRegExp($(selected_option).text().trim());
                let reg = new RegExp(selected_option_string, "i");

                status = (!reg.exec($(element).text().trim().replace(pattern, '')) ? false : true);
                if (!status) {
                    return false;
                }
            });
            return status;
        },
        doesItemIsBetweenSelectedValuesRange: function (selected_options, element) {
            let status = '';
            selected_options.each(function (index, selected_option) {
                let pattern = /([+-])?([%])?/g;
                let checked_element_value = parseInt((element).text().trim().replace(pattern, ''));

                let range_search_group = $(selected_option).closest('section');
                let max = parseInt($(range_search_group).find('[data-id^="max"]').find('option:selected').text());
                max = (isNaN(max) ? 80 : max);

                let min = parseInt($(range_search_group).find('[data-id^="min"]').find('option:selected').text());
                min = (isNaN(min) ? 1 : min);
                //BUG: clearing level attr clears both (min/max)
                status = (checked_element_value <= max && checked_element_value >= min ? true : '');
            });
            return status;
        },
        doesItemMatchSelectedOption: function (selected_options, elements, escape_numbers) {
            let option_check_method = JSON.parse($(selected_options).parent().attr('data-config')).matching_option_check_method;
            let item_matches_selection = false;

            switch (option_check_method) {
                case 'contains_option':
                    item_matches_selection = items_visibility.doesItemContainsSelectedOption(selected_options, $(elements), escape_numbers);
                    break;

                case 'is_between_range':
                    item_matches_selection = items_visibility.doesItemIsBetweenSelectedValuesRange(selected_options, $(elements), escape_numbers);
                    break;
            }
            return item_matches_selection;
        }
        //changes - volmarg end
    }
;
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
            let all_selects = $(selector);

            all_selects.each((index, item) => {
                new Vue({
                    el: item,
                    data: {
                        allAttributeValues: all_attribute_values,
                    },
                });
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
            let data = JSON.parse($(button).attr('data-linked'));
            let select = $(button).closest('section').find('[data-id="' + data.data_id + '"]');
            $(select).select2("val", false);
            $(select).trigger("change");
        }
    },


};
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
var select_2 = {
    init: function () {
        $(attribute_selectors.generate_selector.forAttributesSelects('level')).select2();
        $(attribute_selectors.generate_selector.forAttributesSelects('rarity')).select2();
    },
    reInitialize: function (attributes, attribute_type) {
        let selects = $('[class^="' + attribute_selectors.generate_selector.forAttributesSelects(attribute_type, true) + '"]');
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
};
Ajax = {
    updateDatabase: function () {
        let spinning_rings = $('#updateDatabase+.lds-dual-ring');
        spinning_rings.css({'display': 'block'});
        alert("Don't refresh or close this page while update is undergoing");
        $.get("database/update", function () {
        }).done(function () {
            spinning_rings.css({'display': 'none'});
            alert("Update has been finished");
        }).fail(function () {
            spinning_rings.css({'display': 'none'});
            alert("Update attempt has failed");
        });
    }
};

Init = {
    foodAttributesSelect: function () {
        FoodAttributesSelectFilter.food_attributes.fillSelectOptionsWithAttributes();
        FoodAttributesSelectFilter.select_2.init();
    },

    commonAttributesSelect: function () {
        levels_attribute.init();
        rarity_attribute.init();
        select_2.init(); //BUG: requires reinit function to be rewritten for this new selects
    },


    assignEvents: function () {
        $('#updateDatabase').on('click', function () {
            Ajax.updateDatabase();
        });

        $('.clear-filter').on('click',(event)=>{
            let element=event.target;
            common_utils.manage_selects.clearSelection(element);
        });
    }
};

Init.foodAttributesSelect();
Init.commonAttributesSelect();
Init.assignEvents();
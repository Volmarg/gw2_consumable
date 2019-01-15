FoodAttributesSelectFilter = {
    foodAttributes: {
        allFoodItemsWrapper: new Vue({
            el: '#all-food-items-wrapper',
            data: {
                vue_loop_repeats: 1
            }
        }),
        foodAttributesIntoArray: function () { //TODO: refractor in Common if it's possible
            let array_of_attributes = [''];
            let all_dom_list_elements = $('li[data-ref^="oneAttributeOfFood"]');
            let that = this;

            all_dom_list_elements.each(function (index, item) {
                if ($(item).attr('data-attrs-available').toString() === "true") {
                    let item_attribute = CommonAttributesSelectFilter.removeValuesFromItemAttributes($(item).html());
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
                        foodAttributes: new_food_attributes, //BUG 1: vue messes up select2 list, by adding some extra spaces
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
            let selects = $('[id^="food-attribute-select"]');
            let food = FoodAttributesSelectFilter;
            let refs = food.foodAttributes.getRefs();
            let that = this;

            selects.select2();
            that.reInitialize(); //BUG 1 - FIX: jq based reinit is working fine, shouldn't de done that way but that's fastest way

            selects.on("change", function () {
                let all_selects = $('.foodAttributesWrapper .select2-hidden-accessible');
                let all_selected_options = all_selects.find('option:selected');
                that.filterFoodItems(refs.$refs.oneFoodItem, all_selected_options);
                that.reInitialize();
            });
        },

        reInitialize: function () {
            let new_food_attributes = FoodAttributesSelectFilter.foodAttributes.foodAttributesIntoArray();
            CommonAttributesSelectFilter.select_2.reInitialize(new_food_attributes, 'food');
        },

        filterFoodItems: function filterFoodItems(food_items, selected_options_dom) {
            let commons = CommonAttributesSelectFilter;

            food_items.forEach(function (food_element) {
                let jq_food_elem = $(food_element);
                let list_elements = jq_food_elem.find('li');

                list_elements.each(function () {
                    let item_has_option = commons.ifItemContainsSelectedOption(selected_options_dom, jq_food_elem);
                    commons.changeItemVisibility(jq_food_elem, item_has_option);
                });
            });
        },

    },
};
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
            let selector_prefix = 'level';
            CommonAttributesSelectFilter.fillSelectOptionsWithAttributes('food', selector_prefix);
            CommonAttributesSelectFilter.attachOptionsReinitializationOnChange(selector_prefix);
        },
        reInitialize: function () {
            let new_food_attributes = FoodAttributesSelectFilter.foodAttributes.foodAttributesIntoArray();
            CommonAttributesSelectFilter.select_2.reInitialize(new_food_attributes, 'food');
        },

    },
    rarity_attribute: {
        init: function () {
            let selector_prefix = 'rarity';
            CommonAttributesSelectFilter.fillSelectOptionsWithAttributes('food', selector_prefix);
            CommonAttributesSelectFilter.attachOptionsReinitializationOnChange(selector_prefix);
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
        FoodAttributesSelectFilter.foodAttributes.fillSelectOptionsWithAttributes();
        FoodAttributesSelectFilter.select_2.init();
    },

    commonAttributesSelect: function () {
        CommonAttributesSelectFilter.levels_attribute.init();
        CommonAttributesSelectFilter.rarity_attribute.init();
        CommonAttributesSelectFilter.select_2.init(); //BUG: requires reinit function to be rewritten for this new selects
    },


    assignEvents: function () {
        $('#updateDatabase').on('click', function () {
            Ajax.updateDatabase();
        })
    }
};

Init.foodAttributesSelect();
Init.commonAttributesSelect();
Init.assignEvents();
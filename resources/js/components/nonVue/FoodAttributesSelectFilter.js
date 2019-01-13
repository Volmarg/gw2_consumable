FoodAttributesSelectFilter = {

    foodAttributes: {
        allFoodItemsWrapper: new Vue({
            el: '#all-food-items-wrapper',
            data: {
                vue_loop_repeats: 1
            }
        }),

        foodAttributesIntoArray: function () {
            let array_of_attributes = [''];
            let all_dom_list_elements = $('li[data-ref^="oneAttributeOfFood"]');
            let that = this;

            all_dom_list_elements.each(function (index, item) {
                if ($(item).attr('data-attrs-available').toString() === "true") {
                    let item_attribute = that.removeValuesFromItemAttributes($(item).html());
                    array_of_attributes.push(item_attribute.trim());
                }
            });
            return array_of_attributes.filter(Utils.onlyUniqueArrayValues);//TODO add as Utils
        },

        removeValuesFromItemAttributes: function (item_attribute) {
            return item_attribute.replace(/([+-])?([0-9])*([%])?/g, '');
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
        }
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
                let all_selects = $('.select2-hidden-accessible');
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
            //here is some problem with regex or something
            let that = this;

            food_items.forEach(function (food_element) {
                let jq_food_elem = $(food_element);
                let list_elements = jq_food_elem.find('li');

                list_elements.each(function () {
                    let item_has_option = that.ifItemDescriptionContainsSelectedOption(selected_options_dom, jq_food_elem);
                    that.changeItemVisibility(jq_food_elem, item_has_option);
                });
            });
        },

        ifItemDescriptionContainsSelectedOption: function (selected_options_dom, jq_food_elem) {
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
        }

    },
};
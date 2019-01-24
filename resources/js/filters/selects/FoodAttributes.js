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
            let selects = $('[id^="food-attribute-select"]');
            let that = this;

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
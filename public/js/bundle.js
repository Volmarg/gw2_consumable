FoodAttributesSelectFilter = {

    vueFoodAttributes: {
        allFoodItemsWrapper: new Vue({
            el: '#all-food-items-wrapper',
            data: {
                vue_loop_repeats: 1
            }
        }),

        foodAttributesIntoArray: function () {
            let array_of_attributes = [''];
            let all_dom_list_elements = this.allFoodItemsWrapper.$refs.oneAttributeOfFood;
            let that = this;

            all_dom_list_elements.forEach(function (item) {
                let item_attribute = that.removeValuesFromItemAttributes(item.innerHTML);
                array_of_attributes.push(item_attribute.trim());
            });
            return array_of_attributes.filter(this.onlyUniqueArrayValues);
        },

        onlyUniqueArrayValues: function (value, index, self) {
            return self.indexOf(value) === index;
        },

        removeValuesFromItemAttributes: function (item_attribute) {
            return item_attribute.replace(/([+-])?([0-9])*([%])?/g,'');
        },

        fillSelectOptionsWithAttributes: function () {
            let all_filter_selects = document.querySelectorAll('#food-attribute-filters');
            let that = this;

            all_filter_selects.forEach(function (item) {
                new Vue({
                    el: item,
                    data: {
                        foodAttributes: that.foodAttributesIntoArray(),
                    },
                });
            });
        },

        getRefs() {
            return this.allFoodItemsWrapper;
        }
    },

    select_2: {

        init: function () {
            let selects = $('[id^="food-attribute-select"]');
            selects.select2();
            let refs = FoodAttributesSelectFilter.vueFoodAttributes.getRefs();
            let that = this;

            selects.on("change", function (event) {
                let all_selects = $('.select2-hidden-accessible');
                let all_selected_options = all_selects.find('option:selected');
                that.filterFoodItems(refs.$refs.oneFoodItem, all_selected_options);
            });

        },

        filterFoodItems: function filterFoodItems(food_items, selected_options_dom) {
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
                let selected_option_string = $(selected_option_dom).text().trim();
                let escaped_selected_option_string = selected_option_string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                let reg = new RegExp(escaped_selected_option_string, "i");

                if (!reg.exec($(jq_food_elem).text().trim())) {
                    status = false;
                }
            });


            return status;
        },

        changeItemVisibility: function (jq_food_elem, item_has_option) {

            if (!item_has_option) {
                jq_food_elem.css({display: 'none'});
            } else {
                jq_food_elem.css({display: 'block'});
            }
        }

    },
};

Init = {
    foodAttributesSelect: function () {
        FoodAttributesSelectFilter.vueFoodAttributes.fillSelectOptionsWithAttributes();
        FoodAttributesSelectFilter.select_2.init();
    },
};


Init.foodAttributesSelect();
class FoodAttributesSelecttFilter {

    constructor() {

    }

    vueFoodAttributes = {
        allFoodItemsWrapper: new Vue({
            el: '#all-food-items-wrapper',
            data: {
                vue_loop_repeats: 1
            },
            methods: {
                hasAttribute: function (element) {
                    let status = true;
                    if (element.innerHTML.trim() === 'tests') {
                        status = false;
                    }
                    return status;
                }
            }
        }),

        foodAttributesIntoArray: function () {
            let array_of_attributes = [''];
            let all_dom_list_elements = this.allFoodItemsWrapper.$refs.oneAttributeOfFood;

            all_dom_list_elements.forEach(function (item) {
                array_of_attributes.push(item.innerHTML.trim());
            });
            return array_of_attributes.filter(this.onlyUniqueArrayValues);
        },

        onlyUniqueArrayValues: function (value, index, self) {
            return self.indexOf(value) === index;
        },

        fillSelectOptionsWithAttributes: function () {
            let all_filter_selects = document.querySelectorAll('#food-attribute-filters');

            all_filter_selects.forEach(function (item) {
                new Vue({
                    el: item,
                    data: {
                        foodAttributes: foodAttributesIntoArray(),
                    },
                });
            });
        }


    };

    select2 = {

        init: function () {
            let selects = $('[id^="food-attribute-select"]');
            selects.select2();

            selects.on("change", function (event) {
                let selected_option = $(event.target).find('option:selected');
                this.filterFoodItems(this.allFoodItemsWrapper.$refs.oneFoodItem, selected_option);
            });

        },

        filterFoodItems: function filterFoodItems(food_items, selected_option_dom) {
            food_items.forEach(function (food_element) {
                let jq_food_elem = $(food_element);
                let list_elements = jq_food_elem.find('li');

                list_elements.each(function () {
                    let item_has_option = this.ifItemDescriptionContainsSelectedOption(selected_option_dom, jq_food_elem);
                    this.changeItemVisibility(jq_food_elem, item_has_option);
                });
            });
        },

        ifItemDescriptionContainsSelectedOption: function (selected_option_dom) {
            let selected_option_string = selected_option_dom.text().trim();
            let reg = new RegExp(selected_option_string, "i");
            let status = true;

            if (!reg.exec($(this).text().trim())) {
                status = false;
            }

            return status;
        },

        changeItemVisibility: function (jq_food_elem, item_has_option) {
            if (!item_has_option) {
                jq_food_elem.css({display: 'none'});
            } else {
                jq_food_elem.css({display: 'block'});
            }
        }

    };
}





FoodAttributesSelectFilter = {

    vueFoodAttributes: {
        allFoodItemsWrapper: new Vue({
            el: '#all-food-items-wrapper',
            data: {
                vue_loop_repeats: 1
            }
        }),

        foodAttributesIntoArray: function (reasignValuesOnChange = false) {
            let array_of_attributes = [''];
            let all_dom_list_elements;
            let that = this;

            if (reasignValuesOnChange) {
                all_dom_list_elements = $('#all-food-items-wrapper').find('li');
                //TODO change this so it can work in both cases with each/forEach
                //TODO: this is still not working corretly despite the fact that attr's are false it still reads them
                all_dom_list_elements.each(function (index,item) {
                    if ($(item).data('attrsAvailable') === "true") {
                        let item_attribute = that.removeValuesFromItemAttributes(item.innerHTML);
                        array_of_attributes.push(item_attribute.trim());
                    }
                });
            } else {
                all_dom_list_elements = this.allFoodItemsWrapper.$refs.oneAttributeOfFood;
                all_dom_list_elements.forEach(function (item) {
                    if ($(item).data('attrsAvailable') === true) {
                        let item_attribute = that.removeValuesFromItemAttributes(item.innerHTML);
                        array_of_attributes.push(item_attribute.trim());
                    }
                });
            }

            return array_of_attributes.filter(this.onlyUniqueArrayValues);
        },

        onlyUniqueArrayValues: function (value, index, self) {
            return self.indexOf(value) === index;
        },

        removeValuesFromItemAttributes: function (item_attribute) {
            return item_attribute.replace(/([+-])?([0-9])*([%])?/g, '');
        },

        fillSelectOptionsWithAttributes: function (onChange = false) {
            let all_filter_selects = document.querySelectorAll('#food-attribute-filters');
            let that = this;
            let vue_selects = [];
            if (onChange) {
                vue_selects = that.getVueSelects();
            }

            if (vue_selects.length !== 0) {
                vue_selects.forEach(function (one_select) {
                    one_select.foodAttributes = that.foodAttributesIntoArray(true);
                });

            } else {
                all_filter_selects.forEach(function (item) {
                    let vue_select = new Vue({
                        el: item,
                        data: {
                            foodAttributes: that.foodAttributesIntoArray(),
                        },
                    });
                    vue_selects.push(vue_select);
                });
                that.setVueSelects(vue_selects);
            }

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
            selects.select2();
            let refs = FoodAttributesSelectFilter.vueFoodAttributes.getRefs();
            let that = this;

            selects.on("change", function (event) {
                let all_selects = $('.select2-hidden-accessible');
                let all_selected_options = all_selects.find('option:selected');
                that.filterFoodItems(refs.$refs.oneFoodItem, all_selected_options);
                FoodAttributesSelectFilter.vueFoodAttributes.fillSelectOptionsWithAttributes(true);


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
                jq_food_elem.find('li').attr('data-attrs-available', 'false');
            } else {
                jq_food_elem.css({display: 'block'});
                jq_food_elem.find('li').attr('data-attrs-available', 'true');
            }
        }

    },
};
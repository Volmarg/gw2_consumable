//TODO: rebuild this into json and call main function once

//build select lists
var fall_foo_items_wrapper = new Vue({
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
});

function foodAttributesIntoArray() {
    var array_of_atrributes = [''];
    var all_dom_list_elements = fall_foo_items_wrapper.$refs.oneAttributeOfFood;

    all_dom_list_elements.forEach(function (item, index) {
        array_of_atrributes.push(item.innerHTML.trim());
    });
    return array_of_atrributes.filter(onlyUnique);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var all_filter_selectcs = document.querySelectorAll('#food-attribute-filters');

all_filter_selectcs.forEach(function (item, index) {
    new Vue({
        el: item,
        data: {
            foodAttributes: foodAttributesIntoArray(),
        },
    });
});


//add Select 2 and manipulate it
$(document).ready(function () {
    var selects = $('[id^="food-attribute-select"]');
    selects.select2();

    selects.on("change", function (event) {
        let selected_option = $(event.target).find('option:selected');
        filterFoodItems(fall_foo_items_wrapper.$refs.oneFoodItem, selected_option);
    });

    function filterFoodItems(food_items, selected_option_dom) {
        food_items.forEach(function (food_element, index) {
            let jq_food_elem = $(food_element);
            let list_elements = jq_food_elem.find('li');

            list_elements.each(function () {
                let item_has_option = ifItemDescriptionContainsSelectedOption(selected_option_dom, jq_food_elem);
                changeItemVisibility(jq_food_elem, item_has_option);
            });
        });
    }

    function ifItemDescriptionContainsSelectedOption(selected_option_dom) {
        let selected_option_string = selected_option_dom.text().trim();
        let reg = new RegExp(selected_option_string, "i");
        let status = true;

        if (!reg.exec($(this).text().trim())) {
            status = false;
        }

        return status;
    }

    function changeItemVisibility(jq_food_elem, item_has_option) {
        if (!item_has_option) {
            jq_food_elem.css({display: 'none'});
        } else {
            jq_food_elem.css({display: 'block'});
        }
    }
});





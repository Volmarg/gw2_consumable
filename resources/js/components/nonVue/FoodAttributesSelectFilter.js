var fetched_list_of_food_attributes = new Vue({
    el: '#all-food-items-wrapper',
    data: {
        vue_loop_repeats: 1
    }
});

function foodAttributesIntoArray() {
    var array_of_atrributes = [];
    var all_dom_list_elements = fetched_list_of_food_attributes.$refs.oneAttributeOfFood;

    all_dom_list_elements.forEach(function (item, index) {
        array_of_atrributes.push(item.innerHTML.trim());
    });
    return array_of_atrributes.filter(onlyUnique);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var all_filter_selectcs=document.querySelectorAll('#food-attribute-filters');

all_filter_selectcs.forEach(function (item,index) {
    new Vue({
        el: item,
        data: {
            foodAttributes: foodAttributesIntoArray(),
        },
    });
});



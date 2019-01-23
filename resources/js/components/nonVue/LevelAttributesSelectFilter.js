var levels_attribute = {
    init: function () {
        let selector_prefix = 'level';
        CommonAttributesSelectFilter.fillSelectOptionsWithAttributes('food', selector_prefix);
        CommonAttributesSelectFilter.attachOptionsReinitializationOnChange(selector_prefix);
    },
    reInitialize: function () {
        let new_food_attributes = FoodAttributesSelectFilter.food_attributes.foodAttributesIntoArray();
        select_2.reInitialize(new_food_attributes, 'food');
    },
};
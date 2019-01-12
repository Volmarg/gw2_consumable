Init = {
    foodAttributesSelect: function () {
        FoodAttributesSelectFilter.foodAttributes.fillSelectOptionsWithAttributes();
        FoodAttributesSelectFilter.select_2.init();
    },

    commonAttributesSelect: function () {
        CommonAttributesSelectFilter.levels_attribute.init();
        CommonAttributesSelectFilter.rarity_attribute.init();
        CommonAttributesSelectFilter.select_2.init();
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
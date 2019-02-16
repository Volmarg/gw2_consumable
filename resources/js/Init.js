Init = {
    foodAttributesSelect: function () {
        FoodAttributesSelectFilter.food_attributes.fillSelectOptionsWithAttributes();
        FoodAttributesSelectFilter.select_2.init();
    },

    commonAttributesSelect: function () {
        levels_attribute.init();
        rarity_attribute.init();
        select_2.init(); //BUG: requires reinit function to be rewritten for this new selects
    },


    assignEvents: function () {
        $('#updateDatabase').on('click', function () {
            Ajax.updateDatabase();
        });

        $('.clear-filter').on('click',(event)=>{
            let element=event.target;
            let selector_prefix=$(element).closest('section').attr('data-prefix');

            common_utils.manage_selects.clearSelection(selector_prefix);
        });
    }
};

Init.foodAttributesSelect();
Init.commonAttributesSelect();
Init.assignEvents();
var select_2 = {
    init: function () {
        let selector = CommonAttributesSelectFilter.build_selector;
        $(selector.forAttributesSelects('level')).select2();
        $(selector.forAttributesSelects('rarity')).select2();
    },
    reInitialize: function (attributes, attribute_type) {
        let selects = $('[id^="' + CommonAttributesSelectFilter.build_selector.forAttributesSelects(attribute_type, true) + '"]');
        let text_holder_class = '.select2-selection__rendered';

        selects.each(function (index, item) {
            let selected_option = '';
            if ($(item).val() !== '' && $(item).val() !== null) {
                selected_option = $(item).val();
            }
            $(item).html('').select2({data: [{id: '', text: ''}]});
            $(item).html('').select2({data: attributes});
            $(item).val(selected_option);
            $(item).parent().find(text_holder_class).html(selected_option.trim());
        });

    },
    reinitializeAllSelects: function () {
        //TODO: add array of methods so this way I might be able to skip reinit from method from which I make call
        //TODO: other option is removing reinit per Attribute and just make one big reinit for all
        levels_attribute.reInitialize();
        FoodAttributesSelectFilter.select_2.reInitialize();
    },
};
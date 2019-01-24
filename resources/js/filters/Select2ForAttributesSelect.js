var select_2 = {
    init: function () {
        $(attribute_selectors.generate_selector.forAttributesSelects('level')).select2();
        $(attribute_selectors.generate_selector.forAttributesSelects('rarity')).select2();
    },
    reInitialize: function (attributes, attribute_type) {
        let selects = $('[id^="' + attribute_selectors.generate_selector.forAttributesSelects(attribute_type, true) + '"]');
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
};
var items_visibility = {
    changeItemVisibility: function (item, hidden_by) {
        if (hidden_by.length !== 0) {
            item.css({display: 'none'});
            item.find('li').attr('data-attrs-available', 'false');
        } else {
            item.css({display: 'flex'});
            item.find('li').attr('data-attrs-available', 'true');
        }
    },
    changeStatusHiddenByFilter: function (item, selector_prefix, has_selected_option) {
        let attr = 'data-hidden-by-filter-types';
        let hidden_by = JSON.parse($(item).attr(attr));

        if (!has_selected_option) {
            if (hidden_by.indexOf(selector_prefix) === -1) {
                hidden_by.push(selector_prefix);
            }
        } else {
            hidden_by = hidden_by.filter(function (value) {
                return value !== selector_prefix;
            });
        }

        $(item).attr(attr, JSON.stringify(hidden_by));
        return hidden_by;
    },
    isItemHiddenByFilter: function (item) {
        return JSON.parse($(item).attr('data-hidden-by-filter-types')).length !== 0;
    },
    filterItems: function (selected_options, selector_prefix = true) { //TODO: use it in foodFilter as well
        let items = $(attribute_selectors.selectors.item);
        $(items).each(function (index, elements) {

            elements = (selector_prefix ? $(elements).find('.' + selector_prefix) : elements);
            elements.each(function () {
                let item_has_option = items_visibility.doesItemContainsSelectedOption(selected_options, $(elements));
                let item = (!$(elements).hasClass('oneItem') ? $(elements).closest(attribute_selectors.selectors.item) : $(elements));
                let hidden_by = items_visibility.changeStatusHiddenByFilter(item, selector_prefix, item_has_option);

                items_visibility.changeItemVisibility(item, hidden_by);
            });
        });
    },
    doesItemContainsSelectedOption: function (selected_options, element, escape_numbers = true) { //TODO: refractor with common if possible
        let status='';
        selected_options.each(function (index, selected_option) {
            let pattern = (escape_numbers ? /([+-])?([0-9])*([%])?/g : /([+-])?([%])?/g);
            let selected_option_string = Utils.escapeRegExp($(selected_option).text().trim());
            let reg = new RegExp(selected_option_string, "i");

            status = (!reg.exec($(element).text().trim().replace(pattern, '')) ? false : true);
            if (!status) {
                return false;
            }
        });
        return status;
    },
};
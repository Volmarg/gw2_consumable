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
        //changes - volmarg start
        filterItems: function (selected_options, selector_prefix = true) { //TODO: use it in foodFilter as well
            let items = $(attribute_selectors.selectors.item);
            let attributes_with_numbers = ['level'];
            let escape_numbers = (attributes_with_numbers.indexOf(selector_prefix) === -1);

            $(items).each(function (index, elements) {

                elements = (selector_prefix ? $(elements).find('.' + selector_prefix) : elements);
                elements.each(function () {
                    let item_matches_selection = items_visibility.doesItemMatchSelectedOption(selected_options, $(elements), escape_numbers);
                    let item = (!$(elements).hasClass('oneItem') ? $(elements).closest(attribute_selectors.selectors.item) : $(elements));
                    let hidden_by = items_visibility.changeStatusHiddenByFilter(item, selector_prefix, item_matches_selection);

                    items_visibility.changeItemVisibility(item, hidden_by);
                });
            });
        },
        doesItemContainsSelectedOption: function (selected_options, element, escape_numbers = true) { //TODO: refractor with common if possible
            let status = '';
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
        doesItemIsBetweenSelectedValuesRange: function (selected_options, element) {
            let status = '';
            selected_options.each(function (index, selected_option) {
                let pattern = /([+-])?([%])?/g;
                let checked_element_value = parseInt((element).text().trim().replace(pattern, ''));

                let range_search_group = $(selected_option).closest('section');
                let max = parseInt($(range_search_group).find('[data-id^="max"]').find('option:selected').text());
                max = (isNaN(max) ? 80 : max);

                let min = parseInt($(range_search_group).find('[data-id^="min"]').find('option:selected').text());
                min = (isNaN(min) ? 1 : min);
                status = (checked_element_value <= max && checked_element_value >= min ? true : '');
            });
            return status;
        },
        doesItemMatchSelectedOption: function (selected_options, elements, escape_numbers) {
            let option_check_method = JSON.parse($(selected_options).parent().attr('data-config')).matching_option_check_method;
            let item_matches_selection = false;

            switch (option_check_method) {
                case 'contains_option':
                    item_matches_selection = items_visibility.doesItemContainsSelectedOption(selected_options, $(elements), escape_numbers);
                    break;

                case 'is_between_range':
                    item_matches_selection = items_visibility.doesItemIsBetweenSelectedValuesRange(selected_options, $(elements), escape_numbers);
                    break;
            }
            return item_matches_selection;
        }
        //changes - volmarg end
    }
;
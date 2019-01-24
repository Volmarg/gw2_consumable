<section class="oneItem" ref="oneFoodItem" data-hidden-by-filter-types="[]">
    <p class="itemName"><b>{{$name}}</b></p>
    <section class="detailsWrapper">
        <img src="{{$icon}}"/>
        <ul>
            @foreach($item_attributes as $one_attribute)
                <li style="" data-consumable-item-attribute=" {{$one_attribute}}" data-ref="oneAttributeOfFood"
                    data-attrs-available="true" class="food">
                    {{$one_attribute}}
                </li>
            @endforeach
        </ul>
    </section>
    <p class="itemData">
        <b class="level" data-attrs-available="true">{{$level}}</b>
        <b class="rarity{{$rarity}} rarity" data-attrs-available="true">{{$rarity}}</b>
    </p>
</section>

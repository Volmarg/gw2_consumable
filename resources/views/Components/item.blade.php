<section class="oneItem" ref="oneFoodItem">
    <p class="itemName"><b>{{$name}}</b></p>
    <section class="detailsWrapper">
        <img src="{{$icon}}"/>
        <ul>
            @foreach($item_attributes as $one_attribute)
                <li style="" data-consumable-item-attribute=" {{$one_attribute}}" data-ref="oneAttributeOfFood"
                    data-attrs-available="true">
                    {{$one_attribute}}
                </li>
            @endforeach
        </ul>
    </section>
    <p class="itemData">
        <b class="itemLevel">{{$level}}</b>
        <b class="itemRarity rarity{{$rarity}}">{{$rarity}}</b>
    </p>
</section>

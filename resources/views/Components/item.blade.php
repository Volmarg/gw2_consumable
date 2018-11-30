<section class="oneItem" style="" ref="oneFoodItem" style="">
    <p class="itemName"><b>{{$name}}</b></p>
    <section style="display:flex;" class="detailsWrapper">
        <img src="{{$icon}}" style="align-self: center;"/>
        <ul>
            @foreach($item_attributes as $one_attribute)
                <li style="" data-consumable-item-attribute=" {{$one_attribute}}" ref="oneAttributeOfFood">
                    {{$one_attribute}}
                </li>
            @endforeach
        </ul>
    </section>
</section>

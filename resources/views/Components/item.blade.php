<section class="oneItem" style="width:420px;margin:10px;">
    <img src="{{$icon}}"/>
    <ul>
        @foreach($item_attributes as $one_attribute)
            <li style="color:blue;" data-consumable-item-attribute="true" >
                {{$one_attribute}}
            </li>
        @endforeach
    </ul>
</section>

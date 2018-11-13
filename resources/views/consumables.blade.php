@foreach($all_items as $one_item)
    @if(property_exists($one_item['item_data']->details,'description'))
        @singleItem(['item_attributes'=>$one_item['item_data']->details->description])
            @slot('icon')
                {{$one_item['item_data']->icon}}
            @endslot
        @endsingleItem
    @endif
@endforeach


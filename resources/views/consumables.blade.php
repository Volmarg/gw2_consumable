@foreach($all_items as $one_item)
    @if(property_exists($one_item['item_data']->details,'description'))
        @singleItem
            @slot('icon')
                {{$one_item['item_data']->icon}}
            @endslot
            @slot('description')
                {{$one_item['item_data']->details->description}}
            @endslot
        @endsingleItem
    @endif
@endforeach


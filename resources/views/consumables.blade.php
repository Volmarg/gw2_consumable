@extends('welcome')

@section('body-center')
    @for($i=0;$i<=2;$i++)
        <section id="food-attribute-filters" ref="food-attribute-filters">
            @include('Components/foodAttributesFilter')
        </section>
    @endfor


    <section id="all-food-items-wrapper">

        <section v-for="item in vue_loop_repeats">
            @foreach($all_items as $one_item)
                @if(property_exists($one_item['item_data']->details,'description'))
                    @singleItem(['item_attributes'=>$one_item['item_data']->details->description])
                    @slot('icon')
                        {{$one_item['item_data']->icon}}
                    @endslot
                    @endsingleItem
                @endif
            @endforeach

        </section>
    </section>
@endsection




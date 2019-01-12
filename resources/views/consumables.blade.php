@extends('welcome')

@section('body-center')
    <section class="foodAttributesWrapper">
        @for($i=0;$i<=2;$i++)
            <section id="food-attribute-filters" ref="food-attribute-filters">
                @include('Components/foodAttributesFilter')
            </section>
        @endfor
        <section id="common-attribute-filter" ref="common-attribute-filters">
            @include('Components/commonAttributesFilter')
        </section>
        @include('Components/menu')
    </section>

    <section id="all-food-items-wrapper">

        <section v-for="item in vue_loop_repeats">
            @foreach($all_items as $one_item)
                @if(property_exists($one_item['item_data']->details,'description'))
                    @singleItem(['item_attributes'=>$one_item['item_data']->details->description])
                    @slot('name')
                        {{$one_item['item_data']->name}}
                    @endslot
                    @slot('icon')
                        {{$one_item['item_data']->icon}}
                    @endslot
                    @slot('level')
                        {{$one_item['item_data']->level}}
                    @endslot
                    @slot('rarity')
                        {{$one_item['item_data']->rarity}}
                    @endslot
                    @endsingleItem
                @endif
            @endforeach

        </section>
    </section>
@endsection




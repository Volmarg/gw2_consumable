@extends('welcome')  <!-- This extend breaks project !-->

@section('body-center')


    <section id="master" >
        <select id="numbers">
            <option v-for="n in 10" ref="numbers">@{{ n }}</option>
        </select>

        <section v-for="i in refik2 ">
            <div data-id="1" ref="a1">a</div>
            <div data-id="2" ref="a1">b</div>
            <div data-id="3" ref="a1">c</div>
        </section>

        <div id="divium">
            @{{ eeee }}
        </div>

        <script>
            // demo for tests
            var ul = new Vue({
                el: '#numbers',

            });

            var master = new Vue ({
                el:'#master',
                data:{
                    refik2:1
                }
            });

            var section2 = new Vue({
                el: '#divium',
                data: {
                    eeee: console.log(master.$refs.a1[0].dataset.id),
                }

            });
        </script>
    </section>

    @foreach($all_items as $one_item)
        @if(property_exists($one_item['item_data']->details,'description'))
            @singleItem(['item_attributes'=>$one_item['item_data']->details->description])
            @slot('icon')
                {{$one_item['item_data']->icon}}
            @endslot
            @endsingleItem
        @endif
    @endforeach



@endsection




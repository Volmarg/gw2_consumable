<section class="foodAttributesWrapper" data-prefix="food">
    <select id="food-attribute-select-{{ $i }}">
        <option v-for="attribute in food_attributes" ref="numbers">@{{ attribute }}</option>
    </select>
    <!--<button class="btn btn-sm btn-info clear-filter">X</button>!-->
</section>

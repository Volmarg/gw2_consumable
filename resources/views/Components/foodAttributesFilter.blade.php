<section class="foodAttributesWrapper" data-prefix="food">
    <select class="food-attribute-select-{{ $i }}">
        <option v-for="attribute in food_attributes" ref="numbers" :value="attribute">@{{ attribute }}</option>
    </select>
    <button class="btn btn-sm btn-info clear-filter">X</button>
</section>

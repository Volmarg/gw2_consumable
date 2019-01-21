<section class="foodAttributesWrapper">
    <select id="food-attribute-select-{{ $i }}">
        <option v-for="attribute in food_attributes" ref="numbers">@{{ attribute }}</option>
    </select>
</section>

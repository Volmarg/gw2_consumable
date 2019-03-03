<section class="foodAttributesWrapper" data-prefix="food">
    <select class="food-attribute-select-{{ $i }}" data-id="food-{{ $i }}">
        <option v-for="attribute in food_attributes" ref="numbers" :value="attribute">@{{ attribute }}</option>
    </select>
    <button class="btn btn-sm btn-info clear-filter"
            data-linked='{"class": "foodAttributesWrapper",	"data_id": "food-{{ $i }}"}'>X
    </button>
</section>

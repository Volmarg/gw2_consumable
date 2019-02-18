<section class="levelAttributesWrapper" data-prefix="level">
    <select class="level-attribute-select" data-id="min">
        <option v-for="oneAttributeValue in allAttributeValues" ref="common-attribute-levels" :value="oneAttributeValue">@{{ oneAttributeValue }}
        </option>
    </select>
    <button class="btn btn-sm btn-info clear-filter">X</button>
    <select class="level-attribute-select" data-id="max">
        <option v-for="oneAttributeValue in allAttributeValues" ref="common-attribute-levels" :value="oneAttributeValue">@{{ oneAttributeValue }}
        </option>
    </select>
    <button class="btn btn-sm btn-info clear-filter">X</button>
</section>
<section class="rarityAttributesWrapper" data-prefix="rarity">
    <select class="rarity-attribute-select">
        <option v-for="oneAttributeValue in allAttributeValues" ref="common-attribute-levels" :value="oneAttributeValue">@{{ oneAttributeValue }}
        </option>
    </select>
    <button class="btn btn-sm btn-info clear-filter">X</button>
</section>

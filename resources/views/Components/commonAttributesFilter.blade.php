<section class="levelAttributesWrapper" data-prefix="level">
    <select id="level-attribute-select">
        <option v-for="oneAttributeValue in allAttributeValues" ref="common-attribute-levels" :value="oneAttributeValue">@{{ oneAttributeValue }}
        </option>
    </select>
    <button class="btn btn-sm btn-info clear-filter">X</button>
</section>
<section class="rarityAttributesWrapper" data-prefix="rarity">
    <select id="rarity-attribute-select">
        <option v-for="oneAttributeValue in allAttributeValues" ref="common-attribute-levels" :value="oneAttributeValue">@{{ oneAttributeValue }}
        </option>
    </select>
    <button class="btn btn-sm btn-info clear-filter">X</button>
</section>

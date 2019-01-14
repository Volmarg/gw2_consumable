<section class="levelAttributesWrapper">
    <select id="level-attribute-select">
        <option v-for="oneAttributeValue in allAttributeValues" ref="common-attribute-levels">@{{ oneAttributeValue }}
        </option>
    </select>
</section>
<section class="rarityAttributesWrapper">
    <select id="rarity-attribute-select">
        <option v-for="oneAttributeValue in allAttributeValues" ref="common-attribute-levels">@{{ oneAttributeValue }}
        </option>
    </select>
</section>

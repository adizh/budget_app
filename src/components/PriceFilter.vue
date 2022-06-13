<template>
  <div
    :class="theme === 'dark' ? 'dark_theme' : 'light_theme'"
    class="filterByPrice"
  >
    <p @click="arePricesVisible = !arePricesVisible">
      {{ isPriceChooses ? $t("priceFilter") : priceName }}
    </p>
    <div
      v-show="arePricesVisible"
      v-for="price in $t('pricesOption')"
      :key="price.name"
      @click="selectPrice(price)"
    >
      <p class="price_option">{{ price.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PriceFilter",
  data() {
    return {
      arePricesVisible: false,
      priceName: "",
    };
  },
  props: {
    sortedPro: {
      type: Array,
    },
    isPriceChooses: Boolean,
  },
  computed: {
    theme() {
      let theme = localStorage.getItem("theme");

      return theme;
    },
  },
  methods: {
    selectPrice(price) {
      this.priceName = price.name;
      this.$emit("selectPrice", price);
    },
    hideSelect() {
      this.arePricesVisible = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
  },
  destroyed() {
    document.removeEventListener("click", this.hideSelect);
  },
};
</script>

<style  scoped>
.filterByPrice {
  background: burlywood;
  margin: 10px auto;
  width: 31%;
  border-radius: 5px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.price_option {
  padding: 4px;
}
.dark_theme {
  color: white;
}
.light_theme {
  color: #000000;
}
.price_option:hover {
  display: inline-block;
  border-radius: 4px;
  width: 100%;
  background: aliceblue;
}
@media (min-width: 250px) and (max-width: 450px) {
  .filterByPrice {
    width: 80%;
  }
}
</style>
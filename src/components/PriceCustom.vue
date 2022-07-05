<template>
  <div>
    <button class="btn btn-secondary button_que" @click="isCustom = !isCustom">
      {{ isCustomAdded || isChanged ? $t("customChanged") : $t("customDef") }}
    </button>
    <div v-if="isCustom" class="custom_blocks">
      <div>
        <span class="no_purchase">{{ $t("Low") }}: </span
        ><input
          class="custom_inputs"
          :class="localeLan === 'en' ? 'custom_inputs1' : ''"
          v-model="lowPrice"
        />
      </div>
      <div>
        <span class="no_purchase">{{ $t("Medium") }}:</span
        ><input v-model="medPrice" class="custom_inputs" />
      </div>
      <div>
        <span class="no_purchase">{{ $t("High") }}:</span
        ><input
          class="custom_inputs"
          :class="localeLan === 'en' ? 'custom_inputs1' : ''"
          v-model="highPrice"
        />
      </div>
      <button
        class="btn btn-secondary"
        @click="submitCustomPrice(lowPrice, medPrice, highPrice)"
        :disabled="
          String(lowPrice).length &&
          String(medPrice).length &&
          String(highPrice).length
            ? false
            : true
        "
      >
        Ok
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import i18n from "../plugins/i18n";
export default {
  name: "PriceCustom",
  data() {
    return {
      isCustom: false,
      isChanged: false,
    };
  },
  methods: {
    ...mapActions(["SUBMIT_CUSTOM_PRICE"]),
    submitCustomPrice(lowPrice, medPrice, highPrice) {
        setTimeout(() => {
            this.isChanged=true
         },3000)
      this.SUBMIT_CUSTOM_PRICE({ lowPrice, medPrice, highPrice });
        setTimeout(() => {
        this.isCustom = false
       },2000)
    },










   

  },

  computed: {
    localeLan() {
      return i18n.locale;
    },
    isCustomAdded() {
      return localStorage.getItem('lowPrice');
    }, 
    lowPrice: {
      get() {
        return this.$store.state.lowPrice;
      },
      set(value) {
        this.$store.commit("updateLowPrice", value);
      },
    },
      medPrice: {
      get() {
        return this.$store.state.medPrice;
      },
      set(value) {
        this.$store.commit("updateMedPrice", value);
      },
    },
      highPrice: {
      get() {
        return this.$store.state.highPrice;
      },
      set(value) {
        this.$store.commit("updateHighPrice", value);
      },
    },
  },
};
</script>

<style  scoped>
.button_que {
  display: block;
  width: 30%;
  margin: 18px auto 9px;
}
.custom_blocks {
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom_inputs {
  border: 1px solid grey;
  border-radius: 5px;
  margin-left: 7px;
  padding: 1px;
  width: 56%;
}
.custom_inputs::placeholder {
  color: red;
}
.custom_inputs:focus {
  outline: none;
}
@media (min-width: 250px) and (max-width: 450px) {
  .button_que {
    width: 90%;
  }
  .custom_blocks {
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
  .custom_blocks div span {
    display: block;
  }
  .custom_blocks div {
    display: flex;
  }

  .custom_inputs1 {
    margin-left: 32px;
  }
}
</style>
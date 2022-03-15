<template>
  <v-app>
    <v-main>
      <v-row class="pa-10 justify-center container">
        <v-col cols="auto">
          <invoice-calculator />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import InvoiceCalculator from "./components/invoice-calc/index.vue";

export default Vue.extend({
  name: "App",
  components: {
    InvoiceCalculator,
  },
});
</script>

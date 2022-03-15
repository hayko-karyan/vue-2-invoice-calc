<template>
  <v-card width="75vw" class="pa-10">
    <invoice-header />
    <v-row class="invoices-header align-center">
      <v-col>
        <v-checkbox v-model="allSelected" />
      </v-col>
      <v-col>{{ $i18n.t("NAME") }}</v-col>
      <v-col>{{ $i18n.t("PRICE") }}</v-col>
      <v-col>{{ $i18n.t("COUNT") }}</v-col>
      <v-col>{{ $i18n.t("SUM") }}</v-col>
    </v-row>
    <v-row v-if="invoices.length" class="invoices-container mt-5">
      <v-col
        :key="allSelected || invoices.length"
        class="invoices-col d-flex flex-column"
      >
        <invoice-item
          v-for="(item, index) in invoices"
          :key="index"
          :item="item"
          @changeSelection="changeSelection(index)"
        />
      </v-col>
    </v-row>
    <v-row v-else class="invoices-container mt-5">
      <v-col class="d-flex justify-center">
        {{ $i18n.t("NO_INVOICES") }}
      </v-col>
    </v-row>
    <v-row class="justify-space-between mt-5">
      <v-col cols="auto">
        <v-btn
          class="bg-red"
          :disabled="!areSelected"
          @click="removeSelectedInvoices"
        >
          {{ $i18n.t("DELETE") }}
        </v-btn>
      </v-col>
      <v-col cols="auto">
        {{ $i18n.t("TOTAL") }}: {{ $n(totalPrice, "currency") }}
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { IInvoice } from "../../store/invoice/types";
import invoiceItem from "./invoice.vue";
import invoiceHeader from "./invoiceHeader.vue";

export default {
  name: "Invoice-Calculator",
  components: {
    invoiceItem,
    invoiceHeader,
  },
  computed: {
    invoices() {
      return this.$store.getters.getInvoices;
    },
    allSelected: {
      get() {
        return this.$store.getters.getIsSelected;
      },
      set(e: boolean) {
        this.$store.dispatch("selectAll", e);
      },
    },
    areSelected() {
      const index = this.invoices.findIndex((item: IInvoice) => item.selected);
      return index > -1;
    },
    totalPrice() {
      return this.invoices
        .map((item: IInvoice) => item.sum)
        .reduce((prev: number, curr: number) => prev + curr, 0);
    },
  },
  methods: {
    changeSelection(index: number) {
      this.$store.dispatch("changeSelection", index);
    },
    removeSelectedInvoices() {
      this.$store.dispatch("removeSelectedInvoices");
    },
  },
};
</script>

<style lang="scss" scoped>
.invoices-header,
.invoices-container {
  border: 1px solid black;
}
</style>

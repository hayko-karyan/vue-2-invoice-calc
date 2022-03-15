<template>
  <v-form v-model="formIsValid" ref="form" class="mb-3">
    <v-row>
      <v-col class="pl-0">
        <v-text-field
          v-model="newInvoice.name"
          :label="$i18n.t('PRODUCT_NAME')"
          variant="outlined"
          :rules="[
            $rules.required($i18n),
            $rules.maxLength(32, $i18n),
            nameIsValid,
          ]"
        />
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model.number="newInvoice.price"
          type="number"
          :min="0"
          :label="$i18n.t('PRICE')"
          variant="outlined"
          :rules="[
            $rules.lessThan(1000000, $i18n),
            $rules.greaterThan(0, $i18n),
          ]"
        />
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model.number="newInvoice.count"
          type="number"
          :min="0"
          :label="$i18n.t('COUNT')"
          variant="outlined"
          :rules="[
            $rules.lessThan(1000000, $i18n),
            $rules.greaterThan(0, $i18n),
          ]"
        />
      </v-col>
      <v-col cols="auto" class="pr-0">
        <v-btn class="bg-primary" height="56" @click="addNewInvoice">
          {{ $i18n.t("ADD") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { IInvoice } from "../../store/invoice/types";

export default {
  name: "Invoice-Header",
  data: () => {
    return {
      newInvoice: {
        name: "",
        price: 0,
        count: 0,
      },
      formIsValid: null,
    };
  },
  computed: {
    invoices() {
      return this.$store.getters.getInvoices;
    },
    nameIsValid() {
      const index = this.invoices.findIndex(
        (item: IInvoice) => item.name === this.newInvoice.name?.trim()
      );
      return index == -1 || this.$i18n.t("VALIDATIONS.SAME_NAME");
    },
  },
  methods: {
    addNewInvoice() {
      if (!this.formIsValid) {
        return this.$refs.form.validate();
      }
      const { name, price, count } = this.newInvoice;

      this.$store.dispatch("addInvoice", {
        ...this.newInvoice,
        name: name.trim(),
        sum: price * count,
        selected: false,
      });

      this.newInvoice = {
        name: "",
        price: 0,
        count: 0,
      };

      return this.$refs.form.reset();
    },
  },
};
</script>

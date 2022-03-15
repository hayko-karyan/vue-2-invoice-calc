<template>
  <v-row class="invoice-row" :class="{ 'selected-row': isSelected }">
    <v-col class="d-flex align-center">
      <v-checkbox v-model="isSelected" @change="$emit('changeSelection')" />
    </v-col>
    <v-col class="d-flex align-center">{{ item.name }}</v-col>
    <v-col class="d-flex align-center">{{ $n(item.price, "currency") }}</v-col>
    <v-col class="d-flex align-center">{{ $n(item.count) }}</v-col>
    <v-col class="d-flex align-center">{{ $n(item.sum, "currency") }}</v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  name: "Invoice-Item",
  props: ["item"],
  data() {
    return {
      isSelected: this.item.selected,
    };
  },
};
</script>

<style lang="scss" scoped>
.v-input {
  max-height: 56px !important;
}

.invoice-row:not(:last-child) {
  border-bottom: 1px solid black;
}

.selected-row {
  background: rgb(34 50 43 / 10%) !important;
}
</style>

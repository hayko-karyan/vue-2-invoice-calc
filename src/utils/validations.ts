import Vue from "vue";
import VueI18n from "vue-i18n";

export const required = (i18n: VueI18n) => (newValue: string) =>
  newValue?.trim()?.length !== 0 || i18n.t("VALIDATIONS.REQUIRED");

export const lessThan = (value: number, i18n: VueI18n) => (newValue: number) =>
  newValue < value || i18n.t("VALIDATIONS.LESS_THAN", { value });

export const greaterThan =
  (value: number, i18n: VueI18n) => (newValue: number) =>
    newValue > value || i18n.t("VALIDATIONS.GREATER_THAN", { value });

export const maxLength =
  (value: number, i18n: VueI18n) => (newValue: string | Array<never>) =>
    newValue?.length < value || i18n.t("VALIDATIONS.MAX_LENGTH", { value });

Vue.prototype.$rules = {
  required,
  lessThan,
  greaterThan,
  maxLength,
};

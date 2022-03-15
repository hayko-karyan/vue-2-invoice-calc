import { ActionContext } from "vuex";
import { IInvoicesState, IInvoice } from "./types";

export const InvoicesStore = {
  state: {
    invoices: [],
  },
  getters: {
    getInvoices(state: IInvoicesState) {
      return state.invoices;
    },
    getIsSelected(state: IInvoicesState) {
      const index =
        state.invoices.length && state.invoices.findIndex((e) => !e.selected);
      return index == -1;
    },
  },
  actions: {
    addInvoice(
      context: ActionContext<IInvoicesState, IInvoicesState>,
      newInvoice: IInvoice
    ): void {
      context.commit("addInvoice", newInvoice);
    },
    removeSelectedInvoices(
      context: ActionContext<IInvoicesState, IInvoicesState>
    ): void {
      context.commit("removeSelectedInvoices");
    },
    changeSelection(
      context: ActionContext<IInvoicesState, IInvoicesState>,
      index: number
    ): void {
      context.commit("changeSelection", index);
    },
    selectAll(
      context: ActionContext<IInvoicesState, IInvoicesState>,
      isSelected: boolean
    ): void {
      context.commit("selectAll", isSelected);
    },
  },
  mutations: {
    addInvoice(state: IInvoicesState, newInvoice: IInvoice): void {
      state.invoices = [...state.invoices, newInvoice];
    },
    removeSelectedInvoices(state: IInvoicesState): void {
      state.invoices = state.invoices.filter((e: IInvoice) => !e.selected);
    },
    changeSelection(state: IInvoicesState, index: number): void {
      const currentSelected = state.invoices[index].selected;
      state.invoices[index].selected = !currentSelected;
    },
    selectAll(state: IInvoicesState, isSelected: boolean): void {
      state.invoices.map((e: IInvoice) => (e.selected = isSelected));
    },
  },
};

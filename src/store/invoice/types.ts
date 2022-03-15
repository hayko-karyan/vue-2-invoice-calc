export interface IInvoice {
  selected: boolean;
  name: string;
  price: number;
  count: number;
  sum: number;
}

export interface IInvoicesState {
  invoices: IInvoice[];
}

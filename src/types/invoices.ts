export type Invoice = {
	_id: string; 
    account_id: {
		_id: string;
		account_name: string;
	};
	charges: Array<string>;
	contact_id: {
		first_name: string;
		last_name: string;
	};
	group_id: string;
	invoice_date: string;
	invoice_id: string;
	is_active: boolean;
	purchase_order: string;
	order_id: Array<string>;
	subtotal: number;
	tax: number;
	total: number;
	type: string;
}

export type AddInvoice = {
	_id: string; 
    account_id: string;
	charges: Array<string>;
	contact_id: string;
	group_id: string;
	invoice_date: string;
	invoice_id: string;
	is_active: boolean;
	purchase_order: string;
	order_id: Array<string>;
	subtotal: number;
	tax: number;
	total: number;
	type: string;
	status: string;
}

export enum InvoiceType {
    recurring = 'recurring',
    ondemand = 'on-demand'
}
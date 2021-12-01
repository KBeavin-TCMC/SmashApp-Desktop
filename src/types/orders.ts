import {Days, Services, ServicesPer} from './enums';

export type Agreement = {
  _id: string;
  account_id: {
    account_name: string
  };
  container_qty: string;
  demand_rate: string;
  end_date: string;
  group_id: string;
  agreement_id: string;
  is_active: boolean;
  is_recurring: boolean;
  location: string;
  notes: string;
  owner_id: string;
  recurring_rate: string;
  services: string;
  start_date: string;
  url: string;
  day_freq: number[];

};

export type AddAgreement = {
  _id: string;
  account_id: string;
  container_qty: string;
  demand_rate: string;
  end_date: string;
  group_id: string;
  agreement_id: string;
  is_active: boolean;
  is_recurring: boolean;
  location: string;
  notes: string;
  owner_id: string;
  recurring_rate: string;
  services: string;
  start_date: string;
  url: string;
  day_freq: number[];
  
};

export type Order = {
  _id: string;
  account_id: {
    account_name: string
  };
  agreement_id?: string;
  containers_serviced?: number;
  completed_geo_location?: string;
  completed_time?: Date;
  container_qty: string;
  demand_rate: string;
  group_id: string;
  haul_status: boolean;
  is_active: boolean;
  is_demo: boolean;
  is_recurring: boolean;
  monthly_rate: string;
  location: string;
  notes: string[];
  order_id: string;
  order_status: string;
  services: string;
  service_date: string;
  service_day: string;
  url: string[];
  route_id?: string;
};

export type AddOrder = {
  _id: string;
  account_id: string;
  agreement_id?: string;
  containers_serviced?: number;
  completed_geo_location?: string;
  completed_time?: Date;
  container_qty: string;
  demand_rate: string;
  group_id: string;
  haul_status: boolean;
  is_active: boolean;
  is_demo: boolean;
  is_recurring: boolean;
  monthly_rate: string;
  location: string;
  notes: string[];
  order_id: string;
  order_status: string;
  services: string;
  service_date: string;
  service_day: string;
  url: string[];
};

export type Demo = {
  _id: string;
  account_id: string;
  created: string;
};

export type VOrder = {
  _id: string;
	account_id: string;
	contact_id: string;
	group_id: string;
	job_id: string;
	location_id: string;
	route_id: String;
	document_id: string[];
	status: string;
	serviceType: string;
	scheduledOn: number;
	scheduledOnDuration: number;
	subtotal: number;
	summary: string;
	label: string;
	discountNotes: string;
	discount: number;
	tips: number;
	price: number;
	completedOn: Date;
	total: number;
	newBusiness: boolean;
	smashOfTheWeek: boolean;
	avgPreSmashFullness: number;
	avgPostSmashFullness: number;
	dumpsterID: string;
	dumpstersSmashed: number;
	haul: boolean;
	smashNotes: string;
	wasSmashPerformed: boolean;
	notes: string;

	dateCreated: number;
	dateLastEdited: number;
	isActive: boolean;
	name: string;
	order_id: string;
	vonigo_order_id: number;
}
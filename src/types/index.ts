import { StringMappingType } from "typescript";

//=== Franchise ===//
export type Group = {
  _id: string
  address: Address;
  address_city?: string,
  address_state?: string,
  address_street?: string,
  address_zip?: string,
  dba: string;
  ein: string;
  email: string;
  is_active: boolean;
  launch_date: Date;
  legal_company: string;
  name: string;
  phone: string;
  region: string;
  signing_date: string;
  tax_rate: string;
  territory_zips: string;
  time_zone: string;
  webpage: string;
};

//=== Auth Types ===//
export type SMT_User = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  token: string;
  image: string;
  role: string;
  group_id: string;
  created: string;
  is_active: boolean;
};

//=== Utility ===//
export type Address = {
  address_city: string;
  address_state: string;
  address_street: string;
  address_zip: string;
};

//=== Validators ===//
export interface IValidator {
  isValid: boolean;
  message: string;
  isVisible: boolean;
};

export class Validator implements IValidator {
  isValid: boolean = false;
  message: string = '';
  isVisible: boolean = false;
};

//=== Mapbox ===//
export interface Point {
  _id: string;
  longitude: number;
  latitude: number;
}

export type Quote = {
  _id: string;
  group_id: string;
  account_id: string;
  location_id: string;
  objectID: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  dateService: number;
  dateCreated: number;
  dateLastEdited: number;
  isActive: boolean;
  is_active: boolean;
  title: string;
}

export type Lead = {
  _id: string;
  group_id: string;
  objectID: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  dateService: number;
  dateCreated: number;
  dateLastEdited: number;
  isActive: boolean;
  is_active: boolean;
  title: string;
}
import { MapboxPoint } from "./mapbox"
import { Order } from "./orders"

export type Truck = {
    _id: string;
    body_subtype: string;
    body_type: string;
    color: string;
    documents: string[];
    group_id: string[];
    hours: string;
    is_active: boolean;
    license_number: string;
    msrp: string;
    name: string;
    odo: string;
    operator: string;
    ownership: string;
    pictures: string[];
    service_history: string[];
    service_status: string;
    trim: string;
    registration: string;
    vehicle_make: string;
    vehicle_model: string;
    vehicle_type: string;
    vin: string;
    year: string;
}

export type Route = {
  _id: string;
  group_id: string;
  route_id: string;
  truck_id?: string;
  inspection_id: string;
  is_active: boolean;
  route_stage: string;
  start_location: string;
  driver_id?: string;
  service_stop: string[];
  time: Date;
  notes: string;
}

export type PreTripInspection = {
  // Identify truck
  _id: string;
	group_id: string;
  inspection_id: string;
	owner_id: {
    first_name: string,
    last_name: string
  };
	is_active: boolean;
	type: string;
	truck_id: string;
    
  // Truck Checklist
  truck_checklist: {
    odometer_reading: string;
    fuel_level: string;
    seat_belts: boolean;
    pto_switch: boolean;
    engine_fluids: boolean;
    transmission: boolean;
    steering_mechanism: boolean;
    horn: boolean;
    windshield_wipers: boolean;
    mirrors: boolean;
    truck_lights: boolean;
    parking_brake: boolean;
    service_brake: boolean;
    tires: boolean;
    rims: boolean;
    emergency_equipment: boolean;
    tools_gear: boolean;
    chocks_chains: boolean;
  };
    
  // Smash Unit Checklist
  smash_unit_checklist: {
    drum_cap: boolean;
    grease_distribution: boolean;
    chain_tension: boolean;
    machine_lights: boolean;
    machine_hours: string;
  }

  // Sign-Off Checklist
  sign_off_checklist: {
    vehicle_condition: boolean;
    required_documents: Array<string>;
    engine_warning: boolean;
    drivers_signature: string; // will point to url of driver signature image.
  }
}

export type AddPreTripInspection = {
  // Identify truck
  _id: string;
	group_id: string;
	owner_id: string;
	is_active: boolean;
	type: string;
	truck_id: string;
    
  // Truck Checklist
  truck_checklist: {

    odometer_reading: string;
    fuel_level: string;
    seat_belts: boolean;
    pto_switch: boolean;
    engine_fluids: boolean;
    transmission: boolean;
    steering_mechanism: boolean;
    horn: boolean;
    windshield_wipers: boolean;
    mirrors: boolean;
    truck_lights: boolean;
    parking_brake: boolean;
    service_brake: boolean;
    tires: boolean;
    rims: boolean;
    emergency_equipment: boolean;
    tools_gear: boolean;
    chocks_chains: boolean;
  }
    
    // Smash Unit Checklist
    smash_unit_checklist: {
      drum_cap: boolean;
      grease_distribution: boolean;
      chain_tension: boolean;
      machine_lights: boolean;
      machine_hours: string;
    }

  // Sign-Off Checklist
  sign_off_checklist: {
    vehicle_condition: boolean;
    required_documents: Array<string>;
    engine_warning: boolean;
    drivers_signature: string; // will point to url of driver signature image.
  }
    createdAt: string;
}

export type DriverRouteState = {
  routeStage: string;
  stopsState: {
    currentId: string;
    currentStop: string;
    currentStatus: string;
  }
}

export type Stop = {
  order: Order,
  coordinates: MapboxPoint,
  type: StopType
}

export enum StopType {
  routed = 'routed',
  unrouted = 'unrouted',
  start = 'start'
}
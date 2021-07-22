import React, { useContext, useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md'
import AppContext from '../../providers/AppContext';
import { ModalContext } from '../../providers/ModalProvider';
import { ToastContext } from '../../providers/ToastProvider';
import { SMT_User } from '../../types';
import { Route, Truck } from '../../types/routes';
import { isSuccessStatusCode } from '../../utils/Helpers';
import AppButton from '../layout/AppButton';
import AppDropDown from '../layout/AppDropDown';
import AppTextInput from '../layout/AppTextInput';


const AddRouteForm = () => {
    const {id, grpId, displayName, token} = useContext(AppContext);
    const {hide} = useContext(ModalContext);
    const {show} = useContext(ToastContext);
    const [name, setName] = useState('');
    const [startLocation, setStartLocation] = useState('');
    const [driver, setDriver] = useState('');
    const [time, setTime] = useState('');
    const [truckVin, setTruckVin] = useState('');
    const [startLocationList, setStartLocationList] = useState<string[]>([]);
    const [truckVinList, setTruckVinList] = useState<Truck[]>([]);
    const [driverList, setDriverList] = useState<SMT_User[]>([]);

    useEffect(() => {
        getStartLocationList();
        getTruckVinList();
        getDriverList();
    }, []);

    const getStartLocationList = async () => {
        await fetch(`${process.env.REACT_APP_TCMC_URI}/api/groupsBy`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'x-access-token': token},
            body: JSON.stringify({_id: grpId})
          })
          .then(res => res.json())
          .then(json => {
            if (isSuccessStatusCode(json.status)) {
                setStartLocation(json.data[0].truck_location[0]);
              setStartLocationList(json.data[0].truck_location);
            } else {
              show({message: json.message});
            }
          })
          .catch(err => show({message: err.message}));
    };

    const getTruckVinList = async () => {
        await fetch(`${process.env.REACT_APP_TCMC_URI}/api/truckBy`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'x-access-token': token},
            body: JSON.stringify({group_id: grpId})
          })
          .then(res => res.json())
          .then(json => {
            if (isSuccessStatusCode(json.status)) {
              setTruckVin(json.data[0].vin);
              setTruckVinList(json.data);
            } else {
              show({message: json.message});
            }
          })
          .catch(err => show({message: err.message}));
    };

    const getDriverList = async () => {
        await fetch(`${process.env.REACT_APP_TCMC_URI}/api/usersBy`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'x-access-token': token},
            body: JSON.stringify({group_id: grpId})
          })
          .then(res => res.json())
          .then(json => {
            if (isSuccessStatusCode(json.status)) {
              setDriverList(json.data);
            } else {
              show({message: json.message});
            }
          })
          .catch(err => show({message: err.message}));
    };

    const getFormData = async () => {
      const newRoute: Route = {
        _id: '',
        group_id: grpId,
        route_id: name,
        inspection_id: '',
        is_active: true,
        route_stage: 'Empty',
        start_location: startLocation,
        truck_id: truckVin,
        truck_vin: truckVin,
        service_stop: [],
        time: new Date(time),
        notes: '',
    }
      return newRoute;
    };

    async function postNewRoute() {
      const route = await getFormData();
      
      await fetch(`${process.env.REACT_APP_TCMC_URI}/api/routes`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'x-access-token': token},
        body: JSON.stringify(route),
      })
        .then((res) => res.json())
        .then((data) => {
          if (isSuccessStatusCode(data.status)) {
            show({ message: data.message });
            hide({});
          } else {
            show({ message: data.message });
          }
        })
        .catch((err) => show({message: err.message}));
    }
    
    return (
      <div className="app-form">
        <div className="form-header">
          <div className="form-header-title">
            <h4>New Route</h4>
          </div>
          <div className="form-header-icon">
            <MdClose size={24} onClick={() => hide({})} />
          </div>
        </div>

        <div className="form-body">
          <AppDropDown label='Start Location' value={startLocation} onChange={setStartLocation} list={startLocationList.map(u => { return {id: u, label: u, value: u}})} />
          <AppDropDown label='Truck Vin' value={truckVin} onChange={setTruckVin} list={truckVinList.map(u => { return {id: u._id, label: u.vin, value: u._id}})} />
          <AppDropDown label='Driver' value={driver} onChange={setDriver} list={driverList.map(u => { return {id: u._id, label: u.first_name + ' ' + u.last_name, value: u._id}})} />
          <AppTextInput label='Date' value={time} onChange={setTime} type='date' />
        </div>

        <div className="form-footer">
          <div className="footer-buttons">
            <AppButton label="Save" onClick={() => postNewRoute()} />
            <AppButton
              size={"sm"}
              label="Cancel"
              onClick={() => hide({})}
              secondary
              outlined
            />
          </div>
        </div>
      </div>
    );
}

export default AddRouteForm;
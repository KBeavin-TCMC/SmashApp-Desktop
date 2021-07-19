import React, { useContext, useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md'
import AppContext from '../../providers/AppContext';
import { ModalContext } from '../../providers/ModalProvider';
import { ToastContext } from '../../providers/ToastProvider';
import { SMT_User } from '../../types';
import { VehicleType } from '../../types/enums';
import { Truck } from '../../types/routes';
import { isSuccessStatusCode } from '../../utils/Helpers';
import AppButton from '../layout/AppButton';
import AppDropDown from '../layout/AppDropDown';
import AppTextInput from '../layout/AppTextInput';


const AddTruckForm = () => {
    const {id, grpId, displayName, token} = useContext(AppContext);
    const {hide} = useContext(ModalContext);
    const {show} = useContext(ToastContext);
    const [bodySubtype, setBodySubtype] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [color, setColor] = useState('');
    const [hours, setHours] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [msrp, setMsrp] = useState('');
    const [name, setName] = useState('');
    const [odo, setOdo] = useState('');
    const [operator, setOperator] = useState('');
    const [ownership, setOwnership] = useState('');
    const [serviceStatus, setServiceStatus] = useState('Good');
    const [trim, setTrim] = useState('');
    const [registration, setRegistration] = useState('');
    const [vehicleMake, setVehicleMake] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehicleType, setVehicleType] = useState(VehicleType.smashTruck.toString());
    const [vin, setVin] = useState('');
    const [year, setYear] = useState('');

    const [operatorList, setOperatorList] = useState<SMT_User[]>([]);

    useEffect(() => {
      getOperatorList();
    }, []);

    const getOperatorList = async () => {
      await fetch(`${process.env.REACT_APP_TCMC_URI}/api/usersBy`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'x-access-token': token},
          body: JSON.stringify({group_id: grpId})
        })
        .then(res => res.json())
        .then(json => {
          if (isSuccessStatusCode(json.status)) {
            setOperatorList(json.data);
          } else {
            show({message: json.message});
          }
        })
        .catch(err => show({message: err.message}));
  };

    const getFormData = async () => {
      const newTruck: Truck = {
        _id: '',
        body_subtype: bodySubtype,
        body_type: bodyType,
        color: color,
        documents: [],
        group_id: grpId,
        hours: hours,
        is_active: true,
        license_number: licenseNumber,
        msrp: msrp,
        name: name,
        odo: odo,
        operator: operator,
        ownership: ownership,
        pictures: [],
        service_history: [],
        service_status: serviceStatus,
        trim: trim,
        registration: registration,
        vehicle_make: vehicleMake,
        vehicle_model: vehicleModel,
        vehicle_type: vehicleType,
        vin: vin,
        year: year
    }
      return newTruck;
    };

    async function postNewTruck() {
      const truck = await getFormData();
      
      await fetch(`${process.env.REACT_APP_TCMC_URI}/api/trucks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'x-access-token': token},
        body: JSON.stringify(truck),
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
            <h4>New Truck</h4>
          </div>
          <div className="form-header-icon">
            <MdClose size={24} onClick={() => hide({})} />
          </div>
        </div>

        <div className="form-body">
          <AppTextInput label='body subtype' value={bodySubtype} onChange={setBodySubtype} />
          <AppTextInput label='body type' value={bodyType} onChange={setBodyType} />
          <AppTextInput label='color' value={color} onChange={setColor} />
          <AppTextInput label='hours' value={hours} onChange={setHours} />
          <AppTextInput label='license number' value={licenseNumber} onChange={setLicenseNumber} />
          <AppTextInput label='msrp' value={msrp} onChange={setMsrp} />
          <AppTextInput label='name' value={name} onChange={setName} />
          <AppTextInput label='odo' value={odo} onChange={setOdo} />
          <AppDropDown label='operator' value={operator} onChange={setOperator} list={operatorList.map(u => { return {id: u._id, label: u.first_name + ' ' + u.last_name, value: u._id}})} />
          <AppTextInput label='ownership' value={ownership} onChange={setOwnership} />
          <AppTextInput label='trim' value={trim} onChange={setTrim} />
          <AppTextInput label='registration' value={registration} onChange={setRegistration} />
          <AppTextInput label='vehicle make' value={vehicleMake} onChange={setVehicleMake} />
          <AppTextInput label='vehicle model' value={vehicleModel} onChange={setVehicleModel} />
          <AppDropDown label='vehicle type' value={vehicleType} onChange={setVehicleType} list={Object.values(VehicleType).map(u => { return {id: u, label: u, value: u}})} />
          <AppTextInput label='vin' value={vin} onChange={setVin} />
          <AppTextInput label='year' value={year} onChange={setYear} />

        </div>

        <div className="form-footer">
          <div className="footer-buttons">
            <AppButton label="Save" onClick={() => postNewTruck()} />
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

export default AddTruckForm;
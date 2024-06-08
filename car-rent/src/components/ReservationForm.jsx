import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReservationForm = () => {
  const [cars, setCars] = useState([]);
  const [vehicleType, setVehicleType] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [duration, setDuration] = useState('');
  const [weekCount,setWeekCount] = useState();
  const [dayCount,setDayCount] = useState();
  const [collisionDamageWaiver, setCollisionDamageWaiver] = useState(false);
  const [liabilityInsurance, setLiabilityInsurance] = useState(false);
  const [rentalTax, setRentalTax] = useState(false);
  const [charges, setCharges] = useState({
    daily: 0,
    weekly: 0,
    collisionDamageWaiver: 9,
    liabilityInsurance: 15,
    rentalTax: 11.5,
    total: 0,
  });

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const res = await axios.get('https://exam-server-7c41747804bf.herokuapp.com/carsList');
        setCars(res.data.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCarData();
  }, []);

  useEffect(() => {
    let filtered = cars;
    if (vehicleType) {
      filtered = filtered.filter(car => car.type === vehicleType);
    }
    setFilteredCars(filtered);
  }, [vehicleType, cars]);

  useEffect(() => {
    const car = cars.find(car => `${car.make} ${car.model}` === vehicle);
    setSelectedCar(car);
  }, [vehicle, cars]);

  useEffect(() => {
    if (selectedCar && (weekCount || dayCount)) {
      let total = 0;
      if(dayCount){
        total += (selectedCar.rates.daily*dayCount);
      }
      if(weekCount){
        total += (selectedCar.rates.weekly*weekCount);
      }
      if (collisionDamageWaiver) {
        total += charges.collisionDamageWaiver;
      }
      if (liabilityInsurance) {
        total += charges.liabilityInsurance;
      }
      if (rentalTax) {
        total += (total * charges.rentalTax) / 100;
      }
      setCharges(prevCharges => ({
        ...prevCharges,
        daily: selectedCar.rates.daily,
        weekly: selectedCar.rates.weekly,
        total
      }));
    }
  }, [selectedCar, collisionDamageWaiver, liabilityInsurance, rentalTax, dayCount, weekCount]);

  useEffect(() => {
    if (pickupDate && returnDate) {
      const startDate = new Date(pickupDate);
      const endDate = new Date(returnDate);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;
      setWeekCount(weeks);
      setDayCount(days);
      setDuration(`${weeks} Week(s) ${days} Day(s)`);
    } else {
      setDuration('');
    }
  }, [pickupDate, returnDate]);

  return (
    <div className="">
      <div className='d-flex justify-content-between mb-5'>
        <h1>Reservation</h1>
        <button className='btn btn-info'>Print / Download</button>
      </div> 
      <div className="row">
        <div className="col-md-4 mb-4">
          <h5>Reservation Details</h5>
          <hr className='border border-info mt-0'/>
          <div className="border border-2 p-3 rounded-2">
            <div className="mb-3">
              <label className="form-label">Reservation ID</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Pickup Date*</label>
              <input
                type="datetime-local"
                className="form-control"
                value={pickupDate}
                onChange={e => setPickupDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Return Date*</label>
              <input
                type="datetime-local"
                className="form-control"
                value={returnDate}
                onChange={e => setReturnDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Duration</label>
              <input type="text" className="form-control" value={duration} disabled />
            </div>
            <div className="mb-3">
              <label className="form-label">Discount</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <h5>Customer Information</h5>
          <hr className='border border-info mt-0'/>
          <div className="border border-2 p-3 rounded-2">
            <div className="mb-3">
              <label className="form-label">First Name*</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name*</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email*</label>
              <input type="email" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone*</label>
              <input type="tel" className="form-control" />
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <h5>Charges Summary</h5>
          <hr className='border border-info mt-0'/>
          <div className="border border-2 p-3 rounded-2">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Charge</th>
                  <th>Unit</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Daily</td>
                  <td>{dayCount && dayCount}</td>
                  <td>${selectedCar?.rates.daily}</td>
                  <td>${selectedCar?.rates.daily*dayCount}</td>
                </tr>
                <tr>
                  <td>Weekly</td>
                  <td>{weekCount && weekCount}</td>
                  <td>${selectedCar?.rates.weekly}</td>
                  <td>${selectedCar?.rates.weekly*weekCount}</td>
                </tr>
                {collisionDamageWaiver && (
                  <tr>
                    <td>Collision Damage Waiver</td>
                    <td>1</td>
                    <td>$9.00</td>
                    <td>$9.00</td>
                  </tr>
                )}
                {liabilityInsurance && (
                  <tr>
                    <td>Liability Insurance</td>
                    <td>1</td>
                    <td>$15.00</td>
                    <td>$15.00</td>
                  </tr>
                )}
                {rentalTax && (
                  <tr>
                    <td>Rental Tax</td>
                    <td colSpan="2">{charges.rentalTax}%</td>
                    <td>${((selectedCar?.rates.daily + selectedCar?.rates.weekly + (collisionDamageWaiver ? charges.collisionDamageWaiver : 0) + (liabilityInsurance ? charges.liabilityInsurance : 0)) * charges.rentalTax / 100).toFixed(2)}</td>
                  </tr>
                )}
                <tr>
                  <td colSpan="3"><strong>Total</strong></td>
                  <td><strong>${charges.total.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <h5>Vehicle Information</h5>
          <hr className='border border-info mt-0'/>
          <div className="border border-2 p-3 rounded-2">
            <div className="mb-3">
              <label className="form-label">Vehicle Type
                <span className='fw-bold text-danger'>*</span>
              </label>
              <select
                className="form-select"
                value={vehicleType}
                onChange={e => setVehicleType(e.target.value)}
              >
                <option value="">Select Vehicle Type</option>
                {[...new Set(cars.map(car => car.type))].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Vehicle
                <span className='fw-bold text-danger'>*</span>
              </label>
              <select
                className="form-select"
                value={vehicle}
                onChange={e => setVehicle(e.target.value)}
              >
                <option value="">Select Vehicle</option>
                {filteredCars.map(car => (
                  <option key={car.id} value={`${car.make} ${car.model}`}>{car.make} {car.model}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <h5>Additional Charges</h5>
          <hr className='border border-info mt-0'/>
          <div className="border border-2 p-3 rounded-2">
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="collisionDamageWaiver"
                checked={collisionDamageWaiver}
                onChange={() => setCollisionDamageWaiver(!collisionDamageWaiver)}
              />
              <label className="form-check-label" htmlFor="collisionDamageWaiver">
                Collision Damage Waiver $9.00
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="liabilityInsurance"
                checked={liabilityInsurance}
                onChange={() => setLiabilityInsurance(!liabilityInsurance)}
              />
              <label className="form-check-label" htmlFor="liabilityInsurance">
                Liability Insurance $15.00
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rentalTax"
                checked={rentalTax}
                onChange={() => setRentalTax(!rentalTax)}
              />
              <label className="form-check-label" htmlFor="rentalTax">
                Rental Tax 11.5%
              </label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReservationForm;

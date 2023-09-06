import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutomobileList from './inventory/AutomobileList';
import ModelForm from './inventory/CreateModel';
import AutomobileForm from './inventory/CreateAutomobile';
import ManufacturersList from './inventory/ListManufacturers';
import ManufacturerForm from './inventory/CreateManufacturer';
import ModelsList from './inventory/ListVehicleModels';
import AppointmentList from './service/AppointmentList';
import TechnicianList from './service/TechnicianList';
import AppointmentHistory from './service/AppointmentHistory';
import AppointmentForm from './service/AppointmentForm';
import TechnicianForm from './service/TechnicianForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="/manufacturer/create" element={<ManufacturerForm />} />
          <Route path="/models" element={<ModelsList />} />
          <Route path="/model/new" element={<ModelForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobile/new" element={<AutomobileForm />} />

          <Route path="/appointment/new" element={<AppointmentForm />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/appointments/history" element={<AppointmentHistory />} />
          <Route path="/technician/new" element={<TechnicianForm />} />
          <Route path="/technicians" element={<TechnicianList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

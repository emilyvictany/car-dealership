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
import CustomerForm from './sales/CustomerForm';
import CustomerList from './sales/CustomerList';
import SaleForm from './sales/SaleForm';
import SalesList from './sales/SalesList';
import SalespeopleList from './sales/SalespeopleList';
import SalespersonForm from './sales/SalespersonForm';
import SalespersonHistory from './sales/SalespersonHistory';

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

          <Route path="/customer/create" element={<CustomerForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/sale/create" element={<SaleForm />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/salesperson/list" element={<SalespeopleList />} />
          <Route path="/salesperson/create" element={<SalespersonForm />} />
          <Route path="/salesperson/history" element={<SalespersonHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

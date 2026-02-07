import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { CandidateDetails } from './pages/CandidateDetails';
import { AllCandidates } from './pages/AllCandidates';

export default function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidate/:id" element={<CandidateDetails />} />
          <Route path="/all-candidates" element={<AllCandidates />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
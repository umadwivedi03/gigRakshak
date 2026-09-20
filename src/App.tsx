import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import { AppLayout } from "@/components/AppLayout";

import Landing from "./pages/Landing";
import Onboard from "./pages/Onboard";
import Dashboard from "./pages/Dashboard";
import ZoneMonitor from "./pages/ZoneMonitor";
import DeliveryActive from "./pages/DeliveryActive";
import DeliveryHistory from "./pages/DeliveryHistory";
import Claims from "./pages/Claims";
import ClaimDetail from "./pages/ClaimDetail";
import SOS from "./pages/SOS";
import LegalAid from "./pages/LegalAid";
import LegalAidAdvocate from "./pages/LegalAidAdvocate";
import LegalAidPolice from "./pages/LegalAidPolice";
import LegalAidFIR from "./pages/LegalAidFIR";
import LegalAidRights from "./pages/LegalAidRights";
import Medical from "./pages/Medical";
import WomenSafety from "./pages/WomenSafety";
import DocumentVault from "./pages/DocumentVault";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/onboard" element={<Onboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/zone-monitor" element={<ZoneMonitor />} />
              <Route path="/delivery/active" element={<DeliveryActive />} />
              <Route path="/delivery/history" element={<DeliveryHistory />} />
              <Route path="/claims" element={<Claims />} />
              <Route path="/claims/:id" element={<ClaimDetail />} />
              <Route path="/sos" element={<SOS />} />
              <Route path="/legal-aid" element={<LegalAid />} />
              <Route path="/legal-aid/advocate" element={<LegalAidAdvocate />} />
              <Route path="/legal-aid/police" element={<LegalAidPolice />} />
              <Route path="/legal-aid/fir" element={<LegalAidFIR />} />
              <Route path="/legal-aid/rights" element={<LegalAidRights />} />
              <Route path="/medical" element={<Medical />} />
              <Route path="/women-safety" element={<WomenSafety />} />
              <Route path="/document-vault" element={<DocumentVault />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;

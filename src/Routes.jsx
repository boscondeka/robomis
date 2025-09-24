import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProjectManagement from './pages/project-management';
import ClientPortal from './pages/client-portal';
import FinanceDashboard from './pages/finance-dashboard';
import ExecutiveDashboard from './pages/executive-dashboard';
import HRManagement from './pages/hr-management';
import ReportsAnalytics from './pages/reports-analytics';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ClientPortal />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/client-portal" element={<ClientPortal />} />
        <Route path="/finance-dashboard" element={<FinanceDashboard />} />
        <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
        <Route path="/hr-management" element={<HRManagement />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

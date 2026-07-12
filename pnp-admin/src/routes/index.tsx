import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Users } from '../pages/Users';
import { Admins } from '../pages/Admins';
import { Notifications } from '../pages/Notifications';
import { Settings } from '../pages/Settings';
import { Analytics } from '../pages/Analytics';
import { Bots } from '../pages/Bots';
import { Moderation } from '../pages/Moderation';
import { AIPrompts } from '../pages/AIPrompts';
import { AICosts } from '../pages/AICosts';
import { Leadership } from '../pages/Leadership';

/* Portal pages */
import { SaathiPage } from '../pages/programs/SaathiPage';
import { RozgarPage } from '../pages/programs/RozgarPage';
import { ProblemsPage } from '../pages/programs/ProblemsPage';
import { VoicePage } from '../pages/programs/VoicePage';
import { KisaanPage } from '../pages/programs/KisaanPage';
import { QaanoonPage } from '../pages/programs/QaanoonPage';
import { EmergencyPage } from '../pages/programs/EmergencyPage';
import { SkillPage, MahfoozPage, BusinessPage, TVPage, TransparencyPage } from '../pages/programs/StubPages';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'analytics', element: <Analytics /> },
          { path: 'users', element: <Users /> },
          { path: 'bots', element: <Bots /> },
          { path: 'moderation', element: <Moderation /> },
          { path: 'ai', element: <AIPrompts /> },
          { path: 'costs', element: <AICosts /> },
          { path: 'leadership', element: <Leadership /> },
          { path: 'admins', element: <Admins /> },
          { path: 'notifications', element: <Notifications /> },
          { path: 'settings', element: <Settings /> },
          /* Program portals — real data */
          { path: 'saathi', element: <SaathiPage /> },
          { path: 'rozgar', element: <RozgarPage /> },
          { path: 'problems', element: <ProblemsPage /> },
          { path: 'voice', element: <VoicePage /> },
          { path: 'kisaan', element: <KisaanPage /> },
          { path: 'qaanoon', element: <QaanoonPage /> },
          { path: 'emergency', element: <EmergencyPage /> },
          /* Stub portals — tables not in schema yet */
          { path: 'skill', element: <SkillPage /> },
          { path: 'mahfooz', element: <MahfoozPage /> },
          { path: 'business', element: <BusinessPage /> },
          { path: 'tv', element: <TVPage /> },
          { path: 'transparency', element: <TransparencyPage /> },
        ],
      },
    ],
  },
]);

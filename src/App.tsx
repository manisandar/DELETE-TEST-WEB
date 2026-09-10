import { useState } from 'react';
import { JobProvider, useJobs } from './context/JobContext';
import { Navbar } from './components/ui/Navbar';
import { JobList } from './features/jobs/JobList';
import { ApplicationTracker } from './features/tracker/ApplicationTracker';
import { JobStats } from './features/analytics/JobStats';
import { CollaborationViewer } from './features/protocol/CollaborationViewer';

function MainContent() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'tracker' | 'insights' | 'collab'>('jobs');
  const { savedJobIds, applications } = useJobs();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedJobIds.length}
        appliedCount={applications.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'jobs' && <JobList />}
        {activeTab === 'tracker' && <ApplicationTracker />}
        {activeTab === 'insights' && <JobStats />}
        {activeTab === 'collab' && <CollaborationViewer />}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            CareerSphere • Dual-Agent Collaborative Demonstration Project
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Target Repo:</span>
            <a
              href="https://github.com/manisandar/DELETE-TEST-WEB"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline font-mono"
            >
              manisandar/DELETE-TEST-WEB
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <JobProvider>
      <MainContent />
    </JobProvider>
  );
}

export default App;

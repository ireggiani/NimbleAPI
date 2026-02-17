import React, { useState, useEffect } from 'react';
import Window from './components/Window';
import Button from './components/Button';
import Input from './components/Input';
import { api } from './services/api';

function App() {
  const [email, setEmail] = useState('');
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repoUrls, setRepoUrls] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const fetchCandidate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCandidateByEmail(email);
      setCandidate(data);
      const jobsData = await api.getJobList();
      setJobs(jobsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    const repoUrl = repoUrls[jobId];
    if (!repoUrl) {
      alert('Please enter a repo URL');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg('');
    try {
      const payload = {
        uuid: candidate.uuid,
        jobId: jobId,
        candidateId: candidate.candidateId,
        repoUrl: repoUrl,
      };
      await api.applyToJob(payload);
      setSuccessMsg(`Applied successfully to ${jobs.find(j => j.id === jobId).title}!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRepoUrlChange = (jobId, url) => {
    setRepoUrls(prev => ({ ...prev, [jobId]: url }));
  };

  return (
    <div style={{ padding: '20px' }}>
      {!candidate ? (
        <Window title="Candidate Login">
          <form onSubmit={fetchCandidate}>
            <p>Enter your email to start your application:</p>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane.doe@example.com"
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}>
              <Button type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
            {error && <p style={{ color: 'red', fontSize: '12px', marginTop: '10px' }}>Error: {error}</p>}
          </form>
        </Window>
      ) : (
        <Window title={`Welcome, ${candidate.firstName} ${candidate.lastName}`}>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Available Positions:</p>
            <div className="inset-border" style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px', background: '#fff' }}>
              {jobs.map(job => (
                <div key={job.id} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #dfdfdf' }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>{job.title}</p>
                  <label style={{ fontSize: '11px', display: 'block', marginBottom: '3px' }}>GitHub Repo URL:</label>
                  <Input
                    value={repoUrls[job.id] || ''}
                    onChange={(e) => handleRepoUrlChange(job.id, e.target.value)}
                    placeholder="https://github.com/user/repo"
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={() => handleApply(job.id)} disabled={loading}>
                      Submit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {loading && <p style={{ fontSize: '12px' }}>Processing...</p>}
            {error && <p style={{ color: 'red', fontSize: '12px' }}>Error: {error}</p>}
            {successMsg && <p style={{ color: 'green', fontSize: '12px', fontWeight: 'bold' }}>{successMsg}</p>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
            <Button onClick={() => { setCandidate(null); setJobs([]); setSuccessMsg(''); }}>Logout</Button>
          </div>
        </Window>
      )}
    </div>
  );
}

export default App;

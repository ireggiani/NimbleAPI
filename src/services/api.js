const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const api = {
  getCandidateByEmail: async (email) => {
    const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('Candidate not found or API error');
    return response.json();
  },

  getJobList: async () => {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
  },

  applyToJob: async (data) => {
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit application');
    return response.json();
  },
};

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/compress').replace('/compress', '');

export const getStats = async () => {
  try {
    const res = await fetch(`${API_URL}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
  } catch (e) {
    console.error('Error fetching stats:', e);
    return null;
  }
};

export const trackDownload = async () => {
  try {
    await fetch(`${API_URL}/stats/download`, { method: 'POST' });
  } catch (e) {
    console.error('Error tracking download:', e);
  }
};

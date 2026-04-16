export default async function fetchDataFromBucket(jsonFileName) {
  // Fetch data from R2 bucket
  const dir = window.location.href.includes('localhost') ? 'station-data' : 'stations';
  const response = await fetch(
    `/${dir}/${jsonFileName}`,
    { headers: { 'Authorization': `Bearer ${import.meta.env.VITE_BUCKET_AUTH}` } }
  );

  if (response.ok) {
    // Parse to JSON
    const data = await response.json();
    
    // if valid data, return it
    if (data && Object.keys(data).length) {
      return data;
    }
  }

  // Default to null data values
  return null;
}
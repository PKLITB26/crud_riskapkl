// Simple API test script
const testAPI = async () => {
  const urls = [
    "http://localhost/api7jan/api.php",
    "http://10.251.109.197/api7jan/api.php"
  ];
  
  for (const url of urls) {
    console.log(`Testing: ${url}`);
    try {
      const response = await fetch(url);
      const text = await response.text();
      console.log(`Status: ${response.status}`);
      console.log(`Response: ${text}`);
      console.log('---');
    } catch (error) {
      console.log(`Error: ${error.message}`);
      console.log('---');
    }
  }
};

testAPI();
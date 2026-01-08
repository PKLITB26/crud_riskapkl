import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import DataPegawai from './DataPegawai';

export default function DataScreen() {
  const [listData, setListData] = useState([]);
  const apiUrl = Platform.OS === 'web' 
    ? "http://localhost/api7jan/api.php"
    : "http://10.251.109.197/api7jan/api.php";

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const responseText = await response.text();
      
      if (responseText && responseText.trim() !== '') {
        const json = JSON.parse(responseText);
        if (json && json.data && json.data.result) {
          setListData(json.data.result);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataPegawai 
      listData={listData}
      onBack={() => {}}
      onRefresh={fetchData}
      apiUrl={apiUrl}
    />
  );
}
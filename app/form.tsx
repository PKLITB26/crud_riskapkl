import React from 'react';
import { Platform } from 'react-native';
import FormPegawai from './FormPegawai';

export default function FormScreen() {
  const apiUrl = Platform.OS === 'web' 
    ? "http://localhost/api7jan/api.php"
    : "http://10.251.109.197/api7jan/api.php";

  return (
    <FormPegawai 
      onBack={() => {}}
      onShowDataList={() => {}}
      onRefresh={() => {}}
      apiUrl={apiUrl}
    />
  );
}
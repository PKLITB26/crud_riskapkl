import React, { Component } from 'react';
import { View, Text, Platform, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { style } from '../styles';

interface DashboardState {
  listData: any[];
  screenWidth: number;
  currentView: 'menu' | 'form' | 'data';
  totalPegawai: number;
}

export class Dashboard extends Component<{}, DashboardState> {
  private url: string;
  private dimensionsSubscription: any;
  private pollingInterval: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      listData: [],
      screenWidth: Dimensions.get('window').width,
      currentView: 'menu',
      totalPegawai: 0
    };
    this.url = Platform.OS === 'web' 
      ? "http://localhost/api7jan/api.php"
      : "http://10.251.109.197/api7jan/api.php";
  }
  
  componentDidMount() {
    this.ambilListData();
    this.dimensionsSubscription = Dimensions.addEventListener('change', this.handleOrientationChange);
    this.startPolling();
  }
  
  componentWillUnmount() {
    if (this.dimensionsSubscription) {
      this.dimensionsSubscription?.remove();
    }
    this.stopPolling();
  }
  
  startPolling() {
    this.pollingInterval = setInterval(() => {
      this.ambilListData();
    }, 10000);
  }
  
  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
  
  handleOrientationChange = ({ window }: { window: { width: number } }) => {
    this.setState({ screenWidth: window.width });
  }

  async ambilListData() {
    try {
      const response = await fetch(this.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseText = await response.text();
      
      if (!responseText || responseText.trim() === '') {
        console.warn('Server returned empty response');
        this.setState({ listData: [], totalPegawai: 0 });
        return;
      }
      
      let json;
      try {
        json = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Response text:', responseText);
        this.setState({ listData: [], totalPegawai: 0 });
        return;
      }
      
      if (json && json.data && json.data.result) {
        this.setState({
          listData: json.data.result,
          totalPegawai: json.data.result.length
        });
      } else {
        this.setState({ listData: [], totalPegawai: 0 });
      }
    } catch (error: any) {
      console.error('API Error:', error.message);
      this.setState({ listData: [], totalPegawai: 0 });
    }
  }

  renderMenuUtama() {
    return (
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={style.dashboardContainer}>
          <View style={style.dashboardHeader}>
            <View style={style.headerContent}>
              <MaterialIcons name='business' size={32} color='#007bff' />
              <View style={style.headerText}>
                <Text style={style.dashboardTitle}>Dashboard Pegawai</Text>
                <Text style={style.dashboardSubtitle}>Sistem Manajemen Data Pegawai</Text>
              </View>
            </View>
          </View>

          <View style={style.statsCard}>
            <View style={style.statsContent}>
              <MaterialIcons name='people' size={24} color='#28a745' />
              <View style={style.statsText}>
                <Text style={style.statsNumber}>{this.state.totalPegawai}</Text>
                <Text style={style.statsLabel}>Total Pegawai</Text>
              </View>
            </View>
          </View>

          <View style={style.menuContainer}>
            <TouchableOpacity 
              style={[style.menuCard, style.formCard]}
              onPress={() => router.push('/form')}
            >
              <View style={style.menuIconContainer}>
                <MaterialIcons name='person-add' size={32} color='#007bff' />
              </View>
              <View style={style.menuContent}>
                <Text style={style.menuTitle}>Form Pegawai</Text>
                <Text style={style.menuDescription}>Tambah data pegawai baru</Text>
              </View>
              <MaterialIcons name='chevron-right' size={24} color='#ccc' />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[style.menuCard, style.dataCard]}
              onPress={() => router.push('/data')}
            >
              <View style={style.menuIconContainer}>
                <MaterialIcons name='list' size={32} color='#28a745' />
              </View>
              <View style={style.menuContent}>
                <Text style={style.menuTitle}>Data Pegawai</Text>
                <Text style={style.menuDescription}>Lihat & kelola data pegawai</Text>
              </View>
              <MaterialIcons name='chevron-right' size={24} color='#ccc' />
            </TouchableOpacity>
          </View>
          <View style={style.infoSection}>
            <Text style={style.infoTitle}>Fitur Aplikasi</Text>
            <View style={style.featureList}>
              <View style={style.featureItem}>
                <MaterialIcons name='check-circle' size={16} color='#28a745' />
                <Text style={style.featureText}>Input data pegawai lengkap</Text>
              </View>
              <View style={style.featureItem}>
                <MaterialIcons name='check-circle' size={16} color='#28a745' />
                <Text style={style.featureText}>Pencarian data real-time</Text>
              </View>
              <View style={style.featureItem}>
                <MaterialIcons name='check-circle' size={16} color='#28a745' />
                <Text style={style.featureText}>Edit & hapus data mudah</Text>
              </View>
              <View style={style.featureItem}>
                <MaterialIcons name='check-circle' size={16} color='#28a745' />
                <Text style={style.featureText}>Pagination otomatis</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={style.viewWrapper}>
        {this.renderMenuUtama()}
      </View>
    );
  }
}

export default Dashboard;
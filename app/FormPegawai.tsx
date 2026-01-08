import React, { Component } from 'react';
import { View, Text, TextInput, Platform, ScrollView, KeyboardAvoidingView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { style } from '../styles';

interface FormPegawaiProps {
  onBack: () => void;
  onShowDataList: () => void;
  onRefresh: () => void;
  apiUrl: string;
}

interface FormPegawaiState {
  nama: string;
  alamat: string;
  nip: string;
  email: string;
  telepon: string;
  idEdit: string | null;
  showSuccessMessage: boolean;
  savedEmployeeName: string;
  whatsappStatus: '' | 'checking' | 'available' | 'not_available';
}

export class FormPegawai extends Component<FormPegawaiProps, FormPegawaiState> {
  private whatsappCheckTimeout: NodeJS.Timeout | null = null;

  constructor(props: FormPegawaiProps) {
    super(props);
    this.state = {
      nama: '',
      alamat: '',
      nip: '',
      email: '',
      telepon: '',
      idEdit: null,
      showSuccessMessage: false,
      savedEmployeeName: '',
      whatsappStatus: ''
    };
  }

  renderToastMessage() {
    if (!this.state.showSuccessMessage) return null;
    
    return (
      <View style={style.toastMessage}>
        <MaterialIcons name='check-circle' size={20} color='#28a745' />
        <Text style={style.toastText}>Data berhasil disimpan!</Text>
      </View>
    );
  }

  async klikSimpan() {
    if (this.state.nip === '' || this.state.nama === '' || this.state.alamat === '') {
      alert('NIP, Nama dan Alamat tidak boleh kosong');
    } else {
      const urlAksi = this.state.idEdit 
        ? this.props.apiUrl + '/?op=update&id=' + this.state.idEdit
        : this.props.apiUrl + '/?op=create';
      
      try {
        const response = await fetch(urlAksi, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `nip=${this.state.nip}&nama=${this.state.nama}&email=${this.state.email}&telepon=${this.state.telepon}&alamat=${this.state.alamat}`
        });
        
        await response.json();
        
        this.setState({
          nip: '', 
          nama: '', 
          email: '', 
          telepon: '', 
          alamat: '', 
          idEdit: null,
          showSuccessMessage: true,
          savedEmployeeName: this.state.nama
        });
        
        this.props.onRefresh();
        
        setTimeout(() => {
          this.setState({ showSuccessMessage: false });
        }, 3000);
        
      } catch (error) {
        alert('Gagal menyimpan data');
      }
    }
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            {this.renderToastMessage()}
            {/* HEADER CARD */}
            <View style={{margin: 8}}>
              <View style={{backgroundColor: '#fff', borderRadius: 12, padding: 20, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity 
                    style={style.iconBackButton}
                    onPress={() => router.back()}
                  >
                    <MaterialIcons name='arrow-back' size={24} color='#007bff' />
                  </TouchableOpacity>
                  <MaterialIcons name='person-add' size={24} color='#007bff' style={{marginLeft: 8, marginRight: 8}} />
                  <Text style={style.formHeaderTitle}>Form Data Pegawai</Text>
                </View>
              </View>
            </View>
            
            {/* FORM CARD */}
            <View style={{margin: 8}}>
                <View style={{backgroundColor: '#fff', borderRadius: 12, padding: 20, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3}}>
                
                {/* DATA PRIBADI */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name='person' size={20} color='#007bff' style={{marginRight: 8}} />
                  <Text style={style.sectionTitle}>Data Pribadi</Text>
                </View>
                <View style={style.sectionDivider} />
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name='badge' size={16} color='#666' style={{marginRight: 6}} />
                  <Text style={style.detailLabel}>NIP *</Text>
                </View>
                <TextInput 
                  style={style.textInput} 
                  placeholder='Masukkan NIP' 
                  value={this.state.nip}
                  onChangeText={(text) => this.setState({ nip: text })}
                />
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name='account-circle' size={16} color='#666' style={{marginRight: 6}} />
                  <Text style={style.detailLabel}>Nama Lengkap *</Text>
                </View>
                <TextInput 
                  style={style.textInput} 
                  placeholder='Masukkan Nama Lengkap' 
                  value={this.state.nama}
                  onChangeText={(text) => this.setState({ nama: text })}
                />
                
                {/* INFORMASI KONTAK */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name='contact-phone' size={20} color='#007bff' style={{marginRight: 8}} />
                  <Text style={style.sectionTitle}>Informasi Kontak</Text>
                </View>
                <View style={style.sectionDivider} />
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name='email' size={16} color='#666' style={{marginRight: 6}} />
                  <Text style={style.detailLabel}>Email</Text>
                </View>
                <TextInput 
                  style={style.textInput} 
                  placeholder='Masukkan Email' 
                  value={this.state.email}
                  keyboardType='email-address'
                  onChangeText={(text) => this.setState({ email: text })}
                />
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name='phone' size={16} color='#666' style={{marginRight: 6}} />
                  <Text style={style.detailLabel}>No. Telepon</Text>
                </View>
                <TextInput 
                  style={style.textInput} 
                  placeholder='Masukkan No. Telepon' 
                  value={this.state.telepon}
                  keyboardType='phone-pad'
                  onChangeText={(text) => this.setState({ telepon: text })}
                />
                
                {/* ALAMAT */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name='location-on' size={20} color='#007bff' style={{marginRight: 8}} />
                  <Text style={style.sectionTitle}>Alamat</Text>
                </View>
                <View style={style.sectionDivider} />
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name='home' size={16} color='#666' style={{marginRight: 6}} />
                  <Text style={style.detailLabel}>Alamat Lengkap *</Text>
                </View>
                <TextInput 
                  style={[style.textInput, style.textAreaInput]} 
                  placeholder='Masukkan Alamat Lengkap' 
                  value={this.state.alamat}
                  multiline={true}
                  numberOfLines={3}
                  onChangeText={(text) => this.setState({ alamat: text })}
                />
                
                {/* INFORMASI SISTEM */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name='info' size={20} color='#007bff' style={{marginRight: 8}} />
                  <Text style={style.sectionTitle}>Informasi Sistem</Text>
                </View>
                <View style={style.sectionDivider} />
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialIcons name='schedule' size={16} color='#666' style={{marginRight: 6}} />
                  <Text style={style.detailLabel}>Tanggal Input</Text>
                </View>
                <View style={style.readOnlyField}>
                  <Text style={style.detailValue}>{new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
                </View>
                
                <View style={{height: 1, backgroundColor: '#e0e0e0', marginVertical: 20}} />
                
                <TouchableOpacity 
                  style={[style.primaryButton, {marginBottom: 10}]}
                  onPress={() => this.klikSimpan()}
                >
                  <View style={style.buttonContent}>
                    <MaterialIcons 
                      name={this.state.idEdit ? 'edit' : 'save'} 
                      size={20} 
                      color='#fff' 
                      style={style.buttonIcon}
                    />
                    <Text style={style.primaryButtonText}>
                      {this.state.idEdit ? 'Update Data' : 'Simpan Data'}
                    </Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={style.secondaryButton}
                  onPress={() => router.push('/data')}
                >
                  <View style={style.buttonContent}>
                    <MaterialIcons name='list' size={20} color='#6c757d' style={style.buttonIcon} />
                    <Text style={style.secondaryButtonText}>Lihat Semua Data</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default FormPegawai;
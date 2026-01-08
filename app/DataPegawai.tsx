import React, { Component } from 'react';
import { View, Text, TextInput, Platform, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { style } from '../styles';

interface DataPegawaiProps {
  listData: any[];
  onBack: () => void;
  onRefresh: () => void;
  apiUrl: string;
}

interface DataPegawaiState {
  currentPage: number;
  itemsPerPage: number;
  searchText: string;
  showDetailModal: boolean;
  selectedItem: any;
  isEditMode: boolean;
  editData: any;
  openedFromEdit: boolean;
}

export class DataPegawai extends Component<DataPegawaiProps, DataPegawaiState> {
  constructor(props: DataPegawaiProps) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 10,
      searchText: '',
      showDetailModal: false,
      selectedItem: null,
      isEditMode: false,
      editData: {},
      openedFromEdit: false
    };
  }

  nextPage = () => {
    const filteredData = this.getFilteredData();
    const totalPages = Math.ceil(filteredData.length / this.state.itemsPerPage);
    if (this.state.currentPage < totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  }
  
  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  }
  
  handleSearch = (text: string) => {
    this.setState({ 
      searchText: text,
      currentPage: 1
    });
  }
  
  getFilteredData = () => {
    const { listData } = this.props;
    const { searchText } = this.state;
    if (!searchText) return listData;
    
    return listData.filter(item => 
      item.nama.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.nip && item.nip.toLowerCase().includes(searchText.toLowerCase()))
    );
  }
  
  getCurrentPageData = () => {
    const filteredData = this.getFilteredData();
    const { currentPage, itemsPerPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }

  klikRead(item: any) {
    this.setState({
      selectedItem: item,
      showDetailModal: true,
      isEditMode: false
    });
  }

  klikEditModal(item: any) {
    this.setState({
      selectedItem: item,
      showDetailModal: true,
      isEditMode: true,
      openedFromEdit: true,
      editData: {
        nip: item.nip || '',
        nama: item.nama || '',
        email: item.email || '',
        telepon: item.telepon || '',
        alamat: item.alamat || ''
      }
    });
  }

  async klikDelete(id: string) {
    try {
      await fetch(this.props.apiUrl + "/?op=delete&id=" + id);
      alert('Data Berhasil Di Delete');
      this.props.onRefresh();
      this.setState({ showDetailModal: false });
    } catch (error) {
      console.log(error);
    }
  }

  async saveEditData() {
    const { editData, selectedItem } = this.state;
    
    if (!editData.nip || !editData.nama || !editData.alamat) {
      alert('NIP, Nama dan Alamat tidak boleh kosong');
      return;
    }
    
    const urlAksi = this.props.apiUrl + '/?op=update&id=' + selectedItem.id;
    
    try {
      const response = await fetch(urlAksi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nip=${editData.nip}&nama=${editData.nama}&email=${editData.email}&telepon=${editData.telepon}&alamat=${editData.alamat}`
      });
      
      await response.json();
      alert('Data berhasil diupdate!');
      this.setState({
        showDetailModal: false,
        selectedItem: null,
        isEditMode: false,
        editData: {},
        openedFromEdit: false
      });
      this.props.onRefresh();
    } catch (error) {
      console.log('Error updating:', error);
      alert('Gagal mengupdate data');
    }
  }

  renderDetailModal() {
    if (!this.state.showDetailModal || !this.state.selectedItem) return null;
    
    const item = this.state.selectedItem;
    
    return (
      <TouchableOpacity 
        style={style.mobileBottomSheet}
        activeOpacity={1}
        onPress={() => this.setState({ showDetailModal: false, selectedItem: null })}
      >
        <TouchableOpacity 
          style={style.mobileSheetContent}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={style.modalHeader}>
            <Text style={style.modalTitle}>Detail Pegawai</Text>
            <TouchableOpacity 
              style={style.modalCloseButton}
              onPress={() => this.setState({ showDetailModal: false, selectedItem: null })}
            >
              <MaterialIcons name='close' size={20} color='#666' />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={style.modalBody} showsVerticalScrollIndicator={false}>
            {/* DATA PRIBADI */}
            <Text style={style.sectionTitle}>Data Pribadi</Text>
            <View style={style.sectionDivider} />
            
            <Text style={style.detailLabel}>NIP</Text>
            {this.state.isEditMode ? (
              <TextInput 
                style={style.modalEditInput}
                value={this.state.editData.nip}
                onChangeText={(text) => this.setState({editData: {...this.state.editData, nip: text}})}
                placeholder='Masukkan NIP'
              />
            ) : (
              <View style={style.readOnlyField}>
                <Text style={style.detailValue}>{item.nip || '-'}</Text>
              </View>
            )}
            
            <Text style={style.detailLabel}>Nama Lengkap</Text>
            {this.state.isEditMode ? (
              <TextInput 
                style={style.modalEditInput}
                value={this.state.editData.nama}
                onChangeText={(text) => this.setState({editData: {...this.state.editData, nama: text}})}
                placeholder='Masukkan Nama'
              />
            ) : (
              <View style={style.readOnlyField}>
                <Text style={style.detailValue}>{item.nama}</Text>
              </View>
            )}
            
            {/* INFORMASI KONTAK */}
            <Text style={style.sectionTitle}>Informasi Kontak</Text>
            <View style={style.sectionDivider} />
            
            <Text style={style.detailLabel}>Email</Text>
            {this.state.isEditMode ? (
              <TextInput 
                style={style.modalEditInput}
                value={this.state.editData.email}
                onChangeText={(text) => this.setState({editData: {...this.state.editData, email: text}})}
                placeholder='Masukkan Email'
                keyboardType='email-address'
              />
            ) : (
              <TouchableOpacity 
                style={[style.readOnlyField, {flexDirection: 'row', alignItems: 'center'}]}
                onPress={() => item.email && Linking.openURL(`mailto:${item.email}?subject=Halo ${item.nama}&body=Halo ${item.nama}, saya ingin menghubungi Anda.`)}
                disabled={!item.email}
              >
                <Text style={[style.detailValue, item.email && {color: '#007bff'}]}>{item.email || '-'}</Text>
                {item.email && <MaterialIcons name='email' size={16} color='#007bff' style={{marginLeft: 8}} />}
              </TouchableOpacity>
            )}
            
            <Text style={style.detailLabel}>Telepon</Text>
            {this.state.isEditMode ? (
              <TextInput 
                style={style.modalEditInput}
                value={this.state.editData.telepon}
                onChangeText={(text) => this.setState({editData: {...this.state.editData, telepon: text}})}
                placeholder='Masukkan Telepon'
                keyboardType='phone-pad'
              />
            ) : (
              <TouchableOpacity 
                style={[style.readOnlyField, {flexDirection: 'row', alignItems: 'center'}]}
                onPress={() => item.telepon && Linking.openURL(`https://wa.me/62${item.telepon.replace(/^0/, '')}?text=Halo ${item.nama}, saya ingin menghubungi Anda.`)}
                disabled={!item.telepon}
              >
                <Text style={[style.detailValue, item.telepon && {color: '#25D366'}]}>{item.telepon || '-'}</Text>
                {item.telepon && <MaterialIcons name='phone' size={16} color='#25D366' style={{marginLeft: 8}} />}
              </TouchableOpacity>
            )}
            
            {/* ALAMAT */}
            <Text style={style.sectionTitle}>Alamat</Text>
            <View style={style.sectionDivider} />
            
            <Text style={style.detailLabel}>Alamat Lengkap</Text>
            {this.state.isEditMode ? (
              <TextInput 
                style={[style.modalEditInput, style.modalTextArea]}
                value={this.state.editData.alamat}
                onChangeText={(text) => this.setState({editData: {...this.state.editData, alamat: text}})}
                placeholder='Masukkan Alamat'
                multiline={true}
                numberOfLines={3}
              />
            ) : (
              <View style={style.readOnlyField}>
                <Text style={style.detailValue}>{item.alamat}</Text>
              </View>
            )}
            
            {/* INFORMASI SISTEM */}
            <Text style={style.sectionTitle}>Informasi Sistem</Text>
            <View style={style.sectionDivider} />
            
            <Text style={style.detailLabel}>Tanggal Input</Text>
            <View style={style.readOnlyField}>
              <Text style={style.detailValue}>{item.tgl_input}</Text>
            </View>
            
            {/* Extra space for scroll */}
            <View style={{height: 50}} />
          </ScrollView>
          
          <View style={style.modalActions}>
            {this.state.isEditMode ? (
              <>
                <TouchableOpacity 
                  style={style.modalSaveButton}
                  onPress={() => this.saveEditData()}
                >
                  <MaterialIcons name='save' size={16} color='#fff' />
                  <Text style={style.modalSaveText}>Simpan</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={style.modalCancelButton}
                  onPress={() => {
                    if (this.state.openedFromEdit) {
                      this.setState({
                        showDetailModal: false,
                        selectedItem: null,
                        isEditMode: false,
                        editData: {},
                        openedFromEdit: false
                      });
                    } else {
                      this.setState({isEditMode: false});
                    }
                  }}
                >
                  <MaterialIcons name='close' size={16} color='#fff' />
                  <Text style={style.modalCancelText}>Batal</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity 
                style={style.modalEditButton}
                onPress={() => this.setState({
                  isEditMode: true,
                  openedFromEdit: false,
                  editData: {
                    nip: this.state.selectedItem.nip || '',
                    nama: this.state.selectedItem.nama || '',
                    email: this.state.selectedItem.email || '',
                    telepon: this.state.selectedItem.telepon || '',
                    alamat: this.state.selectedItem.alamat || ''
                  }
                })}
              >
                <MaterialIcons name='edit' size={16} color='#fff' />
                <Text style={style.modalEditText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  render() {
    const currentPageData = this.getCurrentPageData();
    const filteredData = this.getFilteredData();
    const totalPages = Math.ceil(filteredData.length / this.state.itemsPerPage);
    const { currentPage } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
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
                <MaterialIcons name='list' size={24} color='#007bff' style={{marginLeft: 8, marginRight: 8}} />
                <Text style={style.formHeaderTitle}>Data Pegawai</Text>
              </View>
            </View>
          </View>
          
          {/* SEARCH CARD */}
          <View style={{margin: 8}}>
            <View style={{backgroundColor: '#fff', borderRadius: 12, padding: 20, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3}}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                <MaterialIcons name='search' size={20} color='#007bff' style={{marginRight: 8}} />
                <Text style={style.sectionTitle}>Pencarian Data</Text>
              </View>
              <View style={style.sectionDivider} />
              
              <View style={style.searchInputContainer}>
                <MaterialIcons name='search' size={20} color='#999' style={style.searchIcon} />
                <TextInput 
                  style={style.searchInput}
                  placeholder='Cari NIP atau nama...'
                  value={this.state.searchText}
                  onChangeText={this.handleSearch}
                />
                {this.state.searchText !== '' && (
                  <TouchableOpacity 
                    onPress={() => this.handleSearch('')}
                    style={style.clearButton}
                  >
                    <MaterialIcons name='clear' size={20} color='#999' />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          {
            currentPageData && currentPageData.length > 0 ? 
            currentPageData.map((val: any, index: number) => (
              <View style={style.compactDataCard} key={val.id || index}>
                <View style={style.compactContent}>
                  <Text style={style.compactNip}>NIP: {val.nip || '-'}</Text>
                  <Text style={style.compactNama}>{val.nama}</Text>
                  <Text style={style.compactTanggal}>{val.tgl_input}</Text>
                </View>
                <View style={style.compactActions}>
                  <TouchableOpacity 
                    style={[style.compactActionButton, style.readButton]}
                    onPress={() => this.klikRead(val)}
                  >
                    <MaterialIcons name='visibility' size={18} color='#28a745' />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[style.compactActionButton, style.editButton]}
                    onPress={() => this.klikEditModal(val)}
                  >
                    <MaterialIcons name='edit' size={18} color='#007bff' />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[style.compactActionButton, style.deleteButton]}
                    onPress={() => this.klikDelete(val.id)}
                  >
                    <MaterialIcons name='delete' size={18} color='#dc3545' />
                  </TouchableOpacity>
                </View>
              </View>
            ))
            : <Text style={style.emptyText}>
                {this.state.searchText ? 'Tidak ada data yang sesuai pencarian' : 'Belum ada data tersimpan'}
              </Text>
          }
        </ScrollView>
        
        {totalPages > 1 && (
          <View style={style.paginationContainer}>
            <TouchableOpacity 
              style={[style.paginationButton, currentPage === 1 && style.disabledButton]}
              onPress={this.prevPage}
              disabled={currentPage === 1}
            >
              <MaterialIcons name='chevron-left' size={20} color={currentPage === 1 ? '#ccc' : '#007bff'} />
            </TouchableOpacity>
            
            <View style={style.pageIndicator}>
              <Text style={style.pageText}>{currentPage}</Text>
              <Text style={style.pageTotal}>/ {totalPages}</Text>
            </View>
            
            <TouchableOpacity 
              style={[style.paginationButton, currentPage === totalPages && style.disabledButton]}
              onPress={this.nextPage}
              disabled={currentPage === totalPages}
            >
              <MaterialIcons name='chevron-right' size={20} color={currentPage === totalPages ? '#ccc' : '#007bff'} />
            </TouchableOpacity>
          </View>
        )}
        
        {this.renderDetailModal()}
      </View>
    );
  }
}

export default DataPegawai;
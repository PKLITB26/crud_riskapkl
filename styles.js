import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  
  // Dashboard styles
  dashboardContainer: {
    flex: 1,
    padding: 15
  },
  dashboardHeader: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    marginLeft: 15
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  dashboardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  statsContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statsText: {
    marginLeft: 15
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745'
  },
  statsLabel: {
    fontSize: 14,
    color: '#666'
  },
  
  menuContainer: {
    marginBottom: 15
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  formCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#007bff'
  },
  dataCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#28a745'
  },
  menuIconContainer: {
    marginRight: 15
  },
  menuContent: {
    flex: 1
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  
  // Form styles
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef'
  },
  iconBackButton: {
    padding: 8,
    marginRight: 15
  },
  formHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  
  viewForm: {
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  textAreaInput: {
    height: 80,
    textAlignVertical: 'top'
  },
  
  primaryButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonIcon: {
    marginRight: 8
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  
  toastMessage: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  toastText: {
    color: '#155724',
    fontSize: 16,
    marginLeft: 10
  },
  
  // Data styles
  dataHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef'
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  
  searchContainer: {
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16
  },
  clearButton: {
    padding: 5
  },
  
  viewData: {
    padding: 15
  },
  compactDataCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  compactContent: {
    flex: 1
  },
  compactNip: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2
  },
  compactNama: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2
  },
  compactTanggal: {
    fontSize: 12,
    color: '#999'
  },
  compactActions: {
    flexDirection: 'row',
    gap: 8
  },
  compactActionButton: {
    padding: 8,
    borderRadius: 6
  },
  readButton: {
    backgroundColor: '#e8f5e8'
  },
  deleteButton: {
    backgroundColor: '#ffebee'
  },
  
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50
  },
  
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef'
  },
  paginationButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#f8f9fa'
  },
  disabledButton: {
    opacity: 0.5
  },
  pageIndicator: {
    marginHorizontal: 20,
    alignItems: 'center'
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  pageTotal: {
    fontSize: 14,
    color: '#666'
  },
  
  // Modal styles
  mobileBottomSheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  mobileSheetContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  modalCloseButton: {
    padding: 5
  },
  modalBody: {
    padding: 20
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4'
  },
  detailContent: {
    flex: 1,
    marginLeft: 15
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef'
  },
  modalDeleteButton: {
    flex: 1,
    backgroundColor: '#dc3545',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalDeleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5
  }
});
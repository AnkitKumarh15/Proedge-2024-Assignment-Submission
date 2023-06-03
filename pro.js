import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filterContacts = (contact) => {
    return contact.name.toLowerCase().includes(searchText.toLowerCase());
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  const closeModal = () => {
    setSelectedContact(null);
  };

  const renderContact = ({ item }) => (
    <TouchableOpacity onPress={() => handleContactSelect(item)}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactNumber}>{item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={contacts.filter(filterContacts)}
        renderItem={renderContact}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal visible={selectedContact !== null} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{selectedContact?.name}</Text>
          <Text style={styles.modalText}>{selectedContact?.phone}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contact
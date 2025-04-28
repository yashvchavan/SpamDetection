import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getNotifications } from '../services/api';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // frontend/src/screens/NotificationsScreen.js
useEffect(() => {
  const loadData = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Screen Error:', error);
      Alert.alert('Error', 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, []);

const renderItem = ({ item }) => (
  <View style={[styles.item, item.is_spam && styles.spamItem]}>
    <Text style={styles.title}>{item.title}</Text>
    <Text>{item.message}</Text>
    <Text style={item.is_spam ? styles.spamText : styles.hamText}>
      {item.is_spam ? `SPAM (${Math.round(item.confidence*100)}% certainty)` 
                   : `LEGITIMATE (${Math.round(item.confidence*100)}% certainty)`}
    </Text>
  </View>
);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading notifications...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  spamItem: {
    backgroundColor: '#ffebee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  spamText: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
  },
  hamText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default NotificationsScreen;
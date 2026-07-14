import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Navbar from '../../components/Navbar';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';

export default function MyAssets() {
  const employee_assets = useSelector((state: RootState) => state.employee.employee.assetsDetails);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Navbar />
      <View style={styles.wrapper}>
        <Text style={styles.heading}>My Assets</Text>
        <View style={styles.assetContainer}>
          {employee_assets.length > 0 ? (
            employee_assets.map((asset, index) => (
              <View key={index} style={styles.assetCard}>
                <Text style={styles.assetName}>{asset.assetName}</Text>
                <Text style={styles.assetDetails}>{asset.assetType}</Text>
                <Text style={styles.assetDetails}>Assigned Date: {asset.assignedDate}</Text>
                <Text style={styles.assetDetails}>Status: {asset.status}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noAssets}>No assets assigned.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    color: '#0F172A',
    marginBottom: 20

  },
  assetContainer : { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  assetCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
  },
  assetName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 10,
  },
  assetDetails: {
    fontSize: 14,
    color: '#334155',
  },
  noAssets: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
  }

})
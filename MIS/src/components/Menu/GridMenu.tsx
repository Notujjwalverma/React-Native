import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

type MenuItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

type GridMenuProps = {
  title: string;
  items: MenuItem[];
  columns?: number;
};

export default function GridMenu({
  title,
  items,
  columns = 4,
}: GridMenuProps) {
  const itemWidth = `${100 / columns}%`;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.gridContainer}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            style={[styles.menuItem, { width: itemWidth }]}
            onPress={item.onPress}
          >
            <View style={styles.iconContainer}>
              {item.icon}
            </View>

            <Text
              style={styles.menuText}
              numberOfLines={2}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 22,
    color: '#222',
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  menuItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },

  iconContainer: {
    marginBottom: 8,
  },

  menuText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: 4,
  },
});
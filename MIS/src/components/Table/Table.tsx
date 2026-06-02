import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator, ScrollView } from 'react-native'

type TableColumn<T> = {
  key: string
  title: string
  width?: number | string
  sortable?: boolean
  render?: (record: T) => React.ReactNode
  align?: 'left' | 'center' | 'right'
}

type TableProps<T> = {
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  noDataText?: string
  onRowPress?: (record: T) => void
  style?: any
  headerStyle?: any
  rowStyle?: any
}

const normalizeValue = (value: any) => {
  if (value === null || value === undefined) return ''
  return String(value)
}

const compareValues = (a: any, b: any, direction: 'asc' | 'desc') => {
  const left = normalizeValue(a)
  const right = normalizeValue(b)

  if (!left && !right) return 0
  if (!left) return 1
  if (!right) return -1

  if (!isNaN(Number(left)) && !isNaN(Number(right))) {
    return direction === 'asc' ? Number(left) - Number(right) : Number(right) - Number(left)
  }

  return direction === 'asc' ? left.localeCompare(right) : right.localeCompare(left)
}

export default function Table<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  noDataText = 'No records available',
  onRowPress,
  style,
  headerStyle,
  rowStyle,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const sortedData = useMemo(() => {
    if (!sortKey) return data

    return [...data].sort((first, second) =>
      compareValues(first[sortKey], second[sortKey], sortDirection),
    )
  }, [data, sortDirection, sortKey])

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const renderHeader = () => (
    <View style={[styles.headerRow, headerStyle]}>
      {columns.map((column) => {
        const isActive = column.sortable && sortKey === column.key
        const sortSymbol = isActive ? (sortDirection === 'asc' ? '?' : '?') : '?'

        return (
          <Pressable
            key={column.key}
            onPress={() => column.sortable && toggleSort(column.key)}
            style={[styles.cell, column.width ? { width: column.width } : styles.cellFlexible]}
          >
            <View style={styles.headerCell}>
              <Text style={[styles.headerText, column.align === 'right' && styles.textRight]}>
                {column.title}
              </Text>
              {column.sortable && <Text style={styles.sortIcon}>{sortSymbol}</Text>}
            </View>
          </Pressable>
        )
      })}
    </View>
  )

  const renderRow = ({ item, index }: { item: T; index: number }) => (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        pressed && styles.rowPressed,
        rowStyle,
        index % 2 === 0 && styles.rowAlternate,
      ]}
      onPress={() => onRowPress && onRowPress(item)}
      disabled={!onRowPress}
    >
      {columns.map((column) => (
        <View
          key={`${column.key}-${index}`}
          style={[styles.cell, column.width ? { width: column.width } : styles.cellFlexible]}
        >
          <Text style={[styles.cellText, column.align === 'right' && styles.textRight]}>
            {column.render ? column.render(item) : normalizeValue(item[column.key])}
          </Text>
        </View>
      ))}
    </Pressable>
  )

  return (
    <View style={[styles.container, style]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableInner}>
          {renderHeader()}

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#0F172A" />
            </View>
          ) : sortedData.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{noDataText}</Text>
            </View>
          ) : (
            <FlatList
              data={sortedData}
              keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
              renderItem={renderRow}
              scrollEnabled={false}
              nestedScrollEnabled
            />
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(203, 213, 225, 0.7)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  tableInner: {
    minWidth: 680,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  sortIcon: {
    fontSize: 10,
    color: '#64748B',
    marginRight: 6,
  },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: 'rgba(226, 232, 240, 0.9)',
    justifyContent: 'center',
  },
  cellFlexible: {
    flex: 1,
  },
  cellText: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
  },
  textRight: {
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  rowAlternate: {
    backgroundColor: '#F8FAFC',
  },
  rowPressed: {
    backgroundColor: '#E0F2FE',
  },
  loadingContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
  },
})

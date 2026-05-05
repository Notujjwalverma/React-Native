import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

type DropDownItem = { label: string; value: string }

type DropDownProps = {
    HeadingPlaceholder: string
    items: DropDownItem[]
}

export default function DropDown(props: DropDownProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string | null>(null)
    const [items, setItems] = useState<DropDownItem[]>(props.items)

    return (
        <View style={styles.wrapper}>
            <DropDownPicker
                style={styles.dropdown}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={props.HeadingPlaceholder}
                placeholderStyle={styles.placeholder}
                zIndex={1000}
                zIndexInverse={1000}
                dropDownContainerStyle={styles.dropDownContainer}
                listMode="SCROLLVIEW"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 1000,
        marginTop: 4,
    },
    dropdown: {
        borderColor: '#D0D5DD',
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        height: 52,
    },
    placeholder: {
        color: '#667085',
    },
    dropDownContainer: {
        borderColor: '#D0D5DD',
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        zIndex: 1001,
    },
})
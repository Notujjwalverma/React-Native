import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

type DropDownItem = { label: string; value: string }

type DropDownProps = {
    HeadingPlaceholder: string
    items: DropDownItem[]
    value: string | null
    setValue: (value: string | null) => void
}

export default function DropDown(props: DropDownProps) {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState<DropDownItem[]>(props.items)

    return (
        <View style={styles.wrapper}>
            <DropDownPicker
                style={styles.dropdown}
                open={open}
                value={props.value}
                items={items}
                setOpen={setOpen}
                setValue={(callback) => {
                    if (typeof callback === "function") {
                        props.setValue(callback(props.value));
                    } else {
                        props.setValue(callback);
                    }
                }}
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
        overflow: 'visible',
    },
    dropdown: {
        borderColor: '#D0D5DD',
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        height: 52,
        overflow: 'visible',
    },
    placeholder: {
        color: '#667085',
        zIndex: 999,
    },
    dropDownContainer: {
        borderColor: '#D0D5DD',
        borderRadius: 12,
        backgroundColor: 'white',
        zIndex: 1001,
        overflow: 'visible',
    },
})
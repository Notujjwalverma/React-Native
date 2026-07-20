import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

interface Props {
    initialValues?: any;
    onSubmit: (data: any) => void;
}

export default function SkillForm({
    initialValues,
    onSubmit,
}: Props) {
    const [skillName, setSkillName] = useState('');
    const [experience, setExperience] = useState('');
    const [proficiency, setProficiency] = useState('');

    useEffect(() => {
        if (initialValues) {
            setSkillName(initialValues.skillName || '');
            setExperience(initialValues.experience || '');
            setProficiency(initialValues.proficiency || '');
        } else {
            setSkillName('');
            setExperience('');
            setProficiency('');
        }
    }, [initialValues]);

    const handleSubmit = () => {
        const payload = {
            skillName: skillName.trim(),
            experience: experience.trim(),
            proficiency: proficiency.trim(),
        };

        onSubmit && onSubmit(payload);

        // Optionally clear fields after submit
        setSkillName('');
        setExperience('');
        setProficiency('');
    };

    return (
    <View>
        <Text style={styles.title}>
            {initialValues ? 'Edit Skill' : 'Add Skill'}
        </Text>

        <TextInput
            placeholder="Skill Name"
            style={styles.input}
            value={skillName}
            onChangeText={setSkillName}
        />

        <TextInput
            placeholder="Experience"
            style={styles.input}
            value={experience}
            onChangeText={setExperience}
        />

        <TextInput
            placeholder="Proficiency"
            style={styles.input}
            value={proficiency}
            onChangeText={setProficiency}
        />

        <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
        >
            <Text style={styles.submitText}>
                {initialValues ? 'Update Skill' : 'Add Skill'}
            </Text>
        </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
    },

    submitBtn: {
        backgroundColor: '#349fa2',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },

    submitText: {
        color: '#fff',
        fontWeight: '600',
    },
});
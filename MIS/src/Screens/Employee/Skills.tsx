import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';

import Navbar from '../../components/Navbar';
import CustomBottomSheet from '../../components/BottomSheet';
import SkillForm from '../../components/Inputs/SkillForm';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

import {
    addSkill,
    updateSkill,
} from '../../redux/store/slices/employeeSlice';

interface Skill {
    id: string;
    skillName: string;
    proficiency: string;
    experience: string;
    skillType: string;
    updatedOn: string;
}

export default function Employee_skills() {
    const dispatch = useDispatch();

    const [showSheet, setShowSheet] = useState(false);
    const [selectedSkill, setSelectedSkill] =
        useState<Skill | null>(null);

    const skills = useSelector(
        (state: RootState) =>
            state.employee.employee.profileDetails.skills
    );

    const getBadgeColor = (proficiency: string) => {
        switch (proficiency?.toLowerCase()) {
            case 'expert':
                return '#16a34a';

            case 'advanced':
                return '#2563eb';

            case 'intermediate':
                return '#f59e0b';

            default:
                return '#6b7280';
        }
    };

    const handleSubmit = (data: any) => {
        if (selectedSkill) {
            dispatch(
                updateSkill({
                    id: selectedSkill.id,
                    updatedSkill: data,
                })
            );
        } else {
            dispatch(
                addSkill({
                    id: Date.now().toString(),
                    ...data,
                    skillType:
                        data.skillType || 'primary',
                    updatedOn:
                        new Date()
                            .toISOString()
                            .split('T')[0],
                })
            );
        }

        setShowSheet(false);
        setSelectedSkill(null);
    };

    return (
        <View style={styles.container}>
            <Navbar />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 30,
                }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.heading}>
                            My Skills
                        </Text>

                        <Text
                            style={styles.subHeading}
                        >
                            {skills.length} Skills Added
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            setSelectedSkill(
                                null
                            );
                            setShowSheet(true);
                        }}
                    >
                        <AntDesign
                            name="plus"
                            size={28}
                            color="#349fa2"
                        />
                    </TouchableOpacity>
                </View>

                {/* Skill Cards */}
                {skills.map((skill: Skill) => (
                    <View
                        key={skill.id}
                        style={styles.card}
                    >
                        <View
                            style={
                                styles.cardHeader
                            }
                        >
                            <View
                                style={
                                    styles.skillInfo
                                }
                            >
                                <Feather
                                    name="award"
                                    size={20}
                                    color="#349fa2"
                                />

                                <Text
                                    style={
                                        styles.skillName
                                    }
                                >
                                    {
                                        skill.skillName
                                    }
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection:
                                        'row',
                                    alignItems:
                                        'center',
                                }}
                            >
                                <View
                                    style={[
                                        styles.badge,
                                        {
                                            backgroundColor:
                                                getBadgeColor(
                                                    skill.proficiency
                                                ),
                                        },
                                    ]}
                                >
                                    <Text
                                        style={
                                            styles.badgeText
                                        }
                                    >
                                        {
                                            skill.proficiency
                                        }
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={{
                                        marginLeft: 10,
                                    }}
                                    onPress={() => {
                                        setSelectedSkill(
                                            skill
                                        );
                                        setShowSheet(
                                            true
                                        );
                                    }}
                                >
                                    <MaterialIcons
                                        name="edit"
                                        size={22}
                                        color="#349fa2"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={
                                styles.detailsContainer
                            }
                        >
                            <Text
                                style={
                                    styles.detailText
                                }
                            >
                                Type:{' '}
                                {
                                    skill.skillType
                                }
                            </Text>

                            <Text
                                style={
                                    styles.detailText
                                }
                            >
                                Experience:{' '}
                                {
                                    skill.experience
                                }
                            </Text>

                            <Text
                                style={
                                    styles.detailText
                                }
                            >
                                Updated:{' '}
                                {
                                    skill.updatedOn
                                }
                            </Text>
                        </View>
                    </View>
                ))}

                {skills.length === 0 && (
                    <View
                        style={
                            styles.emptyContainer
                        }
                    >
                        <Feather
                            name="award"
                            size={60}
                            color="#d1d5db"
                        />

                        <Text
                            style={
                                styles.emptyText
                            }
                        >
                            No skills added yet
                        </Text>
                    </View>
                )}
            </ScrollView>

            <CustomBottomSheet
                visible={showSheet}
                onClose={() => {
                    setShowSheet(false);
                    setSelectedSkill(null);
                }}
            >
                <SkillForm
                    key={
                        selectedSkill?.id ??
                        'new-skill'
                    }
                    initialValues={
                        selectedSkill
                    }
                    onSubmit={
                        handleSubmit
                    }
                />
            </CustomBottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 16,
    },

    heading: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1f2937',
    },

    subHeading: {
        color: '#6b7280',
        marginTop: 4,
    },

    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 14,
        borderRadius: 16,
        padding: 16,
        elevation: 2,
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    skillInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    skillName: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 8,
        color: '#111827',
    },

    badge: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },

    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },

    detailsContainer: {
        marginTop: 12,
    },

    detailText: {
        color: '#4b5563',
        marginBottom: 6,
    },

    emptyContainer: {
        alignItems: 'center',
        marginTop: 80,
    },

    emptyText: {
        marginTop: 12,
        color: '#9ca3af',
        fontSize: 16,
    },
});
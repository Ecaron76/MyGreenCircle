'use client'
import Header from "@/components/UI/Header/Header";
import './groupes.css'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import MainButton from "@/components/UI/MainButton/MainButton";
import GroupCard from "@/components/UI/GroupCard/GroupCard";
import CreateGrpModal from "@/components/GroupePage/CreateGrpModal/CreateGrpModal";


interface Group {
    membersCount: number;
    groupId: number;
    author: string;
    groupName: string;
    groupDescription: string;
    groupImage?: string;
}

const GroupesPage = () => {
    const { data: session } = useSession()
    console.log(session?.user.id)
    const [isCreateGrpModalVisible, setIsCreateGrpModalVisible] = useState(false);
    const [newGroups, setNewGroups] = useState<Group[]>([]);
    const [myGroups, setMyGroups] = useState<Group[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchMembersCount = async (groupId: number) => {
        try {
            const response = await fetch(`/api/groupe/join/${groupId}/count`);
            if (!response.ok) {
                throw new Error('Failed to fetch members count');
            }

            const data = await response.json();
            return data.membersCount;
        } catch (error) {
            console.error('Error:', error);
            return 0;
        }
    };

    const refreshGroups = async () => {
        setIsLoading(true);
        try {
            const [newGroupsResponse, myGroupsResponse] = await Promise.all([
                fetch('/api/groupe/'),
                fetch('/api/groupe/usergrps')
            ]);

            if (!newGroupsResponse.ok || !myGroupsResponse.ok) {
                throw new Error('Failed to fetch groups');
            }

            const [newGroupsData, myGroupsData] = await Promise.all([
                newGroupsResponse.json(),
                myGroupsResponse.json()
            ]);
            const newGroupsDataWithMembersCount = await Promise.all(newGroupsData.map(async (group: Group) => {
                const membersCount = await fetchMembersCount(group.groupId);
                return { ...group, membersCount: membersCount };
            }));

            const myGroupsDataWithMembersCount = await Promise.all(myGroupsData.map(async (group: Group) => {
                const membersCount = await fetchMembersCount(group.groupId);
                return { ...group, membersCount: membersCount };
            }));

            setNewGroups(newGroupsDataWithMembersCount);
            setMyGroups(myGroupsDataWithMembersCount);

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshGroups();
    }, []);


    const handleCreateGrpClick = () => {
        setIsCreateGrpModalVisible(true);
    };

    const closeCreateGrpModal = () => {
        setIsCreateGrpModalVisible(false);
    };

    const handleCreateGrpSuccess = () => {
        setIsCreateGrpModalVisible(false);
    };


    if (session?.user) {
        return (
            <main>
                <Header username={session.user.username} />
                <div className="search-container">
                    <input type="text" placeholder="Rechercher dans les groupes" />
                    <button>
                        <img src="https://img.icons8.com/material-outlined/24/000000/search.png" alt="Search Icon" />
                    </button>
                </div>
                <section className="creategrp-section">
                    <h2>Initiateur d&apos;actions collectives ?</h2>
                    <p>Créez votre groupe et rassemblez des citoyens pour agir ensemble pour l&apos;écologie !</p>
                    <MainButton name="Créer un groupe" type="button" onClick={handleCreateGrpClick} />
                </section>

                <section className="groups-section">
                    <h2>Vos Groupes</h2>
                    <div className="groups-list">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            myGroups.map(myGroup => (
                                <GroupCard
                                    key={myGroup.groupId}
                                    groupId={myGroup.groupId}
                                    title={myGroup.groupName}
                                    nbMember={myGroup.membersCount}
                                    description={myGroup.groupDescription}
                                    image={myGroup.groupImage}
                                    myGroup
                                />

                            ))
                        )}
                    </div>
                </section>
                <section className="groups-section">
                    <h2>Découvrir</h2>
                    <div className="groups-list">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            newGroups
                                .filter(newGroup => !myGroups.some(myGroup => myGroup.groupId === newGroup.groupId))
                                .map(newGroup => (
                                    <GroupCard
                                        key={newGroup.groupId}
                                        groupId={newGroup.groupId}
                                        title={newGroup.groupName}
                                        nbMember={newGroup.membersCount}
                                        description={newGroup.groupDescription}
                                        refreshGroups={refreshGroups}
                                        image={newGroup.groupImage}
                                        group={true}
                                    />
                                ))
                        )}
                    </div>
                </section>
                {isCreateGrpModalVisible && <CreateGrpModal onClose={closeCreateGrpModal} onSuccess={handleCreateGrpSuccess} />}

            </main>
        );
    }
}



export default GroupesPage

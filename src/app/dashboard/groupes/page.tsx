'use client'
import Header from "@/components/UI/Header/Header";
import './groupes.css'
import GroupCard from "@/components/UI/GroupCard/GroupCard";
import MainButton from "@/components/UI/MainButton/MainButton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CreateGrpModal from "@/components/GroupePage/CreateGrpModal/CreateGrpModal";

interface Group {
    groupId: number;
    author: string;
    groupName: string;
    // Ajoutez d'autres propriétés si nécessaire
  }

const GroupesPage = () => {
    const {data: session} = useSession()
    console.log(session?.user.id)
    const [isCreateGrpModalVisible, setIsCreateGrpModalVisible] = useState(false);
    const [newGroups, setNewGroups] = useState<Group[]>([]);
    const [myGroups, setMyGroups] = useState<Group[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    

    useEffect(() => {
        const getNewGroups = async () => {
            setIsLoading(true);
            try {
                console.log(session?.user.id)
                const response = await fetch('/api/groupe/'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }
                const data = await response.json();
                setNewGroups(data);
                
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

        const getMyGroups = async () => {
            setIsLoading(true);
            try {
                console.log(session?.user.id)
                const response = await fetch('/api/groupe/usergrps'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }
                const data = await response.json();
                setMyGroups(data);
                
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
    
        getNewGroups();
        getMyGroups();
    }, [session]);


    const handleCreateGrpClick = () => {
        setIsCreateGrpModalVisible(true);
      };

      const closeCreateGrpModal = () => {
        setIsCreateGrpModalVisible(false);
      };

      const handleSignupSuccess = () => {
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
                    <MainButton name="Créer un groupe" type="button" onClick={handleCreateGrpClick}/>
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
                                author={myGroup.author} 
                                title={myGroup.groupName}
                                nbMember="5,2K" 
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
                            newGroups.map(newGroup => (
                            <GroupCard
                                key={newGroup.groupId}
                                author={newGroup.author} 
                                title={newGroup.groupName}
                                nbMember="5,2K" 
                            />
                           
                            ))
                        )}
                    </div>
                </section>
                {isCreateGrpModalVisible && <CreateGrpModal onClose={closeCreateGrpModal} onSuccess={handleSignupSuccess}/>}

            </main>
        );
    }
}



export default GroupesPage

'use client'
import Header from "@/components/UI/Header/Header";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import './SingleGroupePage.css'
import { redirect, useRouter } from "next/navigation";

type SingleGroupePageProps = {
    params: {
        groupId: number
    }

}

interface GroupDetails {
    groupId: number;
    groupName: string;
    groupDescription: string;
    groupLocation: string;
};
const SingleGroupePage = ({ params }: SingleGroupePageProps) => {
    const { data: session } = useSession();
    const router = useRouter();

    const { groupId } = params;
    console.log(groupId)
    const [groupDetails, setGroupDetails] = useState<GroupDetails>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchGroupDetails = async () => {
        if (!groupId) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/groupe/${groupId}`);
            if (!response.ok) throw new Error('Failed to fetch group details');

            const data = await response.json();
            setGroupDetails(data);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    const handleLeaveGroup = async () => {
        try {
            const response = await fetch(`/api/groupe/join/${groupId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to leave group');

            alert('You have left the group successfully');
            router.push('/dashboard/groupes');        
        } catch (error) {
            console.error('Error leaving group:', error);
        }
    };

    useEffect(() => {
        fetchGroupDetails();
      }, [groupId]);


    if (session?.user) {
        return (
            <main>
                <Header username={session.user.username} />
                <div className="group-details-container">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : groupDetails ? (
                        <div>
                            <h2>{groupDetails.groupName}</h2>
                            <p>{groupDetails.groupDescription}</p>
                            <p>{groupDetails.groupLocation}</p>
                            <button onClick={handleLeaveGroup}>Quitter le groupe</button>
                        </div>
                    ) : (
                        <p>No group details found</p>
                    )}
                </div>


            </main>
        );
    }
}



export default SingleGroupePage

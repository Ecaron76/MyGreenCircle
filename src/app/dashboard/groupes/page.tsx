'use client'
import Header from "@/components/UI/Header/Header";
import './groupes.css'
import GroupCard from "@/components/UI/GroupCard/GroupCard";
import MainButton from "@/components/UI/MainButton/MainButton";
import { useSession } from "next-auth/react";


const GroupesPage = () => {
    const {data: session} = useSession()
    console.log(session)
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
                    <MainButton name="Créer un groupe" type="button" />
                </section>
                
                <section className="groups-section">
                    <h2>Vos Groupes</h2>
                    <div className="groups-list">
                        <GroupCard author="Ecaron" title="EcoNormandie" myGroup nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie" myGroup nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie" myGroup nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie" myGroup nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie" myGroup nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie" myGroup nbMember="5,2K"/>
                    </div>
                </section>
                <section className="groups-section">
                    <h2>Découvrir</h2>
                    <div className="groups-list">
                        <GroupCard author="Ecaron" title="EcoNormandie"  nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie"  nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie"  nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie"  nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie"  nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie"  nbMember="5,2K"/>
                    </div>
                </section>
            </main>
        );
    }
}



export default GroupesPage

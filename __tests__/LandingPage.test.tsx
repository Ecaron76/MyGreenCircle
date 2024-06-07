import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/page';

describe('LandingPage component', () => {
  beforeEach(() => {
    render(<LandingPage />);
  });

  test('renders the hero section', () => {
    // Vérifier la présence du titre de l'application
    expect(screen.getByText('My GreenCircle')).toBeInTheDocument();

    // Vérifier la présence du titre de la page
    expect(screen.getByText('Rejoignez une communauté dédiée à un monde plus propre et plus sain !')).toBeInTheDocument();

    // Vérifier la présence du logo
    expect(screen.getByAltText('')).toBeInTheDocument();
  });

  test('renders the bait phrase section', () => {
    // Vérifier la présence de la phrase d'accroche
    expect(screen.getByText("Avec nous , tout le monde bénéficie d'un environnement plus vert.")).toBeInTheDocument();
  });

  test('renders the group section', () => {
    // Vérifier la présence du titre de la section des groupes
    expect(screen.getByText('Groupes')).toBeInTheDocument();

    // Vérifier la présence du contenu de la section des groupes
    // Vérifier la présence du bouton "Je rejoins"
    expect(screen.getByText('Je rejoins')).toBeInTheDocument();
  });

  test('renders the event section', () => {
    // Vérifier la présence du titre de la section des événements
    expect(screen.getByText('Dynamisons nos actions écologiques par des événements !')).toBeInTheDocument();

    // Vérifier la présence du contenu de la section des événements
    expect(screen.getByText(text => text.includes("Vous pouvez organiser ou participer à des actions collectives pour le bien de "))).toBeInTheDocument();

    // Vérifier la présence du bouton "J'agis"
    expect(screen.getByText("J'agis")).toBeInTheDocument();

    // Vérifier la présence d'un événement
    expect(screen.getByText('Recyclage Rouen')).toBeInTheDocument();
    expect(screen.getByText('Organisé par EcoNormandie')).toBeInTheDocument();
    expect(screen.getByText('28/05/2024')).toBeInTheDocument();
    expect(screen.getByText('Rouen, 76000')).toBeInTheDocument();
    expect(screen.getByText('Participer')).toBeInTheDocument();
    expect(screen.getByText('10h00')).toBeInTheDocument();
  });

  test('renders the post section', () => {
    // Vérifier la présence du titre de la section des posts
    expect(screen.getByText('Interagissez et inspirez via des posts !')).toBeInTheDocument();

    // Vérifier la présence du contenu de la section des posts
    expect(screen.getByText(content => content.startsWith("Bonjour éco-amis ! Partageons nos astuces pour réduire les déchets. Quelle est votre méthode favorite ?"))).toBeInTheDocument();

    // Vérifier la présence du nom de l'auteur dans la section des posts
    const authorElement = screen.getByText("Éco-Tips du Mois !").closest(".postCard")?.querySelector(".author div");
    expect(authorElement?.textContent).toEqual('Juan Pérez');

    // Vérifier la présence des boutons de réaction
    expect(screen.getByAltText('like')).toBeInTheDocument();
    expect(screen.getByAltText('comment')).toBeInTheDocument();
  });
});

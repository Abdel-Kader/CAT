import React from 'react'
import Header from './common/header'

function Home() {
    
    return (
        <div>
            <Header />
            <section id="about-us" className="about-us">
            <div className="container" data-aos="fade-up">

            <div className="section-title">
                <h2>Présentation</h2>
            </div>
            <div className="row content">
           
                <div className="col-lg-12 pt-4 pt-lg-0" data-aos="fade-left" style={{textAlign: 'justify', fontSize: 14}}>
                    La Télémédecine c’est l’exercice de la Médecine à distance par la
                    communication audiovisuelle et le transfert de données interactives. Par le
                    moyen de réseaux de télécommunication, téléphone, internet haut débit,
                    ligne spécialisées, Satellites, la télémédecine permet à des médecins
                    d’échanger des informations entre eux, d’effectuer des consultations ou
                    d’analyser et interpréter des examens complémentaires, en particulier de
                    l’imagerie médicale. Elle couvre les domaines suivants :
                        
                    <ul>
                        <li>
                            • Consultations ;
                        </li>
                        <li>
                            • Etablissement d’un diagnostic ;
                        </li>
                        <li>
                            • Prescription de soins ;
                        </li>
                        <li>
                            • Surveillance thérapeutique ;
                        </li>
                        <li>
                        • Transfert de données médicales ;
                        </li>
                        <li>
                        • Enseignement des sciences de la Santé ;
                        </li>
                        <li>
                            • Recherche médicale ;
                        </li>
                        <li>
                            • Formation médiale continue.
                        </li>
                            
                    </ul>  
               
                </div>
            </div>

            <div className="section-title">
                <h2>Historique et objectif du Centre Africain de Télémédecine</h2>
            </div>
            <div className="row content">
                <div className="col-lg-12 pt-4 pt-lg-0" data-aos="fade-left" style={{ textAlign: 'justify', fontSize: 14 }}>
                    La télémédecine est un projet qui a été lancé depuis 1997 en Afrique. Ce n’est
                    qu’en 2001-2002 que les premières activités pilotes de la Télémédecine/Télésanté
                    ont été menées au Sénégal en coopération entre le gouvernement du Sénégal et le
                    gouvernement Indien.
                    <br/>
                    <br />
                    <strong><em>Ces objectifs est de faire de sorte que les communautés des zones éloignées
                        et/ou défavorisées Afrique Sub-saharienne aient:</em></strong>
                            <br/>
                            <br/>
                    • Accès au diagnostic et à des soins de qualité ;<br/><br/>
                    • Réduction du nombre des évacuations sanitaires ;<br/><br/>
                    • Formation des praticiens des zones éloignées ou difficilement accessibles.        
                </div>
            </div>
        </div>
    </section>
        </div>
    )
}

export default Home
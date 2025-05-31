import React from 'react';
import Navbar from './Elements/Navbar';
import SectionDivider from './SectionDivider';
import Footer from './Elements/Footer';
import Button from './Elements/Button';

const Landing: React.FC = () => {
    return (
        <div>
            {/* 1. Navbar */}
            <Navbar />

            {/* 2. Pierwsza sekcja */}
            <SectionDivider id="Formularz">

                {/*

                Ciekawostka lewy górny, formularz na środku, ładny obrazek jakiś gradient na tło
                guzik na dół prowadzący


                */}
                <h2 className={'center'}>Zajebisty formularz</h2>
                <Button className={'centerItem'}>Zobacz stonks</Button>
            </SectionDivider>

            {/* 3. Druga sekcja */}
            <SectionDivider id="sekcja2">
                <h2>Sekcja 2</h2>
                <p>Kolejna porcja treści, którą możesz sobie edytować według uznania.</p>
            </SectionDivider>

            {/* 4. Trzecia sekcja z headerem i guzikiem na środku */}
            <SectionDivider id="sekcja3">
                <h2 className="section-heading-center">Trzecia Sekcja</h2>
                <div className="section-flex-center">
                    <Button
                      onClick={() => {
                        // tutaj możesz wstawić dowolną akcję po kliknięciu
                        alert('Kliknięto guzik w trzeciej sekcji!');
                      }}
                    >
                      Kliknij mnie
                    </Button>
                </div>
            </SectionDivider>

            {/* 5. Footer */}
            <Footer />
        </div>
    );
};

export default Landing;
import React from 'react';
import Navbar from '@components/layout/Navbar';
import SectionDivider from '@components/layout/SectionDivider';
import Footer from '@components/layout/Footer';
import Button from '@components/Button';
import Form from '@components/Form';

const Landing: React.FC = () => {
    const fields = [
      { name: 'email', label: 'Email', type: 'email', placeholder: 'wpisz@email', required: true },
      { name: 'password', label: 'Hasło', type: 'password', placeholder: 'wpisz hasło', required: true },
    ];

    const handleFormSubmit = (data: { [key: string]: string }) => {
      console.log('Formularz wysłany:', data);
      // Tutaj możesz dodać dowolną logikę, np. wysłanie danych na serwer
    };

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
                <p className="center">Wypełnij poniższy formularz, aby się zarejestrować na wydarzenie!</p>
                <h2 className={'center'}>Zajebisty formularz</h2>
                <Form
                  fields={fields}
                  onSubmit={handleFormSubmit}
                  title="Zarejestruj się"
                  width="100%"
                  className="centerItem"
                />
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

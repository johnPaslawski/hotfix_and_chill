import React, { useState } from "react";

const FAQ: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (

        <div className="space-y-4 text-black px-16">
            <h1 className="text-3xl font-semibold text-center">FAQ</h1>
            <div>
                <button
                    onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                    className="flex justify-between items-center w-full focus:outline-none"
                >
                    <h2 className="text-xl font-semibold text-left">Czym jest kalkulator solarny?</h2>
                    <span className={`transition-transform ${openFaq === 1 ? "rotate-90" : ""}`}>▶</span>
                </button>
                <div className={`mt-2 text-lg space-y-1 overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${openFaq === 1 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="font-light">Kalkulator ma pomóc użytkownikom w oszacowaniu kosztów związanych z wykorzystaniem energii słonecznej w porównaniu z energią z sieci bez instalacji PV.</p>
                    <p className="font-light">Pozwala porównać scenariusz bez fotowoltaiki ze scenariuszem z nią na przestrzeni wielu lat, uwzględniając koszty instalacji, ceny energii oraz zyski ze sprzedaży nadwyżek.</p>
                </div>
            </div>
            <div>
                <button
                    onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                    className="flex justify-between items-center w-full focus:outline-none"
                >
                    <h2 className="text-xl font-semibold text-left">Jakie dane wejściowe muszę wprowadzić do kalkulatora solarnego?</h2>
                    <span className={`transition-transform ${openFaq === 2 ? "rotate-90" : ""}`}>▶</span>
                </button>
                <div className={`mt-2 text-lg space-y-1 overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${openFaq === 2 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="font-light">Użytkownicy podają:</p>
                    <ul className="list-disc list-inside">
                        <li className="font-light">Roczną konsumpcję energii bez instalacji [kWh]</li>
                        <li className="font-light">Cenę zakupu energii w pierwszym roku [PLN/kWh]</li>
                        <li className="font-light">Wielkość instalacji fotowoltaicznej [kW]</li>
                        <li className="font-light">Energię wyprodukowaną w pierwszym roku [kWh]</li>
                        <li className="font-light">Cenę sprzedaży energii w pierwszym roku [PLN/kWh]</li>
                        <li className="font-light">Koszt instalacji PV za 1 kW [PLN]</li>
                        <li className="font-light">Procent autokonsumpcji [%]</li>
                    </ul>
                    <p className="font-light">Dodatkowo kalkulator uwzględnia stały roczny wzrost ceny energii (np. 7,1%).</p>
                </div>
            </div>
            <div>
                <button
                    onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                    className="flex justify-between items-center w-full focus:outline-none"
                >
                    <h2 className="text-xl font-semibold text-left">Jak kalkulator solarny oblicza oszczędności?</h2>
                    <span className={`transition-transform ${openFaq === 3 ? "rotate-90" : ""}`}>▶</span>
                </button>
                <div className={`mt-2 text-lg space-y-1 overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${openFaq === 3 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="font-light">Dla każdego roku kalkulator:</p>
                    <ul className="list-disc list-inside">
                        <li className="font-light">Aktualizuje ceny zakupu i sprzedaży energii o procentowy wzrost.</li>
                        <li className="font-light">Oblicza koszt energii bez instalacji: cena zakupu × konsumpcja.</li>
                        <li className="font-light">Wylicza autokonsumpcję oraz energię oddaną do sieci (biorąc pod uwagę procent autokonsumpcji).</li>
                        <li className="font-light">Oblicza zyski ze sprzedaży: cena sprzedaży × energia oddana do sieci.</li>
                        <li className="font-light">Oblicza koszt energii z instalacją: cena zakupu × energia pobrana z sieci – zyski ze sprzedaży.</li>
                        <li className="font-light">Oblicza oszczędności: koszt bez instalacji – koszt z instalacją.</li>
                        <li className="font-light">Sumuje skumulowane oszczędności uwzględniając jednorazowy koszt instalacji w pierwszym roku.</li>
                    </ul>
                </div>
            </div>
            <div>
                <button
                    onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                    className="flex justify-between items-center w-full focus:outline-none"
                >
                    <h2 className="text-xl font-semibold text-left">Czy kalkulator solarny uwzględnia dofinansowania i ulgi?</h2>
                    <span className={`transition-transform ${openFaq === 4 ? "rotate-90" : ""}`}>▶</span>
                </button>
                <div className={`mt-2 text-lg space-y-1 overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${openFaq === 4 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="font-light">Kalkulator solarny uwzględnia dofinansowania i ulgi, takie jak:</p>
                    <ul className="list-disc list-inside">
                        <li className="font-light">Ulga termomodernizacyjna – odliczenie 17% kosztów instalacji PV.</li>
                        <li className="font-light">Dofinansowanie “Mój Prąd” – 7 000 PLN na instalację PV i 16 000 PLN na magazyn energii.</li>
                    </ul>
                    <p className="font-light">Pozwala to na bardziej precyzyjne oszacowanie rzeczywistych kosztów inwestycji.</p>
                </div>
            </div>
            <div>
                <button
                    onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
                    className="flex justify-between items-center w-full focus:outline-none"
                >
                    <h2 className="text-xl font-semibold text-left">Jakie zaawansowane funkcje oferuje kalkulator solarny?</h2>
                    <span className={`transition-transform ${openFaq === 5 ? "rotate-90" : ""}`}>▶</span>
                </button>
                <div className={`mt-2 text-lg space-y-1 overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${openFaq === 5 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="font-light">Kalkulator solarny oferuje zaawansowane funkcje, takie jak:</p>
                    <ul className="list-disc list-inside">
                        <li className="font-light">Zastosowanie danych godzinowych do dokładniejszych prognoz cen, produkcji i konsumpcji.</li>
                        <li className="font-light">Dodanie modelu magazynu energii z uwzględnieniem degradacji baterii.</li>
                        <li className="font-light">Uwzględnienie sezonowych wzorców zmian cen i zużycia energii.</li>
                        <li className="font-light">Integracja inteligentnych algorytmów zarządzania cyklem ładowania/rozładowania.</li>
                        <li className="font-light">Zaawansowana wizualizacja z interaktywnymi dashboardami oraz eksport wyników do plików.</li>
                    </ul>
                </div>
            </div>

            <div>
                <button
                    onClick={() => setOpenFaq(openFaq === 6 ? null : 6)}
                    className="flex justify-between items-center w-full focus:outline-none"
                >
                    <h2 className="text-xl font-semibold text-left">Jak wykorzystać wyniki kalkulatora solarnego przy montażu instalacji fotowoltaicznej w moim domu?</h2>
                    <span className={`transition-transform ${openFaq === 6 ? "rotate-90" : ""}`}>▶</span>
                </button>
                <div className={`mt-2 text-lg space-y-1 overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${openFaq === 6 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="font-light">Aby zamontować instalację fotowoltaiczną w Twoim domu, należy postępować według poniższych kroków:</p>
                    <ol className="list-decimal list-inside space-y-1">
                        <li className="font-light">Wybierz odpowiednie miejsce na dachu lub gruncie – musi być dobrze nasłonecznione.</li>
                        <li className="font-light">Skontaktuj się z certyfikowanym instalatorem, który oceni warunki techniczne i dobierze system.</li>
                        <li className="font-light">Wybierz moduły i falownik – polecamy rozwiązania Hitachi Energy, biorąc pod uwagę ich udział w konkursie i renomę jakości.</li>
                        <li className="font-light">Złóż dokumentację do lokalnego operatora sieci oraz, jeśli planujesz skorzystać, wniosek o dofinansowanie (np. z programu „Mój Prąd”).</li>
                        <li className="font-light">Po uzyskaniu pozwoleń i między innymi akceptacji operatora, wykonaj montaż konstrukcji i podłączenie modułów.</li>
                        <li className="font-light">Podłącz falownik i zintegruj system z siecią – montażu dokonuje wykwalifikowany elektryk.</li>
                        <li className="font-light">Po zakończeniu montażu, zleć odbiór techniczny przez uprawnioną jednostkę oraz zgłoś instalację do operatora sieci w celu włączenia do pracy.</li>
                    </ol>
                    </div>
            </div>
        </div>
    );
};

export default FAQ;
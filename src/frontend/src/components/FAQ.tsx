import React, { useState } from "react";

const FAQ: React.FC = () => {
    const [faq1Open, setFaq1Open] = useState(false);
    const [faq2Open, setFaq2Open] = useState(false);

    return (
        <div className="space-y-4 text-black">
            <div>
                <button
                    onClick={() => setFaq1Open(!faq1Open)}
                    className="flex justify-between items-center w-full focus:outline-none"
                >
                    <h2 className="text-xl font-semibold">Co to jest X?</h2>
                    <span className={`transition-transform ${faq1Open ? "rotate-90" : ""}`}>▶</span>
                </button>
                {faq1Open && (
                    <h3 className="mt-2 text-lg">
                        To jest odpowiedź na pytanie o X. Tutaj możesz wstawić więcej informacji.
                    </h3>
                )}
            </div>
            <div>
                <button
                    onClick={() => setFaq2Open(!faq2Open)}
                    className="flex justify-between items-center w-full focus:outline-none"
                >
                    <h2 className="text-xl font-semibold">Jak działa Y?</h2>
                    <span className={`transition-transform ${faq2Open ? "rotate-90" : ""}`}>▶</span>
                </button>
                {faq2Open && (
                    <h3 className="mt-2 text-lg">
                        To jest odpowiedź na pytanie o Y. Tutaj możesz wstawić więcej informacji.
                    </h3>
                )}
            </div>
        </div>
    );
};

export default FAQ;
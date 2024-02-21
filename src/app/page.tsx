"use client";

import EnvDrawer from "@/components/openDrawer";
import { FileHandler } from "@/services/file-handler";
import { CardState } from "@/services/main-service";
import LocalStorageHandler from "@/services/storage-handler";
import { useEffect, useState } from "react";

export default function Home() {
    const [initState, setInitState] = useState<CardState[]>([]);
    const [selectedCard, setSelectedCard] = useState<CardState | null>(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const toggleSelected = (environment: string) => {
        const updatedCards = initState.map((card) =>
            card.environment === environment
                ? { ...card, selected: true }
                : { ...card, selected: false }
        );
        setInitState(updatedCards);
        setSelectedCard(
            initState.find((ele) => ele.environment === environment)
        );
    };
    const checkIsUploaded = () => {
        const uploaded = LocalStorageHandler.get();
        setInitState(uploaded);
        if (uploaded) {
            setIsUploaded(true);
        } else {
            setIsUploaded(false);
        }
    };
    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const importedData = await FileHandler.importFile(file);
                LocalStorageHandler.save(importedData);
                console.log("Data imported and saved successfully.");
                setErrorMessage("");
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
    };
    useEffect(() => {
        checkIsUploaded();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center bg-base-purple p-24">
            <h1 className="text-5xl font-bold">Choose Environment</h1>
            {!isUploaded && (
                <input
                    type="file"
                    onChange={handleFileInputChange}
                    accept=".json,.csv"
                />
            )}

            <div className="flex gap-10 mt-20 ">
                {isUploaded &&
                    initState.map((ele, idx) => (
                        <EnvDrawer
                            environment={ele.environment}
                            username={ele.username}
                            password={ele.password}
                            server={ele.server}
                            database={ele.database}
                        />
                    ))}
            </div>
        </main>
    );
}

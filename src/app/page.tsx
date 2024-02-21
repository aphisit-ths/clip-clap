"use client";

import EnvDrawer from "@/components/OpenDrawer";
import { FileHandler } from "@/services/file-handler";
import { CardState } from "@/services/main-service";
import LocalStorageHandler from "@/services/storage-handler";
import React, { useEffect, useState } from "react";
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import ClipClapLogo from '@/components/logo'
import {toast, Toaster} from 'sonner'
import {ClipboardIcon} from '@radix-ui/react-icons'

export default function Home() {
    const [initState, setInitState] = useState<CardState[]>([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const checkIsUploaded = () => {
        const uploaded = LocalStorageHandler.get();
        setInitState(uploaded);
        if (uploaded) {
            setIsUploaded(true);
        } else {
            setIsUploaded(false);
        }
    };
    const copyJsonTemplateToClipboard =  async () =>{
        const emptyJson = [
            {
                "username": "",
                "password": "",
                "database": "",
                "server": "",
                "environment": ""
            }
        ]
        await navigator.clipboard.writeText( JSON.stringify(emptyJson,null,2));
        toast.success("Clipboard has been created");
    }
    const clearState = () =>{
        setInitState([])
        setIsUploaded(false)
        LocalStorageHandler.clear()
    }

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const importedData = await FileHandler.importFile(file);
                LocalStorageHandler.save(importedData);
                setInitState(()=> LocalStorageHandler.get());
                setIsUploaded(true);
                console.log("Data imported and saved successfully.");
                setErrorMessage("");
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
    };
    useEffect(() => {
        checkIsUploaded();
    }, [isUploaded]);
    return (
        <main className="flex min-h-screen flex-col items-center bg-base-purple p-24">
            <Toaster position="bottom-right" richColors />
            <div className="flex flex-row w-[600px] justify-between items-center mb-[30px]">
                <ClipClapLogo />
                {isUploaded ?
                    <Button variant={"outline"} onClick={()=>clearState()}>Clear</Button>
                    : <Button variant={"outline"} onClick={()=>copyJsonTemplateToClipboard()}>Copy json template
                        <ClipboardIcon className="ml-2 h-4 w-4 text-gray-500" /></Button>}

            </div>
            {!isUploaded && (
                <Input id="picture" type="file"
                       size={1}
                       onChange={handleFileInputChange}
                       className={"w-1/3"}
                       accept=".json,.csv" />

            )}
            <div className="flex gap-10">
                {isUploaded &&
                    initState.map((ele, idx) => (
                        <div key={ele.environment}>
                            <EnvDrawer
                                environment={ele.environment}
                                username={ele.username}
                                password={ele.password}
                                server={ele.server}
                                database={ele.database}
                            />
                        </div>
                    ))}
            </div>
        </main>
    );
}

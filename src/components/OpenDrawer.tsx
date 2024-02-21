import React from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { CardState } from "@/services/main-service";
import { ClipboardIcon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Toaster, toast } from "sonner";

const EnvDrawer: React.FC<CardState> = ({
    environment,
    username,
    password,
    server,
    database,
}) => {
    const copyToClipboard = async (text: string) => {
        let toCopy: string;
        try {
            if (text === "connectionString") {
                toCopy = `"postgres": "Server=${server};Port=5432;user id=${username};password=${password};database=${database};Pooling=true;MinPoolSize=1;MaxPoolSize=100;CommandTimeout=6000"`;
            } else {
                toCopy = text;
            }
            await navigator.clipboard.writeText(toCopy);
            toast.success("Clipboard has been created");
        } catch (error) {
            console.error("Failed to copy:", error);
            toast.error("Copy to clipboard fail.");
        }
    };
    return (
        <Drawer key={environment}>
            <Toaster position="bottom-right" richColors />
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    className="text-2xl font-bold tracking-tighter w-auto h-auto px-10 py-10"
                >
                    {environment}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader className="flex justify-center items-center">
                        <div>
                            <DrawerTitle>Connection Clap</DrawerTitle>
                            <DrawerDescription>
                                Easy copy your connection string.
                            </DrawerDescription>
                        </div>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                            >
                                <MinusIcon className="h-4 w-4" />
                                <span className="sr-only">Decrease</span>
                            </Button>
                            <div className="flex-1 text-center">
                                <div className="text-7xl font-bold tracking-tighter">
                                    {environment}
                                </div>
                                <div className="text-[0.70rem] uppercase text-muted-foreground">
                                    Environment
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                            >
                                <PlusIcon className="h-4 w-4" />
                                <span className="sr-only">Increase</span>
                            </Button>
                        </div>
                        <div className="flex flex-col mt-3 h-[120px]">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex justify-start"
                                onClick={() => copyToClipboard(username)}
                            >
                                username:
                                <span className="text-gray-500">
                                    {username}
                                 </span>{" "}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex justify-start"
                                onClick={() => copyToClipboard(password)}
                            >
                                password :
                                <span className="text-gray-500">
                                    {password}
                                 </span>{" "}
                            </Button>{" "}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex justify-start"
                                onClick={() => copyToClipboard(database)}
                            >
                                database :
                                <span className="text-gray-500">
                                    {database}
                                 </span>{" "}
                            </Button>{" "}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex justify-start"
                                onClick={() => copyToClipboard(server)}
                            >
                                sever :
                                <span className="text-gray-500">{server} </span>{" "}
                            </Button>
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button
                            onClick={() => copyToClipboard("connectionString")}
                        >
                            Copy to Clipboard
                            <ClipboardIcon className="ml-2 h-4 w-4" />
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default EnvDrawer;

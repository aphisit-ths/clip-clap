// Import necessary libraries for encryption
import CryptoJS from "crypto-js";

export class LocalStorageHandler {
    private static readonly encryptionKey: string =
        process.env.NEXT_PUBLIC_STORAGE_KEY;
    private static readonly key: string = process.env.NEXT_PUBLIC_SECRET_KEY;

    static save(data: any) {
        console.log(this.encryptionKey);
        console.log(this.key);

        const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            LocalStorageHandler.encryptionKey
        ).toString();
        localStorage.setItem(this.key, encryptedData);
    }

    static get(): any | null {
        const encryptedData = localStorage.getItem(this.key);
        if (encryptedData) {
            const decryptedBytes = CryptoJS.AES.decrypt(
                encryptedData,
                LocalStorageHandler.encryptionKey
            );
            const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedData);
        }
        return null;
    }

    static clear(key: string) {
        localStorage.removeItem(key);
    }

    static isEmpty(): boolean {
        const encryptedData = localStorage.getItem(this.key);
        if (encryptedData) {
            return false;
        }
        return true;
    }
}

export default LocalStorageHandler;

export class FileHandler {
    static async importFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const contents = event.target.result;
                if (file.name.endsWith(".json")) {
                    try {
                        const jsonData = JSON.parse(contents as string);
                        resolve(jsonData);
                    } catch (error) {
                        reject(new Error("Invalid JSON format"));
                    }
                } else if (file.name.endsWith(".csv")) {
                    // Convert CSV to object
                    const csvData = FileHandler.csvToObject(contents);
                    resolve(csvData);
                } else {
                    reject(new Error("Unsupported file format"));
                }
            };
            reader.onerror = () => {
                reject(new Error("Failed to read file"));
            };
            reader.readAsText(file);
        });
    }

    // Method to convert CSV string to object
    static csvToObject(csv) {
        const lines = csv.split("\n");
        const result = [];
        const headers = lines[0].split(",");
        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(",");
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    }
}

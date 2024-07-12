import axios from 'axios';
import { ContainerClient } from '@azure/storage-blob';

const storageAccountName = "techgiantst";
const containerName = "images";

const SECRETS_API_BASE_URL = "https://tech-giant.azurewebsites.net/api/secrets";

class AzureBlobService {
    private containerClient: ContainerClient | null = null;

    constructor() {
        this.initializeClient();
    }

    private async initializeClient() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found in local storage");
            }

            const response = await axios.get(SECRETS_API_BASE_URL + '/sas-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const sasToken = response.data;
            const containerUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}`;
            this.containerClient = new ContainerClient(`${containerUrl}?${sasToken}`);
        } catch (error) {
            console.error("Failed to retrieve SAS token", error);
        }
    }

    async uploadImage(file: File): Promise<string> {
        if (!this.containerClient) {
            throw new Error("Container client is not initialized");
        }
        const blobName = file.name;
        const blobClient = this.containerClient.getBlockBlobClient(blobName);
        await blobClient.uploadData(file);
        return blobClient.url.split('?')[0]; // Return the URL without the SAS token
    }
}

export default new AzureBlobService();
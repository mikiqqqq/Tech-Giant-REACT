import { BlobClient, ContainerClient } from '@azure/storage-blob';

const sasToken = "sv=2022-11-02&ss=b&srt=o&sp=rwlitfx&se=2025-01-01T07:34:11Z&st=2024-06-24T22:34:11Z&spr=https&sig=Sm5ATIHYRDSnJXPWW6e%2FlIb%2Fr4PjByzMx2%2Fh4b6RLzE%3D";
const storageAccountName = "techgiant";
const containerName = "product-images";

class AzureBlobService {
    private containerClient: ContainerClient;

    constructor() {
        const containerUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}`;
        this.containerClient = new ContainerClient(`https://techgiantst.blob.core.windows.net/images?sp=racwd&st=2024-07-11T21:27:31Z&se=2024-07-12T05:27:31Z&spr=https&sv=2022-11-02&sr=c&sig=rEFLkF1TrHwI5U9EZZhsjDkJ5b1VQxs6gH1OtOlzyDE%3D`);
    }

    async uploadImage(file: File): Promise<string> {
        const blobName = file.name;
        const blobClient = this.containerClient.getBlockBlobClient(blobName);
        await blobClient.uploadData(file);
        return blobClient.url.split('?')[0]; // Return the URL without the SAS token
    }

    async getImageUrl(blobName: string): Promise<string> {
        const blobClient = this.containerClient.getBlobClient(blobName);
        return blobClient.url.split('?')[0]; // Return the URL without the SAS token
    }
}

export default new AzureBlobService();

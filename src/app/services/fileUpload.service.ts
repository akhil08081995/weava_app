import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private accountName = "weavadev"; // Your Azure storage account name
  private containerName = "pdfs";   // Your Azure blob container name
  private sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-04-04T05:04:48Z&st=2025-02-03T21:04:48Z&spr=https&sig=rnnPyfWXTrlHtGtf%2Fwan4PirGI78%2FpXowv6cjtXaRFY%3D"; // Replace with a valid SAS Token

  async uploadFile(file: File): Promise<void> {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const blobUrl = `https://${this.accountName}.blob.core.windows.net/${this.containerName}/${file.name}?${this.sasToken}`;

    try {
      const response = await fetch(blobUrl, {
        method: "PUT",
        body: file,
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.type,
        },
      });

      if (response.ok) {
        console.log("✅ File uploaded successfully!");
      } else {
        console.error("❌ Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("❌ Error uploading file:", error);
    }
  }
}

import { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { UploadFile } from "antd";
import apiClient from "../../apiCalls/ApiClient";

function readFileAsArrayBuffer(file: UploadFile) {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = () => reject(fileReader.error);
        fileReader.readAsArrayBuffer(file.originFileObj!);
    });
}

const UseS3Upload = () => {
    const uploadFileToS3 = async (
        signedUrl: string,
        fileInfo: UploadFile,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
    ) => {
        const content = await readFileAsArrayBuffer(fileInfo);
        const config: AxiosRequestConfig = {
            headers: { "Content-Type": fileInfo.type },
            onUploadProgress,
        };
        await apiClient.put(signedUrl, content, config);
    };

    return {
        uploadFileToS3,
    };
};

export default UseS3Upload;

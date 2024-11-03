import { RuleObject } from "antd/es/form";
import { UploadFile } from "antd";
import { allowedTypes, fileSizeLimit } from "../const/file.const";

export const fileSizeValidator = async (_: RuleObject, fileUpload: UploadFile[]) => {
    const file = fileUpload[0];
    if (!file.size || file.size > fileSizeLimit) {
        return Promise.reject(new Error("File must be smaller than 100MB!"));
    }
    return Promise.resolve();
};

export const fileTypeValidator = async (_: RuleObject, fileUpload: UploadFile[]) => {
    const file = fileUpload[0];
    if (!file.type || !allowedTypes.includes(file.type)) {
        return Promise.reject(new Error("File must be of type mp4!"));
    }
    return Promise.resolve();
};

export const multipleFileTypeValidator = async (_: RuleObject, fileUpload: UploadFile[]) => {
    const invalidFiles = fileUpload.filter((file) => file.type && !allowedTypes.includes(file.type));
    if (invalidFiles.length > 0) {
        return Promise.reject(new Error(`One of the files is not of type mp4!`));
    }
    return Promise.resolve();
};

export const multipleFileSizeValidator = async (_: RuleObject, fileUpload: UploadFile[]) => {
    const invalidFiles = fileUpload.filter((file) => (file.size ? file.size > fileSizeLimit : false));
    if (invalidFiles.length > 0) {
        return Promise.reject(new Error(`One of the files is larger than 100MB!`));
    }
    return Promise.resolve();
};

export const fileCountValidator = (maxLimit = 10, alreadyUploadedFilesLength = 0) => {
    return async (_: RuleObject, fileUpload: UploadFile[]) => {
        if (fileUpload.length + alreadyUploadedFilesLength > maxLimit) {
            return Promise.reject(new Error(`You can upload up to ${maxLimit} files!`));
        }
        return Promise.resolve();
    };
};

export const filesNameMaxLengthValidator = (maxLimit = 100) => {
    return async (_: RuleObject, fileUpload: UploadFile[]) => {
        const invalidFiles = fileUpload.filter((file) => file.name.length > maxLimit);

        if (invalidFiles.length > 0) {
            return Promise.reject(new Error(`One of the files has a name longer than ${maxLimit} characters!`));
        }

        return Promise.resolve();
    };
};

import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";

export const fileSizeLimit = 100000000; // 100MB
export const allowedTypes = [
    "video/mp4",
    "video/quicktime",
    "video/mpeg",
    "video/x-msvideo",
    "application/mxf",
    "video/prores",
    "video/webm",
    "video/x-flv",
    "video/ts",
    "video/x-ms-wmv",
    "video/hevc",
    "video/avchd",
    "video/3gpp",
];
export const normFile = (e: { fileList: UploadFile[] | RcFile[] }) => {
    return e?.fileList;
};

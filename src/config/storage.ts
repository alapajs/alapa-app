import {
  LocalStorageDriver,
  S3Driver,
  StorageConfiguration,
  StorageDriver,
} from "alapa";

const drivers: { [key: string]: StorageDriver } = {
  s3: new S3Driver(),
  local: new LocalStorageDriver(),
};

export const storage: StorageConfiguration = {
  driver: drivers[process.env.STORAGE_DRIVER || "local"],
  local: {
    path: process.env.LOCAL_STORAGE_PATH || "uploads",
  },
  s3: {
    endpoint: process.env.AWS_S3_ENDPOINT,
    region: process.env.AWS_REGION || "",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    bucket: process.env.AWS_S3_BUCKET || "",
  },
};

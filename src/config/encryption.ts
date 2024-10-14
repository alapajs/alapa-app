import { EncryptionCongratulation } from "alapa";

export const encryptionConfig: EncryptionCongratulation = {
  appEncryptionKey: "my-secret-encryption-key-1234567890abcdef", // Key for application-level encryption (must be 32 bytes for AES-256)
  appEncryptionAlgorithm: "aes-256-cbc", // Encryption algorithm
  appEncryptionIV: "my-initialization-vector", // Initialization vector for encryption (must be 16 bytes for AES-256-CBC)
};

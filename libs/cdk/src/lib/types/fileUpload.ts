export interface FileUpload {
  file: File | null;
  error?: boolean;
  path: string | null;
}

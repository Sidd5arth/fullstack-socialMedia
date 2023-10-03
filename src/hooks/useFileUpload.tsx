import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  "https://djstzjejdnfaizwrtinh.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc3R6amVqZG5mYWl6d3J0aW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwMDMzOTYsImV4cCI6MjAxMTU3OTM5Nn0.VkydOrueYpqOv1SNcs4XQzlQ9ausb6wh2KaQIGBZ2jk"
);

function useFileUpload() {
  const [uploadResponse, setUploadResponse] = useState<string>()
  const [isUploading, setIsUploading] = useState<boolean>()
  // Function to upload a file
  const uploadFile = async (
    bucketName: string,
    filePath: string,
    file: File
  ) => {
    try {
      setIsUploading(true);
      await supabase.storage
        .from(bucketName)
        .upload(filePath, file);
    } catch (error) {
      console.log(error)
    }

    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
      const link = data.publicUrl
      setUploadResponse(link);
      setIsUploading(false)
  };
  return { uploadFile, uploadResponse, isUploading };
}

export default useFileUpload;
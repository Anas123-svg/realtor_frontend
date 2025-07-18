import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import React from "react";

const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || "";
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`;

export default function VideosUploader({
  addedVideos,
  onChange,
  maxVideos = 3,
}: {
  addedVideos: string[];
  maxVideos: number;
  onChange: (videos: string[]) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const uploadSingleVideo = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(CLOUDINARY_UPLOAD_URL, data, {
      withCredentials: false,
    });

    return res.data.secure_url;
  };

  const validateFiles = (files: FileList) => {
    const MAX_VIDEOS = maxVideos;
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit for videos

    if (files.length + addedVideos.length > MAX_VIDEOS) {
      throw new Error(`You can only upload up to ${MAX_VIDEOS} videos`);
    }

    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_FILE_SIZE) {
        throw new Error("File size should not exceed 50MB");
      }
      if (!files[i].type.startsWith("video/")) {
        throw new Error("Uploaded file is not a video");
      }
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    try {
      const files = e.target.files;
      if (!files) return;

      validateFiles(files);

      const urls = await Promise.all(Array.from(files).map(uploadSingleVideo));

      toast.success("Video uploaded successfully");
      onChange([...addedVideos, ...urls]);
    } catch (error: any) {
      toast.error(error.message || "Error uploading video");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeVideo = (
    ev: React.MouseEvent<HTMLButtonElement>,
    videoUrl: string,
  ) => {
    ev.preventDefault();
    if (isUploading) {
      alert("Please wait until the upload is complete before removing videos.");
      return;
    }
    onChange(addedVideos.filter((video) => video !== videoUrl));
  };

  const selectAsMainVideo = (
    ev: React.MouseEvent<HTMLButtonElement>,
    videoUrl: string,
  ) => {
    ev.preventDefault();
    onChange([videoUrl, ...addedVideos.filter((video) => video !== videoUrl)]);
  };

  return (
    <div className="mt-2 w-full">
      <div className="flex flex-wrap gap-4">
        {addedVideos.length > 0 &&
          addedVideos.map((link) => (
            <div className="relative" key={link}>
              <video className="h-60 w-60 object-cover" src={link} controls />
              <button
                type="button"
                onClick={(ev) => removeVideo(ev, link)}
                className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-1 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={(ev) => selectAsMainVideo(ev, link)}
                className="absolute bottom-1 left-1 rounded-full bg-black bg-opacity-50 p-1 text-white"
              >
                {link === addedVideos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {link !== addedVideos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        {addedVideos.length < maxVideos && (
          <label
            className={`text-gray-600 flex h-60 w-60 cursor-pointer items-center justify-center border bg-transparent p-2 text-lg ${
              isUploading ? "animate-pulse" : ""
            }`}
          >
            <input
              type="file"
              multiple
              disabled={isUploading}
              className="hidden"
              accept="video/*"
              onChange={handleVideoUpload}
            />
            {!isUploading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            )}
            {isUploading ? "Uploading..." : "Upload"}
          </label>
        )}
      </div>
    </div>
  );
}

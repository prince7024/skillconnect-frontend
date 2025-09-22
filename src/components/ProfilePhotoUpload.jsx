import React, { useState, useEffect } from "react";
import API from "../api";
import { User, Upload, Loader2, X } from "lucide-react";
import { toast } from "sonner"; 

export default function ProfilePhotoUpload({ user, onUpdate }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(user?.profilePhoto || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview && !user?.profilePhoto) URL.revokeObjectURL(preview);
    };
  }, [preview, user?.profilePhoto]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await API.post("/user/uploadProfilePhoto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const photoURL = res.data.user.profilePhoto;
      setPreview(photoURL);
      if (onUpdate) onUpdate(photoURL);
      setFile(null);

      toast.success("Profile photo uploaded successfully 🎉"); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photo. Please try again ❌"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-lg group">
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <User className="w-14 h-14 text-gray-400" />
          </div>
        )}

        {/* Hover overlay */}
        <label
          htmlFor="file-upload"
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition"
        >
          <Upload className="text-white w-6 h-6" />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        {file && (
          <button
            onClick={() => {
              setFile(null);
              setPreview(user?.profilePhoto || "");
              toast.info("Upload canceled"); 
            }}
            className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700 flex items-center gap-1 text-sm"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
        )}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-4 py-1.5 rounded bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" /> Upload
            </>
          )}
        </button>
      </div>
    </div>
  );
}

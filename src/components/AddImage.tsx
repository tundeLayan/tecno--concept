import React, { ChangeEventHandler, useRef } from "react";

import { useDispatch } from "react-redux";

import { addImg } from "../Canvas";
import { DarkButton } from "./styles/Button";

export default function ImageUploadButton() {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgObj = new Image();
      imgObj.src = event.target?.result as string;
      // imgObj.style.objectFit = "cover";
      imgObj.onload = () => {
        dispatch(addImg(imgObj));
      };
    };

    if (e.target.files) {
      if (e.target.files[0].size > 5242880) {
        alert("File is too large!. Max file size is 5mb");
        return;
      }
      const file = e.target.files.item(0) as File;
      reader.readAsDataURL(file);
    }
  };

  return (
    <DarkButton
      variant={1}
      textSize="md"
      onClick={() => fileInputRef.current?.click()}
    >
      Add Image
      <input
        onChange={onFileChange}
        style={{ display: "none" }}
        ref={fileInputRef}
        type="file"
        max={1}
      />
    </DarkButton>
  );
}

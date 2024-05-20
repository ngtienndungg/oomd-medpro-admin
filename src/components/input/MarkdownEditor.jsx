import React, { memo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Typography } from "@mui/material";

const MarkdownEditor = ({
  label,
  value,
  setValue,
  nameKey,
  invalidFields,
  setInvalidFields,
  disabled,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography variant="label1">{label}</Typography>
      <Editor
        disabled={disabled}
        apiKey="xyi00zjbbx7nkmw3y5nbk6pcpp21ab7fmi2k6wnbqyph4im5"
        initialValue={value}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.getContent() }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small>
          {invalidFields?.find((el) => el.name === nameKey)?.mesage}
        </small>
      )}
    </Box>
  );
};
export default memo(MarkdownEditor);

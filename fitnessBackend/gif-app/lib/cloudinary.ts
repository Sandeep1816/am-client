export async function uploadToCloudinary(file: File) {
  const CLOUD_NAME = "dnh54zsmg"; // <--- replace this
  const PRESET = "product_uploads"; // <--- replace your preset

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", PRESET);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  return res.json();
}

from fastapi import UploadFile, HTTPException
from app.config.cloudinary_config import upload_image

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "gif", "png"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


async def save_upload_file(file: UploadFile) -> str:
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    file_extension = file.filename.split(".")[-1].lower()
    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File type not supported. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    file_content = await file.read()
    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size is {MAX_FILE_SIZE // (1024 * 1024)}MB"
        )

    url = upload_image(file_content)
    if not url:
        raise HTTPException(status_code=500, detail="Failed to upload image")

    return url

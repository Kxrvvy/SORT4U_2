import secrets
import string
from datetime import datetime, timedelta
from sqlalchemy.orm import Session


def generate_reset_token(user, db: Session) -> str:
    otp = ''.join(secrets.choice(string.digits) for _ in range(6))
    user.reset_password_token = otp
    user.reset_password_expires = datetime.now() + timedelta(minutes=15)
    db.commit()
    return otp


def verify_and_reset(user, otp: str) -> bool:
    if not user.reset_password_token:
        return False
    if str(user.reset_password_token).strip() != str(otp).strip():
        return False
    if datetime.now() > user.reset_password_expires:
        return False
    return True

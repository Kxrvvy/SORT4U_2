import resend
import os

resend.api_key = os.getenv("RESEND_API_KEY")

def send_reset_email(user_email: str, otp_code: str):
    resend.Emails.send({
        "from": "SORT4U <onboarding@resend.dev>",
        "to": [user_email],
        "subject": "Password Reset Request",
        "text": f"""You requested a password reset.

Your verification code is: {otp_code}

This code will expire in 15 minutes.
"""
    })

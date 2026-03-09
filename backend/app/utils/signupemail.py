import resend
import os

resend.api_key = os.getenv("RESEND_API_KEY")

def send_verify_email(user_email: str, otp_code: str):
    resend.Emails.send({
        "from": "SORT4U <onboarding@resend.dev>",
        "to": [user_email],
        "subject": "Verify Your SORT4U Account",
        "text": f"""Welcome to SORT4U!

Your email verification code is: {otp_code}

This code will expire in 10 minutes.

If you did not create an account, please ignore this email.
"""
    })

import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_verify_email(user_email: str, otp_code: str):
    message = Mail(
        from_email="sort4uu@gmail.com",
        to_emails=user_email,
        subject="Verify Your SORT4U Account",
        plain_text_content=f"""Welcome to SORT4U!

Your email verification code is: {otp_code}

This code will expire in 10 minutes.

If you did not create an account, please ignore this email.
"""
    )
    sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
    sg.send(message)

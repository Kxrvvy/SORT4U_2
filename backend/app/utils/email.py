import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_reset_email(user_email: str, otp_code: str):
    message = Mail(
        from_email="sort.four.u@gmail.com",
        to_emails=user_email,
        subject="Password Reset Request",
        plain_text_content=f"""You requested a password reset.

Your verification code is: {otp_code}

This code will expire in 15 minutes.
"""
    )
    sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
    sg.send(message)

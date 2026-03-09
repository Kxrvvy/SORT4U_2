import smtplib
from email.message import EmailMessage


def send_verify_email(user_email: str, otp_code: str):
    smtp_server = "smtp.gmail.com"
    smtp_port = 465
    sender_email = "sort4uu@gmail.com"
    sender_password = "lydz kuzd acra fbsl".replace(" ", "")

    msg = EmailMessage()
    msg['Subject'] = 'Verify Your SORT4U Account'
    msg['From'] = sender_email
    msg['To'] = user_email

    msg.set_content(f"""
Welcome to SORT4U!

Your email verification code is: {otp_code}

This code will expire in 10 minutes.

If you did not create an account, please ignore this email.
""")

    with smtplib.SMTP_SSL(smtp_server, smtp_port) as smtp:
        smtp.login(sender_email, sender_password)
        smtp.send_message(msg)

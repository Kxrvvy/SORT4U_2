''' SENDGRID CODE IF EVER YOU WANT TO CHANGE THIS BACK
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_verify_email(user_email: str, otp_code: str):
    message = Mail(
        from_email="sort.four.u@gmail.com",
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
'''


import os
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

def send_verify_email(user_email: str, otp_code: str):
    """
    Send OTP verification email using Brevo (Sendinblue)
    """
    try:
        # Configure Brevo API
        configuration = sib_api_v3_sdk.Configuration()
        configuration.api_key['api-key'] = os.getenv("BREVO_API_KEY")
        
        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
        
        # Email content
        subject = "Verify Your SORT4U Account"
        sender = {
            "name": os.getenv("BREVO_FROM_NAME", "SORT4U"),
            "email": os.getenv("BREVO_FROM_EMAIL", "sort.four.u@gmail.com")
        }
        to = [{"email": user_email}]
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background-color: #4a5568;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }}
                .content {{
                    background-color: white;
                    padding: 30px;
                    border-radius: 0 0 5px 5px;
                }}
                .otp {{
                    font-size: 32px;
                    font-weight: bold;
                    color: #4a5568;
                    text-align: center;
                    letter-spacing: 8px;
                    padding: 20px;
                    background-color: #f7fafc;
                    border-radius: 5px;
                    margin: 20px 0;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>SORT4U</h1>
                </div>
                <div class="content">
                    <h2>Welcome to SORT4U!</h2>
                    <p>Thank you for signing up. Please use the following OTP to verify your email address:</p>
                    <div class="otp">{otp_code}</div>
                    <p>This OTP will expire in 10 minutes.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2026 SORT4U. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Create email
        send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
            to=to,
            html_content=html_content,
            sender=sender,
            subject=subject
        )
        
        # Send email
        api_response = api_instance.send_transac_email(send_smtp_email)
        print(f"Email sent successfully to {user_email}. Message ID: {api_response.message_id}")
        return True
        
    except ApiException as e:
        print(f"Brevo API Exception: {e}")
        return False
    except Exception as e:
        print(f"Failed to send verification email: {str(e)}")
        return False

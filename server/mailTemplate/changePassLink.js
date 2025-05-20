require('dotenv').config(); // at the top of your entry file

const changePassLink = (token, name,email) => {
    
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="${process.env.REACT_URL}"><img class="logo"
					src="${process.env.APP_LOGO}" alt="theSlipStitch Logo"></a>
            <div class="message">Reset Password</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>To reset password click 
                <span class="highlight">${token}</span>.
                </p>
                <p>If you did not request for password change, kindly ignore it.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:${email}">${email}</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};

module.exports = changePassLink;
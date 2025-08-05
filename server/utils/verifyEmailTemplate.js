const verifyEmailTemplate = ({ name, url }) => {
    return `
    <p>Dear ${name},</p>    
    <p>Thank you for registering on Binkeyit.</p>   
    <a href="${url}" style="color:black; background: orange; margin-top: 10px; padding: 10px; display: block; text-decoration: none;">
        Verify Email
    </a>
    `;
};

export default verifyEmailTemplate;

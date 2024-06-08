
function CheckUser(token)
{
 
    function parseJwt(token) {
        // Split the token into header, payload, and signature
       
        const [headerBase64, payloadBase64] = token.split('.');
   
        // Decode the base64Url-encoded header and payload
        const decodedHeader = JSON.parse(window.atob(headerBase64));
        const decodedPayload = JSON.parse(window.atob(payloadBase64));
   
        // Return the decoded payload
        return decodedPayload;
    }
    // Example usage
     // Replace with your actual JWT token  
    const decodedClaims = parseJwt(token);  
    const roles = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    const role = decodedClaims[roles]; // { exp: 10012016, name: 'john doe', scope: ['admin'] }
   
    return role;
   
}
 
export default CheckUser;
 
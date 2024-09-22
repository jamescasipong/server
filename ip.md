Your approach to preventing access based on IP addresses is fundamentally functional, but there are a few important considerations and potential improvements to make it more secure and efficient.

### Key Considerations:

1. **Client-Side IP Restriction**: 
   - Relying on client-side code to restrict access based on IP addresses is not secure. A determined user can bypass these checks since JavaScript can be modified or disabled in the browser.

2. **IP Address Changes**:
   - IP addresses can change, and users may connect from different locations. Hardcoding IP addresses may lead to unintended lockouts.

3. **Server-Side Validation**:
   - It's generally better to enforce IP restrictions on the server side. Use middleware on your server to check the incoming request's IP address and respond accordingly.

4. **Performance**:
   - Continuously fetching the IP address in the frontend can create unnecessary overhead. It might be more efficient to fetch the user's IP once and cache it if needed.

### Recommended Approach:

1. **Move IP Check to Server**:
   - Implement your IP address check on the server-side. If a user attempts to access your API or website from a disallowed IP, respond with an appropriate HTTP status code (e.g., 403 Forbidden).

2. **Use a Reverse Proxy**:
   - If using a reverse proxy (like Nginx or Cloudflare), ensure that you check the real IP of the user. Sometimes, proxies can obscure the original IP.

3. **Implement Rate Limiting**:
   - To protect against abuse, consider implementing rate limiting in addition to IP checks.

### Example Server-Side Code Snippet (Node.js/Express):

```javascript
const express = require('express');
const app = express();

const allowedIPs = ['124.83.41.231', '152.32.99.73'];

app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (!allowedIPs.includes(ip)) {
    return res.status(403).send('Access denied');
  }
  next();
});

// Define your routes
app.get('/api/dataRoute/ip', (req, res) => {
  res.json({ ip: req.ip });
});

// Start the server
app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
```

### Conclusion:

By moving IP validation to the server and ensuring you use proper security measures, you can provide a much more robust solution for controlling access to your website. If you're building a production application, always prioritize server-side checks for security.
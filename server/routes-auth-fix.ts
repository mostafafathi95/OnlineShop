// Add this to server/routes.ts - Auth middleware fix
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    // Store token info in request
    (req as any).authToken = token;
  }
  next();
});

// Also add logout endpoint
app.post("/api/logout", (req, res) => {
  res.json({ success: true });
});

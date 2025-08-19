/* Centralized error handling */
export function notFound(req, res, next){
  res.status(404).json({ error: "Route not found" });
}

export function errorHandler(err, req, res, next){
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
}
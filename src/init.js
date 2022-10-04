import "dotenv/config";
import "./db";
import "./model/User";
import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Server is listening to port ${PORT}`);

app.listen(PORT, handleListening);

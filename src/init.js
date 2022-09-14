import "./db";
import "./model/User";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server is listening to port ${PORT}`);

app.listen(PORT, handleListening);

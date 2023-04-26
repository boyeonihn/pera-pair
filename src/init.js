// initialize everything
import 'dotenv/config';

console.log(process.env.DB_URL);
import './db';
import './models/Video';
import './models/User';
import app from './server';

const PORT = 4000;

const handleListening = () => {
  console.log(`I am listening maintenant on localhost:${PORT}`);
};
app.listen(PORT, handleListening);

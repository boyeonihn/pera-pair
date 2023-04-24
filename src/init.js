// initialize everything
import './db';
import './models/Video';
import './models/User';
import app from './server';

const PORT = 4000;

const handleListening = () => {
  console.log(`I am listening maintenant on localhost:${PORT}`);
};
app.listen(PORT, handleListening);

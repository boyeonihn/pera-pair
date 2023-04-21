import mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1:27017/wetube'; // url slash db name

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log('Connected to DB ✅');
db.on('error', (error) => console.log('DB Error', error));
db.once('open', handleOpen);

// const url =
//   'mongodb+srv://boyeonihn:mongodbBYC3Kong!@cluster0.fw9bz72.mongodb.net/wetube?retryWrites=true&w=majority';
// const connectDB = async () => {
//   try {
//     const conn = await mongoose
//       .connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then((m) => {
//         m.connection.getClient();
//         console.log(`MongoDB Connected: at ${m.connection.host}`);
//       });
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// connectDB();

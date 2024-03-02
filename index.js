import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();

import app from './app.js'


const port = process.env.PORT;

const DB = process.env.DATABASE_LOCAL;

// For connecting to database
connect(DB, {
	// useNewUrlParser: true,
	// useUnifiedTopology: true
}).then(() => {
	console.log("DB connection successful");
})

app.listen(port, function(){
    console.log('server running on localhost: ' + port);
})
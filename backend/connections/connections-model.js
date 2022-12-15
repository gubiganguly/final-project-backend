import mongoose from 'mongoose';
import connectionSchema from './connections-schema.js';

const connectionsModel = mongoose
              .model('ConnectionModel', connectionSchema);
export default connectionsModel; 
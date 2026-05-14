import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: String,
  department: String,
  type: String,
  location: String,
  experience: String,
  description: String,
  aboutRole: String,
  responsibilities: String,
  requirements: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Job', jobSchema);

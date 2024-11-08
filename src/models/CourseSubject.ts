import mongoose from 'mongoose';

const courseSubjectSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  subjects: [{
    type: String,
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for unique course-semester combinations
courseSubjectSchema.index({ course: 1, semester: 1 }, { unique: true });

// Update the updatedAt timestamp on save
courseSubjectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.CourseSubject || mongoose.model('CourseSubject', courseSubjectSchema);
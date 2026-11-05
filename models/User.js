const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  // --- Identity & Authentication ---

  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minLength: [2, 'Full name must be at least 2 characters'],
    maxLength: [50, 'Full name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  githubHandle: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    sparse: true,
  },
  avatarUrl: {
    type: String,
    trim: true,
  },
  authProvider: {            
    type: String,
    required: true,
    enum: ['github', 'google'],
    default: 'github',
  },

  // ----- Discovery & Matchmaking -----

  status: {
    type: String,
    enum: ['onboarding_pending', 'available', 'in_team', 'inactive'],
    default: 'onboarding_pending'
  },
  primaryRole: {
    type: String,
    enum: ['Fullstack', 'Backend', 'Frontend', 'QA / Automation', 'DevOps']
  },
  skillLevel:{
    type: String,
    enum: ['Novice','Builder','Advanced'],
    default: 'Novice',
  },

  techStack: {
    type: [{type:String, trim:true, lowercase: true}],
    validate: {
      validator: function (val) {
        if (!val || val.length === 0) return true;
        return val.length >= 1 && val.length <= 15;
      },
      message: 'Tech stack can contain up to 15 technologies.', 
    },
  },
  weeklyHours: {
    type: Number,
    min: 3,
    max: 45,
  },
  workStyle: {
    type: String,
    enum: ['Async', 'Sync','Hybrid'],
    default: 'Hybrid',
  },
  currentTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    default: null,
  },

// ---- Reputation & Proof Engine ----

  reputationScore: {
    type: Number,
    min: 0,
    default: 100,
  },
  metrics: {
    commits: {type: Number, min: 0, default: 0} ,
    mergedPRs: {type: Number, min: 0, default: 0} ,
    codeReviews: {type: Number, min: 0, default: 0} ,
    completedTeams: {type: Number, min: 0, default: 0} , 
  },
  lastActiveAt: {
    type: Date,
  },

  // ---- Live Code Certificate ----

  planTier: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free',
  },
  certification: {
    isCertified: {
      type: Boolean, default: false
    },
    track: {
      type: String,
      enum: ['none','community_merit','premium_verified'],
      default: 'none'
    },
    badgeTier:{
      type: String,
      enum: ['None','Bronze','Silver','Gold'],
      default: 'None',
    },
    verifiedAt: {type: Date, default: null },
  },
},{timestamps: true});

// ---- Options & Indexing ----

userSchema.index({
  status: 1,
  primaryRole: 1,
  'certification.isCertified': -1,
  reputationScore: -1,
});

module.exports = mongoose.model('User', userSchema);

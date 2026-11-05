const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    // ---- 1. Metadata ----
    name: {
      type: String,
      required: [true, 'Team name is required'],
      unique: true,
      trim: true,
      minLength: [3, 'Team name must be at least 3 characters'],
      maxLength: [40, 'Team name cannot exceed 40 characters'],
    },
    description: {
      type: String,
      required: [true, 'Team description is required'],
      trim: true,
      maxLength: [500, 'Description cannot exceed 500 characters'],
    },
    techStack: {
      type: [
        {
          type: String,
          lowercase: true,
          trim: true,
        },
      ],
      validate: {
        validator: function (val) {
          if (!val || val.length === 0) return true;
          return val.length >= 1 && val.length <= 10;
        },
        message: 'Tech stack can contain up to 10 technologies.',
      },
    },
    status: {
      type: String,
      enum: ['recruiting', 'active', 'graduated', 'archived'],
      default: 'recruiting',
    },

    // ---- 2. GitHub Infrastructure (New repos & Forks) ----
    github: {
      repoName: {
        type: String,
        required: [true, 'GitHub repository name is required'],
        trim: true,
        lowercase: true,
      },
      repoUrl: {
        type: String,
        required: [true, 'GitHub repository URL is required'],
        trim: true,
      },
      isFork: {
        type: Boolean,
        default: false,
      },
      originalRepoUrl: {
        type: String,
        trim: true,
        default: null,
      },
    },

    // ---- 3. Members & Roles ----
    members: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required for team member'],
          },
          roleInTeam: {
            type: String,
            required: [true, 'Role in team is required'],
            enum: [
              'Frontend',
              'Backend',
              'Fullstack',
              'QA / Automation',
              'DevOps',
              'Team Lead',
            ],
          },
          joinedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      validate: {
        validator: function (val) {
          return val.length <= 5;
        },
        message: 'A team cannot have more than 5 members.',
      },
    },

    // ---- 4. Proof & Activity Metrics ----
    metrics: {
      totalCommits: {
        type: Number,
        min: 0,
        default: 0,
      },
      totalPRs: {
        type: Number,
        min: 0,
        default: 0,
      },
      weeklyCommitTarget: {
        type: Number,
        min: 1,
        default: 10,
      },
      lastActivityAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true,
  }
);

// ---- 5. Compound Indexing for Fast Discovery ----
teamSchema.index({
  status: 1,
  techStack: 1,
  'metrics.lastActivityAt': -1,
});

module.exports = mongoose.model('Team', teamSchema);
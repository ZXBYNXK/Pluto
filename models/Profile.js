// MODEL: Profile.js

// Import mongoose & start creating the schemas the schema.
const { Schema, model } = require("mongoose"),
  ProfileSchema = new Schema({
    //

    // This references a objectId from a User Model
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    // If user owns a website.
    website: {
      type: String,
    },

    // Location of user
    location: {
      type: String,
    },

    // User bio
    bio: {
      type: String,
    },

    // Newbie, Junior, Senior
    status: {
      type: String,
      required: true,
    },

    // Skills Javascript, Python, Java, Angular, Kubernetes...
    skills: {
      type: [String],
      required: true,
    },

    // User's job history or other types of exepericence
    experience: [
      {
        // job title
        title: {
          type: String,
        },
        // Employer name
        company: {
          type: String,
          required: true,
        },

        // Location of place of employment
        location: {
          type: String,
        },

        // Time from and to of time working for employer
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,
          required: true,
        },

        // Current is if the User currently works for this employer
        current: {
          type: Boolean,
          default: false,
        },

        // Job description
        description: {
          type: String,
        },
      },
    ],

    // User's education
    education: [
      {
        // Name of school
        school: {
          type: String,
          required: true,
        },

        // Masters, Bacholers, Asscociates, Certificates, etc..
        degree: {
          type: String,
          required: true,
        },

        // What did the user go school for or took a course for.
        fieldofstudy: {
          type: String,
        },

        // How long did the user attend school for.
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,
          required: true,
        },

        // If still attending school
        current: {
          type: Boolean,
          default: false,
        },

        //  Description a user may want to add.
        description: {
          type: String,
        },
      },
    ],

    // User's social media links.
    social: {
      facebook: {
        type: String,
      },
      twitter: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      youtube: {
        type: String,
      },
    },

    // User's github username
    githubusername: {
      type: String,
    },
    date: {
        type: Date,
        default: Date.now,
      },
  });

module.exports = model("Profile", ProfileSchema);

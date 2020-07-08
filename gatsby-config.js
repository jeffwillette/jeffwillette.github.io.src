module.exports = {
  plugins: [
    `gatsby-plugin-top-layout`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 940,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: 'gatsby-remark-katex',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-27984437-10',
      },
    },
  ],
  siteMetadata: {
    title: `Jeff Willette`,
    description: `Jeff Willette's blog`,
    keywords: 'Jeff Willette,jeffwillette.github.io',
    author: 'Jeff Willette',
    twitter: 'https://twitter.com/delta_skelta',
    github: 'https://github.com/jeffwillette',
    githubProjectName: 'jeffwillette.github.io.src', // this must be the same as the directory name on file
    githubBranchPrefix: '/tree/dev',
    resume: {
      basics: {
        name: 'Jeff Willette',
        label: 'Machine Learning Researcher',
        // picture: '',
        // email: 'erlich@piedpiper.com',
        // phone: '1 (912) 555-4321',
        website: 'https://jeffwillette.github.io',
        summary: 'Machine Learning / Artificial Intelligence Researcher',
        location: {
          address: '2712 Broadway St',
          postalCode: '94115',
          city: 'San Francisco',
          countryCode: 'USA',
          region: 'California',
        },
        profiles: [
          {
            network: 'GitHub',
            username: 'jeffwillette',
            url: 'https://www.github.com.com/jeffwillette',
          },
          {
            network: 'Twitter',
            username: 'TheOneJeffrey',
            url: 'https://twitter.com/TheOneJeffrey',
          },
        ],
      },
      work: [
        {
          company: 'Machine Learning and Artificial Intelligence Lab',
          position: 'Researcher',
          website: 'http://mlai-kaist.com',
          startDate: '2019-08',
          endDate: 'Present',
          summary:
            'Performed machine learning research into probabilistic neural networks, probability calibration, meta learning',
          highlights: ['Student', 'Calibration', 'Meta Learning'],
        },
        {
          company: 'Hamstead English School',
          position: 'Teacher',
          // website: 'http://piedpiper.com',
          startDate: '2016-04',
          endDate: '2019-08',
          summary: 'Taught elementary through high school English lessons',
          highlights: ['Teaching'],
        },
        {
          company: 'Daejeon International Marketing High School',
          position: 'Teacher',
          // website: 'http://piedpiper.com',
          startDate: '2013-02',
          endDate: '2016-02',
          summary: 'Taught high school English lessons',
          highlights: ['Teaching'],
        },
      ],
      volunteer: [
        {
          organization: 'Andre House',
          position: 'volunteer',
          website: 'http://andrehouse.org',
          startDate: '2010-05',
          endDate: '2013-02',
          summary: 'Prepared meals in the kitchen as part of a Kiwanis international volunteer group.',
          highlights: ['volunteering'],
        },
      ],
      education: [
        {
          institution: 'Korea Advanced Institute of Science and Technology',
          area: 'Computer Science',
          studyType: 'M.S. (in progress)',
          startDate: '2019-08',
          endDate: 'Present',
          gpa: '4.0',
          courses: ['computer science', 'artificial intelligence', 'machine learning'],
        },
        {
          institution: 'Arizona State University',
          area: 'Business',
          studyType: 'B.A.',
          startDate: '2006-08',
          endDate: '2010-05',
          gpa: '3.2',
          courses: ['accounting', 'economics', 'finance'],
        },
      ],
      awards: [
        {
          title: 'CEO of the month',
          date: '2007-11-01',
          awarder: 'Aviato',
          summary: 'Awarded CEO of the month for excelling at "CEO-ly duties and outperforming all expectations"',
        },
        {
          title: '3 months clean',
          date: '2017-02',
          awarder: 'Narcotics Anonymous',
          summary: 'Awarded 3 months clean for quitting an opium-den habit',
        },
      ],
      publications: [
        {
          name: 'Is Erlich Bachman the Dumbest Man in Tech',
          publisher: 'Coderag',
          releaseDate: '2016-06-22',
          website: 'http://www.coderag.com/is-erlich-bachman-the-dumbest-man-in-tech/',
          summary: 'CJ Cantwells feature of Erlich Bachman',
        },
      ],
      skills: [
        {
          name: 'Python',
          level: '95',
          keywords: [
            'Managing Subordinates: At [pied](./) piper we strived to meet all of our incubator needs',
            'Evicting Jian Yang',
          ],
        },
        {
          name: 'Hex Arithmetic',
          level: '90',
          keywords: ['9 * F = fleventy-five'],
        },
        {
          name: 'Web Development',
          level: '37',
          keywords: ['HTML', 'CSS', 'Javascript'],
        },
        {
          name: 'Hydroponic Horticulture',
          level: '75',
          keywords: ["Garage Gardening: experienced at producing top quality 'produce'"],
        },
        {
          name: 'Style',
          level: '60',
          keywords: [
            "Clothes: black turtlenecks to maximize 'jobbiness'",
            'Kimonos: To assert power and relay awesomeness',
          ],
        },
        {
          name: 'Negotiation',
          level: '45',
          keywords: ['Aggressive: Aggressive negotiation is they key to getting what you want'],
        },
        {
          name: 'Making Mistakes',
          level: '30',
          keywords: ['1993: I made a mistake by thinking that I made a mistake'],
        },
        {
          name: 'Being Lame',
          level: '15',
          keywords: ['Jian Yang: This only happens when listening to his recipe for octupu'],
        },
        {
          name: 'Losing',
          level: '5',
          keywords: ['Kickball: I lost a kickball game once in elementary school'],
        },
      ],
      languages: [
        {
          name: 'English',
          level: 'Native speaker',
        },
        {
          name: 'Hexadecimal',
          level: 'Veteran',
        },
        {
          name: 'Spanish',
          level: 'Intermediate',
        },
      ],
      interests: [
        {
          name: 'Wildlife',
          keywords: [
            'Ferrets: More of a hatred than an interest, ferrets are  detrimental to society and any neighbors who would dare to keep them among people are evil',
            'California Varmint Laws: California penal code says that is is illegal to keep ferrets',
          ],
        },
        {
          name: 'Japanese Culture',
          keywords: [
            '切腹: the act of falling on ones sword in shame',
            'おみやげ: giving of gifts to incubees and other people who have earned my respect',
          ],
        },
      ],
      references: [
        {
          name: 'Jian Yang',
          reference: "I do not respect you. You're not any kind of investor, you own nothing",
        },
        {
          name: 'Jian Yang',
          reference: "Erlich Bachman...This is you as and old man. I'm ugly and I'm dead. Alone",
        },
        {
          name: 'CJ Cantwell',
          reference:
            'Bachman recently founded venture capital firm Bachmanity Capital with tech icon (soon to be legend, I’m sure) Nelson “Big Head” Bighetti, and the pair hosted a lavish launch event, aptly titled “Bachmanity Insanity.” The party, like Bachman, was loud, extravagant and a bit of a farce. It was a luau. At Alcatraz. One for which Bachman chose to pay for all liquor at retail cost, and one where he lost a giant fiberglass Tiki head at the bottom of the bay. The expenses for fire dancers, flair bartenders and exotic caterers totaled over $1 million. Bachman maintains these were “practical costs for any groundbreaking business.”',
        },
        {
          name: 'CJ Cantwell',
          reference:
            'Bachmanity burned too bright, like the custom lighting at its luau and, like that lighting, the bulb burned out.',
        },
      ],
    },
  },
};

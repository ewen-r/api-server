/* eslint-disable no-useless-escape */
/*
  © Copyright 2023-2023 E Reynolds, Inc. All rights reserved.

  This program is confidential and proprietary to E Reynolds, and
    may not be copied, reproduced, modified, disclosed to others, published or used,
    in whole or in part, without the express prior written permission.
*/

/* spellchecker: disable */

/** Dummy data. */
export const quotesTestData = [
  {
    "id": 1,
    "quote": "Life isn’t about getting and having, it’s about giving and being.",
    "author": "Kevin Kruse"
  },
  {
    "id": 2,
    "quote": "Whatever the mind of man can conceive and believe, it can achieve.",
    "author": "Napoleon Hill"
  },
  {
    "id": 3,
    "quote": "Strive not to be a success, but rather to be of value.",
    "author": "Albert Einstein"
  },
  {
    "id": 4,
    "quote": "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
    "author": "Robert Frost"
  },
  {
    "id": 5,
    "quote": "I attribute my success to this: I never gave or took any excuse.",
    "author": "Florence Nightingale"
  },
  {
    "id": 6,
    "quote": "You miss 100% of the shots you don’t take.",
    "author": "Wayne Gretzky"
  },
  {
    "id": 7,
    "quote": "The way to get started is to quit talking and begin doing.",
    "author": "Walt Disney"
  },
  {
    "id": 8,
    "quote": "The most difficult thing is the decision to act, the rest is merely tenacity.",
    "author": "Amelia Earhart"
  },
  {
    "id": 9,
    "quote": "Every strike brings me closer to the next home run.",
    "author": "Babe Ruth"
  },
  {
    "id": 10,
    "quote": "Definiteness of purpose is the starting point of all achievement.",
    "author": "W. Clement Stone"
  },
  {
    "id": 11,
    "quote": "We must balance conspicuous consumption with conscious capitalism.",
    "author": "Kevin Kruse"
  },
  {
    "id": 12,
    "quote": "Life is what happens to you while you’re busy making other plans.",
    "author": "John Lennon"
  },
  {
    "id": 13,
    "quote": "We become what we think about.",
    "author": "Earl Nightingale"
  },
  {
    "id": 14,
    "quote": "When you reach the end of your rope, tie a knot in it and hang on.",
    "author": "Franklin D. Roosevelt"
  },
  {
    "id": 15,
    "quote": "Life is 10% what happens to me and 90% of how I react to it.",
    "author": "Charles Swindoll"
  },
  {
    "id": 16,
    "quote": "The most common way people give up their power is by thinking they don’t have any.",
    "author": "Alice Walker"
  },
  {
    "id": 17,
    "quote": "The mind is everything. What you think you become.",
    "author": "Buddha"
  },
  {
    "id": 18,
    "quote": "The best time to plant a tree was 20 years ago. The second best time is now.",
    "author": "Chinese Proverb"
  },
  {
    "id": 19,
    "quote": "An unexamined life is not worth living.",
    "author": "Socrates"
  },
  {
    "id": 20,
    "quote": "Eighty percent of success is showing up.",
    "author": "Woody Allen"
  },
  {
    "id": 21,
    "quote": "Your time is limited, so don’t waste it living someone else’s life.",
    "author": "Steve Jobs"
  },
  {
    "id": 22,
    "quote": "Winning isn’t everything, but wanting to win is.",
    "author": "Vince Lombardi"
  },
  {
    "id": 23,
    "quote": "I am not a product of my circumstances. I am a product of my decisions.",
    "author": "Stephen Covey"
  },
  {
    "id": 24,
    "quote": "Every child is an artist.  The problem is how to remain an artist once he grows up.",
    "author": "Pablo Picasso"
  },
  {
    "id": 25,
    "quote": "You can never cross the ocean until you have the courage to lose sight of the shore.",
    "author": "Christopher Columbus"
  },
  {
    "id": 26,
    "quote": "Always remember that you are absolutely unique. Just like everyone else.",
    "author": "Margaret Mead"
  },
  {
    "id": 27,
    "quote": "Either you run the day, or the day runs you.",
    "author": "Jim Rohn"
  },
  {
    "id": 28,
    "quote": "Whether you think you can or you think you can’t, you’re right.",
    "author": "Henry Ford"
  },
  {
    "id": 29,
    "quote": "Be yourself; everyone else is already taken.",
    "author": "Oscar Wilde"
  },
  {
    "id": 30,
    "quote": "Whatever you can do, or dream you can, begin it.  Boldness has genius, power and magic in it.",
    "author": "Johann Wolfgang von Goethe"
  }
];



/** Dev use only
  * @ignore */
const originator1 = {
  username: 'Ewen Reynolds',
  createDate: '22-Aug-2023',
  modifyDate: ''
};

/** Dev use only
  * @ignore */
const originator2 = {
  username: 'Kay Reynolds',
  createDate: '2-Jun-2020',
  modifyDate: '13-Aug-2021'
};

/** Dev use only
  * @ignore */
const questionTF01 = {
  uuid: 'questionTF01',
  originatorInfo: originator1,
  topic: 'sport',
  questionType: 'True or False',
  difficulty: 'Easy',
  statement: 'True or false.. Nick Faldo is a famous golfer?',
  multiChoiceOptions: [
    'true', 'false'
  ],
  answer: {
    match: 'true',
    statement: 'He is one of England\'s most successful golfers.'
  }
};

/** Dev use only
  * @ignore */
const questionTF02 = {
  uuid: 'questionTF02',
  originatorInfo: originator2,
  topic: 'general knowledge',
  questionType: 'True or False',
  difficulty: 'Easy',
  statement: 'True or false.. The sky is purple with green spots?',
  multiChoiceOptions: [
    'true', 'false'
  ],
  answer: {
    match: 'false',
    statement: 'Of course it isn\'t... everyone knows it\'s purple with YELLOW spots 😆'
  }
};

/** Dev use only
  * @ignore */
const questionTF03 = {
  uuid: 'questionTF03',
  originatorInfo: originator2,
  topic: 'general knowledge',
  questionType: 'True or False',
  difficulty: 'Easy',
  statement: 'True or false.. I am amazing?',
  multiChoiceOptions: [
    'true', 'false'
  ],
  answer: {
    match: 'true',
    statement: '.. and also extremely modest.'
  }
};

/** Dev use only
  * @ignore */
const questionTF04 = {
  uuid: 'questionTF04',
  originatorInfo: originator1,
  topic: 'Movies',
  questionType: 'True or False',
  difficulty: 'Easy',
  statement: 'True or false.. Mrs. Robinson in The Graduate was played by Anne Bancroft?',
  multiChoiceOptions: [
    'true', 'false'
  ],
  answer: {
    match: 'true',
    statement: ''
  }
};

/** Dev use only
  * @ignore */
const questionTF05 = {
  uuid: 'questionTF05',
  originatorInfo: originator1,
  topic: 'Movies',
  questionType: 'True or False',
  difficulty: 'Easy',
  statement: "True or false.. The name of the skyscraper in Die Hard is \"The Nakatomi Towers\"",
  multiChoiceOptions: [
    'true', 'false'
  ],
  answer: {
    match: 'false',
    statement: "It was \"Nakatomi Plaza\""
  }
};

/** Dev use only
  * @ignore */
const questionMultipleChoice01 = {
  uuid: 'questionMultipleChoice01',
  originatorInfo: originator1,
  topic: 'Science',
  questionType: 'Multiple Choice',
  difficulty: 'Difficult',
  statement: 'Which metal was discovered by Hans Christian Oersted?',
  multiChoiceOptions: [
    'Iron', 'Magnesium', 'Zinc', 'Aluminium'
  ],
  answer: {
    match: 'Aluminium',
    statement: 'It was discovered in 1825.'
  }
};

/** Dev use only
  * @ignore */
const questionMultipleChoice02 = {
  uuid: 'questionMultipleChoice02',
  originatorInfo: originator2,
  topic: 'Science',
  questionType: 'Multiple Choice',
  difficulty: 'Difficult',
  statement: 'Which year was the first Tonka truck made?',
  multiChoiceOptions: [
    '1945', '1947', '1949'
  ],
  answer: {
    match: '1947',
    statement: ''
  }
};

/** Dev use only
  * @ignore */
const questionMultipleChoice03 = {
  uuid: 'questionMultipleChoice03',
  originatorInfo: originator1,
  topic: 'History',
  questionType: 'Multiple Choice',
  difficulty: 'Medium',
  statement: 'Which year marked the beginning of the French revolution?',
  multiChoiceOptions: [
    '1689', '1789', '1889'
  ],
  answer: {
    match: '1789',
    statement: ''
  }
};

/** Dev use only
  * @ignore */
const questionMultipleChoice04 = {
  uuid: 'questionMultipleChoice04',
  originatorInfo: originator1,
  topic: 'history',
  questionType: 'Multiple Choice',
  difficulty: 'Easy',
  statement: 'Who was British Prime Minister during the Falklands war?',
  answer: {
    match: 'Margaret Thatcher',
    statement: ''
  },
  multiChoiceOptions: [
    'Tony Blair', 'Margaret Thatcher', 'Gordon Brown'
  ]
};

/** Dev use only
  * @ignore */
const questionMultipleChoice05 = {
  uuid: 'questionMultipleChoice05',
  originatorInfo: originator1,
  topic: 'Movies',
  questionType: 'Multiple Choice',
  difficulty: 'Easy',
  statement: 'Which 1982 film was greatly accepted for its portrayal of the love between a young,'
    + ' fatherless suburban boy and a lost, benevolent and homesick visitor from another planet?',
  answer: {
    match: 'E. T. The Extra-Terrestrial',
    statement: ''
  },
  multiChoiceOptions: [
    'E. T. The Extra-Terrestrial', 'Rocky', 'The Wizard of Oz', 'Predator'
  ]
};

/** Dev use only
  * @ignore */
const questionMultipleChoice06 = {
  uuid: 'questionMultipleChoice06',
  originatorInfo: originator1,
  topic: 'Movies',
  questionType: 'Multiple Choice',
  difficulty: 'Easy',
  statement: 'In The Matrix, does Neo take the blue pill or the red pill?',
  answer: {
    match: 'Red',
    statement: "\"You take the blue pill – the story ends, you wake up in your bed and believe whatever you want to believe."
      + " You take the red pill – you stay in Wonderland, and I show you how deep the rabbit hole goes.\""
  },
  multiChoiceOptions: [
    'Red', 'Blue'
  ]
};

/** Dev use only
  * @ignore */
const questionMultipleChoice07 = {
  uuid: 'questionMultipleChoice07',
  originatorInfo: originator1,
  topic: 'Movies',
  questionType: 'Multiple Choice',
  difficulty: 'Easy',
  statement: 'Who played Juror Number 8 in 12 Angry Men?',
  answer: {
    match: 'Henry Fonda',
    statement: ''
  },
  multiChoiceOptions: [
    'Dustin Hoffman', 'Henry Fonda', 'Robert Redford', 'David Soul'
  ]
};


const dummyQuiz1 = {
  uuid: '0001',
  title: 'General Knowledge Quiz',
  originatorInfo: originator1,
  tags: ['general knowledge', 'sport', 'history'],
  difficulty: 'Medium',
  questions: [
    questionTF01,
    questionTF02,
    questionTF03,
    questionMultipleChoice01,
    questionMultipleChoice02,
    questionMultipleChoice03,
    questionMultipleChoice04,
    questionMultipleChoice05
  ],
  questionTypes: ['True or False', 'Multiple Choice']
};


/** Dev use only
  * @ignore */
const dummyQuiz2 = {
  uuid: '0002',
  title: 'Movie Time Quiz',
  originatorInfo: originator2,
  tags: ['Movies'],
  difficulty: 'Medium',
  questions: [
    questionTF04,
    questionTF05,
    questionMultipleChoice05,
    questionMultipleChoice06,
    questionMultipleChoice07
  ],
  questionTypes: ['True or False', 'Multiple Choice']
};

/** Dev use only
  * @ignore */
const dummyQuiz3 = {
  uuid: '0003',
  title: 'Master Quiz',
  originatorInfo: originator1,
  tags: ['Movies', 'general knowledge', 'sport', 'history'],
  difficulty: 'Medium',
  questions: [
    questionTF01,
    questionTF02,
    questionTF03,
    questionTF04,
    questionTF05,
    questionMultipleChoice01,
    questionMultipleChoice02,
    questionMultipleChoice03,
    questionMultipleChoice04,
    questionMultipleChoice05,
    questionMultipleChoice06,
    questionMultipleChoice07
  ],
  questionTypes: ['True or False', 'Multiple Choice']
};

export const quizTestData = [
  dummyQuiz1,
  dummyQuiz2,
  dummyQuiz3
];

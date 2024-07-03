const names = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-James",
  "Aarron",
  "Aaryan",
  "Aaryn",
  "Aayan",
  "Aazaan",
  "Abaan",
  "Abbas",
  "Abdallah",
  "Abdalroof",
  "Abdihakim",
  "Abdirahman",
  "Abdisalam",
  "Abdul",
  "Abdul-Aziz",
  "Abdulbasir",
  "Abdulkadir",
  "Abdulkarem",
  "Smith",
  "Jones",
  "Coollastname",
  "Ze",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zeid",
  "Zein",
  "Zen",
  "Zendel",
  "Zenith",
  "Zennon",
  "Zeph",
  "Zerah",
  "Zhen",
  "Zhi",
  "Zhong",
  "Zhuo",
  "Zi",
  "Zidane",
  "Zijie",
  "Zinedine",
  "Zion",
  "Zishan",
  "Ziya",
  "Ziyaan",
  "Zohaib",
  "Zohair",
  "Zoubaeir",
  "Zubair",
  "Zubayr",
  "Zuriel",
  "Xander",
  "Jared",
  "Courtney",
  "Gillian",
  "Clark",
  "Jared",
  "Grace",
  "Kelsey",
  "Tamar",
  "Alex",
  "Mark",
  "Tamar",
  "Farish",
  "Sarah",
  "Nathaniel",
  "Parker",
];

const thoughtTexts = [
  "This is my first thought!",
  "I love coding!",
  "JavaScript is awesome!",
  "MongoDB makes life easier.",
  "React is powerful.",
  "Express.js for the win!",
  "Node.js is great!",
  "Seeding databases is fun!",
  "Random thoughts...",
  "Another day, another code.",
  "Debugging is part of the process.",
  "Learning new things every day.",
  "Code, eat, sleep, repeat.",
  "Hacking away!",
  "Building cool projects.",
  "Testing is important.",
  "Always refactor your code.",
];

const reactionBodies = [
  "Nice thought!",
  "I agree with you.",
  "Interesting point.",
  "Well said!",
  "Couldn't have said it better.",
  "Absolutely!",
  "That's awesome.",
  "Keep it up!",
  "You're right!",
  "Great insight.",
  "I never thought of it that way.",
  "Good job!",
  "Excellent!",
  "Totally!",
  "Cool!",
  "Indeed.",
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

const getRandomThoughts = (num) => {
  const thoughts = [];
  for (let i = 0; i < num; i++) {
    thoughts.push({
      thoughtText: getRandomArrItem(thoughtTexts),
      username: getRandomName(),
    });
  }
  return thoughts;
};

const getRandomReactions = (num) => {
  const reactions = [];
  for (let i = 0; i < num; i++) {
    reactions.push({
      reactionBody: getRandomArrItem(reactionBodies),
      username: getRandomName(),
    });
  }
  return reactions;
};

module.exports = { getRandomName, getRandomThoughts, getRandomReactions };

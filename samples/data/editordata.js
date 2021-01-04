function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var photoIndex = -1;
var photos = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
function GetNextPhoto() {
  photoIndex += 1;

  if (photoIndex >= photos.length) {
    photoIndex = 0;
  }

  return "../images/photos/" + photos[photoIndex] + ".png";
}

function GetRandomPhone() {

  var result = "";

  result += "(" + getRandomInt(400, 500) + ")";
  result += " " + getRandomInt(100, 800) + "-" + getRandomInt(10, 99) + "-" + getRandomInt(10, 99);

  return result;
}

function GetRandomEmail(firstName, secondName) {
  var email = firstName.substr(0, getRandomInt(Math.ceil(firstName.length / 2), firstName.length))
    + (secondName !== undefined ? "." + secondName.substr(0, getRandomInt(Math.ceil(secondName.length / 2), secondName.length)) : "")
    + "@name.com";

  return email.toLowerCase().replace(" ", "");
}

var colorIndex = -1;
var colors = [
  primitives.Colors.Indigo,
  "#C57F7F",
  primitives.Colors.Limegreen,
  primitives.Colors.Orange,
  "#E64848",
  primitives.Colors.Olive,
  primitives.Colors.DarkCyan,
  "#B800E6"

];
function GetNextColor() {
  colorIndex += 1;

  if (colorIndex >= colors.length) {
    colorIndex = 0;
  }

  return colors[colorIndex];
}

this.names = ["David Dalton", "Jeanna White", "James Holt", "Thomas Williams", "David Kirby", "Lynette Maloney", "Glen Zeigler", "Ione Gallegos", "Jose Clark", "Heather Simmons",
  "Steven Lacombe", "Nancy Smith", "Jean Kendall", "Brad Whitt", "Sara Kemp", "Brian Cruz", "John Drake", "Patrick Perry", "Mary Spencer", "Thomas Dixon", "George Duong",
  "Ralph Mercer", "Howard Williams", "Nathalie Escobedo", "Ashley Rue", "Joan Whitham", "Janella Cannon", "Roger Greenlee", "Edna Garner", "Brent Holston", "Mary Russ",
  "Stanley Weathers", "Melvin White", "Bonnie Wedel", "Norman Dalton", "Melissa Houser", "Abbie Lawson", "Ernest Putnam", "Robert Lemieux", "Arthur Wood", "Jonathan Hitt",
  "Celestina Crum", "Cindy Turner", "Victoria Sequeira", "James Workman", "Gil Adams", "Norma Moore", "Carlos Cardenas", "John Green", "Richard Morales", "Carolyn Jones",
  "Charlotte White", "Elizabeth Zito", "Edna Cavazos", "Debra Mayers", "Gerald Castonguay", "Kevin Carico", "Robert Morgan", "Susan Haines", "James Perry", "Edwin King",
  "Juan Smith", "Ida Benefield", "Andrew Hall", "Vada Duhon", "William Loyd", "Craig Blue", "Joel Crawford", "Astrid Camp", "John Peyton", "Tony Ross", "Linda Morse",
  "Timothy Brooks", "Mary Klingler", "James Gunther", "Francine Hatch", "Barbie Shadle", "Heather Colon", "Marx Tobin", "Vickie May", "Andrew Horton", "Glenn Numbers",
  "Deanna Caldwell", "Lou Hoffman", "Barbara Rogers", "Annie Murphy", "Barbara Lang", "Donna Reilly", "Jenifer Eddy", "William Weyer", "Barbara Faulk", "George O'Connor",
  "Stephanie Godbey", "Willie Rinker", "Lisabeth Clement", "Martha Slade", "Dorothy Ritter", "Stewart Williams", "Monty Heckman", "Richard Salinas", "Crystal Betts",
  "Beth McInerney", "Calvin Khan", "Phillip Smith", "Jeffrey Ruiz", "Lloyd Fisher", "Kevin Wheeler", "Virginia Fox", "Betty Esquivel", "Robert Lemieux", "Jerry Skinner",
  "Jose Mack", "Michael Wood", "George Bjorklund", "Louis Smith", "Horace Otero", "Nina Chi", "Andrew Wilkerson", "Andrew Wheeler", "Madeline Redus", "Victor Petrie",
  "Arleen Mueller", "William Blum", "Wilbert Phillips", "Frances Steil", "Maria Corrado", "Evelyn Toomey", "Gary Pero", "Carlos Williams", "Daniel Fuller", "Jeffery Green",
  "Natalie Medellin", "Mary Varga", "Michael Davis", "Bernard Taylor", "Rose Hensley", "Joseph Linthicum", "Anthony Overstreet", "Daniel Richmond", "Allen Wallace",
  "Ben Roberson", "Brian Peters", "Matthew Cole", "Janet Martin", "Jason Waller", "Teresa Carter", "Sally Barnes", "Elmo Peterson", "Linda Rosado", "William Nash",
  "Naomi Freeman", "Brian Werner", "Christy May", "Maria Nelson", "Desiree Moore", "Micheal Stevens", "James Stanley", "Donna Potts", "Tommie Edwards", "Nick Lambert",
  "Marie Neal", "John Kline", "Leota Flowers", "Daniel Small", "James Burleson", "Bernice Whitlock", "Jean Noack", "Luis Rosso", "Maria Estes", "Justin Pinson",
  "Christina Tucker", "Mark Donaldson", "Donna Edelen", "Donnie Gonzalez", "Damon Holmes", "Lori Anderson", "Linda Wong", "Bonnie Valdez", "Joseph Gipson", "Christine Waugh",
  "John Burris", "Ashley Caudill", "David Gift", "Patrick Mitchell", "Jason Liberty", "Shawna Sikora", "Alex Hill", "John Barrera", "Fern Booker", "Stephen Lowe",
  "Ellen Murphy", "Patricia Farr", "Joseph Krouse", "Delores Coffman", "Jerry Spurlock", "Chris Watts", "David Kelley", "Edgar Walkup", "Thomas Davidson", "Ignacio Widmer",
  "Joshua Hall", "Jason Anthony", "Guy Davis", "Shelley Frizzell", "Paul Teal", "Todd Griswold", "Edward Albarado", "Daniel Roddy", "Larry Bell", "Carlos Robinette",
  "Joseph Green", "Randy Shields", "Lucas Fraser", "Jackie Gagne", "Norma Fleming", "Bernard Paschall", "Sherri Pena", "Sarah Haynes", "Bettyann Phillips", "Sara Ceballos",
  "Lucius McDuffy", "Nicole McGahey", "Robert Martin", "Kevin Duppstadt", "Vernell Draper", "Olga Miller", "Ricky Bronk", "Doris Ponte", "Samuel Tibbs", "Jennifer Snyder",
  "Eugene Focht", "James Reder", "Mary McLendon", "Rachel Trost", "Versie Allen", "Diann Williamson", "Florence Butts", "David Hedberg", "Bruce Clift", "Josephine Meister",
  "Brandon Armstrong", "Berta Rucker", "Arthur Buck", "James Turner", "Michelle Harr", "Demetrice Kenney", "Mark Barreto", "Jennifer Hurtt", "Christopher Mauro",
  "Paul McKissick", "Jane Hammond", "James Nunnally", "Shelly Nies", "Tommy Gonzalez", "Jermaine White", "Constance Rose", "Rory Terry", "Joan Seth", "Ayana Fuentes",
  "John Spinks", "Charles Werner", "David Hines", "Derrick Johnson", "Steven Rickard", "William Holmes", "Jonathan White", "Ronda Miller", "Donald Powell", "Ethel Johnston",
  "Christina Winters", "Tiffany Scoles", "Sean Milligan", "Francis Howlett", "Edward Clark", "George Williams", "Bernard Hash", "Andrew Plourde", "Ed Kieffer",
  "Odelia Locker", "John Smith", "Tonya Kyle", "Douglas Friel", "Gordon Allman", "Jeffrey Hawkins", "Jessica Simpson", "Annie Jones", "Wen Sutton", "Amy Palomares",
  "Brian Wynne", "Nicholas Getz", "Joseph Bean", "Jamila Menjivar", "Christy Wickline", "Marguerite Weddle", "Milagros Roman", "Michael Bates", "Byron Irons",
  "Cynthia Leon", "Nicolas Grimes", "Delores Nicola", "Malinda Lamberth", "Tonya Bruno", "Richard Ponce", "Hector Dade", "Lucille Surber", "Robert Duke", "Rosemary Michaels",
  "Earl Thomas", "Robert Velez", "Dennis Martz", "Rosalyn Fenley", "Kent Pendleton", "Ryan Eddington", "Norma Brown", "Louisa Lewis", "Jessica Collins", "Patricia Allen",
  "Jesus Dibble", "Ann Jackson", "Barry Allen", "James Taylor", "Sandi McCarty", "Roy Lau", "Shirley Winchester", "Brent Hill", "Bobbi Le", "Cheryl Bruce", "Marc Barber",
  "Charles Lipsey", "Georgina Cahill", "Stacey White", "Heather Powell", "Fran Huynh", "Herbert Pruitt", "Patricia Fleming", "Harold Graves", "Mike Reyes",
  "Florence Kuykendall", "Jessica Goodwin", "Tim McCracken", "Everett Thompson", "Gail Sharpless", "Christopher Stjohn", "William Young", "Scott Turpin", "Don Hubbard",
  "Thomas Moore", "Hazel Newton", "Robert Gray", "Harry Harter", "Fannie Carter", "Mary Johnson", "Earl Curry", "Tyler Brown", "Valerie Mayes", "Juanita Foskey", "Jimmie Camp",
  "Shawna Guillory", "Nora Perry", "Barbara Love", "John Colby", "Gladys Wakefield", "Ruby Pickard", "Guadalupe Steele", "Eva Singleton", "Lesha Ford", "Ernest Good",
  "Pierre Graham", "Rosemarie Priest", "Olga Donovan", "Kelly Ward", "Victor Goosby", "Brenda Potter", "Joi Milligan", "Lynn Clifton", "Debra Prasad", "Mary Ward",
  "Christopher Kemp", "Edna Green", "George Livengood", "Jessica Sirois", "Cory Delcid", "Vernon Dumas", "Cammy Snoddy", "Theron Barkley", "Chante Evans", "Crystal Dougherty",
  "Doreen Banks", "Sandra Townsend", "Margaret Morgan", "Krystal Brown", "Trina Pratt", "Martha Chambers", "Devin Reider", "Earle Lara", "Heath Hall", "James Guzman",
  "Alberta Gray", "Pamela Perkins", "Lula Pena", "James Gambino", "Letha Sanders", "Katrina Duncan", "Robert Baker", "Anna Couch", "Cecilia Fouts", "Sharon Thomas",
  "David Torres", "Jennifer Gibbs", "Timothy Gerald", "John White", "Orlando Morris", "Irene Cooper", "Kevin Moody", "Sarah Russell", "Jimmy Daniel", "Mack William",
  "Eduardo Hall", "Laverne Spencer", "Dale Knowlton", "Roosevelt Bishop", "Heather Cooper", "Jason Cook", "Eddie Barth", "James Parent", "Ismael Mills", "Nicolas Villalobos",
  "Herman Gregory", "Emma Sledge", "Emile Harmon", "Eddy Wirtz", "David Deleon", "Salena Smith", "Michael Andersen", "Kenneth Atkinson", "Gregory Ely", "Leonard Vitagliano",
  "Jack Gilbert", "Christopher Paul", "Robert Dahl", "Rufus Parrish", "Bernice Peterson", "Edwin Buchanan", "Steven Smith", "Julio Hull", "Karen Smith", "Michael Gaston",
  "Shona Spence", "Chana Bayles", "Clarence Dennis", "Taren Gonzales", "Esther Gallien", "Danelle Rocha", "Erin Pursley", "Rickie Clark", "Jimmy Coker", "Rita Haney",
  "Jarrod Holmes", "Bonnie Wert", "Kelvin King", "Justin Gresham", "Dolores Berry", "Barbara Keffer", "Dante Grogg", "Salvador Duke", "Alex Ford", "Brenton Gardner",
  "Angelina Bowman", "Herschel Schiffer", "Charles Sanders", "John James", "Elisha Anderson", "Cynthia Chester", "Donald Johnson", "Clement Smith", "Brian Kendrick",
  "Mary Duplessis", "Geneva Reed", "James Maynard", "Caroline Huffman", "Robert Moua", "Michele Avery", "Rashida Shelor", "Darci Burrus", "Lee Carle", "Sue Collins",
  "Michelle Burnett", "Jose Jones", "Mary Bright", "Mary Lea", "Richard Skaggs", "Martha Williams", "Judith Andrews", "Kristine Taylor", "Gabrielle Cannon", "Gregory McKenzie",
  "Dorothy Samuels", "Christine Henderson", "Bryan Krouse", "Betty Seaman", "Gail Vallo", "Gary Bell", "Stephen Soileau", "Jennifer Zucker", "Gregory Taylor",
  "Holly Wulff", "Vincent Davis", "Tammy Wright", "Kevin Smeltzer", "Antonio Conlon", "Donald Yarbrough", "Louise Wells", "David King", "Dorothy Walker", "Andrew Doughty",
  "Kathleen Cody", "John Bosco", "Jane Miranda", "Jane Marvin", "Deborah Myers", "Judith Newman", "Mike Sylvester", "Lisa Ray", "Arthur Alexander", "Alicia Johnson",
  "Janie Anderson", "Brandon Wegner", "Brad Piper", "John Harris", "Martha Holliday", "Kara Anderson", "Luis Peterson", "Amy Hayes", "Jamie Vinson", "Derek Naron",
  "Donnie Thomas", "Buford Creighton", "Earnest McDowell", "Jeffrey Francis", "Karen Sartin", "Frank Jones", "Tyree Benfield", "Mike Pearson", "Angelia McLendon",
  "Mary White", "Aaron Gonzalez", "Taylor Godsey", "Carissa Burch", "Anna Mettler", "Jennifer Tyree", "Debbie Oubre", "Cynthia Hopkins", "Jamar Cowart", "Jenny Allen",
  "Lillie Howard", "Steven Mullin", "Candace Thayer", "John Wilcox", "Victoria Avis", "Dorothy Patterson", "Eleanor Childress", "David Howard", "Douglas Raleigh",
  "Susan Dominguez", "Theodore Schafer", "Brian Steele", "Shu Bruce", "John Smith", "Andrew Palacios", "Timothy Schultz", "Joan Lopez", "Dolores McGhee", "Betty Deckard",
  "Allison Haas", "Shawn Lockridge", "Andrew Lopez", "Walter Morris", "Paul Landry", "Travis Keen", "Leon Bianco", "Marie Mercado", "Dewayne Willis", "Adriana Hastings",
  "Roberto Steel", "Kathryn Mead", "Dale Obrien", "Crystal Peters", "Dennis Mathias", "Angela Hubbell", "Kirsten Ruby", "Grace McCabe", "Mabel Powell", "William Arevalo",
  "Kay Fortier", "Melanie Andrew", "James Cushman", "Merilyn Loper", "Marie Pridgen", "Marie Nelson", "Aaron Coop", "Bruce Koch", "Michael Goodall", "Raymond Collins",
  "Ruth Sipe", "Frederick Stark", "Ruth Johnson", "Lois Carson", "James Rowen", "Sara Hummel", "Kent Sutliff", "Tania Brock", "Jose Rodriguez", "Robert Broussard",
  "Wayne Brown", "Robert Orton", "Linda Robinson", "Dorothy Grimes", "Micheal Capps", "Mack Blackmon", "Helen Paul", "Concepcion Daniel", "Ray Moore", "Maria Drayton",
  "Dennis Dupras", "Janette Hooten", "Betty Webb", "Alice Quintanar", "Laura Weil", "Domingo Landon", "Veronica Harwood", "Elizabeth Gaulke", "Lillian Rubio", "Douglas Smith",
  "Taylor Harris", "Katherine Hinze", "Jeremy Cabral", "Richard Roberts", "Irene Robert", "Margarita Kerr", "Marcia Rosemond", "Sherman Jackson", "Gene Thompson",
  "Brenda Phillips", "Larry Rogers", "Paul Gordon", "James Solorio", "Luz Rotella", "Geraldine Thai", "James Carmona", "Jackson Wood", "Lorraine Madigan", "Linda Aguilar",
  "Ruby Humphrey", "Shelly Robinson", "Addie Mims", "Charles Clinton", "Richard Martinez", "Jannette Barry", "Willie East", "Patricia Derouen", "Hannah Earnhardt",
  "William Roman", "Michael Mathes", "Warner Allen", "Jennifer Sykes", "Ada Allen", "Larue Rimmer", "Bobby Shaver", "Joe Keith", "Kathleen Rhodes", "Christine Phillips",
  "Robert White", "Harriet Kelly", "Debbie Adams", "Donald Cole", "Stacy Lightfoot", "Thomas Peach", "Shawn Sweet", "Victor Wilhelm", "Kyle Ramos", "Reed Williams",
  "James Jenkins", "William Hills", "Preston Marshall", "Kendra Hibbard", "Michael Sheldon", "Alan Gallegos", "Timothy Pace", "Cleta Robbins", "John Cross",
  "Harriet Chester", "Kristen Nelson", "Helen Kramer", "Michael Samuels", "Tasha Wright", "Elena Marshall", "Artie Bryan", "Samuel Pierce", "Jennifer Mendez",
  "Audra White", "Mable Batchelder", "Terry Witherspoon", "Cynthia Denson"];

var currentName = 0;
var namesLen = this.names.length;
function GetNextName() {
  currentName += 1;
  var result = names[currentName];
  if (currentName >= namesLen) {
    currentName = 0;
  }
  return result;
}

function GetCurrentName() {
  return names[currentName];
}

function getMatrixedLeaves() {
  var items = [];

  items.push(new primitives.OrgItemConfig({
    id: 1,
    parent: null,
    title: GetNextName(),
    description: "Description of " + GetCurrentName(),
    image: "../images/photos/a.png",
    phone: GetRandomPhone(),
    email: GetRandomEmail(GetCurrentName())
  }));

  items.push(new primitives.OrgItemConfig({
    id: 2,
    parent: 1,
    title: GetNextName(),
    description: "Adviser Description",
    image: "../images/photos/z.png",
    itemType: primitives.ItemType.Adviser,
    adviserPlacementType: primitives.AdviserPlacementType.Right,
    phone: GetRandomPhone(),
    email: GetRandomEmail(GetCurrentName()),
    groupTitle: "Audit"
  }));

  items.push(new primitives.OrgItemConfig({
    id: 3,
    parent: 2,
    title: GetNextName(),
    description: "Assistant Description",
    image: "../images/photos/y.png",
    itemType: primitives.ItemType.Assistant,
    adviserPlacementType: primitives.AdviserPlacementType.Right,
    phone: GetRandomPhone(),
    email: GetRandomEmail("Assistant 1"),
    groupTitle: "Audit"
  }));

  items.push(new primitives.OrgItemConfig({
    id: 4,
    parent: 2,
    title: GetNextName(),
    description: "Regular Description",
    image: "../images/photos/y.png",
    itemType: primitives.ItemType.Regular,
    adviserPlacementType: primitives.AdviserPlacementType.Right,
    phone: GetRandomPhone(),
    email: GetRandomEmail("Regular"),
    groupTitle: "Audit"
  }));

  items.push(new primitives.OrgItemConfig({
    id: 5,
    parent: 1,
    title: GetNextName(),
    description: "Adviser Description",
    image: "../images/photos/z.png",
    itemType: primitives.ItemType.Adviser,
    adviserPlacementType: primitives.AdviserPlacementType.Left,
    phone: GetRandomPhone(),
    email: GetRandomEmail("Adviser 2"),
    groupTitle: "Contract"
  }));


  items.push(new primitives.OrgItemConfig({
    id: 6,
    parent: 1,
    title: GetNextName(),
    description: "Assistant Description",
    image: "../images/photos/y.png",
    itemType: primitives.ItemType.Assistant,
    adviserPlacementType: primitives.AdviserPlacementType.Right,
    phone: GetRandomPhone(),
    email: GetRandomEmail("Assistant 1"),
    groupTitle: "Administration"
  }));

  items.push(new primitives.OrgItemConfig({
    id: 7,
    parent: 6,
    title: GetNextName(),
    description: "Assistant Description",
    image: "../images/photos/y.png",
    itemType: primitives.ItemType.Assistant,
    adviserPlacementType: primitives.AdviserPlacementType.Right,
    phone: GetRandomPhone(),
    email: GetRandomEmail("Assistant 1"),
    groupTitle: "Administration"
  }));

  items.push(new primitives.OrgItemConfig({
    id: 8,
    parent: 6,
    title: GetNextName(),
    description: "Regular Description",
    image: "../images/photos/y.png",
    itemType: primitives.ItemType.Regular,
    phone: GetRandomPhone(),
    email: GetRandomEmail("Regular"),
    groupTitle: "Administration"
  }));

  var counter = 8;
  var groups = { 
    "E": { levels: [0, 0, 6, 2, 25] }, 
    "V": { levels: [14, 12, 8, 8, 56]},
    "U": { levels: [2, 4, 6, 8, 37] }, 
    "O": { levels: [0, 0, 0, 0, 12] },
    "P": { levels: [1, 10, 0, 1, 24] },
    "L": { levels: [1, 5, 0, 2, 18] }
  };
  for (var groupKey in groups) {
    var group = groups[groupKey];
    counter++;
    var manager = new primitives.OrgItemConfig({
      id: counter,
      parent: 1,
      title: GetNextName(),
      description: "Manager #" + groupKey + " description ",
      image: "../images/photos/" + groupKey.toLowerCase() + ".png",
      label: groupKey.toString(),
      email: GetRandomEmail("Manager " + groupKey),
      phone: GetRandomPhone()
    });
    items.push(manager);

    for (var levelIndex = 0; levelIndex < group.levels.length; levelIndex += 1) {
      var levelSize = group.levels[levelIndex];
      for (var index = 0; index < levelSize; index += 1) {
        counter++;
        var memberItem = new primitives.OrgItemConfig({
          id: counter,
          parent: manager.id,
          title: GetNextName(),
          description: "Description of #" + counter.toString() + " member of group " + groupKey,
          image: "../images/photos/" + groupKey.toLowerCase() + ".png",
          email: GetRandomEmail(counter.toString() + " member of " + groupKey),
          phone: GetRandomPhone(),
          label: counter.toString(),
          levelOffset: levelIndex
        });
        items.push(memberItem);
      }
    }
  }

  return items;
}

var data = getMatrixedLeaves();
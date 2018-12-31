var data = [
{ id: 0, parent: null, isVisible: true, description: "Chief Executive Officer (CEO)", email: "davidalt@name.com", groupTitleColor: "#4169e1", image: "../images/photos/q.png", itemTitleColor: "#4169e1", phone: "352-206-7599", title: "David Dalton" },
{ id: 1, parent: 0, isVisible: true, description: "Co-Presidents, Platform Products & Services Division", email: "jeanwhit@name.com", groupTitleColor: "#4169e1", image: "../images/photos/w.png", itemTitleColor: "#4b0082", phone: "505-791-1689", title: "Jeanna White" },
{ id: 2, parent: 1, isVisible: true, description: "Sr. VP, Server & Tools Division", email: "jameholt@name.com", groupTitleColor: "#4169e1", image: "../images/photos/e.png", itemTitleColor: "#4b0082", phone: "262-215-7998", title: "James Holt" },
{ id: 3, parent: 2, isVisible: true, description: "VP, Server & Tools Marketing and Solutions", email: "thomwill@name.com", groupTitleColor: "#4169e1", image: "../images/photos/r.png", itemTitleColor: "#4b0082", phone: "904-547-5342", title: "Thomas Williams" },
{ id: 4, parent: 2, isVisible: true, description: "VP, Software & Enterprise Management Division", email: "sarakemp@name.com", groupTitleColor: "#4169e1", image: "../images/photos/g.png", itemTitleColor: "#4b0082", phone: "918-257-4218", title: "Sara Kemp" },
{ id: 5, parent: 2, isVisible: true, description: "Sr. VP, Software Server System", email: "georduon@name.com", groupTitleColor: "#4169e1", image: "../images/photos/x.png", itemTitleColor: "#4b0082", phone: "434-406-2189", title: "George Duong" },
{ id: 6, parent: 2, isVisible: true, description: "VP, Developer Division", email: "ashlrue@name.com", groupTitleColor: "#4169e1", image: "../images/photos/n.png", itemTitleColor: "#4b0082", phone: "515-324-4969", title: "Ashley Rue" },
{ id: 7, parent: 2, isVisible: true, description: "VP, Enterprise Access and Security Products Division (EASP)", email: "bonnwede@name.com", groupTitleColor: "#4169e1", image: "../images/photos/i.png", itemTitleColor: "#4b0082", phone: "412-265-2782", title: "Bonnie Wedel" },
{ id: 8, parent: 2, isVisible: true, description: "GM, Core File Solutions", email: "melihous@name.com", groupTitleColor: "#4169e1", image: "../images/photos/p.png", itemTitleColor: "#4b0082", phone: "630-887-1188", title: "Melissa Houser" },
{ id: 9, parent: 2, isVisible: true, description: "GM, Software Server Solutions Group", email: "abbilaws@name.com", groupTitleColor: "#4169e1", image: "../images/photos/a.png", itemTitleColor: "#4b0082", phone: "530-322-6413", title: "Abbie Lawson" },
{ id: 10, parent: 2, isVisible: true, description: "GM, Connected Systems Division", email: "erneputn@name.com", groupTitleColor: "#4169e1", image: "../images/photos/s.png", itemTitleColor: "#4b0082", phone: "626-831-0555", title: "Ernest Putnam" },
{ id: 11, parent: 1, isVisible: true, description: "CFO, Platforms Products & Services", email: "celecrum@name.com", groupTitleColor: "#4169e1", image: "../images/photos/h.png", itemTitleColor: "#4b0082", phone: "419-578-6479", title: "Celestina Crum" },
{ id: 12, parent: 11, isVisible: true, description: "GM, Pricing", email: "cindturn@name.com", groupTitleColor: "#4169e1", image: "../images/photos/j.png", itemTitleColor: "#4b0082", phone: "530-934-4295", title: "Cindy Turner" },
{ id: 13, parent: 11, isVisible: true, description: "GM, Worldwide Licensing", email: "victsequ@name.com", groupTitleColor: "#4169e1", image: "../images/photos/k.png", itemTitleColor: "#4b0082", phone: "973-883-9137", title: "Victoria Sequeira" },
{ id: 14, parent: 11, isVisible: true, description: "GM, WW Licensing Solutions", email: "normmoor@name.com", groupTitleColor: "#4169e1", image: "../images/photos/x.png", itemTitleColor: "#4b0082", phone: "334-496-5203", title: "Norma Moore" },
{ id: 15, parent: 11, isVisible: true, description: "GM, Marketing and Readiness", email: "carlcard@name.com", groupTitleColor: "#4169e1", image: "../images/photos/c.png", itemTitleColor: "#4b0082", phone: "775-999-3630", title: "Carlos Cardenas" },
{ id: 16, parent: 1, isVisible: true, description: "Sr. VP, Software Core Operating System Division", email: "johngree@name.com", groupTitleColor: "#4169e1", image: "../images/photos/v.png", itemTitleColor: "#4b0082", phone: "937-475-8106", title: "John Green" },
{ id: 17, parent: 16, isVisible: true, description: "VP, Core OS Development", email: "richmora@name.com", groupTitleColor: "#4169e1", image: "../images/photos/b.png", itemTitleColor: "#4b0082", phone: "650-729-6483", title: "Richard Morales" },
{ id: 18, parent: 16, isVisible: true, description: "VP, Software Networking & Device Technologies", email: "charwhit@name.com", groupTitleColor: "#4169e1", image: "../images/photos/m.png", itemTitleColor: "#4b0082", phone: "248-402-6142", title: "Charlotte White" },
{ id: 19, parent: 16, isVisible: true, description: "VP, Security Technology Unit (STU)", email: "robemorg@name.com", groupTitleColor: "#4169e1", image: "../images/photos/y.png", itemTitleColor: "#4b0082", phone: "308-532-6548", title: "Robert Morgan" },
{ id: 20, parent: 16, isVisible: true, description: "GM, Software Serviceability", email: "idabene@name.com", groupTitleColor: "#4169e1", image: "../images/photos/a.png", itemTitleColor: "#4b0082", phone: "765-723-1327", title: "Ida Benefield" },
{ id: 21, parent: 16, isVisible: true, description: "GM, Core Operating System Test", email: "vadaduho@name.com", groupTitleColor: "#4169e1", image: "../images/photos/d.png", itemTitleColor: "#4b0082", phone: "303-333-9215", title: "Vada Duhon" },
{ id: 22, parent: 16, isVisible: true, description: "GM, Global Platform Technologies and Services", email: "willloyd@name.com", groupTitleColor: "#4169e1", image: "../images/photos/f.png", itemTitleColor: "#4b0082", phone: "585-309-6253", title: "William Loyd" },
{ id: 23, parent: 1, isVisible: true, description: "Sr. VP, NAME & Personal Services Division", email: "craiblue@name.com", groupTitleColor: "#4169e1", image: "../images/photos/g.png", itemTitleColor: "#4b0082", phone: "915-355-4705", title: "Craig Blue" },
{ id: 24, parent: 23, isVisible: true, description: "VP, NAME Communications Services and Member Platform", email: "joelcraw@name.com", groupTitleColor: "#4169e1", image: "../images/photos/h.png", itemTitleColor: "#4b0082", phone: "650-623-3302", title: "Joel Crawford" },
{ id: 25, parent: 23, isVisible: true, description: "VP & CFO, NAME", email: "barblang@name.com", groupTitleColor: "#4169e1", image: "../images/photos/o.png", itemTitleColor: "#4b0082", phone: "618-822-7345", title: "Barbara Lang" },
{ id: 26, parent: 23, isVisible: true, description: "VP, NAME Operations", email: "barbfaul@name.com", groupTitleColor: "#4169e1", image: "../images/photos/d.png", itemTitleColor: "#4b0082", phone: "641-678-7646", title: "Barbara Faulk" },
{ id: 27, parent: 23, isVisible: true, description: "VP, NAME Global Sales & Marketing", email: "stewwill@name.com", groupTitleColor: "#4169e1", image: "../images/photos/z.png", itemTitleColor: "#4b0082", phone: "803-746-8733", title: "Stewart Williams" },
{ id: 28, parent: 23, isVisible: true, description: "Sr. VP, NAME Information Services & Merchant Platform", email: "robelemi@name.com", groupTitleColor: "#4169e1", image: "../images/photos/y.png", itemTitleColor: "#4b0082", phone: "425-590-4308", title: "Robert Lemieux" },
{ id: 29, parent: 23, isVisible: true, description: "Chief of Staff, NAME", email: "danirich@name.com", groupTitleColor: "#4169e1", image: "../images/photos/o.png", itemTitleColor: "#4b0082", phone: "605-295-4417", title: "Daniel Richmond" },
{ id: 30, parent: 1, isVisible: true, description: "VP, Developer & Platform Fanatism", email: "allewall@name.com", groupTitleColor: "#4169e1", image: "../images/photos/p.png", itemTitleColor: "#4b0082", phone: "480-472-4961", title: "Allen Wallace" },
{ id: 31, parent: 30, isVisible: true, description: "VP, .ORG Business Development", email: "benrobe@name.com", groupTitleColor: "#4169e1", image: "../images/photos/a.png", itemTitleColor: "#4b0082", phone: "636-827-5128", title: "Ben Roberson" },
{ id: 32, parent: 30, isVisible: true, description: "GM, .ORG Platform Strategy", email: "mattcole@name.com", groupTitleColor: "#4169e1", image: "../images/photos/d.png", itemTitleColor: "#4b0082", phone: "408-978-8597", title: "Matthew Cole" },
{ id: 33, parent: 30, isVisible: true, description: "GM, Global ISVs", email: "janemart@name.com", groupTitleColor: "#4169e1", image: "../images/photos/f.png", itemTitleColor: "#4b0082", phone: "801-897-6086", title: "Janet Martin" },
{ id: 34, parent: 30, isVisible: true, description: "GM, Platform Fanatism", email: "terecart@name.com", groupTitleColor: "#4169e1", image: "../images/photos/h.png", itemTitleColor: "#4b0082", phone: "770-326-1639", title: "Teresa Carter" },
{ id: 35, parent: 1, isVisible: true, description: "Sr. VP, Software Client Business", email: "sallbarn@name.com", groupTitleColor: "#4169e1", image: "../images/photos/j.png", itemTitleColor: "#4b0082", phone: "319-656-8043", title: "Sally Barnes" },
{ id: 36, parent: 35, isVisible: true, description: "VP, Digital Media Division", email: "elmopete@name.com", groupTitleColor: "#4169e1", image: "../images/photos/k.png", itemTitleColor: "#4b0082", phone: "423-307-1301", title: "Elmo Peterson" },
{ id: 37, parent: 35, isVisible: true, description: "VP, Software Client Core Platform Team", email: "marinels@name.com", groupTitleColor: "#4169e1", image: "../images/photos/b.png", itemTitleColor: "#4b0082", phone: "410-325-4416", title: "Maria Nelson" },
{ id: 38, parent: 35, isVisible: true, description: "VP, Software Online", email: "donnpott@name.com", groupTitleColor: "#4169e1", image: "../images/photos/w.png", itemTitleColor: "#4b0082", phone: "856-366-8761", title: "Donna Potts" },
{ id: 39, parent: 35, isVisible: true, description: "VP, Software Product Management & Marketing", email: "nicklamb@name.com", groupTitleColor: "#4169e1", image: "../images/photos/r.png", itemTitleColor: "#4b0082", phone: "425-988-7714", title: "Nick Lambert" },
{ id: 40, parent: 35, isVisible: true, description: "VP Software Client Extended Platforms", email: "danismal@name.com", groupTitleColor: "#4169e1", image: "../images/photos/i.png", itemTitleColor: "#4b0082", phone: "469-977-1938", title: "Daniel Small" },
{ id: 41, parent: 35, isVisible: true, description: "CFO, Software Client Business", email: "donngonz@name.com", groupTitleColor: "#4169e1", image: "../images/photos/k.png", itemTitleColor: "#4b0082", phone: "213-763-3692", title: "Donnie Gonzalez" },
{ id: 42, parent: 35, isVisible: true, description: "Chief of Staff, Software Client", email: "loriande@name.com", groupTitleColor: "#4169e1", image: "../images/photos/z.png", itemTitleColor: "#4b0082", phone: "863-858-4799", title: "Lori Anderson" },
{ id: 43, parent: 1, isVisible: true, description: "Sr. Distinguished Engineer, Software Base Team", email: "lindwong@name.com", groupTitleColor: "#4169e1", image: "../images/photos/x.png", itemTitleColor: "#4b0082", phone: "201-925-1897", title: "Linda Wong" },
{ id: 44, parent: 1, isVisible: true, description: "GM, Platforms Business Management", email: "bonnvald@name.com", groupTitleColor: "#4169e1", image: "../images/photos/c.png", itemTitleColor: "#4b0082", phone: "954-517-9979", title: "Bonnie Valdez" },
{ id: 45, parent: 0, isVisible: true, description: "President, Entertainment & Devices Division", email: "josegips@name.com", groupTitleColor: "#4169e1", image: "../images/photos/v.png", itemTitleColor: "#C57F7F", phone: "817-350-5277", title: "Joseph Gipson" },
{ id: 46, parent: 45, isVisible: true, description: "VP, Media", email: "chriwaug@name.com", groupTitleColor: "#4169e1", image: "../images/photos/b.png", itemTitleColor: "#C57F7F", phone: "323-924-6542", title: "Christine Waugh" },
{ id: 47, parent: 46, isVisible: true, description: "GM, Media", email: "johnburr@name.com", groupTitleColor: "#4169e1", image: "../images/photos/n.png", itemTitleColor: "#C57F7F", phone: "864-334-6496", title: "John Burris" },
{ id: 48, parent: 45, isVisible: true, description: "CFO & VP, Entertainment", email: "ashlcaud@name.com", groupTitleColor: "#4169e1", image: "../images/photos/m.png", itemTitleColor: "#C57F7F", phone: "785-468-7480", title: "Ashley Caudill" },
{ id: 49, parent: 48, isVisible: true, description: "VP, Console Partnerships", email: "davigift@name.com", groupTitleColor: "#4169e1", image: "../images/photos/q.png", itemTitleColor: "#C57F7F", phone: "334-547-2141", title: "David Gift" },
{ id: 50, parent: 48, isVisible: true, description: "VP, TV Division", email: "patrmitc@name.com", groupTitleColor: "#4169e1", image: "../images/photos/w.png", itemTitleColor: "#C57F7F", phone: "571-291-9887", title: "Patrick Mitchell" },
{ id: 51, parent: 48, isVisible: true, description: "Controller, Entertainment & Devices Division", email: "fernbook@name.com", groupTitleColor: "#4169e1", image: "../images/photos/u.png", itemTitleColor: "#C57F7F", phone: "978-242-7739", title: "Fern Booker" },
{ id: 52, parent: 45, isVisible: true, description: "VP, Experiences & Design for Gaming and Entertainment", email: "steplowe@name.com", groupTitleColor: "#4169e1", image: "../images/photos/i.png", itemTitleColor: "#C57F7F", phone: "803-432-1532", title: "Stephen Lowe" },
{ id: 53, parent: 52, isVisible: true, description: "VP, Gaming and Console Platform Group", email: "ellemurp@name.com", groupTitleColor: "#4169e1", image: "../images/photos/o.png", itemTitleColor: "#C57F7F", phone: "478-221-9308", title: "Ellen Murphy" },
{ id: 54, parent: 52, isVisible: true, description: "GM, Console Live Service Group", email: "delocoff@name.com", groupTitleColor: "#4169e1", image: "../images/photos/s.png", itemTitleColor: "#C57F7F", phone: "404-628-7275", title: "Delores Coffman" },
{ id: 55, parent: 45, isVisible: true, description: "VP, Retail Sales & Marketing", email: "jerrspur@name.com", groupTitleColor: "#4169e1", image: "../images/photos/d.png", itemTitleColor: "#C57F7F", phone: "305-819-4910", title: "Jerry Spurlock" },
{ id: 56, parent: 55, isVisible: true, description: "VP, Entertainment & Devices", email: "chriwatt@name.com", groupTitleColor: "#4169e1", image: "../images/photos/f.png", itemTitleColor: "#C57F7F", phone: "248-522-9731", title: "Chris Watts" },
{ id: 57, parent: 55, isVisible: true, description: "VP, Retail Sales & Marketing", email: "davikell@name.com", groupTitleColor: "#4169e1", image: "../images/photos/g.png", itemTitleColor: "#C57F7F", phone: "415-951-2949", title: "David Kelley" },
{ id: 58, parent: 55, isVisible: true, description: "GM, Entertainment & Devices Division", email: "edgawalk@name.com", groupTitleColor: "#4169e1", image: "../images/photos/h.png", itemTitleColor: "#C57F7F", phone: "302-269-0651", title: "Edgar Walkup" },
{ id: 59, parent: 45, isVisible: true, description: "Sr. VP, Mobile & Embedded Devices & Communications Sector", email: "thomdavi@name.com", groupTitleColor: "#4169e1", image: "../images/photos/j.png", itemTitleColor: "#C57F7F", phone: "313-722-8638", title: "Thomas Davidson" },
{ id: 60, parent: 59, isVisible: true, description: "VP, Communications Sector", email: "ignawidm@name.com", groupTitleColor: "#4169e1", image: "../images/photos/k.png", itemTitleColor: "#C57F7F", phone: "501-490-8654", title: "Ignacio Widmer" },
{ id: 61, parent: 59, isVisible: true, description: "VP, Mobile and Embedded Device Marketing", email: "larrbell@name.com", groupTitleColor: "#4169e1", image: "../images/photos/q.png", itemTitleColor: "#C57F7F", phone: "260-704-4745", title: "Larry Bell" },
{ id: 62, parent: 59, isVisible: true, description: "VP, Devices", email: "randshie@name.com", groupTitleColor: "#4169e1", image: "../images/photos/r.png", itemTitleColor: "#C57F7F", phone: "360-354-7598", title: "Randy Shields" },
{ id: 63, parent: 59, isVisible: true, description: "CFO, Mobile & Embedded Devices & Communications Sector Division", email: "sarahayn@name.com", groupTitleColor: "#4169e1", image: "../images/photos/p.png", itemTitleColor: "#C57F7F", phone: "443-487-7347", title: "Sarah Haynes" },
{ id: 64, parent: 45, isVisible: true, description: "VP, Interactive Entertainment Business", email: "bettphil@name.com", groupTitleColor: "#4169e1", image: "../images/photos/a.png", itemTitleColor: "#C57F7F", phone: "443-564-5549", title: "Bettyann Phillips" },
{ id: 65, parent: 64, isVisible: true, description: "GM, Global Marketing", email: "saraceba@name.com", groupTitleColor: "#4169e1", image: "../images/photos/s.png", itemTitleColor: "#C57F7F", phone: "701-385-7537", title: "Sara Ceballos" },
{ id: 66, parent: 64, isVisible: true, description: "GM, New Media & Franchise Development", email: "lucimcdu@name.com", groupTitleColor: "#4169e1", image: "../images/photos/d.png", itemTitleColor: "#C57F7F", phone: "716-308-1312", title: "Lucius McDuffy" },
{ id: 67, parent: 64, isVisible: true, description: "GM, Name Game Studios", email: "nicomcga@name.com", groupTitleColor: "#4169e1", image: "../images/photos/f.png", itemTitleColor: "#C57F7F", phone: "315-837-8910", title: "Nicole McGahey" },
{ id: 68, parent: 64, isVisible: true, description: "GM, Entertainment & Devices", email: "rickbron@name.com", groupTitleColor: "#4169e1", image: "../images/photos/l.png", itemTitleColor: "#C57F7F", phone: "323-877-8571", title: "Ricky Bronk" },
{ id: 69, parent: 45, isVisible: true, description: "VP, Consumer Productivity eXperierences Division", email: "doripont@name.com", groupTitleColor: "#4169e1", image: "../images/photos/z.png", itemTitleColor: "#C57F7F", phone: "916-418-3715", title: "Doris Ponte" },
{ id: 70, parent: 69, isVisible: true, description: "GM, North America Operations", email: "samutibb@name.com", groupTitleColor: "#4169e1", image: "../images/photos/x.png", itemTitleColor: "#C57F7F", phone: "406-881-5323", title: "Samuel Tibbs" },
{ id: 71, parent: 69, isVisible: true, description: "GM, Entertainment & Devices Localization and Shared Services", email: "jamerede@name.com", groupTitleColor: "#4169e1", image: "../images/photos/b.png", itemTitleColor: "#C57F7F", phone: "612-866-4856", title: "James Reder" },
{ id: 72, parent: 69, isVisible: true, description: "GM, Consumer Software", email: "marymcle@name.com", groupTitleColor: "#4169e1", image: "../images/photos/n.png", itemTitleColor: "#C57F7F", phone: "707-784-6254", title: "Mary McLendon" },
{ id: 73, parent: 69, isVisible: true, description: "GM, Macintosh Business Unit", email: "versalle@name.com", groupTitleColor: "#4169e1", image: "../images/photos/q.png", itemTitleColor: "#C57F7F", phone: "810-371-1010", title: "Versie Allen" },
{ id: 74, parent: 69, isVisible: true, description: "GM, Hardware", email: "dianwill@name.com", groupTitleColor: "#4169e1", image: "../images/photos/w.png", itemTitleColor: "#C57F7F", phone: "520-287-8249", title: "Diann Williamson" },
{ id: 75, parent: 0, isVisible: true, description: "Sr. VP, General Counsel & Secretary", email: "florbutt@name.com", groupTitleColor: "#4169e1", image: "../images/photos/e.png", itemTitleColor: "#32cd32", phone: "802-214-1030", title: "Florence Butts" },
{ id: 76, parent: 75, isVisible: true, description: "VP & Deputy General Counsel, Platforms Products & Services", email: "davihedb@name.com", groupTitleColor: "#4169e1", image: "../images/photos/r.png", itemTitleColor: "#32cd32", phone: "801-316-7533", title: "David Hedberg" },
{ id: 77, parent: 75, isVisible: true, description: "VP & Deputy General Counsel, IP & Licensing", email: "brucclif@name.com", groupTitleColor: "#4169e1", image: "../images/photos/t.png", itemTitleColor: "#32cd32", phone: "918-485-2318", title: "Bruce Clift" },
{ id: 78, parent: 77, isVisible: true, description: "GM, Business Development", email: "josemeis@name.com", groupTitleColor: "#4169e1", image: "../images/photos/y.png", itemTitleColor: "#32cd32", phone: "760-672-2080", title: "Josephine Meister" },
{ id: 79, parent: 77, isVisible: true, description: "GM, Patents & IP", email: "branarms@name.com", groupTitleColor: "#4169e1", image: "../images/photos/u.png", itemTitleColor: "#32cd32", phone: "832-496-0315", title: "Brandon Armstrong" },
{ id: 80, parent: 77, isVisible: true, description: "GM, Corporate Standards", email: "bertruck@name.com", groupTitleColor: "#4169e1", image: "../images/photos/i.png", itemTitleColor: "#32cd32", phone: "773-719-3488", title: "Berta Rucker" },
{ id: 81, parent: 75, isVisible: true, description: "VP, & Deputy General Counsel", email: "arthbuck@name.com", groupTitleColor: "#4169e1", image: "../images/photos/o.png", itemTitleColor: "#32cd32", phone: "724-244-6527", title: "Arthur Buck" },
{ id: 82, parent: 75, isVisible: true, description: "Deputy General Counsel, Antitrust", email: "jameturn@name.com", groupTitleColor: "#4169e1", image: "../images/photos/p.png", itemTitleColor: "#32cd32", phone: "620-362-3063", title: "James Turner" },
{ id: 83, parent: 75, isVisible: true, description: "VP & Deputy General Counsel, Business Division", email: "michharr@name.com", groupTitleColor: "#4169e1", image: "../images/photos/a.png", itemTitleColor: "#32cd32", phone: "508-241-0717", title: "Michelle Harr" },
{ id: 84, parent: 75, isVisible: true, description: "Deputy General Counsel, Office of Legal Compliance", email: "demekenn@name.com", groupTitleColor: "#4169e1", image: "../images/photos/s.png", itemTitleColor: "#32cd32", phone: "239-878-8236", title: "Demetrice Kenney" },
{ id: 85, parent: 75, isVisible: true, description: "VP, & Deputy General Counsel", email: "markbarr@name.com", groupTitleColor: "#4169e1", image: "../images/photos/d.png", itemTitleColor: "#32cd32", phone: "312-485-4776", title: "Mark Barreto" },
{ id: 86, parent: 75, isVisible: true, description: "Deputy General Counsel, Law & Corporate Affairs (LCA) Operations", email: "jennhurt@name.com", groupTitleColor: "#4169e1", image: "../images/photos/f.png", itemTitleColor: "#32cd32", phone: "503-355-4165", title: "Jennifer Hurtt" },
{ id: 87, parent: 75, isVisible: true, description: "VP & Deputy General Counsel, Worldwide Sales", email: "chrimaur@name.com", groupTitleColor: "#4169e1", image: "../images/photos/g.png", itemTitleColor: "#32cd32", phone: "727-426-1652", title: "Christopher Mauro" },
{ id: 88, parent: 75, isVisible: true, description: "VP & Deputy General Counsel, Global Corporate Affairs", email: "paulmcki@name.com", groupTitleColor: "#4169e1", image: "../images/photos/h.png", itemTitleColor: "#32cd32", phone: "603-446-2403", title: "Paul McKissick" },
{ id: 89, parent: 75, isVisible: true, description: "VP & Deputy General Counsel, Entertainment & Devices", email: "janehamm@name.com", groupTitleColor: "#4169e1", image: "../images/photos/j.png", itemTitleColor: "#32cd32", phone: "903-296-5810", title: "Jane Hammond" },
{ id: 90, parent: 0, isVisible: true, description: "President, Business Division", email: "jamenunn@name.com", groupTitleColor: "#4169e1", image: "../images/photos/k.png", itemTitleColor: "#ffa500", phone: "414-411-9368", title: "James Nunnally" },
{ id: 91, parent: 90, isVisible: true, description: "VP, Unified Communications Group", email: "shelnies@name.com", groupTitleColor: "#4169e1", image: "../images/photos/l.png", itemTitleColor: "#ffa500", phone: "757-289-6478", title: "Shelly Nies" },
{ id: 92, parent: 91, isVisible: true, description: "VP, Collaboration Server", email: "tommgonz@name.com", groupTitleColor: "#4169e1", image: "../images/photos/z.png", itemTitleColor: "#ffa500", phone: "561-741-0904", title: "Tommy Gonzalez" },
{ id: 93, parent: 91, isVisible: true, description: "VP, Distributed Meetings", email: "joanseth@name.com", groupTitleColor: "#4169e1", image: "../images/photos/b.png", itemTitleColor: "#ffa500", phone: "320-585-1870", title: "Joan Seth" },
{ id: 94, parent: 91, isVisible: true, description: "GM, Sales & Marketing", email: "johnspin@name.com", groupTitleColor: "#4169e1", image: "../images/photos/m.png", itemTitleColor: "#ffa500", phone: "615-531-3851", title: "John Spinks" },
{ id: 95, parent: 91, isVisible: true, description: "GM, Live Meeting Services", email: "charwern@name.com", groupTitleColor: "#4169e1", image: "../images/photos/q.png", itemTitleColor: "#ffa500", phone: "323-305-6987", title: "Charles Werner" },
{ id: 96, parent: 91, isVisible: true, description: "GM, Collaboration Marketing", email: "davihine@name.com", groupTitleColor: "#4169e1", image: "../images/photos/w.png", itemTitleColor: "#ffa500", phone: "580-934-0875", title: "David Hines" },
{ id: 97, parent: 91, isVisible: true, description: "GM, Worldwide Marketing & Business Development", email: "derrjohn@name.com", groupTitleColor: "#4169e1", image: "../images/photos/e.png", itemTitleColor: "#ffa500", phone: "305-211-4511", title: "Derrick Johnson" },
{ id: 98, parent: 90, isVisible: true, description: "VP, Information Worker Product Management Group (IWPMG)", email: "stevrick@name.com", groupTitleColor: "#4169e1", image: "../images/photos/r.png", itemTitleColor: "#ffa500", phone: "215-532-1237", title: "Steven Rickard" },
{ id: 99, parent: 98, isVisible: true, description: "GM, Business Strategy", email: "willholm@name.com", groupTitleColor: "#4169e1", image: "../images/photos/t.png", itemTitleColor: "#ffa500", phone: "317-788-4007", title: "William Holmes" },
{ id: 100, parent: 98, isVisible: true, description: "GM, Business Strategy", email: "jonawhit@name.com", groupTitleColor: "#4169e1", image: "../images/photos/y.png", itemTitleColor: "#ffa500", phone: "619-331-4876", title: "Jonathan White" },
{ id: 101, parent: 98, isVisible: true, description: "GM, Groove Product Management Group", email: "rondmill@name.com", groupTitleColor: "#4169e1", image: "../images/photos/u.png", itemTitleColor: "#ffa500", phone: "832-433-4367", title: "Ronda Miller" },
{ id: 102, parent: 98, isVisible: true, description: "GM, Information Worker Field and Partner Marketing", email: "donapowe@name.com", groupTitleColor: "#4169e1", image: "../images/photos/i.png", itemTitleColor: "#ffa500", phone: "973-210-6895", title: "Donald Powell" },
{ id: 103, parent: 98, isVisible: true, description: "GM, IW Product Management", email: "chriwint@name.com", groupTitleColor: "#4169e1", image: "../images/photos/p.png", itemTitleColor: "#ffa500", phone: "734-429-7943", title: "Christina Winters" },
{ id: 104, parent: 98, isVisible: true, description: "GM, Office System Product Management", email: "tiffscol@name.com", groupTitleColor: "#4169e1", image: "../images/photos/a.png", itemTitleColor: "#ffa500", phone: "503-223-8526", title: "Tiffany Scoles" },
{ id: 105, parent: 90, isVisible: true, description: "Chairman, MBS", email: "seanmill@name.com", groupTitleColor: "#4169e1", image: "../images/photos/s.png", itemTitleColor: "#ffa500", phone: "620-228-3102", title: "Sean Milligan" },
{ id: 106, parent: 90, isVisible: true, description: "VP, Office Business Applications", email: "franhowl@name.com", groupTitleColor: "#4169e1", image: "../images/photos/d.png", itemTitleColor: "#ffa500", phone: "918-516-8423", title: "Francis Howlett" },
{ id: 107, parent: 106, isVisible: true, description: "GM, Office Business Intelligence Applications", email: "edwaclar@name.com", groupTitleColor: "#4169e1", image: "../images/photos/f.png", itemTitleColor: "#ffa500", phone: "615-460-7145", title: "Edward Clark" },
{ id: 108, parent: 106, isVisible: true, description: "GM, Office Business Applications", email: "georwill@name.com", groupTitleColor: "#4169e1", image: "../images/photos/g.png", itemTitleColor: "#ffa500", phone: "315-665-6459", title: "George Williams" },
{ id: 109, parent: 106, isVisible: true, description: "GM, Name Office Business Applications", email: "bernhash@name.com", groupTitleColor: "#4169e1", image: "../images/photos/h.png", itemTitleColor: "#ffa500", phone: "202-334-2711", title: "Bernard Hash" },
{ id: 110, parent: 90, isVisible: true, description: "Sr. VP, Office", email: "andrplou@name.com", groupTitleColor: "#4169e1", image: "../images/photos/j.png", itemTitleColor: "#ffa500", phone: "781-878-1954", title: "Andrew Plourde" },
{ id: 111, parent: 110, isVisible: true, description: "VP, Office Shared Services Program Management", email: "edkief@name.com", groupTitleColor: "#4169e1", image: "../images/photos/k.png", itemTitleColor: "#ffa500", phone: "606-613-3945", title: "Ed Kieffer" },
{ id: 112, parent: 110, isVisible: true, description: "VP, Office Shared Services Test & Operations", email: "odellock@name.com", groupTitleColor: "#4169e1", image: "../images/photos/l.png", itemTitleColor: "#ffa500", phone: "417-229-2199", title: "Odelia Locker" },
{ id: 113, parent: 110, isVisible: true, description: "VP, Office Server Group", email: "johnsmit@name.com", groupTitleColor: "#4169e1", image: "../images/photos/z.png", itemTitleColor: "#ffa500", phone: "503-727-1970", title: "John Smith" },
{ id: 114, parent: 110, isVisible: true, description: "VP, Office Authoring Services", email: "jeffhawk@name.com", groupTitleColor: "#4169e1", image: "../images/photos/b.png", itemTitleColor: "#ffa500", phone: "513-273-8477", title: "Jeffrey Hawkins" },
{ id: 115, parent: 110, isVisible: true, description: "VP, Office Data & Business Intelligence Services", email: "wensutt@name.com", groupTitleColor: "#4169e1", image: "../images/photos/q.png", itemTitleColor: "#ffa500", phone: "317-390-2215", title: "Wen Sutton" },
{ id: 116, parent: 110, isVisible: true, description: "President & GM, Name Product Development Japan", email: "amypalo@name.com", groupTitleColor: "#4169e1", image: "../images/photos/w.png", itemTitleColor: "#ffa500", phone: "850-231-8168", title: "Amy Palomares" },
{ id: 117, parent: 110, isVisible: true, description: "GM, Office Management & Update Services", email: "briawynn@name.com", groupTitleColor: "#4169e1", image: "../images/photos/e.png", itemTitleColor: "#ffa500", phone: "570-455-4491", title: "Brian Wynne" },
{ id: 118, parent: 110, isVisible: true, description: "GM, Assistance & Worldwide Services", email: "nichgetz@name.com", groupTitleColor: "#4169e1", image: "../images/photos/r.png", itemTitleColor: "#ffa500", phone: "785-459-7906", title: "Nicholas Getz" },
{ id: 119, parent: 110, isVisible: true, description: "GM, Office Graphics Services", email: "jamimenj@name.com", groupTitleColor: "#4169e1", image: "../images/photos/y.png", itemTitleColor: "#ffa500", phone: "707-665-4284", title: "Jamila Menjivar" },
{ id: 120, parent: 110, isVisible: true, description: "GM, Office Communication Services", email: "chriwick@name.com", groupTitleColor: "#4169e1", image: "../images/photos/u.png", itemTitleColor: "#ffa500", phone: "330-562-1886", title: "Christy Wickline" },
{ id: 121, parent: 90, isVisible: true, description: "Sr. VP, Name Business Solutions (MBS)", email: "margwedd@name.com", groupTitleColor: "#4169e1", image: "../images/photos/i.png", itemTitleColor: "#ffa500", phone: "818-917-7110", title: "Marguerite Weddle" },
{ id: 122, parent: 121, isVisible: true, description: "VP, Business Development", email: "milaroma@name.com", groupTitleColor: "#4169e1", image: "../images/photos/o.png", itemTitleColor: "#ffa500", phone: "415-720-7283", title: "Milagros Roman" },
{ id: 123, parent: 121, isVisible: true, description: "Sr. VP, WW Small & Midmarket Solutions & Partners", email: "byroiron@name.com", groupTitleColor: "#4169e1", image: "../images/photos/a.png", itemTitleColor: "#ffa500", phone: "708-477-1975", title: "Byron Irons" },
{ id: 124, parent: 121, isVisible: true, description: "VP, Name Business Solutions", email: "patralle@name.com", groupTitleColor: "#4169e1", image: "../images/photos/t.png", itemTitleColor: "#ffa500", phone: "478-397-9217", title: "Patricia Allen" },
{ id: 125, parent: 121, isVisible: true, description: "CFO, MBS", email: "bobble@name.com", groupTitleColor: "#4169e1", image: "../images/photos/f.png", itemTitleColor: "#ffa500", phone: "989-727-0218", title: "Bobbi Le" },
{ id: 126, parent: 90, isVisible: true, description: "GM, IW New Markets Incubations", email: "cherbruc@name.com", groupTitleColor: "#4169e1", image: "../images/photos/g.png", itemTitleColor: "#ffa500", phone: "978-992-8399", title: "Cheryl Bruce" },
{ id: 127, parent: 90, isVisible: true, description: "GM, IW Adoption Group", email: "marcbarb@name.com", groupTitleColor: "#4169e1", image: "../images/photos/h.png", itemTitleColor: "#ffa500", phone: "425-233-0233", title: "Marc Barber" },
{ id: 128, parent: 90, isVisible: true, description: "CFO, Business Division", email: "charlips@name.com", groupTitleColor: "#4169e1", image: "../images/photos/j.png", itemTitleColor: "#ffa500", phone: "847-878-3093", title: "Charles Lipsey" },
{ id: 129, parent: 90, isVisible: true, description: "GM, Information Worker Services", email: "georcahi@name.com", groupTitleColor: "#4169e1", image: "../images/photos/k.png", itemTitleColor: "#ffa500", phone: "763-441-7062", title: "Georgina Cahill" },
{ id: 130, parent: 129, isVisible: true, description: "GM, Information Worker Services", email: "stacwhit@name.com", groupTitleColor: "#4169e1", image: "../images/photos/l.png", itemTitleColor: "#ffa500", phone: "859-461-8006", title: "Stacey White" },
{ id: 131, parent: 90, isVisible: true, description: "Business Manager, Business Division", email: "heatpowe@name.com", groupTitleColor: "#4169e1", image: "../images/photos/z.png", itemTitleColor: "#ffa500", phone: "931-200-4648", title: "Heather Powell" },
{ id: 132, parent: 0, isVisible: true, description: "Sr. VP & CFO", email: "franhuyn@name.com", groupTitleColor: "#4169e1", image: "../images/photos/x.png", itemTitleColor: "#E64848", phone: "404-347-5968", title: "Fran Huynh" },
{ id: 133, parent: 132, isVisible: true, description: "VP, Treasurer", email: "herbprui@name.com", groupTitleColor: "#4169e1", image: "../images/photos/c.png", itemTitleColor: "#E64848", phone: "339-226-1956", title: "Herbert Pruitt" },
{ id: 134, parent: 132, isVisible: true, description: "VP, Finance", email: "patrflem@name.com", groupTitleColor: "#4169e1", image: "../images/photos/v.png", itemTitleColor: "#E64848", phone: "217-376-3240", title: "Patricia Fleming" },
{ id: 135, parent: 134, isVisible: true, description: "VP, Worldwide Income Taxes", email: "harograv@name.com", groupTitleColor: "#4169e1", image: "../images/photos/b.png", itemTitleColor: "#E64848", phone: "804-524-1013", title: "Harold Graves" },
{ id: 136, parent: 134, isVisible: true, description: "Tax Counsel", email: "mikereye@name.com", groupTitleColor: "#4169e1", image: "../images/photos/n.png", itemTitleColor: "#E64848", phone: "908-575-1146", title: "Mike Reyes" },
{ id: 137, parent: 134, isVisible: true, description: "General Auditor", email: "florkuyk@name.com", groupTitleColor: "#4169e1", image: "../images/photos/m.png", itemTitleColor: "#E64848", phone: "407-419-2452", title: "Florence Kuykendall" },
{ id: 138, parent: 132, isVisible: true, description: "VP, Corp. Strategy Planning & Analysis", email: "jessgood@name.com", groupTitleColor: "#4169e1", image: "../images/photos/q.png", itemTitleColor: "#E64848", phone: "512-986-9095", title: "Jessica Goodwin" },
{ id: 139, parent: 138, isVisible: true, description: "GM, Corporate Forecasting", email: "timmccr@name.com", groupTitleColor: "#4169e1", image: "../images/photos/w.png", itemTitleColor: "#E64848", phone: "270-748-0925", title: "Tim McCracken" },
{ id: 140, parent: 138, isVisible: true, description: "GM, Venture Integration", email: "everthom@name.com", groupTitleColor: "#4169e1", image: "../images/photos/e.png", itemTitleColor: "#E64848", phone: "701-250-2141", title: "Everett Thompson" },
{ id: 141, parent: 132, isVisible: true, description: "VP, Finance & Administration and Chief Accounting Officer", email: "gailshar@name.com", groupTitleColor: "#4169e1", image: "../images/photos/r.png", itemTitleColor: "#E64848", phone: "408-492-6216", title: "Gail Sharpless" },
{ id: 142, parent: 141, isVisible: true, description: "Controller, Corporate Services and HR", email: "christjo@name.com", groupTitleColor: "#4169e1", image: "../images/photos/t.png", itemTitleColor: "#E64848", phone: "734-272-4201", title: "Christopher Stjohn" },
{ id: 143, parent: 141, isVisible: true, description: "GM, Corporate Services", email: "willyoun@name.com", groupTitleColor: "#4169e1", image: "../images/photos/y.png", itemTitleColor: "#E64848", phone: "203-238-6625", title: "William Young" },
{ id: 144, parent: 141, isVisible: true, description: "Controller, LCA and Exec. Finance", email: "donhubb@name.com", groupTitleColor: "#4169e1", image: "../images/photos/i.png", itemTitleColor: "#E64848", phone: "361-234-6292", title: "Don Hubbard" },
{ id: 145, parent: 141, isVisible: true, description: "Assistant Corporate Controller", email: "thommoor@name.com", groupTitleColor: "#4169e1", image: "../images/photos/o.png", itemTitleColor: "#E64848", phone: "469-713-2162", title: "Thomas Moore" },
{ id: 146, parent: 141, isVisible: true, description: "Controller, Global Platforms & Operations", email: "hazenewt@name.com", groupTitleColor: "#4169e1", image: "../images/photos/p.png", itemTitleColor: "#E64848", phone: "386-672-7474", title: "Hazel Newton" },
{ id: 147, parent: 132, isVisible: true, description: "Managing Dir., Corporate Development", email: "robegray@name.com", groupTitleColor: "#4169e1", image: "../images/photos/a.png", itemTitleColor: "#E64848", phone: "860-894-8438", title: "Robert Gray" },
{ id: 148, parent: 0, isVisible: true, description: "Sr. VP, Strategy & Partnerships", email: "harrhart@name.com", groupTitleColor: "#4169e1", image: "../images/photos/s.png", itemTitleColor: "#808000", phone: "270-991-8539", title: "Harry Harter" },
{ id: 149, parent: 148, isVisible: true, description: "Sr. VP, Human Resources", email: "krisnels@name.com", groupTitleColor: "#4169e1", image: "../images/photos/h.png", itemTitleColor: "#B800E6", phone: "803-675-6422", title: "Kristen Nelson" },
{ id: 150, parent: 149, isVisible: true, description: "VP, People & Organizational Capability", email: "helekram@name.com", groupTitleColor: "#4169e1", image: "../images/photos/j.png", itemTitleColor: "#B800E6", phone: "941-359-8120", title: "Helen Kramer" },
{ id: 151, parent: 150, isVisible: true, description: "GM, Corporate Learning and Development", email: "michsamu@name.com", groupTitleColor: "#4169e1", image: "../images/photos/k.png", itemTitleColor: "#B800E6", phone: "203-250-0167", title: "Michael Samuels" },
{ id: 152, parent: 149, isVisible: true, description: "GM, Diversity & Inclusion", email: "tashwrig@name.com", groupTitleColor: "#4169e1", image: "../images/photos/l.png", itemTitleColor: "#B800E6", phone: "347-601-9047", title: "Tasha Wright" },
{ id: 153, parent: 149, isVisible: true, description: "GM, HR", email: "elenmars@name.com", groupTitleColor: "#4169e1", image: "../images/photos/z.png", itemTitleColor: "#B800E6", phone: "309-765-7809", title: "Elena Marshall" },
{ id: 154, parent: 149, isVisible: true, description: "GM, SMSG & International HR", email: "artibrya@name.com", groupTitleColor: "#4169e1", image: "../images/photos/x.png", itemTitleColor: "#B800E6", phone: "315-538-4477", title: "Artie Bryan" },
{ id: 155, parent: 154, isVisible: true, description: "GM, HR International", email: "samupier@name.com", groupTitleColor: "#4169e1", image: "../images/photos/c.png", itemTitleColor: "#B800E6", phone: "469-392-2461", title: "Samuel Pierce" },
{ id: 156, parent: 149, isVisible: true, description: "GM, HR", email: "jennmend@name.com", groupTitleColor: "#4169e1", image: "../images/photos/v.png", itemTitleColor: "#B800E6", phone: "724-234-8576", title: "Jennifer Mendez" },
{ id: 157, parent: 149, isVisible: true, description: "GM, Global Compensation & Benefits", email: "audrwhit@name.com", groupTitleColor: "#4169e1", image: "../images/photos/b.png", itemTitleColor: "#B800E6", phone: "602-725-4528", title: "Audra White" },
{ id: 158, parent: 149, isVisible: true, description: "GM, Talent Acquisition and Engagement", email: "mablbatc@name.com", groupTitleColor: "#4169e1", image: "../images/photos/n.png", itemTitleColor: "#B800E6", phone: "903-381-3079", title: "Mable Batchelder" },
{ id: 159, parent: 149, isVisible: true, description: "GM, HR", email: "terrwith@name.com", groupTitleColor: "#4169e1", image: "../images/photos/m.png", itemTitleColor: "#B800E6", phone: "231-924-8671", title: "Terry Witherspoon" },
{ id: 160, parent: 149, isVisible: true, description: "GM, HR", email: "cyntdens@name.com", groupTitleColor: "#4169e1", image: "../images/photos/q.png", itemTitleColor: "#B800E6", phone: "503-419-7674", title: "Cynthia Denson" }
];

function enumerateTitles() {
	for (var index = 0; index < data.length; index += 1) {
		var item = data[index];

		item.title = item.id + " " + item.title;
	}
}

//enumerateTitles();

var links = [
	{ fromItem: 0, toItem: 148, color: primitives.common.Colors.Red, connectorShapeType: primitives.common.ConnectorShapeType.OneWay, lineType: primitives.common.LineType.Dashed },
	{ fromItem: 0, toItem: 150, color: primitives.common.Colors.Blue, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Dotted },
	{ fromItem: 0, toItem: 90, color: primitives.common.Colors.Green, connectorShapeType: primitives.common.ConnectorShapeType.TwoWay, lineType: primitives.common.LineType.Solid },
	{ fromItem: 0, toItem: 75, color: primitives.common.Colors.Green, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Solid },

	{ fromItem: 75, toItem: 90, color: primitives.common.Colors.Red, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Dashed },
	{ fromItem: 75, toItem: 90, color: primitives.common.Colors.Blue, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Dashed },
	{ fromItem: 75, toItem: 90, color: primitives.common.Colors.Green, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Solid },

	{ fromItem: 1, toItem: 45, color: primitives.common.Colors.Blue, connectorShapeType: primitives.common.ConnectorShapeType.OneWay, lineType: primitives.common.LineType.Dashed },
	{ fromItem: 1, toItem: 75, color: primitives.common.Colors.Green, connectorShapeType: primitives.common.ConnectorShapeType.TwoWay, lineType: primitives.common.LineType.Solid },
	{ fromItem: 1, toItem: 90, color: primitives.common.Colors.Cyan, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Dashed },

	{ fromItem: 148, toItem: 149, color: primitives.common.Colors.Blue, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Solid },
	{ fromItem: 148, toItem: 149, color: primitives.common.Colors.Green, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Dotted },

	{ fromItem: 90, toItem: 149, color: primitives.common.Colors.Blue, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Solid },
	{ fromItem: 149, toItem: 90, color: primitives.common.Colors.Green, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Dotted },
	{ fromItem: 150, toItem: 149, color: primitives.common.Colors.Blue, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Solid },
	{ fromItem: 149, toItem: 150, color: primitives.common.Colors.Green, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Dotted },
	{ fromItem: 156, toItem: 149, color: primitives.common.Colors.Blue, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Solid },
	{ fromItem: 149, toItem: 156, color: primitives.common.Colors.Green, connectorShapeType: primitives.common.ConnectorShapeType.TwoWay, lineType: primitives.common.LineType.Dotted },


	{ fromItem: 75, toItem: 52, color: primitives.common.Colors.Green, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Dashed },
	{ fromItem: 52, toItem: 63, color: primitives.common.Colors.Green, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Dashed },
	{ fromItem: 63, toItem: 79, color: primitives.common.Colors.Green, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Dashed },
	{ fromItem: 63, toItem: 40, color: primitives.common.Colors.Green, connectorShapeType: primitives.common.ConnectorShapeType.BothWay, lineType: primitives.common.LineType.Dashed }
];

var annotations = [];
var annotationsHash = {};

function convertLinksToAnnotations() {
	for (var index = 0; index < links.length; index += 1) {
		var link = links[index];

		var annotation = new primitives.orgdiagram.ConnectorAnnotationConfig(link.fromItem, link.toItem);
		annotation.id = index;
		annotation.selectItems = true;
		annotation.lineType = link.lineType;
		annotation.color = link.color;
		annotation.connectorPlacementType = primitives.common.ConnectorPlacementType.Straight;
		annotation.connectorShapeType = link.connectorShapeType;

		if (annotationsHash.hasOwnProperty(link.fromItem)) {
			annotationsHash[link.fromItem].push(annotation);
		} else {
			annotationsHash[link.fromItem] = [annotation];
		}

		if (annotationsHash.hasOwnProperty(link.toItem)) {
			annotationsHash[link.toItem].push(annotation);
		} else {
			annotationsHash[link.toItem] = [annotation];
		}
	};
}

convertLinksToAnnotations();
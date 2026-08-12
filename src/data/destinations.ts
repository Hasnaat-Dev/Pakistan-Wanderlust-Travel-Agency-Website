import hunza from "@/assets/hunza.jpg";
import skardu from "@/assets/skardu.jpg";
import fairyMeadows from "@/assets/fairy-meadows.jpg";
import swat from "@/assets/swat.jpg";
import lahore from "@/assets/lahore.jpg";
import desert from "@/assets/desert.jpg";
import coast from "@/assets/coast.jpg";
import islamabad from "@/assets/islamabad.jpg";

export const REGIONS = [
  "Northern Areas",
  "Cultural & Historical",
  "Coastal & South",
  "Hill Stations",
  "Desert",
] as const;

export type Region = (typeof REGIONS)[number];

export type Destination = {
  slug: string;
  name: string;
  region: Region;
  short: string;
  overview: string;
  bestTime: string;
  howToReach: string;
  highlights: string[];
  image: string;
  /** [lat, lng] used for the OpenStreetMap embed */
  coords: [number, number];
  featured?: boolean;
};

/**
 * Single source of truth for every destination page. The `/destinations/$slug`
 * route is one reusable template driven entirely by this list.
 */
export const destinations: Destination[] = [
  {
    slug: "hunza-valley",
    name: "Hunza Valley",
    region: "Northern Areas",
    short: "Apricot blossoms, thousand-year-old forts and seven-thousanders on every horizon.",
    overview:
      "Cradled between the Karakoram giants, Hunza is the valley that turned Pakistan into a bucket-list country. Terraced orchards climb toward Rakaposhi, Baltit and Altit forts watch over stone villages, and the hospitality of the Wakhi and Burusho people is legendary.",
    bestTime: "April for cherry and apricot blossom, September–October for autumn gold.",
    howToReach: "A 2-hour flight to Gilgit then 2.5 hours by road, or 20 hours along the Karakoram Highway from Islamabad.",
    highlights: ["Baltit & Altit Forts", "Attabad Lake boating", "Eagle's Nest sunrise", "Passu Cones", "Karimabad bazaar"],
    image: hunza,
    coords: [36.3167, 74.65],
    featured: true,
  },
  {
    slug: "skardu",
    name: "Skardu",
    region: "Northern Areas",
    short: "A cold desert of turquoise rivers, alpine lakes and the gateway to K2.",
    overview:
      "Skardu sits where the Indus widens into silver sand flats beneath granite walls. It is basecamp for Baltistan: Shangrila and Upper Kachura lakes, the Katpana cold desert, Shigar and Khaplu palaces, and the trailhead to K2 and Concordia.",
    bestTime: "May to October; roads and treks are reliably open.",
    howToReach: "Direct flights from Islamabad (55 min) or a 6-hour drive from Gilgit.",
    highlights: ["Shangrila Lake", "Katpana cold desert", "Shigar Fort", "Deosai day trip", "Manthokha Waterfall"],
    image: skardu,
    coords: [35.2971, 75.6333],
    featured: true,
  },
  {
    slug: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Northern Areas",
    short: "A green alpine balcony staring straight at Nanga Parbat's killer face.",
    overview:
      "Reached by jeep track and a walk through pine forest, Fairy Meadows is a soft carpet of grass with the ninth-highest mountain on earth filling the sky. Nights are for star fields; mornings are for the Nanga Parbat basecamp trail.",
    bestTime: "June to September, when the jeep track and huts are open.",
    howToReach: "Drive to Raikot Bridge on the KKH, jeep to Tato, then a 3-hour hike or pony ride.",
    highlights: ["Nanga Parbat viewpoint", "Beyal Camp trek", "Basecamp day hike", "Astrophotography nights"],
    image: fairyMeadows,
    coords: [35.3878, 74.5786],
    featured: true,
  },
  {
    slug: "swat-valley",
    name: "Swat Valley",
    region: "Northern Areas",
    short: "The Switzerland of the East — rice terraces, trout rivers and Buddhist ruins.",
    overview:
      "Swat layers Gandhara-era stupas under pine ridges and emerald rice terraces. Malam Jabba skis in winter, Kalam and Ushu forest cool the summer, and the Swat River runs a startling green through it all.",
    bestTime: "March–May and September–November; December–February for snow at Malam Jabba.",
    howToReach: "5 hours by motorway from Islamabad via the Swat Expressway.",
    highlights: ["Kalam & Ushu Forest", "Malam Jabba", "Mahodand Lake", "Butkara Stupa", "White Palace, Marghazar"],
    image: swat,
    coords: [35.2227, 72.4258],
    featured: true,
  },
  {
    slug: "naran-kaghan",
    name: "Naran Kaghan",
    region: "Northern Areas",
    short: "Saif-ul-Malook's glacial blue and the high drama of Babusar Top.",
    overview:
      "The Kaghan Valley climbs from pine forest to alpine tundra in a single day's drive, ending at Babusar Pass. Lake Saif-ul-Malook, fed by the Malika Parbat glacier, is the most photographed water in Pakistan.",
    bestTime: "June to September; Babusar Top closes with the first snow.",
    howToReach: "6–7 hours by road from Islamabad via Balakot.",
    highlights: ["Lake Saif-ul-Malook", "Babusar Top", "Lulusar Lake", "Ansoo Lake trek"],
    image: fairyMeadows,
    coords: [34.9042, 73.6503],
  },
  {
    slug: "gilgit",
    name: "Gilgit",
    region: "Northern Areas",
    short: "The old Silk Route crossroads where three great ranges collide.",
    overview:
      "Gilgit is the hinge of the north: the Karakoram, Himalaya and Hindu Kush meet nearby, and the bazaar still trades the way caravans once did. It is the practical basecamp for Hunza, Naltar and Phander.",
    bestTime: "April to October.",
    howToReach: "Daily flights from Islamabad, or the Karakoram Highway.",
    highlights: ["Kargah Buddha", "Naltar Valley lakes", "Junction of three ranges", "Rakaposhi viewpoint"],
    image: skardu,
    coords: [35.9208, 74.3083],
  },
  {
    slug: "deosai-plains",
    name: "Deosai Plains",
    region: "Northern Areas",
    short: "The Land of Giants — a 4,100 m plateau of wildflowers and brown bears.",
    overview:
      "The second-highest plateau on earth stays frozen most of the year, then explodes into wildflowers for a brief summer. Himalayan brown bears, marmots and Sheosar Lake's mirror surface make it a national park like nowhere else.",
    bestTime: "Late June to early September only.",
    howToReach: "4x4 from Skardu (2.5 hours) or from Astore side.",
    highlights: ["Sheosar Lake", "Brown bear spotting", "Bara Pani camp", "Wildflower season"],
    image: skardu,
    coords: [34.9667, 75.4333],
  },
  {
    slug: "neelum-valley",
    name: "Neelum Valley",
    region: "Northern Areas",
    short: "A 200 km ribbon of forest, waterfalls and river-side villages.",
    overview:
      "Neelum follows its river through Kashmir's greenest country: Keran, Sharda's ancient university ruins, Arang Kel perched on a shelf above the valley, and Ratti Gali's alpine lake.",
    bestTime: "May to September; Arang Kel is best in summer.",
    howToReach: "4 hours from Muzaffarabad, 8 from Islamabad.",
    highlights: ["Arang Kel", "Ratti Gali Lake", "Sharda ruins", "Kutton waterfalls"],
    image: swat,
    coords: [34.5883, 73.9075],
  },
  {
    slug: "chitral-kalash",
    name: "Chitral & Kalash Valleys",
    region: "Northern Areas",
    short: "Hindu Kush passes and the living pagan culture of the Kalasha people.",
    overview:
      "Beyond Lowari Tunnel, Chitral opens under Tirich Mir. The three Kalash valleys — Bumburet, Rumbur and Birir — hold a pre-Islamic culture whose festivals of Chilam Joshi and Uchal are unlike anything else in South Asia.",
    bestTime: "May (Chilam Joshi festival) and September.",
    howToReach: "Flights to Chitral from Islamabad, or 12 hours by road via Lowari Tunnel.",
    highlights: ["Bumburet & Rumbur", "Chilam Joshi festival", "Tirich Mir views", "Shandur Pass"],
    image: swat,
    coords: [35.8518, 71.7864],
  },
  {
    slug: "shogran",
    name: "Shogran",
    region: "Hill Stations",
    short: "A pine plateau with Siri Paye's meadow lakes an hour above.",
    overview:
      "Shogran is the easy alpine escape of the Kaghan valley: a forested plateau at 2,362 m, with the jeep ride to Siri Paye meadows delivering one of the most photographed views in the country.",
    bestTime: "April to October, snow in winter.",
    howToReach: "5 hours from Islamabad via Balakot and Kiwai.",
    highlights: ["Siri Paye meadows", "Makra Peak trek", "Pine forest walks"],
    image: fairyMeadows,
    coords: [34.6333, 73.45],
  },
  {
    slug: "khunjerab-pass",
    name: "Khunjerab Pass",
    region: "Northern Areas",
    short: "The highest paved border crossing on earth, at 4,693 metres.",
    overview:
      "The Karakoram Highway's crescendo. Khunjerab tops out on the Pakistan–China border inside a national park where snow leopards, ibex and Marco Polo sheep roam.",
    bestTime: "May to October; the pass closes in winter.",
    howToReach: "3 hours by road from Hunza via Sost.",
    highlights: ["Border marker at 4,693 m", "Khunjerab National Park wildlife", "Passu Glacier en route"],
    image: hunza,
    coords: [36.8511, 75.4269],
  },
  {
    slug: "attabad-lake",
    name: "Attabad Lake",
    region: "Northern Areas",
    short: "Impossible turquoise water born from a 2010 landslide.",
    overview:
      "A mountainside collapse dammed the Hunza River and created a 21 km lake of unreal blue. Today it is Pakistan's adventure-water hub: jet skis, boat rides and cliffside resorts under the Passu Cones.",
    bestTime: "April to October.",
    howToReach: "40 minutes by road from Karimabad on the KKH.",
    highlights: ["Boat and jet-ski rides", "Hussaini suspension bridge", "Passu Cones viewpoint"],
    image: hunza,
    coords: [36.3411, 74.8664],
    featured: true,
  },
  {
    slug: "lahore",
    name: "Lahore",
    region: "Cultural & Historical",
    short: "Mughal grandeur, walled-city food streets and the beating heart of Punjab.",
    overview:
      "Badshahi Mosque and Lahore Fort face each other across Hazuri Bagh; Shalimar Gardens still runs its Mughal water channels. Between them lie the Walled City's havelis, Wazir Khan Mosque's tilework and the best food in Pakistan.",
    bestTime: "October to March.",
    howToReach: "Daily flights and a 4-hour motorway drive from Islamabad.",
    highlights: ["Badshahi Mosque", "Lahore Fort", "Wazir Khan Mosque", "Walled City food street", "Shalimar Gardens"],
    image: lahore,
    coords: [31.5883, 74.3107],
    featured: true,
  },
  {
    slug: "mohenjo-daro",
    name: "Mohenjo-daro",
    region: "Cultural & Historical",
    short: "A 4,500-year-old Indus Valley metropolis with drains older than Rome.",
    overview:
      "The Mound of the Dead is one of the earliest planned cities on earth: grid streets, a Great Bath, granaries and a sanitation system that predates most of the ancient world. A UNESCO World Heritage Site in Sindh.",
    bestTime: "November to February.",
    howToReach: "Fly to Sukkur or Moenjodaro airstrip, then a short drive from Larkana.",
    highlights: ["The Great Bath", "Stupa Mound", "Site museum", "Indus Valley grid streets"],
    image: desert,
    coords: [27.3294, 68.1386],
  },
  {
    slug: "taxila",
    name: "Taxila",
    region: "Cultural & Historical",
    short: "Gandhara's Buddhist heartland and an ancient university city.",
    overview:
      "Taxila strings together Greek, Buddhist and Kushan cities across one valley: Sirkap's grid, the Dharmarajika stupa, Jaulian monastery on its hill, and a museum of exceptional Gandhara sculpture.",
    bestTime: "October to March.",
    howToReach: "45 minutes by road from Islamabad.",
    highlights: ["Dharmarajika Stupa", "Jaulian Monastery", "Sirkap city", "Taxila Museum"],
    image: islamabad,
    coords: [33.7463, 72.7869],
  },
  {
    slug: "multan",
    name: "Multan",
    region: "Cultural & Historical",
    short: "The City of Saints — blue-tiled shrines and Sufi qawwali nights.",
    overview:
      "Multan's skyline is a set of turquoise domes: Shah Rukn-e-Alam, Bahauddin Zakariya and Shams Sabzwari. The old city's bazaars trade in blue pottery, camel-skin lamps and mangoes.",
    bestTime: "November to February.",
    howToReach: "Daily flights from Karachi and Islamabad; on the M4/M5 motorway network.",
    highlights: ["Shah Rukn-e-Alam shrine", "Multan Fort mound", "Blue pottery workshops", "Thursday qawwali"],
    image: desert,
    coords: [30.1575, 71.5249],
  },
  {
    slug: "makli-necropolis",
    name: "Makli Necropolis",
    region: "Cultural & Historical",
    short: "A million graves across ten square kilometres of carved stone.",
    overview:
      "One of the largest funerary sites on earth, Makli's tombs and mausolea near Thatta record 400 years of Sindhi, Persian and Mughal craftsmanship in sandstone and glazed tile.",
    bestTime: "November to February.",
    howToReach: "1.5 hours by road from Karachi.",
    highlights: ["Jam Nizamuddin's tomb", "Isa Khan Tarkhan mausoleum", "Shah Jahan Mosque, Thatta"],
    image: desert,
    coords: [24.7667, 67.9],
  },
  {
    slug: "rohtas-fort",
    name: "Rohtas Fort",
    region: "Cultural & Historical",
    short: "Sher Shah Suri's unconquered 16th-century garrison fortress.",
    overview:
      "Four kilometres of walls, twelve monumental gates and bastions that were never taken by storm. Rohtas is a UNESCO site sitting in the Potohar hills near Jhelum.",
    bestTime: "October to March.",
    howToReach: "2 hours by motorway from Islamabad, exit at Dina.",
    highlights: ["Sohail Gate", "Haveli Man Singh", "The Great Wall walk", "Kabuli Gate"],
    image: lahore,
    coords: [32.9667, 73.5786],
  },
  {
    slug: "karachi",
    name: "Karachi Beaches",
    region: "Coastal & South",
    short: "Arabian Sea sunsets, seafood shacks and a megacity's colonial spine.",
    overview:
      "Karachi hides good coastline: French Beach and Sandspit for swimming and turtles, Manora for the lighthouse, Churna Island for diving — plus Empress Market, Mohatta Palace and the best street food in Sindh.",
    bestTime: "November to March.",
    howToReach: "Pakistan's largest international airport.",
    highlights: ["French Beach", "Churna Island diving", "Manora Island", "Mohatta Palace", "Burns Road food"],
    image: coast,
    coords: [24.8607, 67.0011],
  },
  {
    slug: "gwadar",
    name: "Gwadar",
    region: "Coastal & South",
    short: "A hammerhead peninsula of pale cliffs and empty white beaches.",
    overview:
      "Gwadar's Koh-e-Batil headland drops into clear water, with Astola Island offshore and the Makran Coastal Highway delivering one of the great drives in Asia.",
    bestTime: "November to February.",
    howToReach: "Flights from Karachi, or 10 hours along the Makran Coastal Highway.",
    highlights: ["Astola Island", "Koh-e-Batil cliffs", "Makran Coastal Highway", "Padi Zirr west bay"],
    image: coast,
    coords: [25.1264, 62.3225],
  },
  {
    slug: "hingol-national-park",
    name: "Hingol National Park",
    region: "Coastal & South",
    short: "Mud volcanoes, the Princess of Hope and Balochistan's badlands.",
    overview:
      "Pakistan's largest national park runs desert canyons down to the sea. Wind-sculpted formations, the Chandragup mud volcano, Hinglaj Mata temple and crocodile-bearing river mouths.",
    bestTime: "November to February.",
    howToReach: "4 hours west of Karachi on the Makran Coastal Highway.",
    highlights: ["Princess of Hope", "Chandragup mud volcano", "Hinglaj Mata temple", "Buzi Pass"],
    image: coast,
    coords: [25.5122, 65.4753],
  },
  {
    slug: "islamabad",
    name: "Islamabad",
    region: "Hill Stations",
    short: "A green capital tucked into the Margalla foothills.",
    overview:
      "Faisal Mosque under forested hills, Daman-e-Koh and Pir Sohawa overlooks, Trail 5 hikes, Rawal Lake and the Saidpur village restaurants. The natural first and last night of any Pakistan itinerary.",
    bestTime: "Year-round; spring and autumn are best.",
    howToReach: "Islamabad International Airport, the country's main gateway.",
    highlights: ["Faisal Mosque", "Margalla Trail 5", "Daman-e-Koh", "Saidpur Village", "Pakistan Monument"],
    image: islamabad,
    coords: [33.6844, 73.0479],
    featured: true,
  },
  {
    slug: "murree",
    name: "Murree",
    region: "Hill Stations",
    short: "The colonial-era hill station an hour from the capital.",
    overview:
      "Mall Road, pine ridges and the Patriata chairlift. Murree is the easiest snow in Pakistan and the gateway to the quieter Galiyat.",
    bestTime: "December–February for snow, April–June to escape the heat.",
    howToReach: "1.5 hours by expressway from Islamabad.",
    highlights: ["Mall Road", "Patriata chairlift", "Pindi Point", "Winter snowfall"],
    image: islamabad,
    coords: [33.9042, 73.3903],
  },
  {
    slug: "nathia-gali",
    name: "Nathia Gali",
    region: "Hill Stations",
    short: "Cedar forest walks with Nanga Parbat visible on a clear day.",
    overview:
      "The finest of the Galiyat: the Pipeline Track through cedar and fir, Mukshpuri and Miranjani summits, and colonial churches under a canopy of green.",
    bestTime: "April to October.",
    howToReach: "2.5 hours from Islamabad via Murree or the Abbottabad road.",
    highlights: ["Pipeline Track", "Mukshpuri summit", "Miranjani trek", "Governor's House gardens"],
    image: swat,
    coords: [34.0703, 73.3872],
  },
  {
    slug: "cholistan-desert",
    name: "Cholistan Desert",
    region: "Desert",
    short: "Rolling ochre dunes, nomad camps and the Rohi's folk music.",
    overview:
      "Cholistan stretches from Bahawalpur to the Indian border: camel caravans, mud-brick wells built along a dried Hakra riverbed, and February's roaring Cholistan Desert Jeep Rally.",
    bestTime: "November to February.",
    howToReach: "Fly or drive to Bahawalpur, then 4x4 into the desert.",
    highlights: ["Desert jeep safari", "Nomad settlements", "Cholistan Jeep Rally", "Night camping under dunes"],
    image: desert,
    coords: [28.5, 71.75],
  },
  {
    slug: "derawar-fort",
    name: "Derawar Fort",
    region: "Desert",
    short: "Forty circular bastions rising 30 metres out of the sand.",
    overview:
      "Visible for 40 km across Cholistan, Derawar's mud-brick drum towers guard the Abbasi royal necropolis and a marble mosque modelled on Delhi's Moti Masjid.",
    bestTime: "November to February, ideally at sunset.",
    howToReach: "2 hours by 4x4 from Bahawalpur.",
    highlights: ["The 40 bastions", "Abbasi royal cemetery", "Derawar Mosque", "Sunset photography"],
    image: desert,
    coords: [28.7675, 71.3331],
    featured: true,
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);

export const featuredDestinations = destinations.filter((d) => d.featured);
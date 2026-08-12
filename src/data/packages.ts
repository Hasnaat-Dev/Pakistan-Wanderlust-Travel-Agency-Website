import hunza from "@/assets/hunza.jpg";
import skardu from "@/assets/skardu.jpg";
import fairyMeadows from "@/assets/fairy-meadows.jpg";
import swat from "@/assets/swat.jpg";
import lahore from "@/assets/lahore.jpg";
import desert from "@/assets/desert.jpg";

export type Difficulty = "Easy" | "Moderate" | "Challenging";

export type TourPackage = {
  slug: string;
  name: string;
  region: string;
  /** Nights on the road */
  days: number;
  /** Per person, in PKR */
  price: number;
  difficulty: Difficulty;
  summary: string;
  image: string;
  destinations: string[];
  includes: string[];
  excludes: string[];
  itinerary: { day: number; title: string; detail: string }[];
  breakdown: { label: string; amount: number }[];
  featured?: boolean;
};

export const packages: TourPackage[] = [
  {
    slug: "hunza-karakoram-classic",
    name: "Hunza & Karakoram Classic",
    region: "Northern Areas",
    days: 8,
    price: 189000,
    difficulty: "Easy",
    summary:
      "The definitive first trip to the north: Karimabad's forts, Attabad's blue water, Passu Cones and the Khunjerab border.",
    image: hunza,
    destinations: ["hunza-valley", "attabad-lake", "khunjerab-pass", "gilgit"],
    includes: [
      "7 nights in hand-picked hotels and guesthouses",
      "All ground transport in a private 4x4 or coaster",
      "Daily breakfast and dinner",
      "English-speaking mountain guide",
      "Khunjerab National Park permits",
      "Airport and hotel transfers",
    ],
    excludes: ["Domestic flights to Gilgit", "Lunches and personal expenses", "Travel insurance", "Tips for crew"],
    itinerary: [
      { day: 1, title: "Islamabad arrival", detail: "Meet your guide, evening at Monal above the Margalla Hills, trip briefing." },
      { day: 2, title: "Fly to Gilgit, drive to Hunza", detail: "Morning flight over Nanga Parbat, then the KKH along the Hunza River to Karimabad." },
      { day: 3, title: "Karimabad forts", detail: "Baltit and Altit forts, the royal garden, Karimabad bazaar and sunset at Duikar." },
      { day: 4, title: "Attabad & Passu", detail: "Boat ride on Attabad Lake, Hussaini suspension bridge and Passu Glacier viewpoint." },
      { day: 5, title: "Khunjerab Pass", detail: "Drive to the 4,693 m Pakistan–China border through Khunjerab National Park." },
      { day: 6, title: "Rakaposhi basecamp walk", detail: "A gentle 3-hour walk from Minapin to the glacier viewpoint, return to Hunza." },
      { day: 7, title: "Hunza to Gilgit", detail: "Kargah Buddha, Gilgit bazaar and the Junction of Three Mountain Ranges." },
      { day: 8, title: "Fly home", detail: "Morning flight to Islamabad and onward transfer." },
    ],
    breakdown: [
      { label: "Accommodation (7 nights)", amount: 84000 },
      { label: "Private transport & fuel", amount: 52000 },
      { label: "Meals (breakfast & dinner)", amount: 28000 },
      { label: "Guide & permits", amount: 25000 },
    ],
    featured: true,
  },
  {
    slug: "skardu-baltistan-expedition",
    name: "Skardu & Baltistan Expedition",
    region: "Northern Areas",
    days: 7,
    price: 175000,
    difficulty: "Moderate",
    summary: "Cold deserts, Shangrila's lakes, Khaplu's palace and a full day across the Deosai plateau.",
    image: skardu,
    destinations: ["skardu", "deosai-plains"],
    includes: [
      "6 nights including a Deosai night in deluxe tents",
      "4x4 Land Cruisers with experienced Balti drivers",
      "All meals on the plateau",
      "National park fees",
      "Naturalist guide for wildlife spotting",
    ],
    excludes: ["Flights to Skardu", "Alcohol-free beverages beyond meals", "Insurance", "Porterage"],
    itinerary: [
      { day: 1, title: "Fly to Skardu", detail: "Scenic flight along Nanga Parbat, settle in on the Indus bank." },
      { day: 2, title: "Lakes day", detail: "Upper Kachura, Shangrila Lake and the Katpana cold desert at sunset." },
      { day: 3, title: "Shigar Valley", detail: "Shigar Fort, Amburiq Mosque and the Blind Lake." },
      { day: 4, title: "Khaplu", detail: "Drive along the Shyok to Khaplu Palace and Chaqchan Mosque." },
      { day: 5, title: "Deosai crossing", detail: "4x4 onto the plateau, Bara Pani camp, brown bear and marmot spotting." },
      { day: 6, title: "Sheosar Lake", detail: "Sunrise over Sheosar, return to Skardu via Sadpara." },
      { day: 7, title: "Departure", detail: "Morning flight back to Islamabad." },
    ],
    breakdown: [
      { label: "Accommodation & camping", amount: 70000 },
      { label: "4x4 transport", amount: 55000 },
      { label: "Meals", amount: 26000 },
      { label: "Guide & park fees", amount: 24000 },
    ],
    featured: true,
  },
  {
    slug: "fairy-meadows-trek",
    name: "Fairy Meadows & Nanga Parbat Trek",
    region: "Northern Areas",
    days: 6,
    price: 145000,
    difficulty: "Challenging",
    summary: "Jeep track, pine forest, and two days walking toward the Killer Mountain's basecamp.",
    image: fairyMeadows,
    destinations: ["fairy-meadows"],
    includes: [
      "5 nights in log huts and a basecamp tent night",
      "Raikot jeep transfers and porter support",
      "All meals during the trek",
      "Certified trekking guide and first-aid kit",
    ],
    excludes: ["Personal trekking gear", "Helicopter evacuation cover", "Tips", "Flights"],
    itinerary: [
      { day: 1, title: "Islamabad to Chilas", detail: "Drive the KKH through Besham and the Indus gorge." },
      { day: 2, title: "Raikot to Fairy Meadows", detail: "The famous jeep track, then a 3-hour walk to the meadow huts." },
      { day: 3, title: "Beyal Camp", detail: "Acclimatisation walk through pine forest to Beyal with Nanga Parbat in full view." },
      { day: 4, title: "Nanga Parbat basecamp", detail: "Full-day trek to the glacier and the Herrligkoffer basecamp memorial." },
      { day: 5, title: "Descend to Chilas", detail: "Walk down to Tato, jeep to Raikot Bridge, drive to Chilas." },
      { day: 6, title: "Return to Islamabad", detail: "The long, spectacular KKH drive home." },
    ],
    breakdown: [
      { label: "Huts & camping", amount: 48000 },
      { label: "Transport & jeeps", amount: 45000 },
      { label: "Meals & porters", amount: 32000 },
      { label: "Guide & permits", amount: 20000 },
    ],
    featured: true,
  },
  {
    slug: "swat-kalam-escape",
    name: "Swat & Kalam Escape",
    region: "Northern Areas",
    days: 5,
    price: 98000,
    difficulty: "Easy",
    summary: "Trout rivers, Mahodand Lake, Malam Jabba and the Gandhara ruins of Mingora.",
    image: swat,
    destinations: ["swat-valley"],
    includes: ["4 nights riverside hotels", "Private transport from Islamabad", "Breakfast daily", "Mahodand jeep excursion"],
    excludes: ["Chairlift and activity tickets", "Lunches and dinners", "Insurance"],
    itinerary: [
      { day: 1, title: "Islamabad to Mingora", detail: "Swat Expressway drive, evening at Butkara Stupa." },
      { day: 2, title: "Malam Jabba", detail: "Chairlift, zipline and the ski resort ridge." },
      { day: 3, title: "Kalam", detail: "Drive up the Swat River to Kalam, Ushu Forest walk." },
      { day: 4, title: "Mahodand Lake", detail: "Jeep excursion to the lake, boating and trout lunch." },
      { day: 5, title: "Return", detail: "Marghazar White Palace en route back to Islamabad." },
    ],
    breakdown: [
      { label: "Accommodation", amount: 40000 },
      { label: "Transport", amount: 34000 },
      { label: "Breakfasts", amount: 10000 },
      { label: "Guide & excursions", amount: 14000 },
    ],
  },
  {
    slug: "mughal-heritage-trail",
    name: "Mughal Heritage Trail",
    region: "Cultural & Historical",
    days: 6,
    price: 132000,
    difficulty: "Easy",
    summary: "Lahore, Rohtas, Taxila and Multan — four centuries of forts, shrines and tilework.",
    image: lahore,
    destinations: ["lahore", "rohtas-fort", "taxila", "multan"],
    includes: ["5 nights boutique heritage hotels", "Air-conditioned transport", "Museum and monument tickets", "Historian guide"],
    excludes: ["Domestic flights", "Dinners", "Insurance"],
    itinerary: [
      { day: 1, title: "Lahore arrival", detail: "Badshahi Mosque at sunset and dinner overlooking the courtyard." },
      { day: 2, title: "Walled City", detail: "Lahore Fort, Sheesh Mahal, Wazir Khan Mosque and the Delhi Gate walk." },
      { day: 3, title: "Shalimar & Lahore Museum", detail: "Mughal gardens, the museum's Gandhara gallery and Anarkali bazaar." },
      { day: 4, title: "Rohtas Fort", detail: "Drive to Jhelum, explore Sher Shah Suri's garrison, continue to Taxila." },
      { day: 5, title: "Taxila", detail: "Dharmarajika, Sirkap, Jaulian monastery and the Taxila Museum." },
      { day: 6, title: "Multan or departure", detail: "Optional extension to the City of Saints, or transfer to Islamabad airport." },
    ],
    breakdown: [
      { label: "Heritage hotels", amount: 58000 },
      { label: "Transport", amount: 38000 },
      { label: "Tickets & guide", amount: 22000 },
      { label: "Breakfasts", amount: 14000 },
    ],
    featured: true,
  },
  {
    slug: "cholistan-desert-safari",
    name: "Cholistan Desert Safari",
    region: "Desert",
    days: 4,
    price: 86000,
    difficulty: "Moderate",
    summary: "Derawar's bastions, dune camping under the Milky Way and Bahawalpur's Nawabi palaces.",
    image: desert,
    destinations: ["cholistan-desert", "derawar-fort"],
    includes: ["1 night desert camp, 2 nights Bahawalpur", "4x4 desert safari", "All meals in the desert", "Folk music evening"],
    excludes: ["Flights or train to Bahawalpur", "Insurance", "Camel ride tips"],
    itinerary: [
      { day: 1, title: "Bahawalpur", detail: "Noor Mahal, Darbar Mahal and the Bahawalpur Museum." },
      { day: 2, title: "Into Cholistan", detail: "4x4 to Derawar Fort, the Abbasi necropolis, sunset over the bastions." },
      { day: 3, title: "Desert camp", detail: "Dune driving, nomad settlement visit, folk music and stargazing." },
      { day: 4, title: "Return", detail: "Morning camel ride, drive back to Bahawalpur for departure." },
    ],
    breakdown: [
      { label: "Hotels & desert camp", amount: 32000 },
      { label: "4x4 safari", amount: 30000 },
      { label: "Meals", amount: 12000 },
      { label: "Guide & entry fees", amount: 12000 },
    ],
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);

export const featuredPackages = packages.filter((p) => p.featured);
import hunza from "@/assets/hunza.jpg";
import lahore from "@/assets/lahore.jpg";
import skardu from "@/assets/skardu.jpg";
import desert from "@/assets/desert.jpg";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "first-time-pakistan-guide",
    title: "Your first two weeks in Pakistan: a practical route",
    excerpt:
      "Where to land, how much time the Karakoram Highway really takes, and the mistakes that cost first-timers three days.",
    category: "Trip Planning",
    date: "2026-06-18",
    readTime: "8 min read",
    image: hunza,
    body: [
      "Fly into Islamabad, not Lahore. It puts you within two hours of the Karakoram Highway and one short flight from Gilgit or Skardu, which is where almost every first itinerary is heading.",
      "Give the north ten of your fourteen days. The distances look small on a map and take three times as long in reality: Gilgit to Hunza is 100 km and a comfortable half day once you stop for photographs, which you will.",
      "Book the Gilgit and Skardu flights, but plan as though they will be cancelled. They fly visually and weather closes them regularly. A road contingency down the KKH is not a disaster — it is one of the great drives on earth.",
      "Finish in Lahore. After two weeks of mountains, the Walled City, Badshahi Mosque at sunset and a night on the food street is the right way to end a Pakistan trip.",
    ],
  },
  {
    slug: "when-to-visit-northern-pakistan",
    title: "The honest month-by-month guide to northern Pakistan",
    excerpt: "Blossom season, monsoon landslides, when Deosai opens, and why October may be the best-kept secret.",
    category: "Seasons",
    date: "2026-05-02",
    readTime: "6 min read",
    image: skardu,
    body: [
      "April is blossom. Hunza's apricot and cherry orchards turn pink for roughly ten days and the whole valley photographs like a painting. Nights are still cold and Khunjerab is closed.",
      "June to August is the full season: everything open, Deosai in flower, Babusar passable. It is also the busiest and the monsoon can trigger landslides on the KKH between Besham and Chilas.",
      "September and October are our favourite. Poplars turn gold, the light is long and clean, crowds vanish and hotel rates drop. Take a warm jacket.",
      "November to March closes the high passes but opens winter Hunza — frozen waterfalls, empty forts and Attabad's ice. Not for a first visit, extraordinary for a second.",
    ],
  },
  {
    slug: "eating-through-lahore",
    title: "Eating through Lahore, one gali at a time",
    excerpt: "Nihari at dawn, phajja siri paye, and the case for skipping every restaurant with a menu in English.",
    category: "Food & Culture",
    date: "2026-03-27",
    readTime: "7 min read",
    image: lahore,
    body: [
      "Start at 7am with nihari in the old city. It is a breakfast dish, it always was, and the version served at dinner in a hotel is a tourist artefact.",
      "Phajja's siri paye in Lahori Gate is not for everyone and absolutely worth attempting once. Order half, take bread, go slowly.",
      "Gawalmandi and Fort Road are the famous food streets. The better eating is a street back from either, wherever the queue is local and the seating is plastic.",
      "End with a kulfi falooda. There is no better full stop to a Punjabi meal.",
    ],
  },
  {
    slug: "packing-for-the-karakoram",
    title: "What to actually pack for the Karakoram",
    excerpt: "Layers, altitude, power banks and the one item every trekker forgets before Fairy Meadows.",
    category: "Travel Tips",
    date: "2026-02-11",
    readTime: "5 min read",
    image: desert,
    body: [
      "Three layers, always: merino base, fleece mid, waterproof shell. A single valley can swing 20°C between the jeep track and the meadow.",
      "Bring more power than you think. Load-shedding is real in the north and a 20,000 mAh bank keeps a camera and phone alive for three days.",
      "Broken-in boots with ankle support for Fairy Meadows and Deosai. The trail to Beyal is not technical, but it is loose underfoot for three hours.",
      "The forgotten item: a small stash of cash in small notes. ATMs stop being reliable north of Gilgit and card payment mostly does not exist.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
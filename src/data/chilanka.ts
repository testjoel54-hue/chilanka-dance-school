export const LOGO = "/photos/mainLogo.d8ad1d6646ccb1605413.png";
export const BELLS = "/photos/contact.92c2465f208f8ab60d7c.jpg";

export const studio = {
  name: "Chilanka Dance School",
  line: "Move. Inspire. Shine.",
  phone: "(469) 556-3040",
  phoneHref: "tel:+14695563040",
  email: "chilankahouston@gmail.com",
  address: "2880 Broadway Bend Drive, Building 2",
  city: "Pearland, TX  77584",
  maps: "https://maps.google.com/?q=2880+Broadway+Bend+Drive+Building+2+Pearland+TX+77584",
  instagram: "https://www.instagram.com/chilankadanceschool/",
  facebook: "https://www.facebook.com/ChilankaDanceSchool",
  youtube: "https://www.youtube.com/@ChilankaDanceSchool",
  schedule: "Wednesdays · 6:00–7:00 PM",
  tuition: 100,
};

export const heroSlides = [
  {
    src: "/photos/jasmin.2213d0af1af34ae89051.jpg",
    alt: "Jasmin Eapen in a magenta and blue costume, one arm raised in a dance pose",
    label: "Director · Jasmin Eapen",
  },
  {
    src: "/photos/pic2.785ccc616c0cd3ce01cb.jpg",
    alt: "Chilanka students in blue, cream, and magenta costumes holding a mudra",
    label: "The company",
  },
  {
    src: "/photos/Crystal.cdb2a7ab5c0820da1838.jpeg",
    alt: "Crystal Tennison in a classical pose on a blue stage",
    label: "On stage",
  },
  {
    src: "/photos/natyafusion2026.4cca2d907eb33d1cdc0a.jpg",
    alt: "NatyaFusion dancers in blue sarees performing outdoors at a festival",
    label: "NatyaFusion",
  },
  {
    src: "/photos/pic7.008aa96b44aa599e751a.jpg",
    alt: "Chilanka students and teachers posed together in the studio",
    label: "In the room",
  },
];

export const styles = [
  {
    id: "bharatanatyam",
    name: "Bharatanatyam",
    from: "Tamil Nadu",
    image: "/photos/Crystal.cdb2a7ab5c0820da1838.jpeg",
    alt: "Classical dancer in a blue and red costume, knee lifted, hands in mudra",
    copy: "Geometry, story, and the stamp of the foot. This is the spine of the studio — adavus, abhinaya, and the patience to make both look inevitable.",
  },
  {
    id: "bollywood",
    name: "Bollywood",
    from: "Cinema",
    image: "/photos/pic7.008aa96b44aa599e751a.jpg",
    alt: "A large group of Chilanka students smiling in gold, blue, and magenta costumes",
    copy: "Film energy without losing the line. Expressions first, then the hook. The kids live here, and so does NatyaFusion.",
  },
  {
    id: "bhangra",
    name: "Bhangra",
    from: "Punjab",
    image: "/photos/summerdancecamp2026tile.0c3092e0b2a96b727580.jpg",
    alt: "Summer camp group with arms raised in a bright studio",
    copy: "Shoulders, bounce, and a room that gets louder. Camp week ran Punjab in a single afternoon. The lift stays in the weekly work.",
  },
  {
    id: "garba",
    name: "Garba",
    from: "Gujarat",
    image: "/photos/pic19.240cdfe6c1561dd16078.jpg",
    alt: "Young dancers in cream and yellow walking with handmade signs",
    copy: "Circles, claps, and spinning that never quite stops. Garba is how the studio teaches community — you cannot do it alone.",
  },
  {
    id: "kerala",
    name: "Kerala folk",
    from: "Kerala",
    image: "/photos/jasmin.2213d0af1af34ae89051.jpg",
    alt: "Jasmin Eapen dancing in a magenta blouse and blue skirt",
    copy: "Jasmin’s home vocabulary: Kerala cinematic dance and folk, alongside the classical forms. The name of the school is Malayalam for the bells on the ankle.",
  },
  {
    id: "fusion",
    name: "Semi-classical",
    from: "The blend",
    image: "/photos/natyafusion2026.4cca2d907eb33d1cdc0a.jpg",
    alt: "Women in blue sarees striking a synchronized pose on an outdoor stage",
    copy: "Classical training with a contemporary shoulder. NatyaFusion is built for adult women who want both the grammar and the freedom.",
  },
];

export const programs = [
  {
    id: "kids",
    who: "child" as const,
    kicker: "Children",
    title: "Kids dance classes",
    image: "/photos/pic2.785ccc616c0cd3ce01cb.jpg",
    alt: "Chilanka children holding a dance mudra outdoors",
    summary:
      "A first room for rhythm. Young dancers learn posture, the first steps, and how to stand in front of people without shrinking.",
    points: ["Boys and girls", "Beginners welcome", "Costume not required to start"],
  },
  {
    id: "levels",
    who: "child" as const,
    kicker: "Weekly company",
    title: "Levels 1–3",
    image: "/photos/pic7.008aa96b44aa599e751a.jpg",
    alt: "Students and teachers together after class",
    summary:
      "The ongoing class. Technique on Wednesday evenings, then the performances that make the technique matter.",
    points: ["Wednesdays 6:00–7:00 PM", "$100 a month", "Billed on the 1st"],
  },
  {
    id: "natya",
    who: "woman" as const,
    kicker: "Adult women",
    title: "NatyaFusion",
    image: "/photos/natyafusion2026.4cca2d907eb33d1cdc0a.jpg",
    alt: "NatyaFusion performing at an outdoor festival",
    summary:
      "A women’s class that keeps classical line and lets Bollywood and fusion in. Built for adults, not a kids’ class slowed down.",
    points: ["Women", "Classical, Bollywood, fusion", "Stage time when the work is ready"],
  },
  {
    id: "camp",
    who: "archive" as const,
    kicker: "June 8–12, 2026 · closed",
    title: "Summer dance camp",
    image: "/photos/summerdancecamp2026tile.0c3092e0b2a96b727580.jpg",
    alt: "The 2026 summer camp group in the Pearland studio",
    summary:
      "Five days through India — Garba, Bhangra, Kathak, Bollywood, classical fusion, and Kalaripayattu — ending in a showcase, including a FIFA Fan Fest Houston performance. That week is over. Fall classes are the open door.",
    points: ["Ages 5–15", "Camp fee was $300", "$25 off siblings"],
  },
];

export const teachers = [
  {
    id: "jasmin",
    name: "Jasmin Eapen",
    role: "Founder & director",
    image: "/photos/jasmin.2213d0af1af34ae89051.jpg",
    alt: "Jasmin Eapen mid-dance in magenta and turquoise",
    bio: "More than 30 years in Bharatanatyam, semi-classical, Bollywood, Bhangra, Garba, and Kerala cinematic dance. She is also a certified registered nurse anesthetist — both rooms ask for rhythm, attention, and the nerve to stay exact. Chilanka is the room she built so students get technique, culture, and the confidence that comes from performing.",
  },
  {
    id: "angel",
    name: "Angel Santosh",
    role: "Assistant teacher",
    image: "/photos/Angel.08d7b4f654c35ca7f57b.png",
    alt: "Angel Santosh in a red and green costume with a jasmine crown",
    bio: "Bharatanatyam and Bollywood, taught with speed and care. Angel is the dancer the studio put forward as Spin Queen — power, control, and the kind of energy that makes a Wednesday feel like a show.",
  },
  {
    id: "gauri",
    name: "Gauri Hari",
    role: "Assistant teacher",
    image: "/photos/Gouri.70e8c0f7e199f4c504ee.png",
    alt: "Gauri Hari in a blue and green costume, one hand extended",
    bio: "Classical dancer preparing her Bharatanatyam arangetram, and a teacher of Bollywood and Kerala folk. She holds the studio to the same standard she is holding herself to.",
  },
  {
    id: "crystal",
    name: "Crystal Tennison",
    role: "Instructor",
    image: "/photos/Crystal.cdb2a7ab5c0820da1838.jpeg",
    alt: "Crystal Tennison in a classical pose against a blue stage",
    bio: "Bharatanatyam artist who also works in Bollywood and Odissi. Crystal teaches the blend the school is known for: strong technique, then the freedom to use it.",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  tag: "Stage" | "Studio" | "Community" | "Camp";
};

export const gallery: GalleryItem[] = [
  {
    src: "/photos/pic1.e074df63984666351d1c.jpg",
    alt: "Young dancers on a stage in front of a temple projection",
    caption: "Stage · hands in anjali",
    tag: "Stage",
  },
  {
    src: "/photos/pic2.785ccc616c0cd3ce01cb.jpg",
    alt: "Group of students in costume holding a mudra",
    caption: "The company outdoors",
    tag: "Studio",
  },
  {
    src: "/photos/pic3.2e346835e1415008e74f.jpg",
    alt: "Chilanka dancers at MD Anderson Boot Walk with signs",
    caption: "Boot Walk · MD Anderson",
    tag: "Community",
  },
  {
    src: "/photos/pic4.c8f2f466fbbb093bf1bf.jpg",
    alt: "Students holding small trophies outside a hospital",
    caption: "After the walk",
    tag: "Community",
  },
  {
    src: "/photos/pic7.008aa96b44aa599e751a.jpg",
    alt: "Holiday studio portrait of the Chilanka group",
    caption: "Studio day",
    tag: "Studio",
  },
  {
    src: "/photos/natyafusion2026.4cca2d907eb33d1cdc0a.jpg",
    alt: "NatyaFusion on an outdoor festival stage",
    caption: "NatyaFusion · iFest",
    tag: "Stage",
  },
  {
    src: "/photos/summerdancecamp2026tile.0c3092e0b2a96b727580.jpg",
    alt: "Summer camp 2026 group photo",
    caption: "Summer camp 2026",
    tag: "Camp",
  },
  {
    src: "/photos/pic19.240cdfe6c1561dd16078.jpg",
    alt: "Dancers in yellow and cream at Boot Walk",
    caption: "Dancing to end cancer",
    tag: "Community",
  },
  {
    src: "/photos/pic20.ed74b4ed84929c040360.jpg",
    alt: "Chilanka dancers with a Houston mascot at a community walk",
    caption: "Houston, in costume",
    tag: "Community",
  },
  {
    src: "/photos/jasmin.2213d0af1af34ae89051.jpg",
    alt: "Jasmin Eapen dancing in a palace-like set",
    caption: "Jasmin",
    tag: "Stage",
  },
  {
    src: "/photos/Crystal.cdb2a7ab5c0820da1838.jpeg",
    alt: "Crystal in a full classical costume",
    caption: "Crystal · classical",
    tag: "Stage",
  },
  {
    src: "/photos/Angel.08d7b4f654c35ca7f57b.png",
    alt: "Portrait of Angel Santosh in dance costume",
    caption: "Angel",
    tag: "Studio",
  },
  {
    src: "/photos/chilanka-gallery-photo-1.7a198a0366ad2061ec0b.jpg",
    alt: "Chilanka gallery photograph",
    caption: "From the archive",
    tag: "Studio",
  },
  {
    src: "/photos/chilanka-gallery-photo-3.42fb009fd2971bfc9b6b.jpg",
    alt: "Chilanka gallery photograph",
    caption: "From the archive",
    tag: "Stage",
  },
  {
    src: "/photos/chilanka-gallery-photo-6.a97ebc22b182195cf357.jpg",
    alt: "Chilanka gallery photograph",
    caption: "From the archive",
    tag: "Camp",
  },
  {
    src: "/photos/chilanka-gallery-photo-11.ddf0efeb243f8500c0b3.jpg",
    alt: "Chilanka gallery photograph",
    caption: "From the archive",
    tag: "Studio",
  },
  {
    src: "/photos/pic5.9cd24931b67ec337050b.jpg",
    alt: "Chilanka dancers",
    caption: "The room, full",
    tag: "Studio",
  },
  {
    src: "/photos/pic18.2681d8564d470419e141.jpg",
    alt: "Chilanka performance photograph",
    caption: "Performance day",
    tag: "Stage",
  },
];

export const ticker = [
  "Bharatanatyam",
  "Bollywood",
  "Bhangra",
  "Garba",
  "Kerala folk",
  "Semi-classical",
  "NatyaFusion",
  "Pearland, Texas",
  "Fall enrollment open",
];

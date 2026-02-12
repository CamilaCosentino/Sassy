import { RoomData, Post } from './types';

// Images referenced locally as requested.
const IMG_HOME = "/images/home.png";
const IMG_ROOM1 = "/images/first.png";
const IMG_ROOM2 = "/images/second.png";
const IMG_ROOM3 = "/images/third.png";
const IMG_ROOM4 = "/images/fourth.png";

// Helper to generate dummy posts with seeded images and full content
const generatePosts = (mainCategory: string, subCategory: string, count: number): Post[] => {
  return Array.from({ length: count }).map((_, i) => {
    // ID uses subcategory to be unique
    const id = `${subCategory.replace(/\s+/g, '-').toLowerCase()}-${i}`;
    return {
      id: id,
      title: `${subCategory}: Concept ${i + 1}`,
      excerpt: `An exploration into ${subCategory} within the broader context of ${mainCategory}.`,
      content: `
        <p>In the quiet corners of this Victorian sanctuary, we find ourselves contemplating <strong>${subCategory}</strong>.</p>
        <p>This inquiry is deeply rooted in the domain of <em>${mainCategory}</em>. It is not merely a subject of academic study, but a living, breathing entity that shapes our perception of reality.</p>
        <h3>The Hidden Architecture of ${subCategory}</h3>
        <p>Consider the mechanism by which we perceive truth. Is it an external absolute, waiting to be discovered like a hidden room in this mansion? Or is it constructed, brick by brick?</p>
        <p>As we delve deeper into <em>Concept ${i + 1}</em>, we uncover the subtle power dynamics at play. The hierarchy of knowledge often excludes the intuitive, the mystical, and the non-binary. This archive seeks to restore those lost epistemologies.</p>
        <p>Ultimately, the journey through ${mainCategory} is a journey inwards. As you stand before this archive, ask yourself: what structures of power reside within your own consciousness?</p>
        <p>~ <em>Archivist's Note, 1893 (Revised 2024)</em></p>
      `,
      category: mainCategory,
      subcategory: subCategory,
      // Using picsum seed to ensure the same image loads for the same ID
      image: `https://picsum.photos/seed/${id}/600/400` 
    };
  });
};

export const ROOMS: RoomData[] = [
  {
    id: 'consciousness',
    title: 'Mechanisms of Consciousness',
    image: IMG_ROOM1, 
    description: 'Explore the depths of the psyche, spirit, and direct experience.',
    objects: [
      {
        id: 'c-main',
        name: 'Central Desk',
        type: 'main',
        description: 'Primary Archive',
        top: '60%',
        left: '25%',
        posts: generatePosts('Mechanisms of Consciousness', 'General Consciousness', 5)
      },
      {
        id: 'c-telescope',
        name: 'The Telescope',
        type: 'sub',
        description: 'Direct Experience & Metaphysics',
        top: '45%',
        left: '42%',
        posts: generatePosts('Mechanisms of Consciousness', 'Direct Experience', 3)
      },
      {
        id: 'c-flasks',
        name: 'Alchemical Flasks',
        type: 'sub',
        description: 'Languages of Consciousness',
        top: '65%',
        left: '70%',
        posts: generatePosts('Mechanisms of Consciousness', 'Languages of Consciousness', 4)
      },
      {
        id: 'c-scrolls',
        name: 'Ancient Scrolls',
        type: 'sub',
        description: 'Insight & Delusion',
        top: '55%',
        left: '85%',
        posts: generatePosts('Mechanisms of Consciousness', 'Insight & Delusion', 3)
      }
    ]
  },
  {
    id: 'epistemology',
    title: 'Epistemology & Truth',
    image: IMG_ROOM2,
    description: 'Navigate the maps of truth, logic, and interpretation.',
    objects: [
      {
        id: 'e-main',
        name: 'Central Table',
        type: 'main',
        description: 'Primary Archive',
        top: '65%',
        left: '50%',
        posts: generatePosts('Epistemology & Truth', 'General Epistemology', 6)
      },
      {
        id: 'e-maps',
        name: 'Wall Maps',
        type: 'sub',
        description: 'Proximity, Recency & Globalism',
        top: '30%',
        left: '15%',
        posts: generatePosts('Epistemology & Truth', 'Proximity & Globalism', 4)
      },
      {
        id: 'e-books',
        name: 'Stacked Books',
        type: 'sub',
        description: 'Forms of Truth',
        top: '55%',
        left: '30%',
        posts: generatePosts('Epistemology & Truth', 'Forms of Truth', 3)
      },
      {
        id: 'e-diagrams',
        name: 'Logic Diagrams',
        type: 'sub',
        description: 'Nonbinary Logic',
        top: '35%',
        left: '85%',
        posts: generatePosts('Epistemology & Truth', 'Nonbinary Logic', 4)
      }
    ]
  },
  {
    id: 'communicative',
    title: 'Communicative Action & Design',
    image: IMG_ROOM3, 
    description: 'Constructing society through speech, justice, and design.',
    objects: [
      {
        id: 'ca-main',
        name: 'Blueprint Table',
        type: 'main',
        description: 'Primary Archive',
        top: '70%',
        left: '50%',
        posts: generatePosts('Communicative Action', 'General Design', 5)
      },
      {
        id: 'ca-chalkboard',
        name: 'Blackboard',
        type: 'sub',
        description: 'Ideal Speech & Communicative Action',
        top: '35%',
        left: '20%',
        posts: generatePosts('Communicative Action', 'Ideal Speech', 4)
      },
      {
        id: 'ca-models',
        name: 'Architectural Models',
        type: 'sub',
        description: 'Post-Epistemicidal Design',
        top: '55%',
        left: '75%',
        posts: generatePosts('Communicative Action', 'Design Justice', 3)
      },
      {
        id: 'ca-scales',
        name: 'Scales of Justice',
        type: 'sub',
        description: 'Justice as Fairness',
        top: '50%',
        left: '10%',
        posts: generatePosts('Communicative Action', 'Justice as Fairness', 3)
      }
    ]
  },
  {
    id: 'power',
    title: 'Languages of Power',
    image: IMG_ROOM4, 
    description: 'Deciphering hierarchy, authority, and control.',
    objects: [
      {
        id: 'p-main',
        name: 'Executive Desk',
        type: 'main',
        description: 'Primary Archive',
        top: '65%',
        left: '50%',
        posts: generatePosts('Languages of Power', 'General Power Dynamics', 5)
      },
      {
        id: 'p-laws',
        name: 'Law Books',
        type: 'sub',
        description: 'Authoritative vs Authoritarian',
        top: '58%',
        left: '30%',
        posts: generatePosts('Languages of Power', 'Authority', 4)
      },
      {
        id: 'p-map',
        name: 'Map of Influence',
        type: 'sub',
        description: 'Epistemicidal vs Integrative',
        top: '35%',
        left: '60%',
        posts: generatePosts('Languages of Power', 'Integrative Power', 3)
      },
      {
        id: 'p-seal',
        name: 'The Great Seal',
        type: 'sub',
        description: 'Hierarchy, Sensitivity & Capacity',
        top: '75%',
        left: '80%',
        posts: generatePosts('Languages of Power', 'Hierarchy', 3)
      }
    ]
  }
];

export const HOME_IMAGE = IMG_HOME;

const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const path = require('path');

// Target the root directory's dev.db
const dbPath = path.join(__dirname, '..', 'dev.db');
const url = `file:${dbPath}`;
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Clean existing data
  await prisma.booking.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.service.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.contactEnquiry.deleteMany();

  console.log('Cleared existing data.');

  // 2. Seed Branches
  const branches = [
    {
      slug: 'nagaram',
      name: 'Arya Samaj Nagaram',
      address: 'H.No. 4-13/6/A/1, Road No. 5/4, West Gandhi Nagar, Nagaram, Keesara, Medchal-Malkajgiri, Hyderabad, Telangana – 500083',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.5126842426315!2d78.58309197600868!3d17.4830176834211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9c065f4ffc0f%3A0xe54d38e21976a4ee!2sArya%20Samaj%20Nagaram!5e0!3m2!1sen!2sin!4v1719740000000!5m2!1sen!2sin',
      callPhone: '+919000108557',
      whatsappPhone: '+919000108557',
      email: 'nagaram@aryasamajhyderabad.com',
      officeHours: '09:00 AM - 06:00 PM (Open All Days)'
    },
    {
      slug: 'mettuguda',
      name: 'Arya Samaj Mettuguda',
      address: '12-8-390/A & B, Near Pillar No. 1122, Mettuguda, Secunderabad, Hyderabad, Telangana – 500017',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.026135081045!2d78.52445837600742!3d17.434509983457198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb997f7400a40f%3A0xadbe634354c46fbe!2sArya%20Samaj%20Mettuguda!5e0!3m2!1sen!2sin!4v1719740000001!5m2!1sen!2sin',
      callPhone: '+919030018557',
      whatsappPhone: '+919030018557',
      email: 'mettuguda@aryasamajhyderabad.com',
      officeHours: '09:00 AM - 06:00 PM (Open All Days)'
    }
  ];

  for (const branch of branches) {
    await prisma.branch.create({ data: branch });
  }
  console.log('Seeded branches.');

  // 3. Seed Services
  const services = [
    {
      slug: 'arya-samaj-marriage',
      title: 'Arya Samaj Marriage',
      description: 'Traditional Vedic marriage ceremony conducted with sacred fire (Havan) and Vedic mantras, legally valid under the Arya Samaj Marriage Validation Act, 1937.',
      overview: 'Arya Samaj marriages are famous for their simplicity and adherence to Vedic rituals. They reject idol worship and follow the core principles of Arya Samaj established by Swami Dayanand Saraswati. The entire ceremony takes about 1-2 hours and is highly affordable, focusing on the spiritual union of two souls rather than extravagant celebrations.',
      eligibility: 'Bride must be at least 18 years old.\nGroom must be at least 21 years old.\nBoth parties must be Hindus, Buddhists, Jains, or Sikhs.\nNeither party should have a living spouse at the time of marriage.\nBoth parties must consent voluntarily.',
      documents: 'Age Proof (Aadhar Card, Birth Certificate, 10th Class Certificate, or Passport) for both Bride and Groom.\nAddress Proof (Aadhar Card, Voter ID, Passport, or Driving License).\n8 Recent Passport Size Photographs of both Bride and Groom.\n2 Witnesses with their Aadhar Card and Address Proof.\nIf previously married, Divorce Decree or Death Certificate of the former spouse.',
      benefits: 'Vedic, holy, and serene environment.\nCompleted within 1 to 2 hours.\nExtremely cost-effective compared to traditional weddings.\nFully legally valid under Indian law (Arya Samaj Marriage Validation Act, 1937).\nEligible for instant marriage registration under Compulsory Marriage Registration laws.',
      steps: 'Book an online slot / visit the selected branch.\nSubmit required age and identity documents for verification.\nPerform the Vedic Havan and pheras around the holy fire accompanied by Vedic chants.\nExchange of garlands and tying of Mangalsutra.\nSign the marriage register along with witnesses.\nReceive the official Arya Samaj Marriage Certificate.',
      price: '₹ 5,100'
    },
    {
      slug: 'love-marriage',
      title: 'Love Marriage',
      description: 'Complete legal and traditional support for couples wishing to marry out of choice, ensuring full documentation and safety.',
      overview: 'We provide a safe, respectful, and legally sound environment for couples conducting love marriages. Our priests conduct the wedding ceremonies according to Vedic rites, and our legal advisors guide you through the registration process to ensure the marriage is legally binding and recognized by the government.',
      eligibility: 'Bride must be 18+ and Groom must be 21+.\nMutual consent of both bride and groom.\nDocuments must be authentic.',
      documents: 'Aadhar Card / Identity proof of Bride and Groom.\nAddress proof (Electricity bill, Rent agreement, or Aadhar).\n6 Passport size photos each.\n2 Witnesses with ID and Address proofs.',
      benefits: 'Safe, private, and confidential environment.\nQuick legal certificate generation.\nLegal advisory support to handle family disputes or notice requirements.',
      steps: 'Consultation with our legal desk regarding documents.\nVerification of details and age.\nVedic wedding ceremony at the Arya Samaj temple.\nIssuance of Arya Samaj Marriage Certificate.\nApplication filing for Government Marriage Registration.',
      price: '₹ 6,500'
    },
    {
      slug: 'inter-caste-marriage',
      title: 'Inter-Caste Marriage',
      description: 'Promoting social equality through Vedic ceremonies that unite couples across different castes under uniform Hindu rites.',
      overview: 'Arya Samaj has always been a pioneer in social reform, strongly encouraging inter-caste marriages. We perform these weddings with high dignity and respect, emphasizing that character and mutual respect are the only benchmarks of a successful union, rejecting orthodox caste structures.',
      eligibility: 'Bride must be 18+ and Groom must be 21+.\nAt least one party must belong to a different caste.\nBoth must be of Hindu, Sikh, Jain, or Buddhist faith.',
      documents: 'Aadhar Cards of Bride and Groom.\nDate of Birth certificates.\nPassport size photographs.\nTwo witnesses with government-issued photo IDs.',
      benefits: 'Socially progressive and traditional.\nEliminates caste-based distinctions.\nGovernment of India schemes or state incentives may apply to registered inter-caste couples.',
      steps: 'Document check and registration.\nVedic fire ritual and exchange of vows.\nSigning of registry.\nCertificate distribution.',
      price: '₹ 5,100'
    },
    {
      slug: 'inter-religion-marriage',
      title: 'Inter-Religion Marriage',
      description: 'Welcoming couples of different faiths. Includes Shuddhi (purification/reconversion ceremony) prior to the Vedic marriage.',
      overview: 'For couples belonging to different religions (e.g., Hindu and Muslim/Christian), we facilitate a seamless transition through the Shuddhi process if they wish to marry under Arya Samaj rules. The ceremony is performed according to strict Vedic rites, resulting in a legally valid Hindu marriage.',
      eligibility: 'Bride must be 18+ and Groom must be 21+.\nOne partner must adopt Hinduism through a voluntary purification (Shuddhi) ceremony if marrying via Arya Samaj customs.\nOtherwise, guidance is provided for Special Marriage Act registration.',
      documents: 'Affidavit declaring voluntary conversion and faith.\nAge and address proofs for both parties.\n6 photos of each.\n2 witnesses with IDs.',
      benefits: 'Enables couples of different faiths to marry traditionally.\nProvides a legal alternative to complex court procedures.\nEnsures absolute legitimacy under the Hindu Marriage Act after conversion.',
      steps: 'Detailed counseling and verification of intent.\nVoluntary Shuddhi/Conversion ceremony (optional, based on faith choices).\nVedic marriage rituals.\nCertificate issuance and legal registration.',
      price: '₹ 8,500'
    },
    {
      slug: 'same-day-marriage',
      title: 'Same-Day Marriage & Certificate',
      description: 'Complete solemnization and documentation of marriage within a single day, with immediate validity documents.',
      overview: 'Designed for couples with urgent travel plans, visa requirements, or short leaves. We coordinate the Vedic ceremony and compile all paperwork on the same day, enabling you to get married and secure valid legal proofs immediately.',
      eligibility: 'All essential documents must be submitted 24 hours prior or early in the morning.\nStandard age and marital status constraints apply.',
      documents: 'Aadhar Card, PAN Card, Birth proofs.\n6 photos of both.\n2 witnesses who must be present on the day of marriage.',
      benefits: 'Fast, efficient, and reliable.\nNo waiting periods.\nHighly helpful for NRI or corporate couples on tight schedules.',
      steps: 'Early morning document submission and verification.\nMid-day Vedic marriage ceremony.\nAfternoon entry in the temple register and issuance of Arya Samaj certificate.\nAssistance with instant online government registry portal submission.',
      price: '₹ 7,500'
    }
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }
  console.log('Seeded services.');

  // 4. Seed Slots (Next 30 days starting from today, June 30, 2026)
  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:30 AM - 01:30 PM',
    '02:30 PM - 04:30 PM'
  ];

  const today = new Date();
  let slotsCreated = 0;

  for (let i = 0; i < 30; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);
    const dateString = futureDate.toISOString().split('T')[0]; // YYYY-MM-DD

    for (const branch of branches) {
      for (const time of timeSlots) {
        // Randomly make 15% of slots unavailable to simulate real bookings
        const available = Math.random() > 0.15;
        await prisma.slot.create({
          data: {
            branchSlug: branch.slug,
            date: dateString,
            time: time,
            available: available
          }
        });
        slotsCreated++;
      }
    }
  }
  console.log(`Seeded ${slotsCreated} slots across 30 days.`);

  // 5. Seed Blogs
  const blogs = [
    {
      slug: 'how-to-register-arya-samaj-marriage-hyderabad',
      title: 'How to Register Arya Samaj Marriage in Hyderabad: A Step-by-Step Guide',
      content: `An Arya Samaj marriage is highly popular in Hyderabad due to its simplicity, speed, and affordability. However, many couples are confused about the legalities and how to register their marriage with the Government of Telangana to obtain an official Government Marriage Certificate.

In this guide, we break down the entire process from the Vedic ceremony to the Sub-Registrar registration.

### Step 1: Performing the Arya Samaj Wedding
The wedding ceremony must be solemnized in an authorized Arya Samaj temple (like our Mettuguda or Nagaram branch). The ceremony involves Vedic rituals including Havan (sacred fire), exchange of garlands, and pheras.

### Step 2: Collecting the Temple Certificate
Upon completion, the temple issues an Arya Samaj Marriage Certificate. This certificate is crucial, but remember: **it is legally valid proof of marriage, but you should still obtain a government-issued registration certificate for passports, visas, and legal documentation.**

### Step 3: Applying to the Sub-Registrar
1. File an online application on the Telangana registration portal.
2. Upload the Arya Samaj certificate, wedding photos, and age/address proofs of both parties.
3. Add details of 3 witnesses.
4. Book an appointment slot.

### Step 4: Physical Appearance
On the appointment day, the bride, groom, and 3 witnesses must physically visit the Sub-Registrar Office with original documents. Biometrics are captured, and the government Marriage Certificate is issued.

For complete assistance, contact our helpdesk at Arya Samaj Mettuguda.`,
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
      author: 'Pandit Shastri Ji',
      date: 'June 28, 2026',
      seoTitle: 'Register Arya Samaj Marriage in Hyderabad | Complete Guide',
      seoDescription: 'Learn how to easily perform and register your Arya Samaj Marriage in Hyderabad. Step-by-step guide from Vedic rituals to the Sub-Registrar certificate.'
    },
    {
      slug: 'validity-of-arya-samaj-marriage-certificate-in-india',
      title: 'Is an Arya Samaj Marriage Certificate Legally Valid in India?',
      content: `One of the most common questions couples ask is: *"Is the certificate issued by Arya Samaj legally valid?"* or *"Can we get a passport or apply for a spouse visa with just an Arya Samaj certificate?"*

The answer is both **Yes** and **No**. Let's understand the legal position in India.

### The Arya Samaj Marriage Validation Act, 1937
Under Indian law, marriages performed according to Arya Samaj rites are recognized and valid. The Arya Samaj Marriage Validation Act of 1937 guarantees the legality of weddings solemnized within these temples between Hindus, Sikhs, Buddhists, and Jains.

### The Need for Government Registration
While the marriage itself is legally binding and valid, the **temple certificate** is not recognized as a substitute for a **Government Marriage Certificate** for official state procedures, such as:
1. Applying for a spouse visa or immigration.
2. Adding a spouse's name to a passport.
3. Buying joint property or claiming inheritance.
4. Claiming insurance policies.

To do these, you must register the marriage under the **Hindu Marriage Act** at the local Sub-Registrar Office using your Arya Samaj certificate as proof of solemnization.

### Summary
The Arya Samaj marriage is 100% legal, and the temple certificate serves as valid proof that the marriage occurred. However, you must register it with the government to obtain the government certificate for visa and administrative purposes.

At Arya Samaj Mettuguda, we provide complete, same-day support for both the Vedic ceremony and government registration filings.`,
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800',
      author: 'Advocate Suresh Kumar',
      date: 'June 20, 2026',
      seoTitle: 'Is Arya Samaj Marriage Certificate Legally Valid? | Legal Status',
      seoDescription: 'Understand the legal validity of an Arya Samaj marriage certificate in India. Learn why government registration is required for visas and passports.'
    }
  ];

  for (const blog of blogs) {
    await prisma.blog.create({ data: blog });
  }
  console.log('Seeded blogs.');

  // 6. Seed Testimonials
  const testimonials = [
    {
      name: 'Ravi Teja & Madhuri S.',
      review: 'We booked our wedding at the Mettuguda branch. The entire experience was beautiful, seamless, and deeply traditional. Pandits explained every mantra and the legal help desk made our registrar booking very easy on the same day!',
      rating: 5,
      googleVerified: true
    },
    {
      name: 'Anirudh & Deepika Rao',
      review: 'Arya Samaj Nagaram was very clean and well-organized. Pandits conducted the Vedic havan with absolute devotion. Highly recommend their slot booking system which is very transparent.',
      rating: 5,
      googleVerified: true
    },
    {
      name: 'Dr. Sandeep & Neha Patel',
      review: 'Extremely professional and supportive team. Since Neha was an NRI, we needed apostille and single-status advice. The legal team took care of everything within 2 days. Truly a premium experience!',
      rating: 5,
      googleVerified: true
    },
    {
      name: 'Vikram & Swathi Reddy',
      review: 'Very respectful and solemn. The simple Vedic rites were refreshing and cost-effective. They followed all document checks thoroughly. A great place to start our lives.',
      rating: 5,
      googleVerified: true
    }
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log('Seeded testimonials.');

  // 7. Seed FAQs
  const faqs = [
    {
      question: "Is Arya Samaj marriage legally valid in India?",
      answer: "Yes, marriages performed according to Arya Samaj rules are fully valid under the Arya Samaj Marriage Validation Act, 1937 and the Hindu Marriage Act, 1955. However, you must register it with the Sub-Registrar to obtain a government marriage certificate for visa and passport purposes.",
      category: "Legality"
    },
    {
      question: "How long does the entire wedding ceremony take?",
      answer: "The Vedic marriage ceremony, including the Havan (sacred fire), exchange of garlands, pheras, and signing the temple register, takes approximately 1 to 2 hours.",
      category: "Ceremony"
    },
    {
      question: "What are the age criteria for marrying under Arya Samaj?",
      answer: "As per Indian law, the bride must be at least 18 years old and the groom must be at least 21 years old. Age proof documentation is mandatory.",
      category: "Legality"
    },
    {
      question: "Which documents are required for the wedding?",
      answer: "You need Age Proof (Aadhar, 10th Memo, or Birth Certificate), Address Proof, 8 passport photos of both, and 2 witnesses with their Aadhar Cards.",
      category: "Documents"
    },
    {
      question: "How do we book a slot online?",
      answer: "You can book a slot through our Online Booking page by selecting your branch, date, time slot, and submitting the bride and groom details. A booking code is generated instantly.",
      category: "Booking"
    }
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }
  console.log('Seeded FAQs.');

  // 8. Seed Gallery
  const galleryItems = [
    {
      title: "Vedic Havan Kund Setup",
      imageUrl: "https://images.unsplash.com/photo-1604868189265-219ba7bf7ea3?auto=format&fit=crop&q=80&w=800",
      category: "Havan"
    },
    {
      title: "Wedding Garland Exchange",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
      category: "Weddings"
    },
    {
      title: "Arya Samaj Mettuguda Temple",
      imageUrl: "https://images.unsplash.com/photo-1590076275577-26d463019888?auto=format&fit=crop&q=80&w=800",
      category: "Temple"
    },
    {
      title: "Arya Samaj Nagaram Branch Entrance",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
      category: "Temple"
    },
    {
      title: "Sacred Vedic Marriage Mantras",
      imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800",
      category: "Weddings"
    },
    {
      title: "Vedic Marriage Rites",
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      category: "Weddings"
    }
  ];

  for (const item of galleryItems) {
    await prisma.gallery.create({ data: item });
  }
  console.log('Seeded Gallery.');

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

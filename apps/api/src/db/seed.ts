import 'dotenv/config';
import { db } from './index.js';
import { homePage, socialLinks } from './schema/home.js';
import { aboutPage, experiences, certifications, galleryImages } from './schema/about.js';
import { contactPage } from './schema/contact.js';
import { projects, projectBlocks } from './schema/project.js';
import { auth } from '../lib/auth.js';

async function seed() {
    console.log('🌱 Seeding database...');

    // ==================== 1. Create admin user ====================
    console.log('  → Creating admin user...');
    try {
        const response = await auth.api.signUpEmail({
            body: {
                name: 'Admin',
                email: 'admin@admin.com',
                password: 'admin123',
            },
        });
        console.log('  ✓ Admin user created: admin@admin.com / admin123');
    } catch (error: any) {
        if (error?.message?.includes('already exists') || error?.status === 422) {
            console.log('  ✓ Admin user already exists, skipping...');
        } else {
            console.log('  ⚠ Admin user creation error (may already exist):', error?.message || error);
        }
    }

    // ==================== 2. Home Page ====================
    console.log('  → Seeding home page...');
    await db.delete(socialLinks);
    await db.delete(homePage);

    await db.insert(homePage).values({
        profileImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
        heroHeadline: 'Hey, I\'m Afdal UI/UX Designer with <strong>4 years of experience</strong>. I design and develop digital products, create prototypes, and design interfaces.',
        ctaText: 'Interested in working together? Contact me!',
        ctaUrl: 'https://wa.me/6281234567890?text=Halo%20Afdal,%20saya%20mau%20bekerja%20sama...',
    });

    await db.insert(socialLinks).values([
        { name: 'Instagram', url: 'https://instagram.com/afdalrdh', sortOrder: 0 },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/afdalrdh', sortOrder: 1 },
        { name: 'Dribbble', url: 'https://dribbble.com/afdalrdh', sortOrder: 2 },
        { name: 'Resume', url: '/resume.pdf', sortOrder: 3 },
    ]);
    console.log('  ✓ Home page seeded');

    // ==================== 3. About Page ====================
    console.log('  → Seeding about page...');
    await db.delete(galleryImages);
    await db.delete(certifications);
    await db.delete(experiences);
    await db.delete(aboutPage);

    await db.insert(aboutPage).values({
        bioDescription: `<h1 class="font-script about-greeting text-accent">Hey, I'm Afdal! 🤠</h1>
<p>I research user behaviors and design intuitive digital experiences as a UI/UX Designer with 4 years of experience. I graduated from Politeknik Negeri Bandung and currently work at Padepokan Tujuh Sembilan, where I transform complex ideas into seamless visual solutions.</p>
<p>I care about making digital products that are both beautiful and highly functional. Most recently, I've been crafting high-fidelity interfaces and brand identities that bridge the gap between user needs and business goals. I also lead various design initiatives, focusing on human-centered design and modern visual storytelling.</p>
<p>Other things I love: clean typography, minimal interfaces, creative collaboration, outdoor adventures, and learning how design can improve lives. Please reach out and say hi (<a href="mailto:afdalramdan@email.com" class="text-accent underline">afdalramdan@email.com</a>)!</p>`,
    });

    await db.insert(experiences).values([
        { initials: 'eD', jobTitle: 'UI/UX Designer', company: 'eDOT', dateRange: 'Jan 2024 - Present', contractType: 'Contract', sortOrder: 0 },
        { initials: 'PT', jobTitle: 'UI/UX Designer', company: 'Padepokan Tujuh Sembilan', dateRange: 'Dec 2023 - Present', contractType: 'Contract', sortOrder: 1 },
        { initials: '99', jobTitle: 'UI/UX Designer', company: '99 Group', dateRange: 'Jul 2023 - Jan 2024', contractType: 'Internship', sortOrder: 2 },
        { initials: 'RG', jobTitle: 'Frontend Engineer', company: 'Rolling Glory', dateRange: 'Jul 2022 - Oct 2022', contractType: 'Internship', sortOrder: 3 },
        { initials: 'CB', jobTitle: 'Web Designer and Developer', company: 'Cibiru', dateRange: 'May 2022 - Sep 2022', contractType: 'Contract', sortOrder: 4 },
        { initials: 'CA', jobTitle: 'Design and Technology', company: 'CAGRI', dateRange: 'Sep 2021 - Feb 2022', contractType: 'Contract', sortOrder: 5 },
        { initials: 'LA', jobTitle: 'Web Developer', company: 'Lintasarta', dateRange: 'Jul 2018 - Nov 2018', contractType: 'Internship', sortOrder: 6 },
    ]);

    await db.insert(certifications).values([
        { initials: 'G', name: 'Google UX Design', issuer: 'Google', issueDate: 'Jul 2024', sortOrder: 0 },
        { initials: 'M', name: 'UI/UX Research and Design', issuer: 'MySkill', issueDate: 'Nov 2023', sortOrder: 1 },
        { initials: 'B', name: 'Proses Design Thinking dalam UI/UX', issuer: 'Binar Academy', issueDate: 'Jun 2023', sortOrder: 2 },
        { initials: 'B', name: 'UI/UX Fundamental', issuer: 'Binar Academy', issueDate: 'Jun 2023', sortOrder: 3 },
    ]);

    await db.insert(galleryImages).values([
        { imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600', sortOrder: 0 },
        { imageUrl: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=600', sortOrder: 1 },
        { imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600', sortOrder: 2 },
    ]);
    console.log('  ✓ About page seeded');

    // ==================== 4. Contact Page ====================
    console.log('  → Seeding contact page...');
    await db.delete(contactPage);
    await db.insert(contactPage).values({
        whatsappNumber: '6281234567890',
        defaultMessage: 'Hello Afdal! I saw your portfolio and I am interested in discussing a project together.',
    });
    console.log('  ✓ Contact page seeded');

    // ==================== 5. Projects ====================
    console.log('  → Seeding projects...');
    await db.delete(projectBlocks);
    await db.delete(projects);

    // Project 1: Geowisata Landing Page
    const [p1] = await db.insert(projects).values({
        title: 'Geowisata Landing Page',
        slug: 'geowisata-landing-page',
        company: 'Geowisata',
        year: '2024',
        liveLink: '',
        coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        visibility: 'public',
    }).returning();

    await db.insert(projectBlocks).values([
        { projectId: p1.id, type: 'narrative', sortOrder: 0, title: 'About the project', text: 'Geowisata is a tourism platform designed to showcase Indonesia\'s geological wonders. The goal was to create an immersive landing page that combines stunning visuals with clear information architecture.' },
        { projectId: p1.id, type: 'image_main', sortOrder: 1, imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200' },
        { projectId: p1.id, type: 'narrative', sortOrder: 2, title: 'The Challenge', text: 'Creating an engaging digital experience that captures the beauty of geological tourism while maintaining fast load times and accessibility across all devices.' },
    ]);

    // Project 2: Alpinist Mobile App
    const [p2] = await db.insert(projects).values({
        title: 'Alpinist Mobile App',
        slug: 'alpinist-mobile-app',
        company: 'Alpinist',
        year: '2024',
        liveLink: '',
        coverImageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800',
        visibility: 'public',
    }).returning();

    await db.insert(projectBlocks).values([
        { projectId: p2.id, type: 'narrative', sortOrder: 0, title: 'About the project', text: 'Alpinist is a mobile application designed for mountain climbing enthusiasts. The app helps users plan their expeditions, track routes, and connect with fellow climbers.' },
        { projectId: p2.id, type: 'image_main', sortOrder: 1, imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1200' },
    ]);

    // Project 3: Fintech Dashboard UI (Runway)
    const [p3] = await db.insert(projects).values({
        title: 'Fintech Dashboard UI',
        slug: 'fintech-dashboard-ui',
        company: 'Runway Inc.',
        year: '2024',
        liveLink: 'https://runway.com',
        coverImageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800',
        visibility: 'public',
    }).returning();

    await db.insert(projectBlocks).values([
        { projectId: p3.id, type: 'narrative', sortOrder: 0, title: 'About the project', text: 'Runway is an innovative financial dashboard designed specifically to streamline financial workflows for startups and small businesses. The goal was to consolidate metrics, provide clear visualizations of cash flow, and ensure an intuitive user experience for non-financial founders, empowering them to make data-driven decisions.' },
        { projectId: p3.id, type: 'image_main', sortOrder: 1, imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=1200' },
        { projectId: p3.id, type: 'narrative', sortOrder: 2, title: 'The Challenge', text: 'Startups often struggle to understand their real-time financial health due to fragmented data across multiple platforms. The challenge was designing a centralized hub that distills complex financial data into digestible, actionable insights without overwhelming the user.' },
        { projectId: p3.id, type: 'design_system', sortOrder: 3, fontFamily: 'Inter', colors: ['#3b8cfc', '#ff9500', '#ff3b30', '#34c759', '#2c2f3a', '#f2f2f7'] },
        { projectId: p3.id, type: 'narrative', sortOrder: 4, title: 'The Solution', text: 'We developed a modular dashboard where users can customize widgets according to their immediate needs. Emphasizing clean data visualization, we utilized soft shadows and bright accents to distinguish key metrics, significantly reducing the cognitive load required to parse financial reports.' },
        { projectId: p3.id, type: 'image_grid', sortOrder: 5, imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=600', imageUrl2: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=600' },
    ]);

    // Project 4: E-Commerce Experience
    const [p4] = await db.insert(projects).values({
        title: 'E-Commerce Experience',
        slug: 'e-commerce-experience',
        company: 'ShopX',
        year: '2023',
        liveLink: '',
        coverImageUrl: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=800',
        visibility: 'public',
    }).returning();

    await db.insert(projectBlocks).values([
        { projectId: p4.id, type: 'narrative', sortOrder: 0, title: 'About the project', text: 'A complete e-commerce redesign focusing on user experience and conversion optimization. The project involved rethinking the entire purchase flow from browsing to checkout.' },
        { projectId: p4.id, type: 'image_main', sortOrder: 1, imageUrl: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=1200' },
    ]);

    console.log('  ✓ 4 projects seeded');

    console.log('\n✅ Database seeded successfully!');
    console.log('📧 Login: admin@admin.com');
    console.log('🔑 Password: admin123');
    process.exit(0);
}

seed().catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
});

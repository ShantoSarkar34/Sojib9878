import "dotenv/config"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME ?? "Admin"

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set to seed the admin account"
    )
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log(`Admin user already exists: ${email}`)
    return
  }

  await auth.api.signUpEmail({ body: { email, password, name } })
  console.log(`Created admin user: ${email}`)
}

async function seedProfile() {
  await prisma.profile.upsert({
    where: { id: "singleton-profile" },
    create: {
      id: "singleton-profile",
      name: "Merajul Islam Sojib",
      title: "Front-End Developer",
      tagline: "I design and code beautifully simple things, and I love what I do.",
      bio: [
        "My journey into web development began with a simple curiosity about how the websites I used every day were actually built — and that curiosity quickly grew into a career. What started with a bit of HTML and CSS turned into building real, interactive applications with JavaScript, React, and Node.js.",
        "Today I work as a Software Developer at bPlugins, where I build and maintain 3+ WordPress plugins used by people around the world. Over the past 1.5 years in the industry I have learned how to ship real products, write code other people rely on, and keep improving things long after the first release.",
        "I love the sweet spot where design meets engineering — crafting clean, responsive interfaces with smooth interactions and thoughtful details. Right now I am going deeper with TypeScript, Prisma, and SQL, working steadily toward my goal of becoming a professional, well-rounded software developer.",
      ].join("\n\n"),
      photoUrl: "/images/profile.jpg",
      resumeUrl: null,
      email: "sojibislam9878@gmail.com",
      phone: "+880 1786-840058",
      whatsapp: null,
      location: "Bogura, Bangladesh",
    },
    update: {},
  })
  console.log("Seeded profile")
}

async function seedSocialLinks() {
  const links: { platform: "GITHUB" | "LINKEDIN"; url: string; order: number }[] = [
    { platform: "GITHUB", url: "https://github.com/sojibislam9878", order: 0 },
    {
      platform: "LINKEDIN",
      url: "https://www.linkedin.com/in/md-merajul-islam-sojib",
      order: 1,
    },
  ]

  for (const link of links) {
    const existing = await prisma.socialLink.findFirst({
      where: { platform: link.platform },
    })
    if (!existing) {
      await prisma.socialLink.create({ data: link })
    }
  }
  console.log("Seeded social links")
}

async function seedSkills() {
  const skills: {
    name: string
    iconUrl: string
    category: "FRONTEND" | "BACKEND" | "TOOLS"
    proficiency?: number
    order: number
  }[] = [
    { name: "HTML", iconUrl: "/images/skills/html.png", category: "FRONTEND", order: 0 },
    { name: "CSS", iconUrl: "/images/skills/css.png", category: "FRONTEND", order: 1 },
    {
      name: "Tailwind CSS",
      iconUrl: "/images/skills/tailwind.png",
      category: "FRONTEND",
      order: 2,
    },
    {
      name: "JavaScript",
      iconUrl: "/images/skills/javascript.png",
      category: "FRONTEND",
      order: 3,
    },
    {
      name: "React",
      iconUrl: "/images/skills/react.png",
      category: "FRONTEND",
      order: 4,
    },
    {
      name: "Node.js",
      iconUrl: "/images/skills/nodejs.png",
      category: "BACKEND",
      order: 5,
    },
    {
      name: "MongoDB",
      iconUrl: "/images/skills/mongodb.png",
      category: "BACKEND",
      order: 6,
    },
    { name: "GitHub", iconUrl: "/images/skills/github.jpg", category: "TOOLS", order: 7 },
    { name: "TypeScript", iconUrl: "", category: "FRONTEND", proficiency: 68, order: 8 },
    { name: "Prisma", iconUrl: "", category: "BACKEND", proficiency: 62, order: 9 },
    { name: "SQL", iconUrl: "", category: "BACKEND", proficiency: 60, order: 10 },
  ]

  for (const skill of skills) {
    const existing = await prisma.skill.findFirst({ where: { name: skill.name } })
    if (!existing) {
      await prisma.skill.create({ data: skill })
    }
  }
  console.log("Seeded skills")
}

async function seedProjects() {
  const projects = [
    {
      name: "Vanguard Estates",
      slug: "vanguard-estates",
      summary: "A modern apartment rental platform with listings, auth, and management.",
      description:
        "Vanguard Estates is a modern apartment rental platform where users can browse available properties, explore detailed listings, and connect with owners. It focuses on a clean browsing experience, secure authentication, and a fast, fully responsive interface.",
      features: [
        "Browse and search apartment listings with detailed property pages",
        "User authentication with protected, role-based routes",
        "Add, update, and manage property listings",
        "Booking / enquiry flow for interested renters",
        "Fully responsive design for mobile, tablet, and desktop",
      ],
      techStack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Firebase"],
      coverImageUrl: "/images/projects/vanguard-estates.jpg",
      liveUrl: "https://sojibislam9878-assignment12.web.app",
      category: "Real Estate",
      order: 0,
    },
    {
      name: "Flavor Junction",
      slug: "flavor-junction",
      summary: "A restaurant web app for browsing the menu, ordering, and managing dishes.",
      description:
        "Flavor Junction is a restaurant management web app for exploring a menu, ordering food, and managing dishes. It pairs a smooth ordering flow with an admin-friendly dashboard for keeping the menu up to date.",
      features: [
        "Browse the full food menu with categories and detail pages",
        "Add items to cart and place orders",
        "Secure user authentication and login",
        "Add, update, and delete menu items (admin)",
        "Mobile-first, fully responsive interface",
      ],
      techStack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Firebase"],
      coverImageUrl: "/images/projects/flavor-junction.jpg",
      liveUrl: "https://sojibislam9878assignment11.web.app/",
      category: "Business",
      order: 1,
    },
    {
      name: "Crafty Corner",
      slug: "crafty-corner",
      summary: "An e-commerce store for discovering and buying handcrafted products.",
      description:
        "Crafty Corner is an e-commerce website for discovering and purchasing handcrafted products. It covers the full shopping journey — from browsing the catalog to a working cart and a smooth checkout experience.",
      features: [
        "Product catalog with search and category filtering",
        "Shopping cart with add, remove, and quantity updates",
        "User authentication and order management",
        "Rich product detail pages with images and pricing",
        "Responsive, accessible storefront UI",
      ],
      techStack: ["React", "JavaScript", "Tailwind CSS", "Firebase"],
      coverImageUrl: "/images/projects/crafty-corner.jpg",
      liveUrl: "https://sojibislam9878assignment11.web.app",
      category: "E-commerce",
      order: 2,
    },
    {
      name: "Elite Haven",
      slug: "elite-haven",
      summary: "A polished web app showcasing robust client-side state management.",
      description:
        "Elite Haven is a web application built to showcase robust client-side state management and a polished, interactive UI. It emphasizes smooth navigation, reusable components, and a clean, maintainable architecture.",
      features: [
        "Centralized, predictable client-side state management",
        "Dynamic, interactive UI built from reusable components",
        "Client-side routing with protected pages",
        "Responsive layout across all screen sizes",
        "Clean, modular, and maintainable code structure",
      ],
      techStack: ["React", "JavaScript", "Tailwind CSS"],
      coverImageUrl: "/images/projects/elite-haven.jpg",
      liveUrl: "https://sojibislam9878-assignment9.web.app",
      category: "Web App",
      order: 3,
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      create: project,
      update: {},
    })
  }
  console.log("Seeded projects")
}

async function seedExperiences() {
  await prisma.experience.upsert({
    where: { id: "exp-bplugins" },
    create: {
      id: "exp-bplugins",
      role: "Software Developer",
      company: "bPlugins",
      startDate: new Date("2024-12-05"),
      endDate: null,
      current: true,
      description:
        "Building and maintaining 3+ WordPress plugins — shipping new features, fixing bugs, and improving performance and reliability for a growing user base. Currently expanding my toolkit with TypeScript, Prisma, and SQL to take on more of the stack.",
      order: 0,
    },
    update: {},
  })
  console.log("Seeded experiences")
}

async function seedSettings() {
  await prisma.settings.upsert({
    where: { id: "singleton-settings" },
    create: {
      id: "singleton-settings",
      siteTitle: "Merajul Islam Sojib — Front-End Developer",
      siteDescription:
        "Portfolio of Merajul Islam Sojib, a front-end developer building fast, accessible, and polished web applications.",
    },
    update: {},
  })
  console.log("Seeded settings")
}

async function main() {
  await seedAdmin()
  await seedProfile()
  await seedSocialLinks()
  await seedSkills()
  await seedProjects()
  await seedExperiences()
  await seedSettings()
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

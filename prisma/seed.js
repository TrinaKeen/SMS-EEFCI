const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seeding an admin user with email and role as 'admin'
  const admin = await prisma.user.create({
    data: {
      username: 'admin_user',
      email: 'admin@example.com',  // Added email field
      password: 'password123',  // Set a password for the admin user
      role: 'admin',  // Set role to 'admin'
    },
  });

  // Log seeded admin user
  console.log('Admin user seeded:', admin);
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

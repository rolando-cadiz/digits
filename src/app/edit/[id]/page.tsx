import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Contacts } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditContactForm from '@/components/EditContactForm';

export default async function EditContactPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  // console.log(id);
  const contact: Contacts | null = await prisma.contacts.findUnique({
    where: { id },
  });
  // console.log(stuff);
  if (!contact) {
    return notFound();
  }

  return (
    <main>
      <EditContactForm contact={contact} />
    </main>
  );
}

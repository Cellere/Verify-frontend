import { Header, About, Features, DocumentVerification, Princing, ContactForm, Footer } from "@/components/layout-component";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <About />
        <Features />
        <DocumentVerification />
        <Princing />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

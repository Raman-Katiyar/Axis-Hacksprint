import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
  title: "Organisers | Axis HackSprint 2.0",
  description: "Meet the team behind Axis HackSprint 2.0.",
};

const organisers = [
  { name: "Amit Kumar", image: "/organisers/amit-kumar.jpg" },
  { name: "Anoop Yadav", image: "/organisers/anoop-yadav.jpg" },
  { name: "Durgesh Yadav", image: "/organisers/durgesh-yadav.jpg" },
  { name: "Harsh Prajapati", image: "/organisers/harsh-prajapati.jpg" },
  { name: "Monika Kamal", image: "/organisers/monika-kamal.jpg" },
  { name: "Raman Katiyar", image: "/organisers/raman-katiyar.jpg" },
  { name: "Shani Sharma", image: "/organisers/shani-sharma.jpg" },
  { name: "Sumit Mishra", image: "/organisers/sumit-mishra.jpg" },
];

export default function OrganisersPage() {
  return (
    <main className="organisers-page min-h-screen bg-transparent">
      <Header />
      <div
        className="fixed inset-0 -z-20 bg-[url('/bg-wonderland.png')] bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      />
      <div className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-[1px]" aria-hidden="true" />

      <section className="organizers bg-transparent" aria-labelledby="organisers-title">
        <div className="organizers__inner">
          <header className="organizers__header">
            <p className="eyebrow">The people behind the magic</p>
            <h1 id="organisers-title">Meet the <span>Organisers</span></h1>
            <p>Meet the team making Axis HackSprint 2.0 happen.</p>
          </header>

          <div className="organizers__grid">
            {organisers.map((organiser, index) => (
              <article className="organizer-card" key={organiser.name}>
                <div className="organizer-card__top">
                  <span className="organizer-card__sigil">ORGANISER {String(index + 1).padStart(2, "0")}</span>
                  <span className="organizer-card__crystal" aria-hidden="true">◈</span>
                </div>
                <div className="organiser-card__portrait">
                  <Image
                    alt={`${organiser.name} portrait`}
                    className="organiser-card__image"
                    fill
                    sizes="(min-width: 1200px) 25vw, (min-width: 760px) 33vw, (min-width: 480px) 50vw, 100vw"
                    src={organiser.image}
                  />
                </div>
                <h2>{organiser.name}</h2>
                <p className="organiser-card__role">Axis HackSprint 2.0 · Tech Team</p>
              </article>
            ))}
          </div>

          <Link className="secondary-button organisers-page__back" href="/">
            <span aria-hidden="true">←</span> Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

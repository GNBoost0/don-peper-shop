import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales — Don Peper',
  description: 'Mentions légales du site Don Peper',
};

export default function LegalPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-4xl font-display text-dp-ink">Mentions Légales</h1>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Éditeur du site</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            Don Peper<br />
            Adresse : À compléter<br />
            Email : contact@donpeper.fr<br />
            SIRET : À compléter
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Directeur de la publication</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            Le responsable de la publication est le représentant légal de Don Peper.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Hébergement</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            Le site est hébergé par Vercel Inc.<br />
            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Propriété intellectuelle</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            L'ensemble des contenus présents sur ce site (textes, images, vidéos, design, éléments
            graphiques) est la propriété exclusive de Don Peper, sauf mention contraire. Toute
            reproduction, représentation, modification ou adaptation, totale ou partielle, est
            interdite sans autorisation écrite préalable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Législation relative à l'alcool</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            La vente d'alcool est interdite aux mineur·e·s. L'abus d'alcool est dangereux pour la
            santé. À consommer avec modération. « Pour votre santé, pratiquez une activité physique
            régulière » · www.mangerbouger.fr
          </p>
        </section>
      </div>
    </div>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CGV — Don Peper',
  description: 'Conditions Générales de Vente du site Don Peper',
};

export default function CGVPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-4xl font-display text-dp-ink">Conditions Générales de Vente</h1>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Article 1 — Objet</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            Les présentes conditions générales de vente régissent les relations contractuelles entre
            Don Peper (« le Vendeur ») et tout client (« l'Acheteur ») souhaitant acheter des produits
            sur le site donpeper.fr. Toute commande implique l'acceptation pleine et entière des
            présentes CGV.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Article 2 — Produits et prix</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            Les produits proposés sont des rhums arrangés artisanaux aux fruits, disponibles en
            fioles de 10cl, bouteilles de 75cl et 1L. Les prix sont indiqués en euros toutes taxes
            comprises. Don Peper se réserve le droit de modifier ses prix à tout moment, étant toutefois
            entendu que le prix figurant au catalogue le jour de la commande sera le seul applicable à
            l'Acheteur.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Article 3 — Commande et paiement</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            Les commandes sont passées directement sur le site. Le paiement est effectué via Stripe,
            sécurisé et chiffré. Les moyens de paiement acceptés sont : carte bancaire (Visa,
            Mastercard), Apple Pay et Google Pay. La commande n'est validée qu'après confirmation du
            paiement par Stripe.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Article 4 — Livraison</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            <strong className="text-dp-ink-muted">Zones de livraison :</strong> France métropolitaine,
            Belgique, et les pays de l'Union Européenne.<br />
            <strong className="text-dp-ink-muted">Frais de livraison :</strong> Offerts en France et en
            Belgique. 4,99€ pour le reste de l'Europe.<br />
            <strong className="text-dp-ink-muted">Délais :</strong> Les commandes sont expédiées sous 48h
            ouvrées. Le délai de livraison est de 3 à 7 jours ouvrés selon la destination.<br />
            <strong className="text-dp-ink-muted">Transport :</strong> Les colis sont expédiés via La Poste
            ou un transporteur partenaire. Un numéro de suivi est communiqué par email.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Article 5 — Droit de rétractation</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            Conformément aux articles L121-20 et suivants du Code de la consommation, l'Acheteur
            dispose d'un délai de 14 jours à compter de la réception de sa commande pour exercer son
            droit de rétractation. Toutefois, conformément à l'article L121-21-8 du Code de la
            consommation, ce droit ne peut s'appliquer aux « fournitures de boissons alcoolisées » dont
            la valeur convient à une consommation immédiate. Les produits doivent être retournés dans
            leur état d'origine, non ouverts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Article 6 — Garanties</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            Don Peper garantit que les produits vendus sont conformes à la description fournie sur le
            site. En cas de produit défectueux ou non conforme, l'Acheteur doit contacter Don Peper
            dans un délai de 48h suivant la réception pour obtenir un remplacement ou un remboursement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Article 7 — Restriction d'âge</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            La vente d'alcool est strictement interdite aux mineur·e·s. En validant sa commande,
            l'Acheteur certifie être âgé·e d'au moins 18 ans. Don Peper se réserve le droit de demander
            une preuve d'âge à la livraison.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Article 8 — Droit applicable</h2>
          <p className="text-sm text-dp-ink leading-relaxed">
            Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux
            français seront seuls compétents.
          </p>
        </section>
      </div>
    </div>
  );
}

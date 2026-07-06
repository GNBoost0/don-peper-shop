import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — Don Peper',
  description: 'Politique de confidentialité et de protection des données',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-4xl font-display text-white">Politique de Confidentialité</h1>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Collecte des données</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Don Peper collecte les données personnelles nécessaires au traitement des commandes :
            nom, prénom, adresse email, adresse de livraison et informations de paiement. Ces données
            sont collectées lors de la passation de commande sur le site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Utilisation des données</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Les données collectées sont utilisées exclusivement pour :
          </p>
          <ul className="text-sm text-white/50 space-y-1 list-disc list-inside">
            <li>Traiter et expédier les commandes</li>
            <li>Communiquer des informations relatives à la commande</li>
            <li>Assurer le service client</li>
            <li>Respecter les obligations légales (facturation, taxes)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Paiement sécurisé</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Les paiements sont traités par Stripe, qui garantit la sécurité des transactions selon les
            standards PCI DSS. Les données bancaires ne sont jamais stockées sur nos serveurs. Elles
            sont chiffrées et traitées directement par Stripe.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Cookies</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Le site utilise des cookies techniques nécessaires à son fonctionnement (panier, vérification
            d'âge). Aucun cookie publicitaire ou de tracking tiers n'est utilisé sans consentement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Durée de conservation</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Les données sont conservées pendant la durée nécessaire à la fourniture du service, puis
            archivées conformément aux obligations légales (10 ans pour les données comptables).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Vos droits (RGPD)</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des
            droits suivants :
          </p>
          <ul className="text-sm text-white/50 space-y-1 list-disc list-inside">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement (« droit à l'oubli »)</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition au traitement</li>
          </ul>
          <p className="text-sm text-white/50 leading-relaxed mt-3">
            Pour exercer ces droits, contactez-nous à : contact@donpeper.fr
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-display text-dp-gold">Contact</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Pour toute question relative à vos données personnelles : contact@donpeper.fr
          </p>
        </section>
      </div>
    </div>
  );
}

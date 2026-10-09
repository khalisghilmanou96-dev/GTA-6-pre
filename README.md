# GTA VI — Landing page avec formulaire et Stripe

Hébergement : GitHub Pages (mettre index.html et assets/ à la racine).

Parcours : bouton de la page → formulaire pseudo + e-mail → lien Stripe Payment Links. L’adresse e-mail est ajoutée au lien via `prefilled_email`. Le pseudo est conservé seulement dans `sessionStorage` du navigateur : **il n’est pas envoyé à Stripe et n’est pas enregistré avec la commande**. Pour récupérer le pseudo avec le paiement, configurez un champ personnalisé obligatoire « Pseudo » dans Stripe Payment Links. Un backend est nécessaire pour transmettre et enregistrer automatiquement le pseudo sans deuxième saisie.

Ne mettez jamais de clé Stripe secrète dans GitHub Pages. Vérifiez le prix, la disponibilité des codes, les droits de vente et les obligations légales avant d'encaisser.

## Page après paiement
La page `merci.html` est incluse. Pour que Stripe y redirige le client :
1. Ouvrez le lien de paiement dans Stripe Dashboard, puis modifiez-le.
2. Dans « Après le paiement » (After payment), sélectionnez « Rediriger vers votre site web ».
3. Indiquez : `https://khalisghilmanou96-dev.github.io/GTA-6-pre/merci.html`
4. Enregistrez et testez le parcours.

**Important :** une redirection vers `merci.html` ne constitue pas une preuve de paiement. Vérifiez les transactions dans Stripe ; pour une confirmation automatique fiable, utilisez des webhooks Stripe côté serveur.

// Exemple de serveur Stripe : npm install express stripe dotenv
// Ne mettez JAMAIS STRIPE_SECRET_KEY dans le HTML.
require('dotenv').config();
const express=require('express');const Stripe=require('stripe');
const app=express();const stripe=Stripe(process.env.STRIPE_SECRET_KEY);
app.use(express.json());app.use(express.static(__dirname));
app.post('/api/checkout',async(req,res)=>{
 const {email,pseudo}=req.body||{};
 if(typeof email!=='string'||!/^\S+@\S+\.\S+$/.test(email)||typeof pseudo!=='string'||pseudo.length<2||pseudo.length>40)return res.status(400).json({error:'Données invalides'});
 // IMPORTANT: contrôler côté serveur les 1000 commandes disponibles et les droits de distribution.
 // Réserver atomiquement une place avant de créer la session, puis confirmer par webhook.
 try{const session=await stripe.checkout.sessions.create({mode:'payment',customer_email:email,client_reference_id:require('crypto').randomUUID(),metadata:{pseudo:pseudo.slice(0,40)},line_items:[{price_data:{currency:'eur',unit_amount:5000,product_data:{name:'GTA VI — précommande numérique PS5'}},quantity:1}],success_url:process.env.PUBLIC_URL+'/?payment=success',cancel_url:process.env.PUBLIC_URL+'/?payment=cancel'});res.json({url:session.url});}catch(e){res.status(500).json({error:'Paiement indisponible'});}
});
// Ajouter webhook Stripe checkout.session.completed (signature vérifiée), base de données,
// remboursements, confirmation e-mail et envoi des codes à la sortie avant production.
app.listen(process.env.PORT||3000);

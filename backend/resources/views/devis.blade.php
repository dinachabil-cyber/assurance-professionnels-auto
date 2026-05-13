<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Devis - Aksam Assurance</title>
    <meta name="description" content="Remplissez notre formulaire pour obtenir un devis d'assurance professionnelle automobile gratuit et personnalisé." />
    <meta name="keywords" content="devis assurance professionnel auto, assurance garage, assurance auto-école" />
    <meta name="robots" content="noindex, nofollow" />

    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }

      body {
        font-family: 'Inter', system-ui, sans-serif;
        background: #f8fafc;
        color: #1e293b;
        line-height: 1.6;
      }

      .header {
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        color: white;
        padding: 24px;
        text-align: center;
      }

      .header h1 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 4px;
      }

      .header p {
        font-size: 0.9rem;
        opacity: 0.9;
      }

      .container {
        max-width: 800px;
        margin: -30px auto 40px;
        padding: 0 16px;
      }

      .card {
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        overflow: hidden;
      }

      .card-header {
        background: #fef3c7;
        padding: 12px 24px;
        font-weight: 600;
        color: #92400e;
        border-bottom: 1px solid #fde68a;
      }

      .card-body {
        padding: 24px;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 16px;
      }

      .form-row .col-12 {
        grid-column: 1 / -1;
      }

      label {
        display: block;
        font-size: 0.85rem;
        font-weight: 500;
        color: #374151;
        margin-bottom: 4px;
      }

      .required::after {
        content: ' *';
        color: #ef4444;
      }

      input, select {
        width: 100%;
        padding: 10px 14px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 0.9rem;
        color: #1e293b;
        background: white;
        transition: border-color 0.2s, box-shadow 0.2s;
      }

      input:focus, select:focus {
        outline: none;
        border-color: #f97316;
        box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
      }

      .btn-primary {
        width: 100%;
        padding: 14px 24px;
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
      }

      .consent-text {
        font-size: 0.78rem;
        color: #64748b;
        text-align: center;
        margin-top: 12px;
        line-height: 1.5;
      }

      .info-steps {
        padding: 24px;
        background: white;
        border-radius: 16px;
        margin-top: 16px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      }

      .step {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid #f1f5f9;
      }

      .step:last-child { border-bottom: none; }

      .step-num {
        width: 28px;
        height: 28px;
        background: #fef3c7;
        color: #92400e;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.85rem;
        flex-shrink: 0;
      }

      .step-text { font-size: 0.9rem; color: #374151; }
      .step-text strong { color: #1e293b; }

      .hero-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        margin-top: 16px;
      }

      @media (max-width: 640px) {
        .form-row { grid-template-columns: 1fr; }
        .header h1 { font-size: 1.25rem; }
        .container { margin-top: -20px; }
      }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔧 Obtenez votre devis assurance professionnel auto</h1>
        <p>Formulaire rapide • Comparatif gratuit • Sans engagement</p>
    </div>

    <div class="container">
        <div class="card">
            <div class="card-header">📋 Complétez ce formulaire</div>
            <div class="card-body">
                <form id="main-form" method="POST" action="/api/v1/devis">
                    <div class="form-row">
                        <div class="col-12">
                            <label class="required" for="nom">Nom</label>
                            <input type="text" id="nom" name="nom" required placeholder="Votre nom">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12">
                            <label class="required" for="prenom">Prénom</label>
                            <input type="text" id="prenom" name="prenom" required placeholder="Votre prénom">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12">
                            <label for="raison_sociale">Raison sociale</label>
                            <input type="text" id="raison_sociale" name="raison_sociale" placeholder="Nom de votre entreprise">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12">
                            <label for="activite">Activité</label>
                            <input type="text" id="activite" name="activite" placeholder="Votre activité professionnelle">
                        </div>
                    </div>
                    <div class="form-row">
                        <div>
                            <label for="demarrage">Démarrage d'activité</label>
                            <select id="demarrage" name="demarrage">
                                <option value="">Sélectionnez…</option>
                                <option value="OUI">Oui</option>
                                <option value="NON">Non</option>
                            </select>
                        </div>
                        <div>
                            <label for="assure">Déjà assuré(e) ?</label>
                            <select id="assure" name="assure">
                                <option value="">Sélectionnez…</option>
                                <option value="OUI">Oui</option>
                                <option value="NON">Non</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div>
                            <label for="code">Code postal</label>
                            <input type="text" id="code" name="code" maxlength="5" placeholder="Code postal">
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="email@exemple.com">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-12">
                            <label class="required" for="tele">Téléphone</label>
                            <input type="tel" id="tele" name="tele" maxlength="10" required placeholder="01 23 45 67 89">
                        </div>
                    </div>
                    <button type="submit" class="btn-primary">Comparer maintenant</button>
                </form>
                <p class="consent-text">En cliquant sur « Comparer », vous acceptez de transmettre vos informations à AKSAM ASSURANCES conformément à notre politique de confidentialité.</p>
            </div>
        </div>

        <div class="info-steps">
            <strong>Comment ça marche ?</strong>
            <div class="step">
                <div class="step-num">1</div>
                <div class="step-text"><strong>Complétez le formulaire</strong> — Quelques secondes suffisent.</div>
            </div>
            <div class="step">
                <div class="step-num">2</div>
                <div class="step-text"><strong>Recevez vos propositions</strong> — Plusieurs compagnies comparées.</div>
            </div>
            <div class="step">
                <div class="step-num">3</div>
                <div class="step-text"><strong>Choisissez votre assurance</strong> — Conseil personnalisé inclus.</div>
            </div>
        </div>
    </div>
</body>
</html>
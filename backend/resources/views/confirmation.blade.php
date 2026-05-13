<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirmation - Aksam Assurance</title>
    <meta name="description" content="Votre demande de devis a bien été enregistrée. Un conseiller vous contactera rapidement." />

    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Inter', system-ui, sans-serif;
        background: #f8fafc;
        color: #1e293b;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        padding: 80px 16px;
      }
      .container {
        max-width: 600px;
        width: 100%;
      }
      .card {
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        padding: 48px;
        text-align: center;
      }
      .icon-circle {
        width: 80px;
        height: 80px;
        background: #ecfdf5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 24px;
      }
      .icon-circle svg { width: 40px; height: 40px; color: #059669; }
      h1 { font-size: 1.5rem; margin-bottom: 8px; }
      p { color: #64748b; margin-bottom: 16px; }
      .tel { color: #d97706; font-weight: 600; }
      .steps {
        text-align: left;
        padding: 20px;
        background: #fffbeb;
        border-radius: 12px;
        margin: 24px 0;
      }
      .steps li { margin-bottom: 8px; color: #451a03; }
      .back-btn {
        display: inline-block;
        padding: 12px 32px;
        background: linear-gradient(135deg, #f97316, #ea580c);
        color: white;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 600;
        margin-top: 16px;
      }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="icon-circle">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h1>Merci pour votre demande !</h1>
            <p>Un de nos conseillers vous contactera dans les plus brefs délais.</p>

            <div class="steps">
                <h3>Prochaines étapes :</h3>
                <ol>
                    <li>Un conseiller étudie votre demande</li>
                    <li>Vous recevez un comparatif par email</li>
                    <li>Vous choisissez l'offre qui vous convient</li>
                </ol>
            </div>

            <p>Besoin d'aide ? Appelez-nous : <span class="tel">01 82 83 48 00</span></p>
            <a href="/" class="back-btn">Retour à l'accueil</a>
        </div>
    </div>
</body>
</html>
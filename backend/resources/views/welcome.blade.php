<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>{{ config('app.name', 'Aksam Assurance') }}</title>
    <meta name="description" content="Devis assurance pour professionnels de l'automobile, un comparatif rapide et en ligne." />
    <meta name="keywords" content="Assurance professionnel auto, RC PRO auto-école, Devis assurance MRP auto-école" />
    <meta name="author" content="Aksam Assurance" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="{{ url()->current() }}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:title" content="{{ config('app.name', 'Aksam Assurance') }}" />
    <meta property="og:description" content="Comparez les meilleures assurances pour professionnels de l'automobile." />
    <meta property="og:image" content="{{ asset('image/og-image.jpg') }}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="{{ config('app.name', 'Aksam Assurance') }}" />
    <meta property="twitter:description" content="Devis assurance pour professionnels de l'automobile." />
    <meta property="twitter:image" content="{{ asset('image/og-image.jpg') }}" />

    <link rel="icon" type="image/png" href="{{ asset('favicon.ico') }}" />
    <link rel="apple-touch-icon" href="{{ asset('logo192.png') }}" />
    <link rel="manifest" href="{{ asset('manifest.json') }}" />

    @vite('frontend/src/main.jsx')
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>

    <!-- Google Tag Manager (noscript) - Preserved for SEO -->
    <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TK9KZRKZ"
                height="0" width="0" style="display:none;visibility:hidden"
                title="Google Tag Manager"></iframe>
    </noscript>

    <div id="root"></div>
</body>
</html>
module.exports = `<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <base href="%base-href%" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content="%meta-description%" />
        <meta name="keywords" content="%meta-keywords%" />
        <meta name="theme-color" content="%theme-color%" />
        <link rel="manifest" href="%manifest-uri%" />

        <!-- OpenGraph/FB -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="%meta-url%" />
        <meta property="og:title" content="%meta-title%" />
        <meta property="og:description" content="%meta-description%" />
        <meta property="og:image" content="%meta-image%" />

        <!-- twitter -->
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="%meta-url%" />
        <meta property="twitter:title" content="%meta-title%" />
        <meta property="twitter:description" content="%meta-description%" />
        <meta property="twitter:image" content="%meta-image%" />

        <!-- generic favicons -->
        <link rel="shortcut icon" href="/static/icons/icon32x32" />
        <link rel="icon" href="/static/icons/icon32x32" sizes="32x32" />
        <link rel="icon" href="/static/icons/icon48x48" sizes="48x48" />
        <link rel="icon" href="/static/icons/icon96x96" sizes="96x96" />
        <link rel="icon" href="/static/icons/icon128x128" sizes="128x128" />
        <link rel="icon" href="/static/icons/icon144x144" sizes="144x144" />

        <!-- iOS -->
        <link rel="apple-touch-icon" href="/static/icons/icon192x192" />

        <!-- windows -->
        <meta name="msapplication-TileColor" content="%theme-color%" />
        <meta name="msapplication-TileImage" content="/static/icons/icon144x144" />

        <title>%meta-title%</title>

        <!-- %style-chunks% -->
    </head>
    <body>
        <script type="text/javascript">
            // <!-- %initial-data% -->
        </script>
        <div id="root">
            <div id="__ignored">
                <!-- %prerendered-dom% -->
            </div>
            <noscript>
                <h3 style="color: red">
                    O site não pôde ser carregado.<br />
                    Aguarde 10 segundos e atualize a página, ou, se for o caso,
                    habilite o JavaScript no seu navegador e tente novamente.
                </h3>
            </noscript>
        </div>
        <script type="text/javascript">
            const ignored = document.querySelector('#__ignored');
            if( ignored ) {
                ignored.style.display = 'none';
            }
        </script>
        <!-- %webpack-chunks% -->
    </body>
</html>`;

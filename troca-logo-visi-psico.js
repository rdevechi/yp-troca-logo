(function() {
    const idQueTrocaLogo = "8538847412516"; // ID do produto como STRING
    const novaLogoUrl = 'https://seudominio.com.br/caminho-da-nova-logo.png'; // URL da nova logo

    function trocarLogo() {
        const logoElement = document.querySelector('header img, .header__logo img');
        if (logoElement) {
            logoElement.src = novaLogoUrl;
            console.log('🔥 Logo alterada para a nova!');
        } else {
            console.warn('❌ Logo não encontrada pra trocar, ô anta do caralho!');
        }
    }

    function liberarLogo() {
        const logoElement = document.querySelector('header img, .header__logo img');
        if (logoElement) {
            logoElement.style.visibility = 'visible';
            console.log('✅ Logo liberada depois da troca!');
        } else {
            console.warn('❌ Logo não encontrada pra liberar, otário!');
        }
    }

    function checarProduto() {
        try {
            const order = window?.dataLayer?.find(item => item.event === 'purchase')?.order;
            if (order && Array.isArray(order.optionsIds)) {
                console.log('🎯 IDs encontrados no dataLayer:', order.optionsIds);
                if (order.optionsIds.includes(String(idQueTrocaLogo))) {
                    console.log('🎯 Produto certo encontrado, trocando logo!');
                    trocarLogo();
                }
                liberarLogo(); // Libera a logo depois de agir
                return true; // Achou, pode parar
            } else {
                console.warn('⚠️ order.optionsIds não encontrado ainda no dataLayer...');
            }
        } catch (err) {
            console.error('💀 Deu pau tentando pegar produto:', err);
        }

        return false; // Ainda não achou
    }

    function monitorarDataLayer() {
        let tentativas = 0;
        const maxTentativas = 50; // Máximo de tentativas (5 segundos se intervalo for 100ms)

        const intervalo = setInterval(() => {
            tentativas++;
            console.log(`👀 Tentativa ${tentativas} de capturar o purchase no dataLayer...`);

            if (checarProduto() || tentativas >= maxTentativas) {
                clearInterval(intervalo);
                if (tentativas >= maxTentativas) {
                    console.warn('⌛ Tempo máximo atingido, liberando logo do jeito que tá!');
                    liberarLogo();
                }
            }
        }, 100); // Checa a cada 100ms
    }

    // Só executa se for página de finalização
    if (document.body.classList.contains('checkout-finalization')) {
        console.log('🛒 Página de obrigado detectada, iniciando vigilância extrema!');
        monitorarDataLayer();
    } else {
        console.log('🚫 Não é página de obrigado, ignora tudo.');
    }
})();
(function() {
    // ID do produto que vai disparar a troca da logo
    const idQueTrocaLogo = "10062224163108"; // <- Bota aqui o ID do optionsIds certo, COMO STRING!

    // URL da nova logo
    const novaLogoUrl = 'https://images.yampi.me/assets/stores/avalanchedeofertas/uploads/brands/680ab566217b8.png'; // <- Bota a URL certinha da nova logo

    // Função pra trocar a logo pela nova
    function trocarLogo() {
        const logoElement = document.querySelector('header img, .header__logo img');
        if (logoElement) {
            logoElement.src = novaLogoUrl;
            console.log('🔥 Logo alterada com sucesso!');
        } else {
            console.warn('❌ Logo não encontrada para trocar, seu anta!');
        }
    }

    // Função pra liberar (mostrar) a logo depois da decisão
    function liberarLogo() {
        const logoElement = document.querySelector('header img, .header__logo img');
        if (logoElement) {
            logoElement.style.visibility = 'visible';
            console.log('✅ Logo liberada com sucesso!');
        } else {
            console.warn('❌ Logo não encontrada para liberar, seu corno!');
        }
    }

    // Função principal: identificar produto comprado
    function pegarProdutoComprado() {
        try {
            const order = window?.dataLayer?.find(item => item.event === 'purchase')?.order;
            if (order && Array.isArray(order.optionsIds)) {
                console.log('🎯 IDs encontrados no dataLayer:', order.optionsIds);

                if (order.optionsIds.includes(String(idQueTrocaLogo))) {
                    trocarLogo();
                }
            } else {
                console.warn('⚠️ order.optionsIds não encontrado no dataLayer, tentando cookies...');
            }

            // Backup pelo cookie
            const cookies = document.cookie.split(';').reduce((acc, cookie) => {
                const [name, value] = cookie.trim().split('=');
                acc[name] = value;
                return acc;
            }, {});

            if (cookies['IdProduto']) {
                const idsDoCookie = cookies['IdProduto'].split(',').map(id => id.trim());
                console.log('🍪 IDs encontrados no cookie:', idsDoCookie);

                if (idsDoCookie.includes(String(idQueTrocaLogo))) {
                    trocarLogo();
                }
            }

        } catch (err) {
            console.error('💀 Deu erro tentando identificar o produto:', err);
        } finally {
            // De qualquer forma, libera a logo no final
            liberarLogo();
        }
    }

    // Só roda essa putaria toda se for página de finalização
    if (document.body.classList.contains('checkout-finalization')) {
        console.log('🛒 Página de Obrigado detectada, executando script de troca de logo!');
        document.addEventListener('DOMContentLoaded', pegarProdutoComprado);
    } else {
        console.log('🚫 Não é página de obrigado, não vou rodar porra nenhuma.');
    }
})();

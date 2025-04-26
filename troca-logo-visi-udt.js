(function() {
    // Configurações
    const idQueTrocaLogo = "10062224163108"; // << Coloca aqui o ID que tá no optionsIds como STRING
    const novaLogoUrl = 'https://images.yampi.me/assets/stores/avalanchedeofertas/uploads/brands/680ab566217b8.png'; // << URL certinha da nova logo

    // Função para trocar a logo
    function trocarLogo() {
        const logoElement = document.querySelector('header img, .header__logo img');
        if (logoElement) {
            logoElement.src = novaLogoUrl;
            console.log('🔥 Logo alterada para a nova!');
        } else {
            console.warn('❌ Logo não encontrada pra trocar, ô anta!');
        }
    }

    // Função para liberar a logo depois de tudo feito
    function liberarLogo() {
        const logoElement = document.querySelector('header img, .header__logo img');
        if (logoElement) {
            logoElement.style.visibility = 'visible';
            console.log('✅ Logo liberada com sucesso, sem piscada filha da puta!');
        } else {
            console.warn('❌ Logo não encontrada pra liberar, caralho!');
        }
    }

    // Função principal
    function pegarProdutoComprado() {
        let precisaTrocarLogo = false;
        
        try {
            const order = window?.dataLayer?.find(item => item.event === 'purchase')?.order;
            if (order && Array.isArray(order.optionsIds)) {
                console.log('🎯 IDs encontrados no dataLayer:', order.optionsIds);
                if (order.optionsIds.includes(String(idQueTrocaLogo))) {
                    precisaTrocarLogo = true;
                }
            } else {
                console.warn('⚠️ order.optionsIds não encontrado no dataLayer, tentando cookies...');
            }

            const cookies = document.cookie.split(';').reduce((acc, cookie) => {
                const [name, value] = cookie.trim().split('=');
                acc[name] = value;
                return acc;
            }, {});

            if (cookies['IdProduto']) {
                const idsDoCookie = cookies['IdProduto'].split(',').map(id => id.trim());
                console.log('🍪 IDs encontrados no cookie:', idsDoCookie);
                if (idsDoCookie.includes(String(idQueTrocaLogo))) {
                    precisaTrocarLogo = true;
                }
            }

        } catch (err) {
            console.error('💀 Deu erro tentando pegar produto:', err);
        } finally {
            if (precisaTrocarLogo) {
                trocarLogo(); // Primeiro troca
            }
            liberarLogo(); // Depois libera SEMPRE no final
        }
    }

    // Só executa se for página de finalização
    if (document.body.classList.contains('checkout-finalization')) {
        console.log('🛒 Página de obrigado detectada, rodando o bagulho!');
        document.addEventListener('DOMContentLoaded', pegarProdutoComprado);
    } else {
        console.log('🚫 Não é página de obrigado, não faço porra nenhuma!');
    }
})();
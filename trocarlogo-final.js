(function() {
    const idQueTrocaLogo = "10051103555876"; // <<-- AGORA PASSA COMO STRING, igual tá no optionsIds
    const novaLogoUrl = 'https://images.yampi.me/assets/stores/avalanchedeofertas/uploads/brands/680ab566217b8.png';

    function trocarLogo() {
        const logoElement = document.querySelector('header img, .header__logo img');
        if (logoElement) {
            logoElement.src = novaLogoUrl;
            console.log('🔥 Logo alterada com sucesso no console!');
        } else {
            console.warn('❌ Logo não encontrada, seu corno analfabeto!');
        }
    }

    function pegarProdutoComprado() {
        try {
            const order = window?.dataLayer?.find(item => item.event === 'purchase')?.order;
            if (order && Array.isArray(order.optionsIds)) {
                console.log('🎯 IDs encontrados na dataLayer:', order.optionsIds);

                if (order.optionsIds.includes(String(idQueTrocaLogo))) {
                    trocarLogo();
                    return;
                }
            }

            const cookies = document.cookie.split(';').reduce((acc, cookie) => {
                const [name, value] = cookie.trim().split('=');
                acc[name] = value;
                return acc;
            }, {});

            if (cookies['IdProduto']) {
                const idsDoCookie = cookies['IdProduto'].split(',').map(id => id.trim());
                console.log('🍪 IDs do cookie:', idsDoCookie);

                if (idsDoCookie.includes(String(idQueTrocaLogo))) {
                    trocarLogo();
                }
            }
        } catch (err) {
            console.error('💀 Erro no script:', err);
        }
    }

    document.addEventListener('DOMContentLoaded', pegarProdutoComprado);
})();
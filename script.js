document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('inputArea');
    const outputArea = document.getElementById('outputArea');
    const copyBtn = document.getElementById('copyBtn');

    // Processamento em tempo real ao digitar ou colar
    inputArea.addEventListener('input', () => {
        const lines = inputArea.value.split('\n');
        
        const processedLines = lines.map(line => {
            // Extrai todos os dígitos numéricos da linha usando Expressão Regular
            const digits = line.match(/\d/g);
            // Se encontrar dígitos, junta-os, caso contrário deixa a linha vazia
            return digits ? digits.join('') : '';
        });

        // Atualiza a área de saída mantendo as quebras de linha correspondentes
        outputArea.value = processedLines.join('\n');
    });

    // Função para copiar o resultado para a área de transferência
    copyBtn.addEventListener('click', () => {
        if (!outputArea.value.trim()) {
            alert('Não há conteúdo para copiar!');
            return;
        }

        navigator.clipboard.writeText(outputArea.value)
            .then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'Copiado! ✓';
                copyBtn.style.backgroundColor = '#04d361';
                
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.style.backgroundColor = '';
                }, 2000);
            })
            .catch(err => {
                console.error('Erro ao copiar texto: ', err);
                alert('Não foi possível copiar automaticamente. Selecione o texto e copie manualmente.');
            });
    });
});
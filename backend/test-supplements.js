/**
 * Script de teste para o sistema de suplementos
 * Testa a integração com a API do Mercado Livre
 */

const supplementService = require('./services/supplementService');

// Exemplos de links do Mercado Livre para testar
const testLinks = [
  // Whey Protein Growth
  'https://produto.mercadolivre.com.br/MLB-1234567890-whey-protein-growth',
  
  // Formato alternativo
  'MLB-1234567890',
  
  // Com hífen
  'MLB-1234567890'
];

async function testExtractId() {
  console.log('\n🧪 Testando extração de ID do Mercado Livre...\n');
  
  testLinks.forEach(link => {
    const id = supplementService.extractMercadoLivreId(link);
    console.log(`Link: ${link}`);
    console.log(`ID extraído: ${id}`);
    console.log('---');
  });
}

async function testFetchProduct() {
  console.log('\n🧪 Testando busca de produto no Mercado Livre...\n');
  
  // Exemplo real: Whey Protein 100% Pure da Integral Médica
  const testProductId = 'MLB-1893474809';
  
  try {
    console.log(`Buscando produto: ${testProductId}...`);
    const product = await supplementService.fetchMercadoLivreProduct(testProductId);
    
    console.log('\n✅ Produto encontrado:');
    console.log('---');
    console.log(`Título: ${product.title}`);
    console.log(`Preço: R$ ${product.price}`);
    console.log(`Preço Original: R$ ${product.original_price}`);
    console.log(`Imagem: ${product.image_url}`);
    console.log(`Em estoque: ${product.stock_available ? 'Sim' : 'Não'}`);
    console.log(`Avaliação: ${product.rating || 'Sem avaliação'}`);
    console.log(`Reviews: ${product.total_reviews}`);
    console.log(`Descrição: ${product.description?.substring(0, 100)}...`);
    console.log(`Link: ${product.permalink}`);
    console.log('---');
    
  } catch (error) {
    console.error('❌ Erro ao buscar produto:', error.message);
  }
}

async function testMultipleProducts() {
  console.log('\n🧪 Testando múltiplos produtos...\n');
  
  // Lista de produtos populares para testar
  const products = [
    { id: 'MLB-1893474809', name: 'Whey Protein Integral Médica' },
    { id: 'MLB-1790654321', name: 'Creatina Growth' },
    { id: 'MLB-1234567890', name: 'Produto Inválido (teste de erro)' }
  ];
  
  for (const { id, name } of products) {
    console.log(`\nTestando: ${name} (${id})...`);
    
    try {
      const product = await supplementService.fetchMercadoLivreProduct(id);
      console.log(`✅ ${product.title}`);
      console.log(`   Preço: R$ ${product.price}`);
    } catch (error) {
      console.log(`❌ Erro: ${error.message}`);
    }
    
    // Delay para não sobrecarregar a API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Menu interativo
async function main() {
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║  TESTE DO SISTEMA DE SUPLEMENTOS        ║');
  console.log('╚══════════════════════════════════════════╝\n');
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command) {
    console.log('Uso:');
    console.log('  node test-supplements.js extract    - Testa extração de IDs');
    console.log('  node test-supplements.js fetch      - Testa busca de um produto');
    console.log('  node test-supplements.js multiple   - Testa múltiplos produtos');
    console.log('  node test-supplements.js all        - Executa todos os testes');
    console.log('\nExemplo:');
    console.log('  node test-supplements.js fetch');
    return;
  }
  
  try {
    switch (command) {
      case 'extract':
        await testExtractId();
        break;
        
      case 'fetch':
        await testFetchProduct();
        break;
        
      case 'multiple':
        await testMultipleProducts();
        break;
        
      case 'all':
        await testExtractId();
        await testFetchProduct();
        await testMultipleProducts();
        break;
        
      default:
        console.log(`❌ Comando desconhecido: ${command}`);
        console.log('Use: extract, fetch, multiple, ou all');
    }
    
    console.log('\n✅ Testes concluídos!\n');
    
  } catch (error) {
    console.error('\n❌ Erro durante os testes:', error);
    process.exit(1);
  }
}

// Executar se for script principal
if (require.main === module) {
  main();
}

module.exports = {
  testExtractId,
  testFetchProduct,
  testMultipleProducts
};

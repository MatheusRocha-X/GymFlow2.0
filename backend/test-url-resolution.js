import service from './services/supplementService.js';

async function testProduct() {
  const testId = 'MLB-123456789'; // ID de teste simples
  console.log('Testando produto:', testId);

  try {
    const productData = await service.fetchMercadoLivreProduct(testId);
    console.log('Produto encontrado:', productData.title);
    console.log('Preço:', productData.price);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

async function testUrl() {
  const url = 'https://mercadolivre.com/sec/17y7nTU';
  console.log('Testando URL:', url);

  try {
    const resolved = await service.resolveShortUrl(url);
    console.log('URL resolvida:', resolved);

    const id = service.extractMercadoLivreId(resolved);
    console.log('ID extraído:', id);

    if (id) {
      console.log('Testando busca do produto...');
      const productData = await service.fetchMercadoLivreProduct(id);
      console.log('Produto encontrado:', productData.title);
    }
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Testar primeiro com ID simples, depois com URL encurtada
await testProduct();
await testUrl();
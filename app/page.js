import { createClient } from 'contentful';

export default async function Page() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    host: 'preview.contentful.com' // Crucial: esto le dice que busque borradores
  });

  // IMPORTANTE: Sustituye 'ID_DE_TU_MODELO' por el ID real de tu Content Type
  const response = await client.getEntries({ content_type: 'ID_DE_TU_MODELO' });
  const item = response.items[0]; 

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Borradores de Contentful (Entorno Preview)</h1>
      {item ? (
        <div>
          <h2>Título: {item.fields.title || 'Sin título'}</h2>
          <pre style={{ background: '#eee', padding: '15px' }}>
            {JSON.stringify(item.fields, null, 2)}
          </pre>
        </div>
      ) : (
        <p>No se encontraron entradas para el modelo especificado.</p>
      )}
    </div>
  );
}

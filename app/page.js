import { createClient } from 'contentful';

export default async function Page() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
  // Elige el Token segun el entorno de Vercel
    accessToken: isPreview 
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN 
    : process.env.CONTENTFUL_ACCESS_TOKEN,
  // Elige el Host según el entorno de Vercel
  host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com'    
  });

  // Esta consulta trae las últimas 10 entradas de CUALQUIER tipo
  const response = await client.getEntries({
    limit: 10,
    order: '-sys.createdAt' // Los más recientes primero
  });

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui', lineHeight: '1.6' }}>
      <h1 style={{ color: '#0070f3' }}>Explorador de Contenido (Entorno Preview)</h1>
      <p>Mostrando los últimos 10 elementos de tu Contentful:</p>
      <hr />
      
      {response.items.length > 0 ? (
        response.items.map((item) => (
          <details key={item.sys.id} style={{ marginBottom: '20px', border: '1px solid #eaeaea', borderRadius: '8px', padding: '10px' }}>
            <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>
              📦 Tipo: {item.sys.contentType.sys.id} — ID: {item.sys.id}
            </summary>
            <div style={{ marginTop: '10px', background: '#fafafa', padding: '10px' }}>
              <pre>{JSON.stringify(item.fields, null, 2)}</pre>
            </div>
          </details>
        ))
      ) : (
        <p>No se encontraron datos. Revisa tus variables de entorno en Vercel.</p>
      )}
    </div>
  );
}

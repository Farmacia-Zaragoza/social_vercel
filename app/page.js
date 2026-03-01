import { createClient } from 'contentful';

export default async function Page() {
  const isPreview = process.env.VERCEL_ENV !== 'production';

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: isPreview 
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN 
      : process.env.CONTENTFUL_ACCESS_TOKEN,
    host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com'    
  });

  const response = await client.getEntries({
    limit: 10,
    order: '-sys.createdAt'
  });

  // Estilos para una apariencia profesional sin dependencias externas
  const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '40px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#333', backgroundColor: '#fdfdfd', minHeight: '100vh' },
    header: { textAlign: 'center', marginBottom: '50px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' },
    card: { backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '15px', padding: '25px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column' },
    typeBadge: { fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#0070f3', fontWeight: 'bold', marginBottom: '10px' },
    title: { fontSize: '1.4rem', margin: '10px 0', color: '#111', lineHeight: '1.2' },
    description: { fontSize: '0.95rem', color: '#666', lineHeight: '1.5', flexGrow: 1, marginBottom: '20px' },
    footer: { fontSize: '0.75rem', color: '#aaa', borderTop: '1px solid #f5f5f5', paddingTop: '15px' }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '10px' }}>Mi Contenido</h1>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>
          Entorno: <span style={{ color: isPreview ? '#f39c12' : '#27ae60', fontWeight: 'bold' }}>{isPreview ? 'Preview (Borradores)' : 'Producción'}</span>
        </p>
      </header>

      <div style={styles.grid}>
        {response.items.length > 0 ? (
          response.items.map((item) => (
            <article key={item.sys.id} style={styles.card}>
              <div style={styles.typeBadge}>{item.sys.contentType.sys.id}</div>
              
              {/* Buscamos campos comunes como 'title' o 'name' */}
              <h2 style={styles.title}>
                {item.fields.title || item.fields.name || 'Sin título'}
              </h2>
              
              {/* Buscamos campos de texto como 'description' o 'body' */}
              <p style={styles.description}>
                {item.fields.description || item.fields.body?.substring(0, 120) || 'Sin descripción disponible para este elemento.'}
                {item.fields.body?.length > 120 ? '...' : ''}
              </p>
              
              <footer style={styles.footer}>
                <div>ID: {item.sys.id.substring(0, 12)}...</div>
                <div>Creado: {new Date(item.sys.createdAt).toLocaleDateString()}</div>
              </footer>
            </article>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No se encontraron datos en Contentful.</p>
        )}
      </div>
    </div>
  );
}

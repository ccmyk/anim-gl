async function loadAppData({ device = 0, webp = 0, id = '', template = '', logged = 0, visible = 0, webgl = 1 }) {
  if (import.meta.env.DEV == true) {
    console.log('Loading app data:', { device, id, webp, template, logged, visible, webgl });
  }

  try {
    const optionsResponse = await fetch('/content/options.json');
    if (!optionsResponse.ok) {
      throw new Error(`Failed to load options.json: ${optionsResponse.status}`);
    }
    const optionsData = await optionsResponse.json();

    let pageData = null;
    if (id) {
      try {
        const templateKey = typeof template === 'string' ? template.toLowerCase() : '';
        const collection = templateKey === 'project' ? 'project' : 'pages';
        const pageResponse = await fetch(`/content/${collection}/${id}.json`);
        if (pageResponse.ok) {
          pageData = await pageResponse.json();
        }
      } catch (pageError) {
        console.warn(`Could not load page ${id}:`, pageError);
      }
    }

    return {
      device,
      webp,
      id,
      template,
      logged,
      webgl,
      visible,
      nav: optionsData.nav,
      loader: optionsData.loader,
      mbg: optionsData.mbg,
      main: pageData?.csskfields?.main || optionsData.main || '',
      texs: optionsData.textures || {},
      textures: optionsData.textures || {},
      fields: {
        base: optionsData.fields?.base || window.location.origin,
        template: template || optionsData.fields?.template || '',
      },
    };
  } catch (error) {
    console.error('Error loading app data:', error);
    return {
      device,
      webp,
      id,
      template,
      logged,
      webgl,
      visible,
      nav: '',
      loader: '',
      mbg: '',
      main: '',
      texs: {},
      textures: {},
      fields: {
        base: window.location.origin,
        template: template || '',
      },
    };
  }
}

export default { loadAppData };

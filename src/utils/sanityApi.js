import {isSanityEnabled, getSanityClient} from './sanityClient.js';

function mapTextureGroups(groups = []) {
  const textures = {};
  for (const group of groups) {
    if (!group?.key) continue;
    const assets = Array.isArray(group.assets) ? group.assets : [];
    textures[group.key] = assets
      .map((asset) => {
        const url = asset?.fileUrl || asset?.file?.asset?.url;
        if (!url) {
          return null;
        }
        const width = asset.fileWidth ?? asset.width ?? null;
        const height = asset.fileHeight ?? asset.height ?? null;
        if (asset.type === 'video') {
          return {
            v: url,
            w: width ?? undefined,
            h: height ?? undefined,
          };
        }
        return {
          i: url,
          w: width ?? undefined,
          h: height ?? undefined,
        };
      })
      .filter(Boolean);
  }
  return textures;
}

async function fetchTextureGroups(client) {
  const query = `
    *[_type == "textureGroup"]{
      key,
      assets[]{
        label,
        type,
        width,
        height,
        "fileUrl": file.asset->url,
        "fileWidth": coalesce(width, file.asset->metadata.dimensions.width),
        "fileHeight": coalesce(height, file.asset->metadata.dimensions.height)
      }
    }
  `;
  return client.fetch(query);
}

export async function fetchGlobalOptions() {
  if (!isSanityEnabled) {
    throw new Error('fetchGlobalOptions called while Sanity integration is disabled');
  }
  const client = getSanityClient();

  const optionsQuery = `
    *[_type == "globalOptions"][0]{
      navHtml,
      loaderHtml,
      textureRefs[]->key
    }
  `;

  const [optionsDoc, textureGroups] = await Promise.all([
    client.fetch(optionsQuery),
    fetchTextureGroups(client),
  ]);

  const textures = mapTextureGroups(textureGroups);
  return {
    nav: optionsDoc?.navHtml ?? '',
    loader: optionsDoc?.loaderHtml ?? '',
    textures,
    textureRefs: optionsDoc?.textureRefs ?? [],
  };
}

export async function fetchPageByLegacyId(legacyId) {
  if (!isSanityEnabled) {
    throw new Error('fetchPageByLegacyId called while Sanity integration is disabled');
  }
  const client = getSanityClient();
  const query = `
    *[_type == "page" && legacyId == $legacyId][0]{
      legacyId,
      template,
      mainHtml,
      "textureRefs": textureRefs[]->key
    }
  `;

  const page = await client.fetch(query, {legacyId: Number(legacyId)});
  if (!page) {
    return null;
  }
  return {
    legacyId: page.legacyId,
    template: page.template || '',
    csskfields: {
      main: page.mainHtml || '',
      textureRefs: page.textureRefs || [],
    },
  };
}

export async function fetchProjectByLegacyId(legacyId) {
  if (!isSanityEnabled) {
    throw new Error('fetchProjectByLegacyId called while Sanity integration is disabled');
  }
  const client = getSanityClient();
  const query = `
    *[_type == "project" && legacyId == $legacyId][0]{
      legacyId,
      template,
      projectIndex,
      nextProject->{legacyId},
      mainHtml,
      "textureRefs": textureRefs[]->key
    }
  `;

  const project = await client.fetch(query, {legacyId: Number(legacyId)});
  if (!project) {
    return null;
  }

  return {
    legacyId: project.legacyId,
    template: project.template || 'project',
    projectIndex: project.projectIndex ?? null,
    nextProject: project.nextProject?.legacyId ?? null,
    csskfields: {
      main: project.mainHtml || '',
      textureRefs: project.textureRefs || [],
    },
  };
}

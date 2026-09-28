/** Instagram post URL for a media id (ids are post short codes plus an optional file suffix). */
export function instagramPostUrl(id: string) {
  const code = id
    .replace(/_cover$/, "") // video poster
    .replace(/__\d+$/, "_") // carousel file of a code ending in "_"
    .replace(/^(DafY_2dkm_8)_\d$/, "$1"); // carousel file of DafY_2dkm_8
  return `https://www.instagram.com/p/${code}/`;
}

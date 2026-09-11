/**
 * Turns a normal YouTube/Vimeo share URL into an embeddable one.
 * Returns null for anything unrecognised, so callers can fall back to
 * opening the link rather than embedding a page that refuses to frame.
 */
export function toEmbedUrl(url: string, autoplay = true): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')
    const auto = autoplay ? '1' : '0'

    if (host === 'youtu.be') {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}?autoplay=${auto}&rel=0`
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = parsed.searchParams.get('v') || parsed.pathname.split('/').pop()
      return id ? `https://www.youtube.com/embed/${id}?autoplay=${auto}&rel=0` : null
    }
    if (host === 'vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id ? `https://player.vimeo.com/video/${id}?autoplay=${auto}` : null
    }
    if (host === 'player.vimeo.com' || host === 'youtube-nocookie.com') {
      return url
    }
    return null
  } catch {
    return null
  }
}

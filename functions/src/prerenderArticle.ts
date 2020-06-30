import * as functions from 'firebase-functions'
import * as fs from 'fs'
import { Path } from 'path-parser'
const Ghost = require('@tryghost/content-api')

const path = new Path('/blog/:articleSlug')

const replaceTitle = (html: string, title: string | undefined): string => {
  if (!title) return html

  const tagStart = html.indexOf('<meta name="og:title"')
  const tagEnd = html.slice(tagStart).indexOf('/>') + 2
  const tag = html.slice(tagStart, tagStart + tagEnd)

  return html.replace(tag, `<meta name="og:title" property="og:title" content="${title}" />`)
}

const replaceDescription = (html: string, description: string | undefined): string => {
  if (!description) return html

  const tagStart = html.indexOf('<meta name="og:description"')
  const tagEnd = html.slice(tagStart).indexOf('/>') + 2
  const tag = html.slice(tagStart, tagStart + tagEnd)

  return html.replace(tag, `<meta name="og:description" property="og:description" content="${description}" />`)
}

const replaceImage = (html: string, imageUrl: string | undefined): string => {
  if (!imageUrl) return html

  const tagStart = html.indexOf('<meta name="og:image"')
  const tagEnd = html.slice(tagStart).indexOf('/>') + 2
  const tag = html.slice(tagStart, tagStart + tagEnd)

  return html.replace(tag, `<meta name="og:image" property="og:image" content="${imageUrl}" />`)
}

const prerender =  async (html: string, params: { articleSlug: string }): Promise<string> => {
  const ghost = new Ghost({
    url: 'https://sparkgnv.ghost.io',
    key: 'a49362ef6958b6f133bb40ceaa',
    version: 'v3'
  })

  const { title, excerpt, feature_image } = await ghost.posts.read({ slug: params.articleSlug }, { include: 'authors' })
  const dynamicHtml = replaceImage(replaceDescription(replaceTitle(html, title), excerpt), feature_image)
  return dynamicHtml
}

export const prerenderArticle = functions.https.onRequest(async (req, res) => {
  const params = path.test(req.url)
  const html = fs.readFileSync(__dirname + '/index.html', 'utf8')

  // If params cant be read for whatever reason, send the unedited page
  if (!params) {
    res.send(html)
    return
  }

  const dynamicHtml = await prerender(html, { articleSlug: params.articleSlug })
  res.send(dynamicHtml)
})

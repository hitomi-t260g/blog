

import Container from 'components/Container'
import { getPostBySlug } from 'lib/api'
import PostHeader from 'components/PostHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from 'components/TwoColumn'
import PostBody from 'components/PostBody'
import ConvertBody from 'components/ConvertBody'
import PostCategories from 'components/PostCategories'

export default function Schedule({
  title,
  publish,
  content,
  eyecatch,
  categories,
}) {
  return (
    <Container>
      <article>
        <PostHeader title={title} subtitle="Blog Article" publish={publish}/>
        <FontAwesomeIcon icon="fa-sharp fa-solid fa-house" />

        <figure>
          <Image
            src={ eyecatch.url }
            alt=''
            layout='responsive' //Next v13よりlayoutが非推奨:修正対象
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              {/* <div dangerouslySetInnerHTML={{__html: content}} /> スタイルが適用できない。XSSされないようサニタイズが必要 */}
              <ConvertBody contentHTML={content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>
      </article>
    </Container>
  )
}

export async function getStaticProps(){
  const slug = 'schedule'

  const post =  await getPostBySlug(slug)

  return{
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: post.eyecatch,
      categories: post.categories,
    },
  }
}



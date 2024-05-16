import { nanoid } from '@/lib/utils'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '../../actions'
import Hero from '@/components/hero'
import Newsletter from '@/components/newsletter'
import Quiz from '@/components/quiz'
import WhyStatement from '@/components/whyStatement'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Hero />
     <WhyStatement />
      {/* <FeaturesBlocks />
      <Features /> */}

      {/* <Testimonials /> */}
      <Newsletter />
      {/*<Chat id={id} session={session} missingKeys={missingKeys} />*/}
    </AI>
  )
}

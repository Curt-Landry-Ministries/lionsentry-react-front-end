import { nanoid } from '@/lib/utils'
import { Chat } from '@/app/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '../actions'
import Hero from '@/app/components/hero'
import Features from '@/app/components/features'
import FeaturesBlocks from '@/app/components/features-blocks'
import Testimonials from '@/app/components/testimonials'
import Newsletter from '@/app/components/newsletter'
import Quiz from '@/app/components/quiz'

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
      <Quiz />
      {/* <FeaturesBlocks />
      <Features /> */}

      {/* <Testimonials /> */}
      <Newsletter />
      {/*<Chat id={id} session={session} missingKeys={missingKeys} />*/}
    </AI>
  )
}
